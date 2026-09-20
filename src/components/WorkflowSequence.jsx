import { useEffect, useRef, useState } from 'react';

// The healthcare workflow as the redesign handoff's cinematic horizontal
// sequence: enquiry arrives, department matched, slot written, exception
// names a person, management record written. The same five steps and the same
// logic as the product page -- only the presentation is new.
//
// Motion follows the handoff's rules. It runs once, when the sequence first
// comes into view, and one step at a time: "never animate everything at once."
// It holds longest on step four, the human handoff, because that is the part of
// the system a buyer most needs to see stop. Then it rests.
//
// It is also controllable, which the handoff does not say but WCAG 2.2.2 does:
// anything that moves on its own for longer than five seconds needs a way to
// pause it. Every step is a button, so a reader can jump to any step and the
// autoplay yields to them. Under reduced motion there is no autoplay at all --
// every step renders in its finished state.

const STEP_MS = [1100, 1100, 1100, 2400, 1300];

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Vignette({ index }) {
  switch (index) {
    case 0:
      return (
        <div className="wseq-v wseq-v--message">
          <span className="wseq-v__from">WhatsApp · just now</span>
          <p className="wseq-v__bubble">Hi, I would like a general check-up sometime this week.</p>
        </div>
      );
    case 1:
      return (
        <dl className="wseq-v wseq-v--classify">
          <div><dt>Department</dt><dd>General medicine</dd></div>
          <div><dt>Location</dt><dd>Indiranagar</dd></div>
          <div className="wseq-v__pick"><dt>Suitable slot</dt><dd>Thu · 11:30</dd></div>
        </dl>
      );
    case 2:
      return (
        <div className="wseq-v wseq-v--calendar">
          <span className="wseq-v__from">Clinic calendar</span>
          <div className="wseq-v__cal">
            <span>10:30</span><span className="wseq-v__slot wseq-v__slot--taken">Booked</span>
            <span>11:30</span><span className="wseq-v__slot wseq-v__slot--new">General medicine</span>
            <span>12:30</span><span className="wseq-v__slot">Open</span>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="wseq-v wseq-v--exception">
          <span className="wseq-v__flag">Needs a person</span>
          <p className="wseq-v__text">Message mentions chest pain. Not answered by the system.</p>
          <span className="wseq-v__from">Routed to the front desk</span>
        </div>
      );
    default:
      return (
        <div className="wseq-v wseq-v--report">
          <div className="wseq-v__row"><span>Booked today</span><span>38</span></div>
          <div className="wseq-v__row"><span>Exceptions</span><span>4</span></div>
          <span className="wseq-v__ok">Recorded</span>
        </div>
      );
  }
}

export function WorkflowSequence({ steps }) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(() => (reducedMotion() ? steps.length - 1 : -1));
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);

  // Start once, the first time most of the sequence is on screen.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const node = rootRef.current;
    if (!node) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setActive(0);
          setPlaying(true);
          io.disconnect();
        }
      },
      // Low on purpose: the five steps stack on a phone, where the sequence is
      // several screens tall and a high ratio would never be reached, leaving
      // every step at its waiting opacity.
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Advance one step at a time while playing, then rest on the last.
  // The stop happens in the same callback that reaches the last step, rather
  // than in a second render that notices it arrived.
  useEffect(() => {
    const last = steps.length - 1;
    if (!playing || active < 0 || active >= last) return undefined;
    const t = setTimeout(() => {
      const next = active + 1;
      setActive(next);
      if (next >= last) setPlaying(false);
    }, STEP_MS[active] ?? 1100);
    return () => clearTimeout(t);
  }, [playing, active, steps.length]);

  const choose = (i) => {
    setPlaying(false);
    setActive(i);
  };

  const replay = () => {
    setActive(0);
    setPlaying(true);
  };

  return (
    <div ref={rootRef} className="wseq">
      <ol className="wseq__track">
        {steps.map((st, i) => {
          const state = i === active ? 'is-active' : i < active ? 'is-done' : 'is-waiting';
          return (
            <li key={st.title} className={`wseq__step wseq__step--${st.actor} ${state}`}>
              <button
                type="button"
                className="wseq__btn"
                aria-current={i === active ? 'step' : undefined}
                onClick={() => choose(i)}
              >
                <span className="wseq__meta">
                  <span className="wseq__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="wseq__actor">
                    {{ auto: 'Automated', system: 'Integration', human: 'Your team', done: 'Completed' }[st.actor]}
                  </span>
                </span>
                <span className="wseq__title">{st.title}</span>
              </button>

              {/* Illustrative, and aria-hidden for it: the step's title and
                  body carry everything in real text. */}
              <div className="wseq__stage" aria-hidden="true">
                <Vignette index={i} />
              </div>

              <p className="wseq__body">{st.body}</p>
            </li>
          );
        })}
      </ol>

      <div className="wseq__controls">
        {playing ? (
          <button type="button" className="wseq__control" onClick={() => setPlaying(false)}>Pause</button>
        ) : (
          active >= 0 && !reducedMotion() && (
            <button type="button" className="wseq__control" onClick={replay}>Replay the sequence</button>
          )
        )}
      </div>
    </div>
  );
}
