import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section, Container } from '../components/ui';

// Appointment booking, on the homepage: the booking itself, played out.
//
// The row used to be two lists. A booking system is a sequence, so it is shown
// as one -- the enquiry arrives, availability is checked, the slot is written --
// and the industry is the reader's to choose, which is also how the section
// answers "does this work for my business" without a paragraph claiming it.
//
// Motion follows the handoff's rules. One step at a time, never the whole
// panel at once; it starts when the section is on screen and stops on the
// booked state rather than looping at the reader. Every step is a button, the
// industries are buttons, and under reduced motion nothing moves: the finished
// booking is simply there. Nothing is stated only in the animation -- each
// step's text is in the DOM, and the copy beside it carries the claim.

const SCENES = [
  {
    industry: 'Healthcare',
    live: true,
    note: 'clinic appointments and intake',
    channel: 'WhatsApp · just now',
    message: 'Hi, can I see a doctor on Thursday morning?',
    checks: [['Department', 'General medicine'], ['Location', 'Indiranagar'], ['Duration', '30 min']],
    slots: ['10:30', '11:30', '12:30'],
    taken: 0,
    chosen: 1,
    booked: 'Thu · 11:30 · General medicine',
    written: 'Written to the clinic calendar',
  },
  {
    industry: 'Automotive',
    live: true,
    note: 'service bays and advisors',
    channel: 'WhatsApp · just now',
    message: 'Need a service on the car before Friday. Any slot?',
    checks: [['Job type', 'Periodic service'], ['Bay capacity', '1 free Thursday'], ['Advisor', 'On duty']],
    slots: ['08:00', '09:00', '14:00'],
    taken: 2,
    chosen: 1,
    booked: 'Thu · 09:00 · Service bay 3',
    written: 'Held in the workshop diary',
  },
  {
    industry: 'Real estate',
    live: true,
    note: 'site visits and viewings',
    channel: 'Portal enquiry · just now',
    message: 'Can I see the 3BHK in Whitefield this Saturday?',
    checks: [['Property', '3BHK · Whitefield'], ['Agent', 'Free Saturday'], ['Duration', '45 min']],
    slots: ['11:00', '16:00', '17:30'],
    taken: 0,
    chosen: 1,
    booked: 'Sat · 16:00 · Viewing with the agent',
    written: 'Written to the agent’s calendar',
  },
  {
    industry: 'Dental and diagnostics',
    note: 'chair and scan time',
    channel: 'Web form · just now',
    message: 'Follow-up for a root canal, evening if possible.',
    checks: [['Treatment', 'Follow-up'], ['Chair time', '45 min'], ['Dentist', 'Evening list']],
    slots: ['17:00', '18:00', '19:00'],
    taken: 0,
    chosen: 1,
    booked: 'Tue · 18:00 · Chair 2',
    written: 'Written to the practice calendar',
  },
  {
    industry: 'Veterinary',
    note: 'consultations and vaccinations',
    channel: 'WhatsApp · just now',
    message: 'My dog needs a check-up this week.',
    checks: [['Reason', 'General check-up'], ['Vet', 'On duty Wednesday'], ['Duration', '20 min']],
    slots: ['16:30', '17:30', '18:00'],
    taken: 2,
    chosen: 1,
    booked: 'Wed · 17:30 · Consultation room 1',
    written: 'Written to the clinic calendar',
  },
  {
    industry: 'Salons, spas and fitness',
    note: 'the person and the chair',
    channel: 'Instagram message · just now',
    message: 'Haircut with Asha on Sunday?',
    checks: [['Service', 'Cut and finish'], ['Stylist', 'Asha · free Sunday'], ['Duration', '45 min']],
    slots: ['11:00', '12:00', '15:00'],
    taken: 0,
    chosen: 1,
    booked: 'Sun · 12:00 · with Asha',
    written: 'Held in the salon diary',
  },
  {
    industry: 'Legal and advisory',
    note: 'consultations, after the checks',
    channel: 'Web form · just now',
    message: 'I need advice on a commercial lease.',
    checks: [['Matter', 'Commercial lease'], ['Conflict check', 'Clear'], ['Duration', '30 min']],
    slots: ['14:00', '15:00', '16:30'],
    taken: 0,
    chosen: 1,
    booked: 'Fri · 15:00 · 30-minute consultation',
    written: 'Written to the partner’s calendar',
  },
  {
    industry: 'Home services',
    note: 'field visits and routes',
    channel: 'Call · just now',
    message: 'The AC is not cooling. Can someone come today?',
    checks: [['Job', 'AC not cooling'], ['Engineer', 'On route nearby'], ['Window', '2 hours']],
    slots: ['12:00', '16:00', '18:00'],
    taken: 0,
    chosen: 1,
    booked: 'Today · 16:00–18:00 · engineer assigned',
    written: 'Added to the route for the day',
  },
  {
    industry: 'Education and coaching',
    note: 'demo classes and admissions',
    channel: 'WhatsApp · just now',
    message: 'Can we book a demo class for Class 9 maths?',
    checks: [['Class', 'Class 9 · maths'], ['Teacher', 'Free Saturday'], ['Duration', '40 min']],
    slots: ['09:00', '10:00', '11:30'],
    taken: 0,
    chosen: 1,
    booked: 'Sat · 10:00 · demo class',
    written: 'Written to the teacher’s timetable',
  },
];

const STEPS = [
  { label: 'Enquiry', caption: 'It arrives on the channel the customer already uses.' },
  { label: 'Checked', caption: 'Real availability: who is on duty, what is free, how long it takes.' },
  { label: 'Booked', caption: 'The slot is written to your calendar and confirmed back.' },
];

const STEP_MS = [1500, 1900, 2600];

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M4.6 8.2l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Appointments() {
  const rootRef = useRef(null);
  const started = useRef(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [step, setStep] = useState(() => (reducedMotion() ? 2 : -1));
  const [playing, setPlaying] = useState(false);

  const scene = SCENES[sceneIndex];

  // Starts once, when most of the row is on screen.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const node = rootRef.current;
    if (!node) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setStep(0);
          setPlaying(true);
          io.disconnect();
        }
      },
      // A tall section on a short screen never reaches a high ratio, so this
      // is deliberately low: it means "in view", not "mostly in view".
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // One step at a time, then rest on the booking. The stop happens in the same
  // callback that reaches the last step rather than in a later render.
  useEffect(() => {
    if (!playing || step < 0 || step >= STEPS.length - 1) return undefined;
    const t = setTimeout(() => {
      const next = step + 1;
      setStep(next);
      if (next >= STEPS.length - 1) setPlaying(false);
    }, STEP_MS[step] ?? 1500);
    return () => clearTimeout(t);
  }, [playing, step]);

  // Choosing an industry replays the sequence for it, unless the reader has
  // asked for no motion, in which case it simply shows that booking made.
  const chooseScene = (i) => {
    setSceneIndex(i);
    if (reducedMotion()) return;
    setStep(0);
    setPlaying(true);
  };

  const replay = () => {
    setStep(0);
    setPlaying(true);
  };

  const state = (i) => (i === step ? 'is-active' : i < step ? 'is-done' : 'is-waiting');

  return (
    <Section id="appointments">
      <Container wide>
        <div ref={rootRef} className="abx">
          <div className="abx__say">
            <p className="kicker">Appointment booking</p>
            <h2 className="abx__title">Every enquiry ends as a booked slot</h2>
            <p className="abx__body">
              A message, a call or a form arrives. The system reads what was asked, checks what is
              genuinely free in the calendar your team already works in, books it and confirms it.
              What it cannot answer stops and names a person.
            </p>

            <ol className="abx__steps">
              {STEPS.map((s, i) => (
                <li key={s.label} className={`abx__step ${state(i)}`}>
                  <button
                    type="button"
                    className="abx__stepbtn"
                    aria-current={i === step ? 'step' : undefined}
                    onClick={() => { setPlaying(false); setStep(i); }}
                  >
                    <span className="abx__stepnum">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="abx__steplabel">{s.label}</span>
                      <span className="abx__stepcaption">{s.caption}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="abx__foot">
              <Link
                to="/services/appointment-booking"
                className="abx__cta"
                data-track="service_view"
                data-track-cta_location="home_appointments"
              >
                See the appointment booking system <span aria-hidden="true">→</span>
              </Link>

              {!reducedMotion() && (
                playing ? (
                  <button type="button" className="abx__control" onClick={() => setPlaying(false)}>Pause</button>
                ) : (
                  step >= 0 && <button type="button" className="abx__control" onClick={replay}>Replay</button>
                )
              )}
            </div>
          </div>

          <div className="abx__show">
            {/* The industry chooser drives the panel below it. Every option is
                a real button, so this works on a tap with no hover. */}
            <div className="abx__pick">
              <p className="abx__pickhead" id="abx-pick-label">Choose an industry</p>
              <div className="abx__chips" role="group" aria-labelledby="abx-pick-label">
                {SCENES.map((s, i) => (
                  <button
                    key={s.industry}
                    type="button"
                    className={`abx__chip${i === sceneIndex ? ' is-on' : ''}`}
                    aria-pressed={i === sceneIndex}
                    onClick={() => chooseScene(i)}
                  >
                    {s.live && <span className="abx__live" aria-hidden="true" />}
                    {s.industry}
                  </button>
                ))}
              </div>
              <p className="abx__picknote">
                <span className="abx__live" aria-hidden="true" />
                Healthcare, automotive and real estate run in production today. The rest are the
                same system, built to your rules.
              </p>
            </div>

            {/* The booking itself. Illustrative, and aria-hidden for it: every
                state it shows is named in the steps and the copy beside it. */}
            <div className="abx__panel" aria-hidden="true">
              <div className="abx__panelhead">
                <span className="abx__panelname">{scene.industry}</span>
                <span className="abx__panelnote">{scene.note}</span>
              </div>

              <div className={`abx__stage abx__stage--${step < 0 ? 0 : step}`} key={scene.industry}>
                <div className={`abx__msg ${state(0)}`}>
                  <span className="abx__from">{scene.channel}</span>
                  <p className="abx__bubble">{scene.message}</p>
                </div>

                <dl className={`abx__checks ${state(1)}`}>
                  {scene.checks.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                </dl>

                <div className={`abx__cal ${state(1)}`}>
                  {scene.slots.map((t, i) => (
                    <span
                      key={t}
                      className={`abx__slot${i === scene.taken ? ' abx__slot--taken' : ''}${i === scene.chosen && step >= 2 ? ' abx__slot--new' : ''}`}
                    >
                      <span className="abx__slottime">{t}</span>
                      <span className="abx__slotstate">
                        {i === scene.taken ? 'Booked' : i === scene.chosen && step >= 2 ? 'Held' : 'Open'}
                      </span>
                    </span>
                  ))}
                </div>

                <div className={`abx__confirm ${state(2)}`}>
                  <span className="abx__confirmicon"><Check /></span>
                  <span>
                    <span className="abx__confirmtitle">{scene.booked}</span>
                    <span className="abx__confirmline">{scene.written}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
