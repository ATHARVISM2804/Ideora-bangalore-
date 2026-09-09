import { s } from '../lib/style';
import { useIsPhone } from '../hooks/useMedia';

// What replaced the simulated ops console. The console proved the product to an
// engineer; this proves the business case to an owner. Same claim, read without
// knowing what a queue or an exception is.
//
// Every figure here comes from RESULT_STATS, FACTS and CASES in content.js.
// Nothing is illustrative — this sits under the headline on a page that asks a
// senior operator for ninety minutes of their time.
const ROWS = [
  {
    label: 'Answering an enquiry',
    before: 'Four to six hours',
    after: 'Forty seconds',
    note: 'Median time to a confirmed answer. Holding replies do not count.',
  },
  {
    label: 'People it takes to book one job',
    before: 'Someone, every time',
    after: 'Nobody',
    note: 'A person sees the exceptions. Nothing else reaches them.',
  },
  {
    label: 'Where the work is kept',
    before: 'Three inboxes and a spreadsheet',
    after: 'One record',
    note: 'Backlog and ageing are visible the day they happen.',
  },
];

export function Outcome({ cardRef }) {
  const phone = useIsPhone();

  return (
    <section id="outcome" style={s('background:var(--bg-sunken); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:clamp(76px, 11vw, 150px) 0')}>
      <div style={s('max-width:var(--measure); margin:0 auto; padding:0 var(--gut)')}>

        <div style={s('text-align:center')}>
          <div className="om-label" data-anim="head">Before and after</div>
          <h2 data-anim="head" style={s('margin:16px auto 0; max-width:24ch; font-family:var(--display); font-weight:600; font-size:clamp(28px, 3.6vw, 46px); line-height:1.1; letter-spacing:-0.014em; color:var(--ink)')}>
            The same work, without the waiting.
          </h2>
          <p data-anim="head" style={s('margin:20px auto 0; max-width:52ch; font-size:clamp(16.5px, 1.25vw, 18.5px); line-height:1.6; color:var(--ink-muted)')}>
            Nothing about the job changes. What changes is how long it sits before somebody gets to it.
          </p>
        </div>

        <div
          ref={cardRef}
          data-anim="card"
          style={s('margin:clamp(32px, 4vw, 52px) auto 0; border:1px solid var(--rule); border-radius:18px; background:var(--raised); box-shadow:0 30px 70px -50px rgba(28,25,23,0.45); overflow:hidden')}
        >
          {/* Column headings. Only shown where there are two columns to head. */}
          {!phone && (
            <div style={s('display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:24px; padding:20px clamp(24px, 3vw, 40px); border-bottom:1px solid var(--rule); background:var(--bg-sunken)')}>
              <span />
              <span className="om-label" style={s('letter-spacing:0.14em')}>Before</span>
              <span className="om-label" style={s('letter-spacing:0.14em; color:var(--accent-deep)')}>With Ideora</span>
            </div>
          )}

          {ROWS.map((row, i) => (
            <div
              key={row.label}
              style={s(`padding:clamp(22px, 2.6vw, 30px) clamp(24px, 3vw, 40px); ${i ? 'border-top:1px solid var(--rule);' : ''} ${phone ? '' : 'display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:24px; align-items:baseline'}`)}
            >
              <div>
                <div style={s('font-family:var(--display); font-weight:600; font-size:clamp(19px, 1.5vw, 22px); line-height:1.25; letter-spacing:-0.009em; color:var(--ink)')}>{row.label}</div>
                <div style={s('margin-top:8px; font-size:15px; line-height:1.5; color:var(--ink-muted); max-width:34ch')}>{row.note}</div>
              </div>

              {/* On a phone the two columns stack into a single before → after
                  line, which reads faster than a two-column table squeezed to
                  390px and keeps the comparison on one row. */}
              {phone ? (
                <div style={s('margin-top:14px; display:flex; align-items:baseline; gap:10px; flex-wrap:wrap')}>
                  <span style={s('font-size:16px; color:var(--ink-faint); text-decoration:line-through; text-decoration-thickness:1px')}>{row.before}</span>
                  <span aria-hidden="true" style={s('color:var(--ink-faint)')}>→</span>
                  <span style={s('font-family:var(--display); font-weight:600; font-size:20px; color:var(--accent-deep)')}>{row.after}</span>
                </div>
              ) : (
                <>
                  <div style={s('font-size:17px; line-height:1.4; color:var(--ink-faint)')}>{row.before}</div>
                  <div style={s('font-family:var(--display); font-weight:600; font-size:clamp(21px, 1.7vw, 26px); line-height:1.25; letter-spacing:-0.009em; color:var(--accent-deep)')}>{row.after}</div>
                </>
              )}
            </div>
          ))}

          <div style={s('padding:18px clamp(24px, 3vw, 40px); border-top:1px solid var(--rule); background:var(--bg-sunken); font-size:14.5px; line-height:1.55; color:var(--ink-muted)')}>
            Running in automotive, real estate and healthcare since February 2026. Six to ten weeks from first conversation to a system in production.
          </div>
        </div>

      </div>
    </section>
  );
}
