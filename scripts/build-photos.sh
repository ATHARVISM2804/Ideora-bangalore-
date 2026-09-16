#!/usr/bin/env bash
# Turns the source photographs into the files the site serves.
#
#   drop sources in public/photos/<name>.jpg|png  (or photos-src/)
#   run:  npm run photos
#
# Each source becomes <name>-720.webp, <name>-1280.webp and <name>-1280.jpg in
# public/img/. The source then moves to photos-src/, outside public/, so a 2MB
# original is never deployed. The outputs are committed; this runs on a Mac
# (sips + cwebp), not in CI.
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p photos-src public/img
shopt -s nullglob nocaseglob

for f in public/photos/*.{jpg,jpeg,png,webp}; do
  mv "$f" photos-src/
done
rmdir public/photos 2>/dev/null || true

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

for src in photos-src/*.{jpg,jpeg,png,webp}; do
  name="$(basename "${src%.*}")"
  for w in 720 1280; do
    sips -s format jpeg -s formatOptions 82 --resampleWidth "$w" "$src" --out "$tmp/$name-$w.jpg" >/dev/null
    cwebp -quiet -q 78 -metadata none "$tmp/$name-$w.jpg" -o "public/img/$name-$w.webp"
  done
  cp "$tmp/$name-1280.jpg" "public/img/$name-1280.jpg"
  echo "$name: $(du -h "public/img/$name-720.webp" | cut -f1) / $(du -h "public/img/$name-1280.webp" | cut -f1) webp"
done
