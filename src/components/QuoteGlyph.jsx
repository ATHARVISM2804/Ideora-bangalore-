// The testimonials are attributed by role and scale only, so a photograph was
// never going to appear here. A glyph says which industry the quote came from.
//
// Was SectionArt.jsx, which also exported CredibilityDiagram, MethodFlow and
// FaultGlyph for three sections that no longer exist.

const GLYPHS = {
  automotive: 'M3.2 12.4h13.6M4.4 12.4l1.5-4.2a1.6 1.6 0 011.5-1h5.2a1.6 1.6 0 011.5 1l1.5 4.2M4.4 12.4v2.4M15.6 12.4v2.4M6.4 12.4v.05M13.6 12.4v.05',
  realestate: 'M3.4 16.6V8.2L10 3.4l6.6 4.8v8.4M7.6 16.6v-4.4h4.8v4.4',
  healthcare: 'M10 4.2v11.6M4.2 10h11.6',
  legal: 'M10 3.6v12.8M5 7.4h10M6.4 7.4l-2.2 5h4.4zM13.6 7.4l-2.2 5h4.4z',
  finance: 'M2.6 8L10 3.6 17.4 8M4.6 8v6.2M8 8v6.2M12 8v6.2M15.4 8v6.2M3 16.6h14',
};

export function QuoteGlyph({ kind }) {
  return (
    <span className="quote-glyph">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
           strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={GLYPHS[kind] || GLYPHS.realestate} />
      </svg>
    </span>
  );
}
