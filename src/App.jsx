import { useRef } from 'react';
import { s } from './lib/style';
import { useGsapTimeline } from './hooks/useGsapTimeline';

import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Services } from './sections/Services';
import { Capabilities } from './sections/Capabilities';
import { Industries } from './sections/Industries';
import { Work } from './sections/Work';
import { Voices } from './sections/Voices';
import { Credibility } from './sections/Credibility';
import { Engagement } from './sections/Engagement';
import { Process } from './sections/Process';
import { ProcessResults } from './sections/ProcessResults';
import { Closing } from './sections/Closing';
import { Footer } from './sections/Footer';

export default function App() {
  // Every ref the GSAP timeline drives. Held here and passed down, mirroring
  // the design component that created them all in its constructor.
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const ruleRef = useRef(null);
  const consoleRef = useRef(null);
  const spineRef = useRef(null);

  useGsapTimeline({ rootRef, barRef, pinRef, trackRef, railRef, ruleRef, consoleRef, spineRef });

  return (
    <div ref={rootRef} style={s('background:#F1F3F6; color:#1A1D23; font-family:Geist, sans-serif; font-weight:400; font-size:16px; line-height:1.6; -webkit-font-smoothing:antialiased; min-width:1440px; overflow-x:clip; position:relative')}>

      {/* Scroll progress bar */}
      <div ref={barRef} style={s('position:fixed; top:0; left:0; right:0; height:3px; background:#F4601E; transform:scaleX(0); transform-origin:0 50%; z-index:90')} />

      {/* Fixed grid backdrop, faded out below the fold */}
      <div style={s('position:fixed; inset:0; z-index:0; pointer-events:none')}>
        <div style={s('position:absolute; inset:0; background-image:linear-gradient(rgba(26,29,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,29,35,0.04) 1px, transparent 1px); background-size:80px 80px; mask-image:linear-gradient(180deg,#000,transparent 55%); -webkit-mask-image:linear-gradient(180deg,#000,transparent 55%)')} />
      </div>

      <div style={s('position:relative; z-index:10')}>
        <Nav />
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
        <Footer />
      </div>
    </div>
  );
}
