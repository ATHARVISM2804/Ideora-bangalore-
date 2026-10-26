// The slice of Three.js the real-estate hero uses. Importing the namespace
// (`import('three')`) kept all of it -- 175 kB gzipped -- because a dynamic
// import of a module counts every export as used. Named re-exports from here
// let the bundler drop the rest. Add to this list when the scene needs more.
export {
  BoxGeometry, CanvasTexture, CircleGeometry, ConeGeometry, CylinderGeometry,
  DirectionalLight, DoubleSide, Group, HemisphereLight, IcosahedronGeometry,
  Mesh, MeshBasicMaterial, MeshStandardMaterial, NeutralToneMapping,
  PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, QuadraticBezierCurve3,
  RingGeometry, Scene, SphereGeometry, SRGBColorSpace, TorusGeometry, Vector3,
  WebGLRenderer,
} from 'three';
