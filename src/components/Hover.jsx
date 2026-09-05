import { useState } from 'react';
import { s } from '../lib/style';

// Stands in for the design's `style-hover` attribute, which has no React
// equivalent. `style` and `hoverStyle` are CSS strings; on hover the second is
// merged over the first. CSS `transition` declarations still animate, because
// transitions fire on inline-style changes just as they do on class changes.
export function Hover({ as: Tag = 'div', style, hoverStyle, onMouseEnter, onMouseLeave, ...rest }) {
  const [on, setOn] = useState(false);

  return (
    <Tag
      {...rest}
      style={on ? { ...s(style), ...s(hoverStyle) } : s(style)}
      onMouseEnter={(e) => { setOn(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setOn(false); onMouseLeave?.(e); }}
    />
  );
}
