import { s } from '../lib/style';
import { CredibilityDiagram } from '../components/SectionArt';
import { FACTS } from '../data/content';

export function Credibility() {
  return (
    <section id="about" style={s('padding:0 0 clamp(72px, 11vw, 184px)')}>
      <div className="om-g12" style={s('max-width:1400px; margin:0 auto; padding:0 clamp(20px, 5vw, 40px); display:grid; grid-template-columns:repeat(12, 1fr); gap:20px; align-items:start')}>
        <div style={s('grid-column:1 / span 7; border-top:1px solid rgba(26,29,35,0.12)')}>
          {FACTS.map((f) => (
            <div key={f.label} data-anim="step" className="om-gsplit" style={s('display:grid; grid-template-columns:minmax(140px, 210px) 1fr; gap:clamp(8px, 3vw, 28px); align-items:baseline; padding:22px 4px; border-bottom:1px solid rgba(26,29,35,0.09)')}>
              <span style={s('font-size:14px; color:#5A616D')}>{f.label}</span>
              <span style={s('font-size:19px; letter-spacing:-0.01em')}>{f.value}</span>
            </div>
          ))}
        </div>

        <div data-anim="card" style={s('grid-column:9 / span 4; border-radius:18px; overflow:hidden; border:1px solid rgba(26,29,35,0.07); box-shadow:0 26px 58px -38px rgba(26,29,35,0.55); animation:om-float 8s ease-in-out infinite; height:340px; position:relative')}>
          <CredibilityDiagram />
        </div>
      </div>
    </section>
  );
}
