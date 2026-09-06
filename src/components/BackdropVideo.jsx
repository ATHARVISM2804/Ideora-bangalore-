import { useIsPhone } from '../hooks/useMedia';

const SRC = '/assets/ideorabgvideo.mp4';
const POSTER = '/assets/ideorabgvideo-poster.jpg';

// The decorative backdrop, used by more than one section. Two things it always
// does: the poster is a sibling layer underneath rather than only the video's
// poster attribute, so a slow connection, a decode failure and reduced-motion
// all land on a still; and phones get the still alone, because 1.4MB of
// decoration is not worth a mobile connection.
//
// `mid` swaps the mask. The hero sits at the top of the page and only needs its
// bottom edge dissolved; a section in the middle of the page has to fade in and
// out of the flat --bg at both ends or it reads as a pasted-in panel.
export function BackdropVideo({ mid = false, opacity }) {
  const phone = useIsPhone();
  const variant = mid ? ' om-bgmedia--mid' : '';
  const dim = opacity === undefined ? undefined : `opacity:${opacity}`;

  return (
    <>
      <div className={`om-bgposter${variant}`} aria-hidden="true" style={dim ? { opacity } : undefined} />
      {!phone && (
        <video
          className={`om-bgvid${variant}`}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          style={dim ? { opacity } : undefined}
        >
          <source src={SRC} type="video/mp4" />
        </video>
      )}
    </>
  );
}
