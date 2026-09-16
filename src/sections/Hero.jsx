import { useIsPhone } from '../hooks/useMedia';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { HeroVisual } from '../components/HeroVisual';
import { Photo } from '../components/Photo';
import { WA_BRIEFING, WA_LINK } from '../lib/whatsapp';
import { Container, Button } from '../components/ui';

// The approved hero copy from the audit, set as words so the reveal can stagger
// them. It replaces "The work your team never gets to. Done." -- a better line,
// but one that left the business category to be inferred: a buyer could read the
// largest type on the page and still not know this is AI automation, who it is
// for, or what arrives. The emphasised clause carries the tone the old line had.
const WORDS = [
  ['AI', 'systems', 'that', 'handle'],
  ['enquiries,', 'bookings', 'and'],
  ['follow-ups', 'inside', 'your'],
];

// On a phone the headline stops at "follow-ups" and the qualifier moves into
// the supporting line, which is how the responsive specification renders it.
// Carried whole, the sentence set to seven lines at 42px and pushed the
// buttons off the first screen.
//
// One group rather than several: the desktop breaks are chosen for a 735px
// column, and forcing them into 346px made "AI systems that handle" wrap on
// its own and cost a fifth line. Left to flow, it fills each line before
// starting the next, which is also what stops a one-word line at the end.
const PHONE_WORDS = [['AI', 'systems', 'that', 'handle', 'enquiries,', 'bookings']];

// Statement on the left, what we sell on the right. The centred arrangement
// this replaces gave the fold a single sentence and no anchor; a split hero
// says what we do and where it applies in one screen.
export function Hero() {
  const phone = useIsPhone();
  const lines = phone ? PHONE_WORDS : WORDS;

  return (
    <section id="top" className="hero">
      {/* Pulled up under the sticky bar and padded back by the same amount, so
          the frame starts at the top of the viewport rather than below it. */}
      <div className="hero__frame">
        {/* Backdrop. Layered colour fields rather than footage: the video read
            as tech-product atmosphere, and this page is read by senior
            operators who want the argument, not the mood. */}
        <div className="hero-sky" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <Container wide className="hero__grid">
          <div>
            {/* The handoff keeps the category label but changes its form: a
                small uppercase kicker with an orange lead mark, not a pill. */}
            <div data-anim="hero-1">
              <p className="kicker">Custom AI automation for service businesses</p>
            </div>

            {/* Was "Most operations don't fail. They wait." -- a good line, but
                a diagnosis: the largest type on the page told the reader what
                was wrong with their business and never said what they get.
                This names the same problem in their words and resolves it. */}
            {/* The spaces between words are real text nodes, not CSS margin.
                Spacing them with margin left the accessible name, the page
                text and any copy-paste reading "Theworkyourteam...". */}
            <h1 className="hero__title">
              {lines.map((line, li) => (
                <span key={li} className="hero__line">
                  {line.map((w, wi) => (
                    <span key={w}>
                      {wi > 0 && ' '}
                      <span data-anim="hero-word" className="hero__word">{w}</span>
                    </span>
                  ))}
                  {li < lines.length - 1 && ' '}
                  {li === lines.length - 1 && (
                    <span>
                      {' '}
                      <span data-anim="hero-word" className="hero__word">
                        {phone ? 'and follow-ups.' : 'existing software.'}
                      </span>
                    </span>
                  )}
                </span>
              ))}
            </h1>

            <div data-anim="hero-2">
              <p className="lede hero__lede">
                {phone
                  ? 'Inside the software your team already uses. One live workflow in 6 to 10 weeks.'
                  : 'Launch one live workflow in 6 to 10 weeks. Keep your CRM, WhatsApp, calendars and operating controls.'}
              </p>

              <div className="hero__actions">
                <Button
                  href={WA_BRIEFING}
                  {...WA_LINK}
                  data-track="discovery_start"
                  data-track-product="general"
                  data-track-product_interest="general"
                  data-track-cta_location="hero"
                  onMouseMove={magnetMove}
                  onMouseLeave={magnetLeave}
                >
                  Book a 30-minute discovery call
                </Button>
                <Button
                  to="/products"
                  variant="secondary"
                  data-track="product_view"
                  data-track-product="general"
                  data-track-product_interest="general"
                  data-track-cta_location="hero"
                >
                  See product demos
                </Button>
              </div>

              <p className="fine hero__reassure">No migration<span aria-hidden="true"> | </span>Fixed scope<span aria-hidden="true"> | </span>Weekly working builds</p>
            </div>
          </div>

          {/* The image establishes the scene; the floating modules prove the
              system is in it. Two or three, overlapping the frame's edges, per
              the handoff. The illustration holds the frame until the
              photography arrives -- the composition does not change when it
              does, only the src. */}
          <div data-anim="console" className="hero__stage">
            <div className="hero__visual">
              <Photo
                name="hero"
                priority
                className="hero__img"
                sizes="(max-width: 1024px) calc(100vw - 2.75rem), 40vw"
                alt="A service advisor checks a booking on a tablet beside a car, with a technician working at a lift behind him."
                fallback={<HeroVisual />}
              />
            </div>

            <div className="hero__float hero__float--booking" aria-hidden="true">
              <span className="hero__floaticon">✓</span>
              <span>
                <span className="hero__floattitle">Booking confirmed</span>
                <span className="hero__floatline">Sat 12 Oct · 10:00 · Service bay 3</span>
              </span>
            </div>

            <div className="hero__float hero__float--chips" aria-hidden="true">
              <span className="hero__chip">Enquiry</span>
              <span className="hero__chiparrow">→</span>
              <span className="hero__chip">Matched</span>
              <span className="hero__chiparrow">→</span>
              <span className="hero__chip hero__chip--on">Booked</span>
            </div>

            <div className="hero__float hero__float--person" aria-hidden="true">
              <span className="hero__floatdot" />
              <span>
                <span className="hero__floattitle">1 exception</span>
                <span className="hero__floatline">Named to the service advisor</span>
              </span>
            </div>
          </div>
        </Container>

        {/* The running-in-production rail, at the foot of the hero where the
            handoff puts it. It was a separate strip under the chooser; here it
            closes the first screen with the proof before anything else. */}
        <Container wide>
          <ul className="hero__rail">
            <li><span className="hero__raillabel">Running in production</span><span className="hero__railvalue">Four systems live, two in build</span></li>
            <li><span className="hero__raillabel">Time to first workflow</span><span className="hero__railvalue">Six to ten weeks</span></li>
            <li><span className="hero__raillabel">What it runs on</span><span className="hero__railvalue">No migration</span></li>
          </ul>
        </Container>
      </div>
    </section>
  );
}
