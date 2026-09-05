import { s } from '../lib/style';
import { spot, magnetMove, magnetLeave } from '../lib/handlers';
import { Hover } from '../components/Hover';

export function Closing() {
  return (
    <section id="book" style={s('padding:0 0 184px')}>
      <div style={s('max-width:1400px; margin:0 auto; padding:0 40px')}>
        <div onMouseMove={spot} style={s('position:relative; overflow:hidden; border-radius:24px; background:#F4601E; color:#FFFFFF; padding:76px 56px; box-shadow:0 50px 100px -50px rgba(244,96,30,0.7)')}>
          <div style={s('position:absolute; inset:0; pointer-events:none; background:radial-gradient(760px circle at var(--mx, 30%) var(--my, 50%), rgba(255,255,255,0.20), transparent 60%)')} />
          <div style={s('position:absolute; inset:0; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px); background-size:26px 26px; mask-image:radial-gradient(circle at 78% 40%, #000, transparent 68%); -webkit-mask-image:radial-gradient(circle at 78% 40%, #000, transparent 68%)')} />
          <div style={s('position:relative; display:grid; grid-template-columns:repeat(12, 1fr); gap:20px')}>
            <h2 data-anim="head" style={s('grid-column:1 / span 6; margin:0; font-family:Archivo, sans-serif; font-stretch:125%; font-weight:500; font-size:44px; line-height:0.94; letter-spacing:-0.035em')}>Bring us the process nobody wants to own.</h2>
            <div data-anim="head" style={s('grid-column:8 / span 5; align-self:end')}>
              <p style={s('margin:0; color:#1A1D23')}>Ninety minutes with your operations lead. We map the handoffs on the call and tell you which of them an agent can take over first. You leave with the map whether or not you work with us.</p>
              <Hover
                as="a"
                href="#book"
                onMouseMove={magnetMove}
                onMouseLeave={magnetLeave}
                style="display:inline-flex; align-items:center; margin-top:38px; padding:15px 28px; border-radius:15px; background:#1A1D23; color:#FFFFFF; font-size:15px; font-weight:500; box-shadow:0 20px 44px -20px rgba(26,29,35,0.7); transition:transform .18s ease-out, background .25s"
                hoverStyle="background:#000000"
              >Book a working session</Hover>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
