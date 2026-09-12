import { useRef } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { Hero } from '../sections/Hero';
import { ProductChooser } from '../components/ProductChooser';
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
// Case studies now come before the five services, not after: evidence that the
// thing works is what earns the reader's attention for how it is delivered.
// Trust closes the argument, because the last question a corporate buyer has
// before booking is what their IT and legal reviewers will say.
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
      <Hero />
      <ProductChooser />
      <Outcome cardRef={parallaxRef} />
      <Work />
      <Services />
      <HowItWorks />
      <Stack />
      <Trust />
      <Voices />
      <Closing />
    </div>
  );
}
