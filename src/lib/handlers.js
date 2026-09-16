// Pointer effects carried over verbatim from the design's renderVals().
//
// iOS Safari synthesises mousemove on tap, which left the
// magnetic offset stuck in its hovered state until the next tap landed
// somewhere else. The effect is decorative and pointer-driven, so on a
// device with no real hover it simply does not run.
const noHover = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

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
