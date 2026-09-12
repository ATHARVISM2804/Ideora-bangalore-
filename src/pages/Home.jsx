import { useRef } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { Hero } from '../sections/Hero';
import { ProductChooser } from '../components/ProductChooser';
import { ProofStrip } from '../sections/ProofStrip';
import { FeaturedDemo } from '../sections/FeaturedDemo';
import { Outcome } from '../sections/Outcome';
import { Services } from '../sections/Services';
import { Work } from '../sections/Work';
import { HowItWorks } from '../sections/HowItWorks';
import { Stack } from '../sections/Stack';
import { Voices } from '../sections/Voices';
import { Trust } from '../sections/Trust';
import { Closing } from '../sections/Closing';

// The order is the audit's: category, then product choice, then outcomes and
// proof, and only then the delivery method. The old page put the six-step
// method before a buyer knew what was for sale, so a visitor read how we work
// before learning what they could buy.
//
// The chooser sits immediately under the hero because it is the block that
// answers "is there something here for my business", and it is the one section
// on the page that never waits for a scroll trigger.
//
// The order is the homepage implementation table's, row for row. Two things it
// asks for were missing outright: a proof strip under the chooser, and one
// featured workflow shown rather than described.
//
// Evidence is one run -- the before-and-after, the case studies and the client
// voices together -- because a buyer who has just watched a workflow wants to
// know it has worked somewhere, and only then how it is delivered. Trust closes
// the argument: the last question before booking is what IT and legal will say.
//
// The rhythm alternates a paper band with a sunken one: statement, proof,
// statement, proof.
export function Home() {
  const rootRef = useRef(null);
  const parallaxRef = useRef(null);

  useDocumentTitle(
    'Custom AI automation for service businesses | Ideora Labs',
    'AI systems that handle enquiries, bookings and follow-ups inside your existing software. One live workflow in 6 to 10 weeks for clinics, service centres and property teams.',
  );
  useGsapTimeline({ rootRef, parallaxRef });

  return (
    <div ref={rootRef}>
      {/* 01 header (Layout) · 02 hero · 03 product chooser · 04 proof strip ·
          05 featured demo · 06 case studies · 07 services · 08 how it works ·
          09 security and integrations · 10 final CTA. */}
      <Hero />
      <ProductChooser />
      <ProofStrip />
      <FeaturedDemo />
      <Outcome cardRef={parallaxRef} />
      <Work />
      <Voices />
      <Services />
      <HowItWorks />
      <Stack />
      <Trust />
      <Closing />
    </div>
  );
}
