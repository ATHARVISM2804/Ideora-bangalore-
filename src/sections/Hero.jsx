import { useIsPhone } from '../hooks/useMedia';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { AutomationMap } from './AutomationMap';
import { WA_BRIEFING, WA_LINK } from '../lib/whatsapp';
import { Container, Button, Pill } from '../components/ui';

const WORDS = [
  ['The', 'work', 'your', 'team'],
  ['never', 'gets', 'to.'],
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
                {phone ? 'Automotive · Real estate · Healthcare' : 'Built for automotive, real estate and healthcare groups'}
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
                  {li === 0 && ' '}
                  {li === 1 && (
                    <span>
                      {' '}
                      <span data-anim="hero-word" className="hero__word">
                        <span className="hero__done">Done</span>.
                      </span>
                    </span>
                  )}
                </span>
              ))}
            </h1>

            <div data-anim="hero-2">
              <p className="lede hero__lede">
                Bookings, approvals, follow-up: answered the moment they arrive, inside the
                software you already own.
              </p>

              <div className="hero__actions">
                <Button href={WA_BRIEFING} {...WA_LINK} onMouseMove={magnetMove} onMouseLeave={magnetLeave}>
                  Request a briefing
                </Button>
                <Button href="#services" variant="secondary">See what we build</Button>
              </div>

              <p className="fine hero__reassure">Ninety minutes · you keep the map · no obligation</p>
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
