import { useRef } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { HowItWorks } from '../sections/HowItWorks';
import { Work } from '../sections/Work';
import { Stack } from '../sections/Stack';
import { Voices } from '../sections/Voices';
import { Closing } from '../sections/Closing';

// Six sections, down from twelve. The page is read mostly on a phone by
// owners, not operators: Problem, Capabilities, Industries, Engagement and
// Process were removed rather than shortened, because the argument they made
// is carried by the console and the case studies. They remain in the repo for
// the inner pages.
//
// The rhythm alternates light and dark: statement, proof, statement, proof.
export function Home() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const consoleRef = useRef(null);

  useDocumentTitle(
    'Ideora Labs — Most operations don’t fail. They wait.',
    'Ideora Labs builds and runs the systems that carry the work your team is waiting on, inside the software your business already owns.',
  );
  useGsapTimeline({ rootRef, pinRef, consoleRef });

  return (
    <div ref={rootRef}>
      <Hero consoleRef={consoleRef} />
      <Services />
      <Work pinRef={pinRef} />
      <HowItWorks />
      <Stack />
      <Voices />
      <Closing />
    </div>
  );
}
