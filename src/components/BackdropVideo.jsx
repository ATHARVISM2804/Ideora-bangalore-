import { useIsPhone } from '../hooks/useMedia';

// Two cuts of the same artwork. The landscape frame leaves a phone with a thin
// band across a tall section; the portrait one is composed for it, with the
// routing lines framing the edges and the middle left clear for type.
const DESKTOP = { src: '/assets/ideorabgvideo.mp4', poster: '/assets/ideorabgvideo-poster.jpg' };
const PHONE = { src: '/assets/ideoramobile.mp4', poster: '/assets/ideoramobile-poster.jpg' };

// The decorative backdrop, used by more than one section. The poster is a
// sibling layer underneath rather than only the video's poster attribute, so a
// slow connection, a decode failure and prefers-reduced-motion all land on a
// still rather than a blank frame.
//
// `mid` swaps the mask. The hero sits at the top of the page and only needs its
// bottom edge dissolved; a section in the middle of the page has to come out of
// the flat --bg and go back into it, or it reads as a pasted-in panel.
export function BackdropVideo({ mid = false, opacity }) {
  const phone = useIsPhone();
  const { src, poster } = phone ? PHONE : DESKTOP;
  const variant = mid ? ' om-bgmedia--mid' : '';

  // The poster URL lives here rather than in the stylesheet so that the cut of
  // the artwork is chosen in exactly one place, alongside the video source.
  const posterStyle = { backgroundImage: `url('${poster}')` };
  if (opacity !== undefined) posterStyle.opacity = opacity;

  return (
    <>
      <div className={`om-bgposter${variant}`} aria-hidden="true" style={posterStyle} />
      <video
        key={src}
        className={`om-bgvid${variant}`}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        style={opacity === undefined ? undefined : { opacity }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
