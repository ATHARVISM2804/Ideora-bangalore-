import { Link } from 'react-router-dom';
import { Section, Container } from '../components/ui';

// Appointment booking, on the homepage.
//
// It is the workflow all three live products share, and the one most visitors
// arrive asking for by name, so it gets a row of its own between the worked
// example above it and the evidence below. The left side says what the system
// does; the right says where it fits, marking what runs in production today
// against what it would be built for.

const LIVE = [
  { name: 'Healthcare', note: 'clinic appointments and intake' },
  { name: 'Automotive', note: 'service bays and advisors' },
  { name: 'Real estate', note: 'site visits and viewings' },
];

const FITS = [
  'Dental and diagnostics',
  'Veterinary',
  'Salons, spas and fitness',
  'Legal and advisory consultations',
  'Home services and field visits',
  'Education and coaching',
];

export function Appointments() {
  return (
    <Section id="appointments">
      <Container wide>
        <div className="appt">
          <div>
            <p className="kicker">Appointment booking</p>
            <h2 className="appt__title">Every enquiry ends as a booked slot</h2>
            <p className="appt__body">
              A message, a call or a form arrives. The system reads what was asked, checks what is
              genuinely free in the calendar your team already works in, books it and confirms it.
              What it cannot answer stops and names a person.
            </p>

            {/* Illustrative, and aria-hidden for it: the three steps are named
                in the copy above and on the page this links to. */}
            <ol className="appt__flow" aria-hidden="true">
              <li className="appt__step">
                <span className="appt__steplabel">Enquiry</span>
                <span className="appt__steptext">“Can I come in on Thursday morning?”</span>
              </li>
              <li className="appt__step">
                <span className="appt__steplabel">Checked</span>
                <span className="appt__steptext">Duty roster · capacity · duration</span>
              </li>
              <li className="appt__step appt__step--done">
                <span className="appt__steplabel">Booked</span>
                <span className="appt__steptext">Thu · 11:30, written to the calendar</span>
              </li>
            </ol>

            <Link
              to="/services/appointment-booking"
              className="appt__cta"
              data-track="service_view"
              data-track-cta_location="home_appointments"
            >
              See the appointment booking system <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="appt__where">
            <p className="appt__wherehead">Running in production</p>
            <ul className="appt__live">
              {LIVE.map((l) => (
                <li key={l.name}>
                  <span className="appt__livename">{l.name}</span>
                  <span className="appt__livenote">{l.note}</span>
                </li>
              ))}
            </ul>

            <p className="appt__wherehead">The same system fits</p>
            <ul className="appt__tags">
              {FITS.map((f) => <li key={f} className="appt__tag">{f}</li>)}
            </ul>

            <p className="appt__note">
              Anywhere a person books time with your business. The three above run today, so the
              pattern and the connectors are proven; the rest are a fixed-scope build.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
