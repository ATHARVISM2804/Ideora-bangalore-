import { useState } from 'react';

// A photograph from public/img, built by scripts/build-photos.sh: two WebP
// widths and a JPEG fallback.
//
// It sits over the tonal field that holds its place. If the file is missing
// it removes itself, so the field shows instead of a broken-image icon -- the
// layout never depends on the photography having arrived.
//
// Width and height are the source's 16:10 ratio; CSS crops with object-fit, so
// the box is reserved before the bytes land.
export function Photo({ name, alt = '', sizes, className = '', priority = false, position, fallback = null }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;

  const base = `/img/${name}`;

  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-720.webp 720w, ${base}-1280.webp 1280w`} sizes={sizes} />
      <img
        src={`${base}-1280.jpg`}
        alt={alt}
        width="1280"
        height="800"
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={`photo ${className}`}
        style={position ? { objectPosition: position } : undefined}
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
