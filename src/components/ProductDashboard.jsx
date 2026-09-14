import { Section, Container, Label } from './ui';
import { DASHBOARDS } from '../data/dashboards';

// The management view as a screen rather than a list of field names.
//
// Drawn in SVG, with no chart library: the performance page is explicit that
// this site does not ship one for simple work, and a donut and a bar chart are
// simple work. It is about 2KB of geometry.
//
// Everything visible here is also readable: the donut and the bars carry a
// legend with the same figures, so nothing is conveyed by colour or by shape
// alone, and each chart is one labelled image to a screen reader rather than
// forty unlabelled paths.

const TONE = {
  accent: 'var(--dash-accent)',
  signal: 'var(--dash-signal)',
  muted: 'var(--dash-muted)',
  faint: 'var(--dash-faint)',
};

// A donut, drawn as one circle per segment using dash offsets. Cheaper than
// arc paths and exact at any size.
function Donut({ donut }) {
  const R = 54;
  const C = 2 * Math.PI * R;

  // Each segment starts where the previous one ended. A reduce rather than a
  // running variable: nothing in render scope is reassigned, which is also
  // what the lint rule is asking for.
  const arcs = donut.segments.reduce((acc, s) => {
    const prev = acc[acc.length - 1];
    const offset = prev ? prev.offset + prev.len : 0;
    return [...acc, { ...s, len: (s.value / 100) * C, offset }];
  }, []);

  const summary = donut.segments.map((s) => `${s.label} ${s.value}%`).join(', ');

  return (
    <div className="dashv__card">
      <p className="dashv__cardhead">{donut.title}</p>

      <div className="dashv__donutwrap">
        <svg viewBox="0 0 140 140" className="dashv__donut" role="img" aria-label={`${donut.title}: ${summary}.`}>
          <circle cx="70" cy="70" r={R} fill="none" strokeWidth="16" className="dashv__track" />
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={TONE[a.tone]}
              strokeWidth="16"
              strokeDasharray={`${a.len} ${C - a.len}`}
              strokeDashoffset={-a.offset}
              transform="rotate(-90 70 70)"
            />
          ))}
          <text x="70" y="66" className="dashv__donutnum">{donut.segments[0].value}%</text>
          <text x="70" y="84" className="dashv__donutcap">{donut.segments[0].label}</text>
        </svg>

        <ul className="dashv__legend">
          {donut.segments.map((s) => (
            <li key={s.label}>
              <span className="dashv__swatch" style={{ background: TONE[s.tone] }} aria-hidden="true" />
              <span className="dashv__legendlabel">{s.label}</span>
              <span className="dashv__legendvalue">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="dashv__foot">{donut.total}</p>
    </div>
  );
}

function Bars({ bars }) {
  const max = Math.max(...bars.series.map((b) => b.value));
  const summary = bars.series.map((b) => `${b.label} ${b.value}`).join(', ');

  return (
    <div className="dashv__card">
      <p className="dashv__cardhead">{bars.title}</p>

      {/* The bars are a labelled image; the figures sit under each column in
          real text, so the chart is decoration over data rather than the only
          place the data exists. */}
      <div className="dashv__bars" role="img" aria-label={`${bars.title}, ${bars.unit}: ${summary}.`}>
        {bars.series.map((b) => (
          <div key={b.label} className="dashv__bar">
            <span className="dashv__barvalue">{b.value}</span>
            <span className="dashv__barfill" style={{ height: `${Math.round((b.value / max) * 100)}%` }} />
            <span className="dashv__barlabel">{b.label}</span>
          </div>
        ))}
      </div>

      <p className="dashv__foot">{bars.unit}</p>
    </div>
  );
}

export function ProductDashboard({ product }) {
  const data = DASHBOARDS[product];
  if (!data) return null;

  return (
    <Section edge="bottom">
      <Container>
        <Label as="h2" className="label--head">The management view</Label>

        <div className="dashv">
          <div className="dashv__bar--top">
            <span className="dashv__title">{product} · operations</span>
            <span className="dashv__live">
              <span className="dashv__dot" aria-hidden="true" />
              Updated {data.updated}
            </span>
          </div>

          <ul className="dashv__kpis">
            {data.kpis.map((k) => (
              <li key={k.label} className="dashv__kpi">
                <span className="dashv__kpilabel">{k.label}</span>
                <span className="dashv__kpivalue">{k.value}</span>
                <span className={`dashv__kpidelta dashv__kpidelta--${k.trend}`}>{k.delta}</span>
              </li>
            ))}
          </ul>

          <div className="dashv__charts">
            <Donut donut={data.donut} />
            <Bars bars={data.bars} />
          </div>

          <div className="dashv__card">
            <p className="dashv__cardhead">Work, intake to audit</p>
            <ol className="dashv__pipe">
              {data.pipeline.map((p) => (
                <li key={p.label} className="dashv__pipestep" style={{ '--tone': TONE[p.tone] }}>
                  <span className="dashv__pipevalue">{p.value}</span>
                  <span className="dashv__pipelabel">{p.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="dashv__card">
            <p className="dashv__cardhead">Exceptions waiting on a person</p>
            <table className="dashv__table">
              <thead>
                <tr><th scope="col">Ref</th><th scope="col">Reason</th><th scope="col">Owner</th><th scope="col">Waiting</th></tr>
              </thead>
              <tbody>
                {data.queue.map((q) => (
                  <tr key={q.ref}>
                    <td className="dashv__ref">{q.ref}</td>
                    <td>{q.reason}</td>
                    <td>{q.owner}</td>
                    <td className="dashv__age">{q.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Said on the panel itself, not in a footnote below it. A screen of
              numbers that looks like a client's operation has to carry this
              where it cannot be cropped away. */}
          <p className="dashv__note">
            A representative view on demonstration data. The metrics are the ones this product
            reports; the figures are invented, because the real ones belong to clients under NDA.
          </p>
        </div>
      </Container>
    </Section>
  );
}
