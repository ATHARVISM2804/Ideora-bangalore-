import { Link } from 'react-router-dom';
import { Section, Container, SectionHead, Button } from '../components/ui';
import { Workflow } from '../pages/blocks';
import { WA_DEMO, WA_LINK } from '../lib/whatsapp';

// Row 05 of the homepage sequence: one real workflow, shown rather than
// described.
//
// The steps are Ideora Health's, read from the same data the product page
// renders, so the homepage cannot drift from the product it is advertising.
// Five of the seven: enough to show the shape, including the human exception,
// without turning the homepage into the product page.
const FEATURED = {
  product: 'Ideora Health',
  path: '/products/ideora-health',
  steps: [
    { actor: 'auto', title: 'An enquiry arrives', body: 'A call, a WhatsApp message or a web form, answered in seconds at any hour, in the language it was written in.' },
    { actor: 'auto', title: 'Department and doctor matched', body: 'The request is read for what is actually being asked, then matched to the right department and location before a slot is offered.' },
    { actor: 'system', title: 'The slot is written', body: 'Into the calendar or HIS your front desk already works in. There is no second diary to reconcile.' },
    { actor: 'human', title: 'An exception stops and names a person', body: 'Urgent clinical wording, an unclear request, no available slot or a missing consent goes to a member of staff rather than being answered.' },
    { actor: 'done', title: 'The management record is written', body: 'Every action lands in the same record the dashboard reads, so the report and the operation cannot disagree.' },
  ],
};

export function FeaturedDemo() {
  return (
    <Section id="demo" tone="sunken" edge="bottom">
      <Container>
        <SectionHead
          label="See one working"
          title="What a live workflow actually looks like"
          lede="This is Ideora Health, from the enquiry to the line in the management report. Every system we build has this shape: the routine completes on its own, and the moment it is unsure it stops and names a person."
        />
      </Container>

      <div className="demo__flow">
        <Workflow steps={FEATURED.steps} head="Enquiry to management report" />
      </div>

      <Container>
        <div className="demo__foot">
          <Button href={WA_DEMO} {...WA_LINK} data-track="demo_start" data-track-product={FEATURED.product} data-track-cta_location="home_demo">
            Ask for this walkthrough
          </Button>
          <Link to={FEATURED.path} className="link-quiet">See the whole workflow and what it connects to →</Link>
        </div>
      </Container>
    </Section>
  );
}
