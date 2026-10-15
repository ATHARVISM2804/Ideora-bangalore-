// POST /api/survey
//
// PT SmartTrack gym-owner survey. Validates every answer against the same
// question list the page renders, stamps the submission with a response ID and
// a timestamp, and forwards it to SURVEY_WEBHOOK_URL: a Google Apps Script web
// app that appends a row to a private Google Sheet: the admin-only view and
// the spreadsheet export.
// Setup: docs/survey-apps-script.md.
//
// Unlike /api/leads, an undelivered submission is reported as a failure: there
// is no WhatsApp fallback for survey answers, so telling the respondent it
// worked would lose them silently.

import { randomUUID } from 'node:crypto';
import { SURVEY_QUESTIONS, SURVEY_DETAILS } from '../src/data/survey.js';

// Best-effort in-memory limiter, as in api/leads.js.
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function validate(body) {
  const errors = [];
  const answers = {};

  for (const q of SURVEY_QUESTIONS) {
    const v = body?.answers?.[q.id];
    if (q.multi) {
      const picked = Array.isArray(v) ? v : [];
      const ok = picked.length >= 1
        && new Set(picked).size === picked.length
        && picked.every((p) => q.options.includes(p));
      if (!ok) errors.push(q.id);
      else answers[q.id] = picked;
    } else if (typeof v !== 'string' || !q.options.includes(v)) {
      errors.push(q.id);
    } else {
      answers[q.id] = v;
    }
  }

  const details = {};
  for (const d of SURVEY_DETAILS) {
    const v = body?.[d.id];
    if (v != null && typeof v !== 'string') return { errors: ['bad_request'] };
    details[d.id] = (v || '').trim();
    if (details[d.id].length > d.max) errors.push(d.id);
  }

  if (body?.consent !== true) errors.push('consent');

  // Honeypot, reported as success so a bot does not learn to work around it.
  if ((body?.website || '').trim()) return { errors: [], spam: true };

  return { errors, answers, details };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  const { errors, answers, details, spam } = validate(req.body || {});
  if (errors.length) {
    return res.status(400).json({ ok: false, error: 'validation_failed', fields: errors });
  }
  if (spam) return res.status(200).json({ ok: true, id: randomUUID() });

  const response = {
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    ...details,
    // Question text travels with each answer so the sheet reads on its own,
    // without this file to decode q1..q10.
    answers: SURVEY_QUESTIONS.map((q, i) => ({
      n: i + 1,
      question: q.text,
      answer: q.multi ? answers[q.id].join('; ') : answers[q.id],
    })),
    consent: true,
  };

  const webhook = process.env.SURVEY_WEBHOOK_URL;
  if (!webhook) {
    console.error('[survey] SURVEY_WEBHOOK_URL is not set; response not stored.');
    return res.status(503).json({ ok: false, error: 'not_configured' });
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.SURVEY_WEBHOOK_SECRET || '', response }),
    });
    const json = await r.json().catch(() => ({}));
    if (!r.ok || json.ok !== true) throw new Error(`webhook responded ${r.status}`);
    return res.status(200).json({ ok: true, id: response.id });
  } catch (err) {
    // The ID only, never the answers or the respondent's details.
    console.error('[survey] delivery failed:', response.id, err.message);
    return res.status(502).json({ ok: false, error: 'delivery_failed' });
  }
}
