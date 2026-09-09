import { useIsPhone } from '../hooks/useMedia';
import { Section, Container, SectionHead } from '../components/ui';

// The business case, for an owner rather than an engineer. Every figure here
// comes from RESULT_STATS, FACTS and CASES in content.js. Nothing is
// illustrative -- this sits under the headline on a page that asks a senior
// operator for ninety minutes of their time.
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
    <Section id="outcome" tone="sunken">
      <Container>
        <SectionHead
          label="Before and after"
          title="The same work, without the waiting."
          lede="Nothing about the job changes. What changes is how long it sits before somebody gets to it."
        />

        <div ref={cardRef} data-anim="card" className="panel compare">
          {!phone && (
            <div className="compare__head" aria-hidden="true">
              <span />
              <span className="label">Before</span>
              <span className="label compare__after-label">With Ideora</span>
            </div>
          )}

          {ROWS.map((row) => (
            <div key={row.label} className="compare__row">
              <div>
                <h3 className="compare__label">{row.label}</h3>
                <p className="small compare__note">{row.note}</p>
              </div>

              {/* On a phone the two columns stack into a single before-to-after
                  line, which reads faster than a two-column table squeezed to
                  390px and keeps the comparison on one row. */}
              {phone ? (
                <p className="compare__inline">
                  <span className="compare__before">{row.before}</span>
                  <span aria-hidden="true" className="compare__arrow">→</span>
                  <span className="compare__after">{row.after}</span>
                </p>
              ) : (
                <>
                  <p className="compare__before">{row.before}</p>
                  <p className="compare__after">{row.after}</p>
                </>
              )}
            </div>
          ))}

          <div className="panel__foot">
            Running in automotive, real estate and healthcare since February 2026. Six to ten
            weeks from first conversation to a system in production.
          </div>
        </div>
      </Container>
    </Section>
  );
}
