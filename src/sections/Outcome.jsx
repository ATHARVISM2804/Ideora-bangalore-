import { Section, Container } from '../components/ui';

// Before and after: the handoff calls this the website's most visual proof
// module, and it is built from the source's own figures -- the median confirmed
// answer, the people involved, and where the work is kept. Nothing here is
// illustrative.
//
// A real table, because it is tabular data: a screen reader announces each
// value with its row and its column, which a grid of styled divs never did.
const ROWS = [
  {
    label: 'Time to a confirmed answer',
    note: 'Median. Holding replies do not count.',
    before: '4–6 hours',
    after: '40 seconds',
  },
  {
    label: 'People it takes to book one job',
    note: 'A person sees the exceptions. Nothing else reaches them.',
    before: 'Someone, every time',
    after: 'Nobody',
  },
  {
    label: 'Where the work is kept',
    note: 'Backlog and ageing visible the day they happen.',
    before: '3 inboxes + 1 spreadsheet',
    after: '1 record',
  },
];

export function Outcome() {
  return (
    <Section id="outcome" tone="sunken">
      <Container>
        <div className="ba-head">
          <p className="kicker">Before and after</p>
          <h2 className="ba-head__title">The same work, without the waiting.</h2>
          <p className="ba-head__lede">
            Nothing about the job changes. What changes is how long it sits before somebody gets to it.
          </p>
        </div>

        <div data-anim="card" className="ba">
          <table className="ba__table">
            <caption className="visually-hidden">
              The same operational work before Ideora and with it
            </caption>
            <thead>
              <tr>
                <th scope="col" className="ba__corner"><span className="visually-hidden">Measure</span></th>
                <th scope="col" className="ba__col ba__col--before">Before</th>
                <th scope="col" className="ba__col ba__col--after">With Ideora</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label} className="ba__row">
                  <th scope="row" className="ba__label">
                    <span className="ba__labeltext">{r.label}</span>
                    <span className="ba__note">{r.note}</span>
                  </th>
                  <td className="ba__cell ba__cell--before">
                    <span className="ba__mobile" aria-hidden="true">Before</span>
                    {r.before}
                  </td>
                  <td className="ba__cell ba__cell--after">
                    <span className="ba__mobile" aria-hidden="true">With Ideora</span>
                    {r.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="ba__foot">
            Running in automotive, real estate and healthcare since February 2026. Six to ten
            weeks from first conversation to a system in production.
          </p>
        </div>
      </Container>
    </Section>
  );
}
