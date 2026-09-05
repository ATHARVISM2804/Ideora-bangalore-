import { useRef } from 'react';
import { useGsapTimeline } from '../hooks/useGsapTimeline';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

import { Hero } from '../sections/Hero';
import { Problem } from '../sections/Problem';
import { Services } from '../sections/Services';
import { Capabilities } from '../sections/Capabilities';
import { Industries } from '../sections/Industries';
import { Work } from '../sections/Work';
import { Voices } from '../sections/Voices';
import { Credibility } from '../sections/Credibility';
import { Engagement } from '../sections/Engagement';
import { Process } from '../sections/Process';
import { ProcessResults } from '../sections/ProcessResults';
import { Closing } from '../sections/Closing';

export function Home() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const ruleRef = useRef(null);
  const consoleRef = useRef(null);
  const spineRef = useRef(null);

  useDocumentTitle(
    'Ideora Labs — Systems that finish the job.',
    'Ideora Labs builds agentic AI that works inside your existing operations. It books, checks, approves, updates, and reports without anyone chasing it.',
  );
  useGsapTimeline({ rootRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef });

  return (
    <div ref={rootRef}>
      <Hero consoleRef={consoleRef} />
      <Problem />
      <Services />
      <Capabilities />
      <Industries />
      <Work pinRef={pinRef} trackRef={trackRef} railRef={railRef} />
      <Voices />
      <Credibility />
      <Engagement ruleRef={ruleRef} />
      <Process spineRef={spineRef} />
      <ProcessResults />
      <Closing />
    </div>
  );
}
