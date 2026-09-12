// One place for the chat number. The floating button, the nav CTAs and the
// in-page CTAs all open the same thread, so the number must not be typed twice.
//
// Digits only, country code first, no + and no spaces — wa.me silently fails on
// a formatted number.
export const WA_NUMBER = '919738720404';

export const waHref = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

// Each entry point opens with its own line, so the first message already says
// which button was pressed and nobody has to ask what the enquiry is about.
export const WA_GREETING = waHref('Hi Ideora, I would like to talk about automating our operations.');
export const WA_TALK = waHref('Hi Ideora, I would like to talk about our operations.');
export const WA_DEMO = waHref('Hi Ideora, I would like to request a demo.');
export const WA_BRIEFING = waHref('Hi Ideora, I would like to book a 30-minute discovery call.');

// wa.me leaves the site, so every one of these opens in a new tab and drops the
// opener reference. Spread onto the anchor rather than repeated at each call.
export const WA_LINK = { target: '_blank', rel: 'noopener noreferrer' };
