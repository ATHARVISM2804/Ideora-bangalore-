import { s } from '../lib/style';
import { Hover } from '../components/Hover';
import { ImageSlot } from '../components/ImageSlot';
import { FACTS } from '../data/content';

export function Credibility() {
  return (
    <section id="about" style={s('padding:0 0 184px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px; align-items:start')}>
        <div style={s('grid-column:1 / span 7; display:flex; flex-direction:column; gap:12px')}>
          {FACTS.map((f) => (
            <Hover
              key={f.label}
              data-anim="card"
              style="display:grid; grid-template-columns:220px 1fr; gap:32px; align-items:center; padding:24px 28px; border-radius:14px; border:1px solid rgba(26,29,35,0.07); background:rgba(255,255,255,0.82); transition:border-color .3s, background .3s, transform .3s"
              hoverStyle="border-color:rgba(244,96,30,0.28); background:#FFFFFF; transform:translateX(6px)"
            >
              <span style={s('font-size:14px; color:#5A616D')}>{f.label}</span>
              <span style={s('font-size:16px')}>{f.value}</span>
            </Hover>
          ))}
        </div>
        <div data-anim="card" style={s('grid-column:9 / span 4; border-radius:18px; overflow:hidden; border:1px solid rgba(26,29,35,0.07); box-shadow:0 26px 58px -38px rgba(26,29,35,0.55); animation:om-float 8s ease-in-out infinite; height:340px')}>
          <ImageSlot shape="rect" placeholder="Drop a technical or workplace photograph" />
        </div>
      </div>
    </section>
  );
}
