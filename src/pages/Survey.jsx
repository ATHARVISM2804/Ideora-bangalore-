import { useRef, useState, useId } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useRobots } from '../hooks/useRobots';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { PageHero } from './blocks';
import { Section, Container, Label, Button } from '../components/ui';
import { SURVEY_QUESTIONS, SURVEY_DETAILS } from '../data/survey';

const ERROR_TEXT = {
  rate_limited: 'That is several attempts in quick succession. Give it a minute and try again.',
  request: 'We could not save your answers just now. Nothing is wrong with them. Please try again in a moment.',
};

// PT SmartTrack gym-owner survey. Shared by link, so it is not in the
// navigation or the sitemap, and it is noindexed. Answers post to
// api/survey.js, which stores them in a Google Sheet.
export function Survey() {
  const rootRef = useRef(null);
  const formId = useId();
  const [picked, setPicked] = useState({});
  const [state, setState] = useState({ status: 'idle', errors: [] });

  useDocumentTitle(
    'PT SmartTrack gym owner survey | Ideora Labs',
    'A 2-3 minute survey for gym owners on how personal training sessions are tracked today.',
  );
  useRobots('noindex, nofollow');
  useGsapTimeline({ rootRef });

  const toggle = (q, option) => {
    setPicked((p) => {
      const cur = p[q.id] || [];
      return { ...p, [q.id]: cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option] };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const answers = Object.fromEntries(
      SURVEY_QUESTIONS.map((q) => [q.id, q.multi ? picked[q.id] || [] : form.get(q.id) || '']),
    );

    const local = SURVEY_QUESTIONS.filter((q) => (q.multi ? !answers[q.id].length : !answers[q.id])).map((q) => q.id);
    if (form.get('consent') !== 'on') local.push('consent');
    if (local.length) {
      setState({ status: 'error', errors: local });
      return;
    }

    setState({ status: 'sending', errors: [] });
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          ...Object.fromEntries(SURVEY_DETAILS.map((d) => [d.id, form.get(d.id) || ''])),
          website: form.get('website') || '',
          consent: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setState({ status: 'error', errors: res.status === 429 ? ['rate_limited'] : res.status === 400 ? json.fields || ['request'] : ['request'] });
        return;
      }
      setState({ status: 'sent', errors: [] });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setState({ status: 'error', errors: ['request'] });
    }
  };

  const invalid = (f) => state.errors.includes(f);
  const missing = SURVEY_QUESTIONS.map((q, i) => (invalid(q.id) ? i + 1 : null)).filter(Boolean);

  return (
    <div ref={rootRef}>
      <PageHero
        eyebrow="PT SmartTrack"
        heading="Gym owner PT management survey"
        lede="Help us understand how personal training sessions are managed today: the challenges, the features that matter and whether a dedicated tool would help. It takes 2-3 minutes."
      />

      <Section edge="bottom">
        <Container>
          {state.status === 'sent' ? (
            <div className="survey">
              <p className="contact__ok" role="status">
                Thank you. Your answers have been recorded. If you asked to test an early version, we will be in touch.
              </p>
            </div>
          ) : (
            <form className="survey" onSubmit={onSubmit} noValidate>
              {SURVEY_QUESTIONS.map((q, i) => {
                const chosen = picked[q.id] || [];
                return (
                  <fieldset key={q.id} className="survey__q" aria-invalid={invalid(q.id) || undefined}>
                    <legend>
                      <span className="survey__n">{String(i + 1).padStart(2, '0')}</span>
                      {q.text}
                    </legend>
                    <p className="survey__hint">{q.multi ? 'Select all that apply' : 'Choose one'}</p>
                    <div className="survey__options">
                      {q.options.map((o, j) => {
                        const id = `${formId}-${q.id}-${j}`;
                        return (
                          <label key={o} htmlFor={id} className="survey__opt">
                            {q.multi ? (
                              <input
                                id={id}
                                type="checkbox"
                                checked={chosen.includes(o)}
                                onChange={() => toggle(q, o)}
                              />
                            ) : (
                              <input id={id} type="radio" name={q.id} value={o} />
                            )}
                            <span>{o}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}

              <fieldset className="survey__q">
                <legend>Your details <span className="survey__hint">(optional)</span></legend>
                {SURVEY_DETAILS.map((d) => (
                  <p key={d.id} className="field">
                    <label htmlFor={`${formId}-${d.id}`}>{d.label}</label>
                    {d.long ? (
                      <textarea id={`${formId}-${d.id}`} name={d.id} rows="4" maxLength={d.max} />
                    ) : (
                      <input id={`${formId}-${d.id}`} name={d.id} type="text" maxLength={d.max} autoComplete={d.id === 'contactName' ? 'name' : 'organization'} />
                    )}
                  </p>
                ))}
              </fieldset>

              {/* Honeypot. Hidden from everyone who is not a bot. */}
              <input type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="field__trap" />

              <p className="field field--check">
                <input id={`${formId}-consent`} name="consent" type="checkbox" required aria-invalid={invalid('consent') || undefined} />
                <label htmlFor={`${formId}-consent`}>
                  I agree to Ideora Labs storing these responses to research PT management, and contacting me
                  if I said I am interested in testing an early version. My details are never shown publicly.
                </label>
              </p>

              {state.status === 'error' && (
                <p className="contact__err" role="alert">
                  {ERROR_TEXT[state.errors[0]] ||
                    [
                      missing.length && `Please answer question${missing.length > 1 ? 's' : ''} ${missing.join(', ')}.`,
                      invalid('consent') && 'Please tick the consent box.',
                    ].filter(Boolean).join(' ')}
                </p>
              )}

              <div className="survey__submit">
                <Label>Thank you for your time</Label>
                <Button type="submit" disabled={state.status === 'sending'} aria-busy={state.status === 'sending' || undefined}>
                  {state.status === 'sending' ? 'Submitting' : 'Submit survey'}
                </Button>
              </div>
            </form>
          )}
        </Container>
      </Section>
    </div>
  );
}
