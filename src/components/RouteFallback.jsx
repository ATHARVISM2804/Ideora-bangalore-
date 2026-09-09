// Shown while a lazy route's chunk is in flight on a cold load. It reserves
// height so the footer does not jump up into the fold and then back down.
export function RouteFallback() {
  return <div style={{ minHeight: '60vh' }} />;
}
