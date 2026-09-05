// Replaces the design's <image-slot> custom element.
//
// All four slots in the source are empty, and the original element's drag/drop
// and reframe behaviour belongs to the Claude Design canvas editor, not to the
// site. This renders the same empty state — tinted frame, dashed ring, icon and
// caption — and accepts a `src` so real photography can be dropped in later
// without touching any section.

const RADIUS = { rect: '0', circle: '50%' };

export function ImageSlot({ src, alt = '', placeholder = 'Drop an image', shape = 'rect' }) {
  const borderRadius = RADIUS[shape];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', color: 'inherit' }}>
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', borderRadius,
        background: src ? 'transparent' : 'rgba(127,127,127,.08)',
      }}>
        {src && (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>

      {!src && (
        <>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center',
            padding: 12, opacity: 0.75, userSelect: 'none',
            font: '13px/1.3 system-ui, -apple-system, sans-serif',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span style={{ maxWidth: '90%', fontWeight: 500, letterSpacing: '.01em' }}>{placeholder}</span>
          </div>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius,
            border: '1.5px dashed currentColor', opacity: 0.35,
          }} />
        </>
      )}
    </div>
  );
}
