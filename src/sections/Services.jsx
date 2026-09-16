import { useState, useRef } from 'react';
import { SERVICES } from '../data/content';
import { Section, Container } from '../components/ui';
import { Photo } from '../components/Photo';

// The service, made tangible -- section 05 of the redesign handoff.
//
// Three parts, in the order a buyer reasons about them. How a build runs: four
// stages, one active at a time, with the discovery stage showing the map the
// client keeps. The method every stage runs on, set as a single typographic
// line. And what happens after launch: managed operation, as a statement beside
// a live-looking operations panel.
//
// The copy is the source's, unchanged. SERVICES holds all five practices; the
// first four are the delivery stages and the fifth is managed operation, which
// the handoff splits out as its own module.

const METHOD = ['Read the request', 'Check the record', 'Act in your system', 'Log the outcome'];

function StageMedia({ code }) {
  // Only discovery has an image in the handoff: a mapping session with a small
  // process map over it. The map is the point -- it is what the client keeps.
  if (code !== '01') return null;
  return (
    <div className="svc-media" aria-hidden="true">
      <span className="svc-media__field" />
      <Photo name="discovery" className="svc-media__photo" sizes="(max-width: 1023px) 100vw, 45vw" />
      <div className="svc-map">
        <span className="svc-map__title">Process map · draft 2</span>
        <ol className="svc-map__nodes">
          <li><span className="svc-map__node">Enquiry</span></li>
          <li><span className="svc-map__node svc-map__wait">Waits 4–6h</span></li>
          <li><span className="svc-map__node">Booked</span></li>
        </ol>
        <span className="svc-map__note">You keep this, whether or not you continue.</span>
      </div>
    </div>
  );
}

export function Services() {
  const stages = SERVICES.slice(0, 4);
  const managed = SERVICES[4];

  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const stage = stages[active];

  // The tab pattern's keyboard model, kept from the previous version: arrows
  // move between stages, Home and End jump to the ends.
  function onKeyDown(e) {
    const last = stages.length - 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="services">
      <Container wide>
        <div className="svc-head">
          <p className="kicker">Services</p>
          <h2 className="svc-head__title">How a build actually runs</h2>
          <p className="svc-head__lede">
            Four stages from the first map to a system in production. The products above are these
            same stages against a workflow we have built before, which is why they take less time.
          </p>
        </div>

        {/* Four stages across on a desktop, a vertical timeline on a phone.
            The active stage carries the orange line. */}
        <div className="svc-stages" role="tablist" aria-label="Delivery stages" tabIndex={-1} onKeyDown={onKeyDown}>
          {stages.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.code}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`svc-stage-${s.code}`}
                aria-selected={on}
                aria-controls="svc-stage-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`svc-stage${on ? ' is-active' : ''}`}
              >
                <span className="svc-stage__num">{s.code}</span>
                <span className="svc-stage__title">{s.title}</span>
                <span className="svc-stage__time">{s.time}</span>
              </button>
            );
          })}
        </div>

        <div
          className="svc-panel"
          role="tabpanel"
          id="svc-stage-panel"
          aria-labelledby={`svc-stage-${stage.code}`}
          tabIndex={0}
        >
          <div key={stage.code} className="svc-panel__inner fade-in">
            <div>
              <p className="svc-panel__short">{stage.short}</p>
              <p className="svc-panel__body">{stage.body}</p>
              <dl className="svc-panel__facts">
                <div><dt>Delivers</dt><dd>{stage.delivers}</dd></div>
                <div><dt>Connects to</dt><dd>{stage.connects}</dd></div>
              </dl>
            </div>
            <StageMedia code={stage.code} />
          </div>
        </div>

        {/* One method, as a title sequence rather than a bullet list. */}
        <div className="svc-method">
          <p className="kicker">One method, every stage</p>
          <ol className="svc-method__line">
            {METHOD.map((m, i) => (
              <li key={m}>
                {i > 0 && <span className="svc-method__arrow" aria-hidden="true">→</span>}
                {m}
              </li>
            ))}
          </ol>
        </div>

        {/* Managed operation: statement on the left, the panel on the right. */}
        <div className="svc-managed">
          <div>
            <p className="kicker">After launch</p>
            <h3 className="svc-managed__title">{managed.short}.</h3>
            <p className="svc-managed__body">{managed.body}</p>
            <p className="svc-managed__outcome">{managed.delivers}</p>
          </div>

          {/* Illustrative: the words beside it carry the claim. The panel shows
              what "we watch it" looks like, not a client's figures. */}
          <div className="svc-ops" aria-hidden="true">
            <div className="svc-ops__top">
              <span className="svc-ops__status"><span className="svc-ops__dot" />All systems running</span>
              <span className="svc-ops__time">Report sent Mon 08:00</span>
            </div>
            <div className="svc-ops__grid">
              <div><span>Queues</span><strong>3</strong></div>
              <div><span>Waiting</span><strong>12</strong></div>
              <div><span>Exceptions</span><strong>2</strong></div>
            </div>
            <ul className="svc-ops__list">
              <li><span>Integration write retried</span><span className="svc-ops__ok">Resolved</span></li>
              <li><span>Confidence below threshold</span><span className="svc-ops__warn">With owner</span></li>
              <li><span>Weekly accuracy review</span><span className="svc-ops__ok">Done</span></li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
