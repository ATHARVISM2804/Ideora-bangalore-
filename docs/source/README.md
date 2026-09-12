# Source assets

`hero-system-source.png` is the original hero illustration as supplied: 1640 x
959, 1.6MB, with roughly a third of its width empty cream on the left.

The files actually served live in `public/assets/hero-system-*`. They are that
image cropped to its subject (470, 70 to the bottom-right corner) and encoded at
four widths in AVIF and WebP, with one JPEG for anything that takes neither.
Seventeen kilobytes at the size it renders, against 1,595 for the source.

Regenerate them from here if the illustration is ever replaced, rather than
serving a PNG this size to a phone.
