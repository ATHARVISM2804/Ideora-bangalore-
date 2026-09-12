import { useIsPhone } from '../hooks/useMedia';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { AutomationMap } from './AutomationMap';
import { WA_BRIEFING, WA_LINK } from '../lib/whatsapp';
import { Container, Button, Pill } from '../components/ui';

// The approved hero copy from the audit, set as words so the reveal can stagger
// them. It replaces "The work your team never gets to. Done." -- a better line,
// but one that left the business category to be inferred: a buyer could read the
// largest type on the page and still not know this is AI automation, who it is
// for, or what arrives. The emphasised clause carries the tone the old line had.
const WORDS = [
  ['AI', 'systems', 'that', 'handle'],
  ['enquiries,', 'bookings'],
  ['and', 'follow-ups'],
];

// Statement on the left, what we sell on the right. The centred arrangement
// this replaces gave the fold a single sentence and no anchor; a split hero
// says what we do and where it applies in one screen.
export function Hero() {
  const phone = useIsPhone();

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
            <div data-anim="hero-1" style={{ display: 'flex' }}>
              <Pill live className="hero__badge">
                {phone ? 'Custom AI automation for service businesses' : 'Custom AI automation for healthcare, real estate and automotive teams'}
              </Pill>
            </div>

            {/* Was "Most operations don't fail. They wait." -- a good line, but
                a diagnosis: the largest type on the page told the reader what
                was wrong with their business and never said what they get.
                This names the same problem in their words and resolves it. */}
            {/* The spaces between words are real text nodes, not CSS margin.
                Spacing them with margin left the accessible name, the page
                text and any copy-paste reading "Theworkyourteam...". */}
            <h1 className="hero__title">
              {WORDS.map((line, li) => (
                <span key={li} className="hero__line">
                  {line.map((w, wi) => (
                    <span key={w}>
                      {wi > 0 && ' '}
                      <span data-anim="hero-word" className="hero__word">{w}</span>
                    </span>
                  ))}
                  {li < WORDS.length - 1 && ' '}
                  {li === WORDS.length - 1 && (
                    <span>
                      {' '}
                      <span data-anim="hero-word" className="hero__word">
                        <span className="hero__done">inside your existing software</span>.
                      </span>
                    </span>
                  )}
                </span>
              ))}
            </h1>

            <div data-anim="hero-2">
              <p className="lede hero__lede">
                Launch one live workflow in 6 to 10 weeks. Keep your CRM, WhatsApp, calendars
                and the approval rules you run today.
              </p>

              <div className="hero__actions">
                <Button
                  href={WA_BRIEFING}
                  {...WA_LINK}
                  data-track="discovery_start"
                  data-track-product="general"
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
                  data-track-cta_location="hero"
                >
                  See product demos
                </Button>
              </div>

              <p className="fine hero__reassure">No migration · Fixed scope · Weekly working builds</p>
            </div>
          </div>

          {/* What we sell, around the mark. The sentence beside it already
              names where work stalls; the fold should not say that twice. */}
          <div data-anim="console">
            <AutomationMap />
          </div>
        </Container>
      </div>
    </section>
  );
}
