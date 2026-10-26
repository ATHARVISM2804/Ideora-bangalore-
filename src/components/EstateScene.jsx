import { useEffect, useRef, useState } from 'react';

// The real-estate hero: a live, code-built 3D township. Enquiries leave the
// lead sources on the rim, reach the sales hub in the middle, are qualified,
// followed up and land on a building as a booked site visit -- the whole system
// on one loop. Three.js is imported when the scene mounts, so no other route
// pays for it, and the gradient behind the canvas holds the space until then.
//
// Drag to orbit. The scene stops rendering when it is off screen, and a
// reader who asked for reduced motion gets one still frame.

const STAGES = [
  { key: 'capture', step: '01', label: 'Capture', title: 'New enquiry captured', meta: 'Property portal · 3BHK · Whitefield' },
  { key: 'qualify', step: '02', label: 'Qualify', title: 'Voice agent qualified', meta: 'Budget ₹1.4 Cr · Moving in 6 months' },
  { key: 'nurture', step: '03', label: 'Follow up', title: 'Brochure + 3D tour sent', meta: 'WhatsApp · opened in 2 min' },
  { key: 'book', step: '04', label: 'Book visit', title: 'Site visit booked', meta: 'Sat 11:00 AM · Tower B' },
  { key: 'close', step: '05', label: 'Close', title: 'CRM updated', meta: 'Hot lead · assigned to Karan' },
];

// Seconds into the featured lead's 10s loop at which each stage begins.
const STAGE_AT = [0, 2.2, 4.2, 5.6, 7.6];
const LOOP = 10;

const SOURCES = [
  { label: 'Property portals', angle: 0, color: '#2B2E33' },
  { label: 'Meta & Google ads', angle: -Math.PI / 2, color: '#5E6B62' },
  { label: 'Website & WhatsApp', angle: Math.PI, color: '#A07D47' },
];

const stageAt = (t) => {
  let i = 0;
  while (i < STAGE_AT.length - 1 && t >= STAGE_AT[i + 1]) i += 1;
  return i;
};

function buildWorld(THREE, scene) {
  const meshes = [];
  const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...o });
  const add = (geo, material, x = 0, y = 0, z = 0, { shadow = true, parent = scene } = {}) => {
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = shadow;
    m.receiveShadow = true;
    parent.add(m);
    meshes.push(m);
    return m;
  };

  // Contact shadow under the floating platform, from a radial gradient.
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 20, 128, 128, 128);
  grad.addColorStop(0, 'rgba(60,48,30,0.28)');
  grad.addColorStop(1, 'rgba(60,48,30,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const shadowTex = new THREE.CanvasTexture(c);
  const floorShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(44, 44),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
  );
  floorShadow.rotation.x = -Math.PI / 2;
  floorShadow.position.y = -2.4;
  scene.add(floorShadow);

  // Platform: white top, lavender edge.
  add(new THREE.CylinderGeometry(15, 14.6, 1.2, 96), [mat('#DDD3C3'), mat('#F4EFE7'), mat('#DDD3C3')], 0, -0.6, 0, { shadow: false });
  const flat = (geo, color, y, x = 0, z = 0) => {
    const m = add(geo, mat(color), x, y, z, { shadow: false });
    m.rotation.x = -Math.PI / 2;
    return m;
  };

  // Roads: a ring around the hub plaza and four spokes to the rim.
  flat(new THREE.RingGeometry(5.2, 6.5, 96), '#E3DACB', 0.02);
  flat(new THREE.CircleGeometry(5.2, 96), '#FFFFFF', 0.025);
  const dash = mat('#FFFFFF');
  for (let i = 0; i < 40; i += 1) {
    const a = (i / 40) * Math.PI * 2;
    const d = add(new THREE.BoxGeometry(0.32, 0.02, 0.07), dash, Math.cos(a) * 5.85, 0.035, Math.sin(a) * 5.85, { shadow: false });
    d.rotation.y = -a + Math.PI / 2;
  }
  [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach((a) => {
    const r = 10.4;
    const spoke = flat(new THREE.PlaneGeometry(8, 1.3), '#E3DACB', 0.021, Math.cos(a) * r, Math.sin(a) * r);
    spoke.rotation.z = -a;
    for (let k = 0; k < 6; k += 1) {
      const rr = 7.2 + k * 1.2;
      const d = add(new THREE.BoxGeometry(0.4, 0.02, 0.07), dash, Math.cos(a) * rr, 0.035, Math.sin(a) * rr, { shadow: false });
      d.rotation.y = -a;
    }
  });

  // Lawns.
  flat(new THREE.CircleGeometry(4, 48), '#DCE3D2', 0.022, 8.6, 8.6);
  flat(new THREE.CircleGeometry(1.3, 32), '#C9D9DA', 0.03, 9.4, 8.2);
  flat(new THREE.CircleGeometry(2.2, 40), '#E2E6D8', 0.022, -8.2, -7.6);

  // The sales hub: podium, glass drum, roof and a floating beacon ring.
  add(new THREE.CylinderGeometry(2.7, 2.8, 0.35, 64), mat('#FFFFFF'), 0, 0.18, 0);
  add(new THREE.CylinderGeometry(2.05, 2.05, 1.5, 64), mat('#2E3338', { roughness: 0.2, metalness: 0.35 }), 0, 1.1, 0);
  add(new THREE.CylinderGeometry(2.45, 2.45, 0.18, 64), mat('#FFFFFF'), 0, 1.95, 0);
  for (let i = 0; i < 16; i += 1) {
    const a = (i / 16) * Math.PI * 2;
    add(new THREE.BoxGeometry(0.08, 1.5, 0.08), mat('#FFFFFF'), Math.cos(a) * 2.07, 1.1, Math.sin(a) * 2.07);
  }
  const beacon = add(
    new THREE.TorusGeometry(1.05, 0.09, 12, 64),
    new THREE.MeshStandardMaterial({ color: '#C9A46A', emissive: '#A07D47', emissiveIntensity: 1.1, metalness: 0.6, roughness: 0.3 }),
    0, 3.3, 0, { shadow: false },
  );
  beacon.rotation.x = Math.PI / 2;
  add(
    new THREE.CylinderGeometry(0.05, 0.05, 1.3, 12),
    new THREE.MeshBasicMaterial({ color: '#C9A46A', transparent: true, opacity: 0.5 }),
    0, 2.65, 0, { shadow: false },
  );
  const core = add(
    new THREE.SphereGeometry(0.34, 24, 16),
    new THREE.MeshStandardMaterial({ color: '#FFFFFF', emissive: '#D9C49E', emissiveIntensity: 0.9 }),
    0, 3.3, 0, { shadow: false },
  );

  // Residential towers: floor plates and glass bands.
  const slab = mat('#FFFFFF');
  const tower = (x, z, w, d, floors, glassColor) => {
    const glass = mat(glassColor, { roughness: 0.3, metalness: 0.1 });
    for (let f = 0; f < floors; f += 1) {
      const y = 0.1 + f * 0.56;
      add(new THREE.BoxGeometry(w + 0.16, 0.12, d + 0.16), slab, x, y + 0.06, z);
      add(new THREE.BoxGeometry(w, 0.44, d), glass, x, y + 0.34, z);
    }
    const top = 0.1 + floors * 0.56;
    add(new THREE.BoxGeometry(w + 0.16, 0.16, d + 0.16), slab, x, top + 0.08, z);
    add(new THREE.BoxGeometry(w * 0.45, 0.5, d * 0.45), slab, x, top + 0.4, z);
    return { x, z, top: top + 0.7 };
  };
  const towers = [
    tower(8.2, -8.2, 2.5, 2.5, 16, '#3A4048'),
    tower(11.4, -3.6, 2.2, 2.2, 11, '#BDB2A0'),
    tower(3.8, -11.4, 2.2, 2.6, 13, '#8E9AA3'),
    tower(-8.4, 7.4, 3.2, 2, 7, '#BDB2A0'),
    tower(-11.6, 3.4, 2, 2, 5, '#8E9AA3'),
  ];

  // Villas with pyramid roofs and the odd pool.
  const villaBody = mat('#FFFFFF');
  const roofs = [mat('#6F6458'), mat('#8A7D6D'), mat('#5A534B')];
  const villas = [];
  [[-6.6, -9.8], [-9.6, -9.6], [-11.8, -6.4], [-7.6, -12.4], [-11.6, -2.6], [-4, -12.8]].forEach(([x, z], i) => {
    add(new THREE.BoxGeometry(1.7, 0.95, 1.4), villaBody, x, 0.48, z);
    const roof = add(new THREE.ConeGeometry(1.35, 0.75, 4), roofs[i % 3], x, 1.32, z);
    roof.rotation.y = Math.PI / 4;
    if (i % 2 === 0) flat(new THREE.PlaneGeometry(0.9, 0.6), '#A9C8CC', 0.04, x + 1.35, z + 0.3);
    villas.push({ x, z, top: 2 });
  });

  // Shops along the south-west spoke.
  [[-4.2, 10.8], [-6.4, 10.4]].forEach(([x, z]) => {
    add(new THREE.BoxGeometry(1.8, 1.2, 1.4), mat('#FFFFFF'), x, 0.6, z);
    add(new THREE.BoxGeometry(1.85, 0.12, 1.5), mat('#A07D47'), x, 1.0, z);
  });

  // Trees, scattered where nothing else stands.
  const trunk = mat('#9C8670');
  const leaves = [mat('#8FA58C', { flatShading: true }), mat('#71896F', { flatShading: true }), mat('#A9B9A2', { flatShading: true })];
  const trees = [
    [6.6, 6.4], [7.4, 10.8], [10.8, 6.8], [11.2, 10.2], [6, 9], [9.2, 11.8], [12.2, 8.4], [5.2, 11.6],
    [-8.6, -5], [-5.4, -7.8], [-13, -0.6], [-3, -9.4], [9.8, -11.2], [12.8, -6.6], [6.2, -12.6], [-9.8, 10.6],
    [-12.8, 6.8], [2.4, 12.6], [12.6, 2.6], [-2.6, -12.4], [2.8, -8], [7.8, -5.2],
  ];
  trees.forEach(([x, z], i) => {
    const s = 0.8 + ((i * 37) % 10) / 22;
    add(new THREE.CylinderGeometry(0.07, 0.09, 0.5 * s, 6), trunk, x, 0.25 * s, z);
    add(new THREE.IcosahedronGeometry(0.55 * s, 0), leaves[i % 3], x, 0.75 * s, z);
  });

  // Lead sources: a billboard at the end of three spokes, facing the hub.
  const sources = SOURCES.map((s) => {
    const r = 13.6;
    const x = Math.cos(s.angle) * r;
    const z = Math.sin(s.angle) * r;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    scene.add(group);
    add(new THREE.CylinderGeometry(0.08, 0.08, 2.6, 10), mat('#FFFFFF'), 0, 1.3, 0, { parent: group });
    add(
      new THREE.BoxGeometry(2.2, 1.3, 0.14),
      new THREE.MeshStandardMaterial({ color: s.color, emissive: s.color, emissiveIntensity: 0.15, roughness: 0.45 }),
      0, 3.1, 0, { parent: group },
    );
    add(new THREE.BoxGeometry(1.4, 0.12, 0.16), mat('#FFFFFF'), 0, 3.25, 0.01, { parent: group });
    add(new THREE.BoxGeometry(0.9, 0.12, 0.16), mat('#FFFFFF'), -0.25, 2.95, 0.01, { parent: group });
    group.lookAt(0, 0, 0);
    return { ...s, pos: new THREE.Vector3(x, 3.1, z) };
  });

  // Cars on the ring road.
  const cars = ['#2B2E33', '#A07D47', '#FFFFFF', '#8E9AA3'].map((color, i) => {
    const car = new THREE.Group();
    scene.add(car);
    // Cars cast no shadow: the shadow map is drawn once, for the static town.
    add(new THREE.BoxGeometry(0.75, 0.24, 0.42), mat(color, { roughness: 0.4 }), 0, 0.2, 0, { parent: car, shadow: false });
    add(new THREE.BoxGeometry(0.4, 0.2, 0.36), mat('#D8D2C8', { roughness: 0.2 }), -0.05, 0.4, 0, { parent: car, shadow: false });
    return { car, phase: (i / 4) * Math.PI * 2, lane: i % 2 ? 5.55 : 6.15, speed: i % 2 ? 0.22 : -0.17 };
  });

  // Every home a visit can land on.
  const homes = [towers[0], villas[0], towers[2], towers[3], villas[2], towers[1], villas[4], towers[4]];

  return { meshes, sources, cars, homes, beacon, core, shadowTex };
}

export function EstateScene() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const tagRefs = useRef([]);
  const [stage, setStage] = useState(3);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    let disposed = false;
    let cleanup = () => {};

    // The library waits for the browser to go idle, so the hero's copy and
    // the first paint never queue behind 120 kB of WebGL.
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const idleId = idle(() => import('../lib/three').then((THREE) => {
      if (disposed) return;

      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        || new URLSearchParams(window.location.search).has('still');

      // No WebGL (an old device, a blocked GPU, the prerender's jsdom): the
      // gradient panel stays as it is and the stage row still reads.
      if (!window.WebGLRenderingContext) return;
      let renderer;
      try {
        // A dense screen hides aliasing on its own; antialiasing there only
        // costs fill rate.
        renderer = new THREE.WebGLRenderer({ antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return;
      }
      // Phones get a lighter frame: fewer pixels and a smaller shadow map.
      const small = window.innerWidth < 700;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // Everything that casts a shadow stands still, so the map is drawn on
      // the first frame and reused -- the light never moves, only the camera.
      renderer.shadowMap.autoUpdate = false;
      renderer.shadowMap.needsUpdate = true;
      renderer.domElement.className = 're-scene__canvas';
      wrap.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 200);

      scene.add(new THREE.HemisphereLight('#FBF7F0', '#E8DCCB', 1.5));
      const sun = new THREE.DirectionalLight('#FFF1E2', 2.4);
      sun.position.set(14, 24, 9);
      sun.castShadow = true;
      sun.shadow.mapSize.setScalar(small ? 1024 : 2048);
      Object.assign(sun.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 70 });
      sun.shadow.bias = -0.0004;
      sun.shadow.normalBias = 0.03;
      scene.add(sun);
      const fill = new THREE.DirectionalLight('#E6E0D6', 0.5);
      fill.position.set(-14, 10, -12);
      scene.add(fill);

      const world = buildWorld(THREE, scene);
      const hub = new THREE.Vector3(0, 3.3, 0);

      // Lead orbs: one featured lead carries the captions, three ambient ones
      // keep the township busy on their own offsets.
      const orbGeo = new THREE.SphereGeometry(0.26, 20, 14);
      const ghostGeo = new THREE.SphereGeometry(0.2, 12, 8);
      const haloGeo = new THREE.SphereGeometry(0.55, 20, 14);
      const makeOrb = (color, size = 1) => {
        const group = new THREE.Group();
        const orb = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color }));
        const halo = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.22, depthWrite: false }));
        group.add(orb, halo);
        group.scale.setScalar(size);
        scene.add(group);
        const ghosts = Array.from({ length: 6 }, (_, i) => {
          const m = new THREE.Mesh(ghostGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 - i * 0.05, depthWrite: false }));
          m.scale.setScalar((1 - i * 0.14) * size);
          scene.add(m);
          return m;
        });
        return { group, halo, ghosts, trail: [] };
      };
      const leads = [
        { ...makeOrb('#B8894A', 1.1), offset: 0, featured: true },
        { ...makeOrb('#2B2E33', 0.75), offset: 3.3 },
        { ...makeOrb('#71896F', 0.75), offset: 6.6 },
        { ...makeOrb('#C9A46A', 0.7), offset: 8.4 },
      ];

      // Voice-agent rings from the hub, and the site-visit pin.
      const ringGeo = new THREE.RingGeometry(0.9, 1.05, 64);
      const rings = [0, 1, 2].map(() => {
        const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: '#A07D47', transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
        m.rotation.x = -Math.PI / 2;
        m.position.y = 2.1;
        scene.add(m);
        return m;
      });
      const pin = new THREE.Group();
      const pinMat = new THREE.MeshStandardMaterial({ color: '#A07D47', emissive: '#A07D47', emissiveIntensity: 0.4 });
      const pinHead = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 16), pinMat);
      pinHead.position.y = 0.95;
      const pinTip = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.75, 20), pinMat);
      pinTip.rotation.x = Math.PI;
      pinTip.position.y = 0.42;
      pin.add(pinHead, pinTip);
      pin.visible = false;
      scene.add(pin);
      const pulse = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.62, 48), new THREE.MeshBasicMaterial({ color: '#A07D47', transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
      pulse.rotation.x = -Math.PI / 2;
      scene.add(pulse);

      const v = new THREE.Vector3();
      const arc = (from, to, k, lift) => {
        const mid = from.clone().lerp(to, 0.5);
        mid.y += lift;
        return new THREE.QuadraticBezierCurve3(from, mid, to).getPoint(k);
      };
      const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
      const clamp01 = (k) => Math.min(1, Math.max(0, k));

      // Where a lead is at time t of its loop, and which home it lands on.
      const leadPos = (t, cycle) => {
        const src = world.sources[cycle % world.sources.length].pos;
        const home = world.homes[cycle % world.homes.length];
        const dest = new THREE.Vector3(home.x, home.top + 1.2, home.z);
        if (t < 2.2) return { p: arc(src, hub, ease(clamp01(t / 2.2)), 4.5), dest, show: true };
        if (t < 4.2) return { p: hub.clone(), dest, show: false };
        if (t < 5.6) {
          const k = (t - 4.2) / 1.4;
          const a = k * Math.PI * 2;
          return { p: new THREE.Vector3(Math.cos(a) * 2.9, 3.3 + Math.sin(k * Math.PI) * 0.8, Math.sin(a) * 2.9), dest, show: true };
        }
        if (t < 7.6) {
          const start = new THREE.Vector3(2.9, 3.3, 0);
          return { p: arc(start, dest, ease(clamp01((t - 5.6) / 2)), 5), dest, show: true };
        }
        return { p: dest, dest, show: false };
      };

      // Camera: drag to orbit, slow drift when idle.
      const view = { az: 0.72, polar: 1.02, vAz: 0 };
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let idleFor = 10;
      const onDown = (e) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        wrap.setPointerCapture?.(e.pointerId);
        wrap.classList.add('is-dragging');
      };
      const onMove = (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        view.vAz = -dx * 0.006;
        view.az += view.vAz;
        view.polar = Math.min(1.25, Math.max(0.7, view.polar - dy * 0.004));
        idleFor = 0;
      };
      const onUp = () => {
        dragging = false;
        wrap.classList.remove('is-dragging');
      };
      wrap.addEventListener('pointerdown', onDown);
      wrap.addEventListener('pointermove', onMove);
      wrap.addEventListener('pointerup', onUp);
      wrap.addEventListener('pointercancel', onUp);

      let width = 1;
      let height = 1;
      const resize = () => {
        width = wrap.clientWidth || 1;
        height = wrap.clientHeight || 1;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Narrow frames pull the camera back so the platform still fits.
        camera.userData.radius = camera.aspect < 1 ? 66 : camera.aspect < 1.2 ? 54 : 48;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);

      const tagAnchors = [...world.sources.map((s) => s.pos.clone().setY(4.3)), new THREE.Vector3(0, 4.4, 0)];
      // `keepIn` holds an element wholly inside the frame: it is centred on
      // its point and sits above it, so half its width and all its height
      // are the margins.
      const place = (el, p, dy = 0, keepIn = false) => {
        if (!el) return;
        v.copy(p).project(camera);
        let x = (v.x * 0.5 + 0.5) * width;
        let y = (-v.y * 0.5 + 0.5) * height + dy;
        if (keepIn) {
          const half = el.offsetWidth / 2 + 10;
          x = Math.min(width - half, Math.max(half, x));
          y = Math.min(height - 10, Math.max(el.offsetHeight + 10, y));
        }
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      };

      let lastStage = -1;
      const renderAt = (time, dt) => {
        if (!dragging) {
          idleFor += dt;
          view.vAz *= 0.92;
          view.az += view.vAz + (idleFor > 2.5 && !still ? dt * 0.05 : 0);
        }
        const r = camera.userData.radius;
        camera.position.set(
          Math.sin(view.az) * Math.sin(view.polar) * r,
          Math.cos(view.polar) * r,
          Math.cos(view.az) * Math.sin(view.polar) * r,
        );
        camera.lookAt(0, -0.4, 0);

        world.beacon.rotation.z = time * 0.8;
        world.beacon.position.y = 3.3 + Math.sin(time * 1.6) * 0.08;
        world.core.position.y = world.beacon.position.y;
        world.cars.forEach((c) => {
          const a = c.phase + time * c.speed;
          c.car.position.set(Math.cos(a) * c.lane, 0, Math.sin(a) * c.lane);
          c.car.rotation.y = -a + (c.speed > 0 ? -Math.PI / 2 : Math.PI / 2);
        });

        let featuredT = 0;
        let featuredDest = null;
        leads.forEach((lead) => {
          const total = time + lead.offset;
          const t = total % LOOP;
          const cycle = Math.floor(total / LOOP) + (lead.featured ? 0 : 2);
          const { p, dest, show } = leadPos(t, cycle);
          lead.group.position.copy(p);
          lead.group.visible = show;
          lead.halo.scale.setScalar(1 + Math.sin(time * 5) * 0.12);
          lead.trail.unshift(p.clone());
          lead.trail.length = Math.min(lead.trail.length, 18);
          lead.ghosts.forEach((g, i) => {
            const q = lead.trail[(i + 1) * 3];
            g.visible = show && Boolean(q);
            if (q) g.position.copy(q);
          });
          if (lead.featured) {
            featuredT = t;
            featuredDest = dest;
          }
        });

        // Voice rings while the featured lead is being qualified.
        const q = featuredT - 2.2;
        rings.forEach((ring, i) => {
          const k = (q - i * 0.45) / 1.4;
          const on = q > 0 && q < 2 && k > 0 && k < 1;
          ring.material.opacity = on ? (1 - k) * 0.7 : 0;
          ring.scale.setScalar(on ? 2 + k * 4.5 : 1);
        });

        // The pin rises once the visit is booked and turns green at close.
        const booked = featuredT >= 7.3;
        pin.visible = booked;
        pulse.material.opacity = 0;
        if (booked && featuredDest) {
          const k = clamp01((featuredT - 7.3) / 0.5);
          pin.position.set(featuredDest.x, featuredDest.y - 1.2 + (1 - ease(k)) * 1.5 + Math.sin(time * 3) * 0.08, featuredDest.z);
          pin.scale.setScalar(0.4 + ease(k) * 0.6);
          pinMat.color.set(featuredT > 8.4 ? '#2F6B55' : '#A07D47');
          pinMat.emissive.copy(pinMat.color);
          const pk = ((featuredT - 7.6) % 1.2) / 1.2;
          pulse.position.set(featuredDest.x, featuredDest.y - 1.15, featuredDest.z);
          pulse.scale.setScalar(1 + pk * 3);
          pulse.material.color.copy(pinMat.color);
          pulse.material.opacity = (1 - pk) * 0.8;
        }

        renderer.render(scene, camera);

        tagAnchors.forEach((p, i) => place(tagRefs.current[i], p));
        const lead = leads[0];
        const cardAt = lead.group.visible ? lead.group.position : featuredT < 4.2 ? hub : featuredDest;
        place(cardRef.current, cardAt, -26, true);

        const s = stageAt(featuredT);
        if (s !== lastStage) {
          lastStage = s;
          setStage(s);
        }
      };

      // Still frame: the moment the visit lands.
      const STILL_T = 7.9;
      let raf = 0;
      let visible = true;
      let last = performance.now();
      let time = STILL_T + LOOP * 2;
      const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        time += dt;
        renderAt(time, dt);
        raf = visible ? requestAnimationFrame(tick) : 0;
      };

      if (still) {
        // Warm the trail so the still frame has its ghosts in place.
        for (let k = 18; k >= 0; k -= 1) renderAt(time - k / 60, 1 / 60);
      } else {
        time = LOOP * 2 + 0.2;
        raf = requestAnimationFrame(tick);
      }
      setReady(true);

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !raf && !still) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      });
      io.observe(wrap);
      const onVis = () => {
        visible = !document.hidden;
        if (visible && !raf && !still) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };
      document.addEventListener('visibilitychange', onVis);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        wrap.removeEventListener('pointerdown', onDown);
        wrap.removeEventListener('pointermove', onMove);
        wrap.removeEventListener('pointerup', onUp);
        wrap.removeEventListener('pointercancel', onUp);
        scene.traverse((o) => {
          o.geometry?.dispose();
          [].concat(o.material || []).forEach((m) => m.dispose());
        });
        world.shadowTex.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }), { timeout: 1500 });

    return () => {
      disposed = true;
      cancelIdle(idleId);
      cleanup();
    };
  }, []);

  const current = STAGES[stage];

  return (
    <div className="re-scene-wrap">
      <div
        ref={wrapRef}
        className={`re-scene${ready ? ' is-ready' : ''}`}
        role="img"
        aria-label="A live 3D township: enquiries travel from ads, portals and the website to the AI sales hub, are qualified and followed up, and land on a building as a booked site visit."
      >
        {SOURCES.map((s, i) => (
          <span key={s.label} ref={(el) => { tagRefs.current[i] = el; }} className="re-tag" aria-hidden="true">
            <i style={{ background: s.color }} />{s.label}
          </span>
        ))}
        <span ref={(el) => { tagRefs.current[SOURCES.length] = el; }} className="re-tag re-tag--hub" aria-hidden="true">
          <i />AI Sales Hub
        </span>
        <div ref={cardRef} className="re-event" aria-hidden="true">
          <div key={current.key} className={`re-event__card re-event__card--${current.key}`}>
            <span className="re-event__step">{current.step}</span>
            <span><b>{current.title}</b><small>{current.meta}</small></span>
          </div>
        </div>
        <span className="re-scene__hint" aria-hidden="true">Drag to explore</span>
      </div>
      <ol className="re-stages" aria-label="The lead journey shown in the scene">
        {STAGES.map((s, i) => (
          <li key={s.key} className={i === stage ? 'is-on' : i < stage ? 'is-done' : undefined}>
            <span>{s.step}</span>{s.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
