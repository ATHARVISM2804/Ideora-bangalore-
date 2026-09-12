import { Link } from 'react-router-dom';
import { Section, Container, SectionHead } from '../components/ui';

// The trust band the specification puts at step nine of the homepage.
//
// Corporate buyers do not reach a security page by browsing; they reach it
// because a procurement reviewer asked a question the site has not answered.
// The audit found none of this was linked from the homepage at all, so a buyer
// could not share the site internally without writing the explanation
// themselves. Four controls, four destinations, no claims we cannot evidence.
const CONTROLS = [
  {
    head: 'Your systems stay yours',
    body: 'Records are written into the software you already own. We hold the working state a workflow needs and its audit trail, hosted in India.',
    to: '/security',
    link: 'Security and data handling',
  },
  {
    head: 'A person still decides',
    body: 'Which actions complete alone and which wait for approval is agreed in writing, visible in the console, and changed by you rather than by a model update.',
    to: '/responsible-ai',
    link: 'Where a person still decides',
  },
  {
    head: 'Every action is attributable',
    body: 'Timestamp, source, the rule that acted and the result, retained for every automated write. Nothing our systems do is unexplainable afterwards.',
    to: '/security',
    link: 'Audit and access control',
  },
  {
    head: 'We do not train on your data',
    body: 'Client data runs your workflows and nothing else. It is not used to train, fine-tune or evaluate models, ours or a provider\'s.',
    to: '/privacy',
    link: 'How we handle data',
  },
];

export function Trust() {
  return (
    <Section id="trust" tone="sunken" edge="bottom">
      <Container>
        <SectionHead
          label="Built around your approval rules"
          title="What your IT and legal reviewers will ask"
          lede="We would rather answer these before a contract than after one. There is no compliance badge on this page, because we have not been audited against one and will not imply otherwise."
        />

        <div className="trustband">
          {CONTROLS.map((c) => (
            <div key={c.head} data-anim="card" className="trustband__item">
              <h3 className="trustband__head">{c.head}</h3>
              <p className="small">{c.body}</p>
              <Link to={c.to} className="trustband__link">{c.link} →</Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
