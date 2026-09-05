import { useRef } from 'react';
import { s } from '../lib/style';
import { magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';
import { useOverDark } from '../hooks/useOverDark';

const LINKS = [
  ['#services', 'Services'],
  ['#industries', 'Industries'],
  ['#work', 'Work'],
  ['#about', 'About'],
];

// Two glass treatments. Both keep the same blur and saturation so the bar reads
// as one material; only the tint, edge light, and text colour swap.
const GLASS = {
  light: {
    bar: 'border:1px solid rgba(255,255,255,0.55); background:linear-gradient(180deg, rgba(255,255,255,0.74), rgba(255,255,255,0.44)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(26,29,35,0.05), 0 20px 46px -26px rgba(26,29,35,0.45), 0 2px 10px -6px rgba(26,29,35,0.16)',
    link: '#5A616D',
    linkHover: 'color:#1A1D23; background:rgba(26,29,35,0.06)',
    logo: '/assets/ideora-lockup.png',
  },
  dark: {
    bar: 'border:1px solid rgba(255,255,255,0.14); background:linear-gradient(180deg, rgba(46,51,60,0.62), rgba(26,29,35,0.44)); box-shadow:inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.28), 0 22px 50px -28px rgba(0,0,0,0.85), 0 2px 10px -6px rgba(0,0,0,0.4)',
    link: '#C6CCD6',
    linkHover: 'color:#FFFFFF; background:rgba(255,255,255,0.1)',
    logo: '/assets/ideora-lockup-light.png',
  },
};

export function Nav() {
  const barRef = useRef(null);
  const g = GLASS[useOverDark(barRef) ? 'dark' : 'light'];

  return (
    <header style={s('position:sticky; top:0; z-index:70; padding:14px 0')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <div
          ref={barRef}
          style={s(`display:flex; align-items:center; justify-content:space-between; padding:10px 12px 10px 20px; border-radius:18px; backdrop-filter:blur(30px) saturate(190%); -webkit-backdrop-filter:blur(30px) saturate(190%); transition:background .45s ease, border-color .45s ease, box-shadow .45s ease; ${g.bar}`)}
        >
          <a href="#top" style={s('display:flex; align-items:center')}>
            <img src={g.logo} alt="Ideora Labs" style={s('height:32px; width:auto; display:block')} />
          </a>
          <nav style={s('display:flex; align-items:center; gap:4px')}>
            {LINKS.map(([href, label]) => (
              <Hover
                key={href}
                as="a"
                href={href}
                style={`color:${g.link}; font-size:14px; font-weight:500; padding:8px 14px; border-radius:12px; transition:color .3s, background .3s`}
                hoverStyle={g.linkHover}
              >{label}</Hover>
            ))}
            <Hover
              as="a"
              href="#book"
              onMouseMove={magnetMove}
              onMouseLeave={magnetLeave}
              style="margin-left:10px; padding:10px 18px; border-radius:13px; background:#F4601E; color:#1A1D23; font-size:14px; font-weight:500; box-shadow:0 10px 26px -14px rgba(244,96,30,0.95); transition:transform .18s ease-out, background .25s"
              hoverStyle="background:#FF7A3D"
            >Book a working session</Hover>
          </nav>
        </div>
      </div>
    </header>
  );
}
