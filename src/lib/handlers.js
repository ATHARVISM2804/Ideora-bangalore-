// Pointer effects carried over verbatim from the design's renderVals().
//
// iOS Safari synthesises mousemove on tap, which left the spotlight and the
// magnetic offset stuck in their hovered state until the next tap landed
// somewhere else. Both effects are decorative and pointer-driven, so on a
// device with no real hover they simply do not run.
const noHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

// Feeds the --mx/--my custom properties behind each card's radial spotlight.
export function spot(e) {
  if (noHover()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

// Magnetic pull on the primary CTA.
export function magnetMove(e) {
  if (noHover()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
  const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
  el.style.transform = `translate(${dx * 5}px, ${dy * 4}px)`;
}

export function magnetLeave(e) {
  e.currentTarget.style.transform = 'translate(0,0)';
}
