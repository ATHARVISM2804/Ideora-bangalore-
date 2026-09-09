import { useRef } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { Hero } from '../sections/Hero';
import { Outcome } from '../sections/Outcome';
import { Services } from '../sections/Services';
import { Work } from '../sections/Work';
import { HowItWorks } from '../sections/HowItWorks';
import { Stack } from '../sections/Stack';
import { Voices } from '../sections/Voices';
import { Closing } from '../sections/Closing';

// Eight sections, down from twelve. The page is read mostly on a phone by
// owners, not operators: Problem, Capabilities, Industries, Engagement and
// Process were removed rather than shortened, because the argument they made
// is carried by the case studies.
//
// The rhythm alternates a paper band with a sunken one: statement, proof,
// statement, proof.
export function Home() {
  const rootRef = useRef(null);
  const parallaxRef = useRef(null);

  useDocumentTitle(
    'Ideora Labs | The work your team never gets to. Done.',
    'Ideora Labs builds and runs the systems that carry the work your team is waiting on, inside the software your business already owns.',
  );
  useGsapTimeline({ rootRef, parallaxRef });

  return (
    <div ref={rootRef}>
      <Hero />
      <Outcome cardRef={parallaxRef} />
      <Services />
      <Work />
      <HowItWorks />
      <Stack />
      <Voices />
      <Closing />
    </div>
  );
}
