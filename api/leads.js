// POST /api/leads
//
// The boundary the specification asks for: the website collects a lead, but no
// CRM credential, provider key or workflow logic ever reaches the browser.
// Validation, rate limiting and the CRM write all happen here.
//
// CRM_WEBHOOK_URL is a managed environment secret. Until it is set this
// endpoint validates and accepts the lead but reports `delivered: false`, and
// the form tells the visitor to use WhatsApp or email instead -- which is
// honest, and better than silently dropping an enquiry into nothing.

const MAX_LEN = { name: 120, email: 160, phone: 32, company: 160, message: 2000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort in-memory limiter. Serverless instances are not shared, so this
// stops a naive flood rather than a determined attacker; the real protection is
// that there is nothing valuable behind it.
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
  const f = {};

  for (const k of ['name', 'email', 'phone', 'company', 'message', 'product', 'industry']) {
    const v = body?.[k];
    if (v != null && typeof v !== 'string') return { errors: ['bad_request'] };
    f[k] = (v || '').trim();
  }

  for (const [k, max] of Object.entries(MAX_LEN)) {
    if (f[k] && f[k].length > max) errors.push(k);
  }

  if (!f.name) errors.push('name');
  if (!EMAIL.test(f.email)) errors.push('email');
  if (!f.message) errors.push('message');
  if (body?.consent !== true) errors.push('consent');

  // Honeypot: a real person never fills a field they cannot see. Reported as
  // success so a bot does not learn to work around it.
  if ((body?.website || '').trim()) return { errors: [], spam: true, fields: f };

  return { errors, fields: f };
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

  const { errors, fields, spam } = validate(req.body || {});
  if (errors.length) {
    // Neutral message; the field list is for the form, not for probing.
    return res.status(400).json({ ok: false, error: 'validation_failed', fields: errors });
  }
  if (spam) return res.status(200).json({ ok: true, delivered: true });

  const source = req.body?.source || {};
  const lead = {
    ...fields,
    consent: true,
    consentAt: new Date().toISOString(),
    source: {
      page: String(source.page || '').slice(0, 200),
      ctaLocation: String(source.ctaLocation || '').slice(0, 60),
      campaign: String(source.campaign || '').slice(0, 120),
      referrer: String(req.headers.referer || '').slice(0, 200),
    },
  };

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[leads] CRM_WEBHOOK_URL is not set; lead accepted but not delivered.');
    return res.status(200).json({ ok: true, delivered: false });
  }

  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CRM_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CRM_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(lead),
    });
    if (!r.ok) throw new Error(`CRM responded ${r.status}`);
    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    // The visitor should not lose their enquiry because a CRM was down.
    console.error('[leads] delivery failed:', err.message);
    return res.status(200).json({ ok: true, delivered: false });
  }
}
