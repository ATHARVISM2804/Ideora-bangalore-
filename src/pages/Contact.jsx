import { useRef, useState, useId } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageHero } from './blocks';
import { Section, Container, Label, Button } from '../components/ui';
import { WA_BRIEFING, WA_LINK, WA_NUMBER } from '../lib/whatsapp';
import { track } from '../lib/analytics';

const FIELD_LABEL = {
  name: 'your name', email: 'a valid work email', message: 'a short message',
  company: 'your company', phone: 'your phone number', consent: 'your consent to be contacted',
};

// Contact.
//
// WhatsApp comes first because it is how this business actually runs -- a
// senior buyer who wants a call in the next ten minutes should not have to
// fill a form. The form is for the reviewer who wants a written trail, and it
// posts to a server endpoint so no CRM credential is ever in the browser.
export function Contact() {
  const rootRef = useRef(null);
  const { pathname } = useLocation();
  const formId = useId();
  const [state, setState] = useState({ status: 'idle', errors: [], delivered: true });

  useDocumentTitle(
    'Contact | Ideora Labs',
    'Talk to Ideora Labs about automating an operation: WhatsApp, email, or book a 30-minute discovery call.',
  );
  useGsapTimeline({ rootRef });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Catch the obvious failures here rather than spending a round trip on
    // them. The server revalidates everything regardless -- this is for the
    // visitor's benefit, not the endpoint's.
    const local = [];
    if (!String(data.name || '').trim()) local.push('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(data.email || ''))) local.push('email');
    if (!String(data.message || '').trim()) local.push('message');
    if (data.consent !== 'on') local.push('consent');

    if (local.length) {
      track('form_error', { form_id: 'contact', field_group: local.join(','), error_type: 'client_validation' });
      setState({ status: 'error', errors: local, delivered: true });
      return;
    }

    setState({ status: 'sending', errors: [], delivered: true });

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          consent: data.consent === 'on',
          source: { page: pathname, ctaLocation: 'contact_form' },
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        const errors = json.fields || ['request'];
        // Which field group failed, never what the visitor typed.
        track('form_error', { form_id: 'contact', field_group: errors.join(','), error_type: json.error || 'request_failed' });
        setState({ status: 'error', errors, delivered: true });
        return;
      }

      track('discovery_booked', { product: 'general', industry: 'general', lead_id: 'form', source: 'contact_form' });
      setState({ status: 'sent', errors: [], delivered: json.delivered !== false });
    } catch {
      track('form_error', { form_id: 'contact', field_group: 'network', error_type: 'network' });
      setState({ status: 'error', errors: ['request'], delivered: true });
    }
  };

  const invalid = (f) => state.errors.includes(f);

  return (
    <div ref={rootRef}>
      <Breadcrumbs trail={[]} current="Contact" />
      <PageHero
        eyebrow="Contact"
        heading="Talk to the people who build it"
        lede="You will speak to the team that would run your build, not an account manager. If it is not a fit we will tell you on the first call rather than the third."
      />

      <Section edge="bottom">
        <Container>
          <div className="contact">
            <div className="contact__direct">
              <Label>Fastest</Label>
              <p className="body-muted" style={{ marginTop: 'var(--s-4)' }}>
                WhatsApp reaches us directly during Indian business hours, usually within the hour.
              </p>
              <Button
                href={WA_BRIEFING}
                {...WA_LINK}
                data-track="whatsapp_click"
                data-track-cta_location="contact_page"
                style={{ marginTop: 'var(--s-5)' }}
              >
                Book a 30-minute discovery call
              </Button>

              <dl className="contact__list">
                <div>
                  <dt className="label">Email</dt>
                  <dd><a href="mailto:info@ideoralabs.com">info@ideoralabs.com</a></dd>
                </div>
                <div>
                  <dt className="label">WhatsApp</dt>
                  <dd><a href={`https://wa.me/${WA_NUMBER}`} {...WA_LINK}>+91 97387 20404</a></dd>
                </div>
                <div>
                  <dt className="label">Where we are</dt>
                  <dd>Bengaluru, India</dd>
                </div>
              </dl>
            </div>

            <form className="contact__form" onSubmit={onSubmit} noValidate>
              <Label>Or send it in writing</Label>

              {state.status === 'sent' ? (
                <p className="contact__ok" role="status">
                  {state.delivered
                    ? 'Thank you. We have it, and you will hear from us within one business day.'
                    : 'Thank you. Your message reached us, but our systems could not confirm delivery — if you do not hear back within a day, please use WhatsApp or email above.'}
                </p>
              ) : (
                <>
                  {/* One summary in a live region: a screen-reader user should
                      not have to hunt each field to find out what failed. */}
                  {state.errors.length > 0 && (
                    <p className="contact__err" role="alert">
                      {state.errors.includes('request')
                        ? 'We could not send that just now. Please try again, or reach us on WhatsApp or email.'
                        : `Please check ${state.errors.map((f) => FIELD_LABEL[f] || 'the form').join(', ')}.`}
                    </p>
                  )}

                  {[
                    { n: 'name', l: 'Name', t: 'text', req: true, ac: 'name' },
                    { n: 'email', l: 'Work email', t: 'email', req: true, ac: 'email' },
                    { n: 'company', l: 'Company', t: 'text', req: false, ac: 'organization' },
                    { n: 'phone', l: 'Phone (optional)', t: 'tel', req: false, ac: 'tel' },
                  ].map((f) => (
                    <p key={f.n} className="field">
                      <label htmlFor={`${formId}-${f.n}`}>{f.l}</label>
                      <input
                        id={`${formId}-${f.n}`}
                        name={f.n}
                        type={f.t}
                        autoComplete={f.ac}
                        required={f.req}
                        aria-invalid={invalid(f.n) || undefined}
                      />
                    </p>
                  ))}

                  <p className="field">
                    <label htmlFor={`${formId}-message`}>What would you like to automate?</label>
                    <textarea
                      id={`${formId}-message`}
                      name="message"
                      rows="4"
                      required
                      aria-invalid={invalid('message') || undefined}
                    />
                  </p>

                  {/* Honeypot. Hidden from everyone who is not a bot. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    className="field__trap"
                  />

                  <p className="field field--check">
                    <input
                      id={`${formId}-consent`}
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={invalid('consent') || undefined}
                    />
                    <label htmlFor={`${formId}-consent`}>
                      I agree to Ideora Labs contacting me about this enquiry. We do not add you to
                      a mailing list.
                    </label>
                  </p>

                  <Button
                    type="submit"
                    disabled={state.status === 'sending'}
                    aria-busy={state.status === 'sending' || undefined}
                  >
                    {state.status === 'sending' ? 'Sending' : 'Send enquiry'}
                  </Button>
                </>
              )}
            </form>
          </div>
        </Container>
      </Section>
    </div>
  );
}
