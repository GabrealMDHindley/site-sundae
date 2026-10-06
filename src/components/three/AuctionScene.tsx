"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// The Sundae marketplace as one moving picture: a home on its lot, a ring of investors
// bidding around it. Round one — every bid rises. Then the top three advance. Then the
// winning offer lights up in Sundae red and travels to the house. Loops.
// Colors are the Sundae palette on a light ground (Creative Guidelines p.6): blue bids, gray/slate
// for bids that drop out, red only for the roof and the winning offer. No gold glow, no dark stage.
const N = 30, R = 2.32, CYCLE = 8;
// Rig yaw ≈ 0.35 rad and the camera sits at ≈ 0.93 rad in the xz-plane, so local angle ≈ 1.28 faces the viewer.
const FRONT = 1.28;
const C = { ink: new THREE.Color("#c9d2e0"), dim: new THREE.Color("#e6e6e6"), top: new THREE.Color("#1c51a0"), red: new THREE.Color("#db3d55") };
export type Phase = 0 | 1 | 2;

function rng(seed: number) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }

function House() {
  const roof = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.93, 0); s.lineTo(0, 0.74); s.lineTo(0.93, 0); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 1.44, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 2 });
    g.translate(0, 0, -0.72);
    return g;
  }, []);
  const glass = <meshStandardMaterial color="#c9d2e0" roughness={0.25} metalness={0.05} />;
  return (
    <group position={[0, 0.09, 0]}>
      <RoundedBox args={[1.5, 1.05, 1.25]} radius={0.035} smoothness={3} position={[0, 0.525, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </RoundedBox>
      <mesh geometry={roof} position={[0, 1.05, 0]} castShadow><meshStandardMaterial color="#db3d55" roughness={0.55} /></mesh>
      <mesh position={[0.46, 1.42, -0.22]} castShadow><boxGeometry args={[0.18, 0.42, 0.18]} /><meshStandardMaterial color="#e6e6e6" roughness={0.9} /></mesh>
      <mesh position={[0, 0.3, 0.633]}><boxGeometry args={[0.3, 0.56, 0.03]} /><meshStandardMaterial color="#1c51a0" roughness={0.6} /></mesh>
      <mesh position={[0.09, 0.3, 0.652]}><sphereGeometry args={[0.022, 12, 12]} /><meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.3} /></mesh>
      {[-0.46, 0.46].map((x) => <mesh key={x} position={[x, 0.64, 0.633]}>{<boxGeometry args={[0.3, 0.28, 0.02]} />}{glass}</mesh>)}
      {[-0.3, 0.3].map((z) => <mesh key={z} position={[0.753, 0.62, z]} rotation={[0, Math.PI / 2, 0]}>{<boxGeometry args={[0.26, 0.26, 0.02]} />}{glass}</mesh>)}
      <mesh position={[0, 0.03, 0.76]} receiveShadow><boxGeometry args={[0.5, 0.06, 0.22]} /><meshStandardMaterial color="#e6e6e6" /></mesh>
      <mesh position={[0, 0.006, 1.22]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[0.34, 0.75]} /><meshStandardMaterial color="#e6e6e6" /></mesh>
    </group>
  );
}

function Tree({ p, s = 1 }: { p: [number, number, number]; s?: number }) {
  return (
    <group position={p} scale={s}>
      <mesh position={[0, 0.16, 0]} castShadow><cylinderGeometry args={[0.035, 0.05, 0.32, 8]} /><meshStandardMaterial color="#c9d2e0" /></mesh>
      <mesh position={[0, 0.55, 0]} castShadow><coneGeometry args={[0.3, 0.62, 18]} /><meshStandardMaterial color="#f4cccc" roughness={0.8} flatShading /></mesh>
      <mesh position={[0, 0.85, 0]} castShadow><coneGeometry args={[0.21, 0.45, 18]} /><meshStandardMaterial color="#f4cccc" roughness={0.8} flatShading /></mesh>
    </group>
  );
}

function Bids({ onPhase, still }: { onPhase?: (p: Phase) => void; still: boolean }) {
  const bars = useRef<(THREE.Group | null)[]>([]);
  const mats = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const caps = useRef<(THREE.Mesh | null)[]>([]);
  const arc = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const state = useRef({ round: -1, h: new Float32Array(N), cur: new Float32Array(N), order: [] as number[], phase: -1, arcCount: 0 });
  const angles = useMemo(() => Array.from({ length: N }, (_, i) => (i / N) * Math.PI * 2), []);

  const setRound = (round: number) => {
    const s = state.current, r = rng(round + 7);
    for (let i = 0; i < N; i++) s.h[i] = 0.32 + Math.pow(r(), 1.7) * 1.05;
    // Stage the finalists on the camera-facing side so the winning bid is never hidden by the house.
    const idx = (a: number) => ((Math.round((a / (Math.PI * 2)) * N) % N) + N) % N;
    const centre = FRONT + (r() - 0.5) * 1.1;
    const finalists = [idx(centre), idx(centre - 0.75 - r() * 0.35), idx(centre + 0.75 + r() * 0.35)];
    const hi = [1.45, 1.18 + r() * 0.08, 1.08 + r() * 0.08];
    finalists.forEach((f, j) => { s.h[f] = hi[j]; });
    for (let i = 0; i < N; i++) if (!finalists.includes(i)) s.h[i] = Math.min(s.h[i], 1.0);
    s.order = Array.from({ length: N }, (_, i) => i).sort((a, b) => s.h[b] - s.h[a]);
    const w = s.order[0];
    const a = angles[w];
    const from = new THREE.Vector3(Math.cos(a) * R, 0.09 + s.h[w] * 1.25 + 0.08, Math.sin(a) * R);
    const to = new THREE.Vector3(0, 1.95, 0);
    const mid = from.clone().lerp(to, 0.5).add(new THREE.Vector3(0, 1.1, 0));
    const geo = new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(from, mid, to), 64, 0.018, 8, false);
    if (arc.current) { arc.current.geometry.dispose(); arc.current.geometry = geo; s.arcCount = geo.index ? geo.index.count : 0; geo.setDrawRange(0, 0); }
    if (halo.current) halo.current.position.set(Math.cos(a) * R, 0.1, Math.sin(a) * R);
  };

  useFrame((st, dt) => {
    const s = state.current;
    const t = still ? 6.6 : st.clock.elapsedTime;
    const round = still ? 3 : Math.floor(t / CYCLE);
    if (round !== s.round) { s.round = round; setRound(round); }
    const c = t % CYCLE;
    const phase: Phase = c < 3 ? 0 : c < 5 ? 1 : 2;
    if (phase !== s.phase) { s.phase = phase; onPhase?.(phase); }
    const top3 = new Set(s.order.slice(0, 3)), w = s.order[0];
    const k = still ? 1 : 1 - Math.exp(-dt * 5.5);
    for (let i = 0; i < N; i++) {
      let target = 0; let col = C.ink;
      if (c > 7.35) target = 0;
      else if (phase === 0) target = c > 0.15 + i * 0.045 ? s.h[i] : 0;
      else if (phase === 1) { target = top3.has(i) ? s.h[i] : s.h[i] * 0.32; col = top3.has(i) ? C.top : C.dim; }
      else { target = i === w ? s.h[i] * 1.25 : top3.has(i) ? s.h[i] * 0.55 : s.h[i] * 0.32; col = i === w ? C.red : C.dim; }
      s.cur[i] += (target - s.cur[i]) * k;
      const g = bars.current[i], m = mats.current[i], cap = caps.current[i];
      if (g) g.scale.y = Math.max(0.0001, s.cur[i]);
      if (cap) { cap.position.y = 0.09 + s.cur[i] + 0.06; cap.scale.setScalar(s.cur[i] < 0.02 ? 0.0001 : 1); }
      if (m) { m.color.lerp(col, still ? 1 : 1 - Math.exp(-dt * 6)); m.emissive.copy(i === w && phase === 2 ? C.red : C.ink).multiplyScalar(i === w && phase === 2 ? 0.35 + Math.sin(t * 5) * 0.1 : 0); }
      if (cap?.material) (cap.material as THREE.MeshStandardMaterial).color.copy(m ? m.color : col);
    }
    if (arc.current) {
      const p = phase === 2 && c < 7.35 ? THREE.MathUtils.smoothstep(c, 5.3, 6.4) : 0;
      arc.current.geometry.setDrawRange(0, Math.floor(s.arcCount * p / 3) * 3);
    }
    if (halo.current) {
      const on = phase === 2 && c < 7.35;
      const pulse = (t * 0.9) % 1;
      halo.current.scale.setScalar(on ? 0.6 + pulse * 1.6 : 0.0001);
      (halo.current.material as THREE.MeshBasicMaterial).opacity = on ? 0.55 * (1 - pulse) : 0;
    }
  });

  return (
    <group>
      {angles.map((a, i) => (
        <group key={i} position={[Math.cos(a) * R, 0, Math.sin(a) * R]}>
          <mesh position={[0, 0.093, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.09, 20]} /><meshStandardMaterial color="#e6e6e6" /></mesh>
          <group ref={(el) => { bars.current[i] = el; }} position={[0, 0.09, 0]} scale={[1, 0.0001, 1]}>
            <mesh position={[0, 0.5, 0]} castShadow><cylinderGeometry args={[0.034, 0.034, 1, 14]} /><meshStandardMaterial ref={(el) => { mats.current[i] = el; }} color="#c9d2e0" roughness={0.5} /></mesh>
          </group>
          <mesh ref={(el) => { caps.current[i] = el; }} position={[0, 0.1, 0]} castShadow><sphereGeometry args={[0.068, 20, 20]} /><meshStandardMaterial color="#c9d2e0" roughness={0.35} /></mesh>
        </group>
      ))}
      <mesh ref={arc}><tubeGeometry /><meshStandardMaterial color="#db3d55" emissive="#db3d55" emissiveIntensity={0.6} /></mesh>
      <mesh ref={halo} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.16, 0.2, 40]} /><meshBasicMaterial color="#db3d55" transparent opacity={0} depthWrite={false} /></mesh>
    </group>
  );
}

function Rig({ children, still }: { children: React.ReactNode; still: boolean }) {
  const g = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useEffect(() => { camera.lookAt(0, 0.7, 0); }, [camera]);
  useFrame((st, dt) => {
    if (!g.current) return;
    const p = Math.min(1, window.scrollY / window.innerHeight);
    const k = 1 - Math.exp(-dt * 3);
    const ry = (still ? 0.35 : 0.35 + Math.sin(st.clock.elapsedTime * 0.18) * 0.22) + st.pointer.x * 0.2;
    g.current.rotation.y += (ry - g.current.rotation.y) * k;
    g.current.rotation.x += ((-st.pointer.y * 0.05 + p * 0.22) - g.current.rotation.x) * k;
    g.current.position.y += (-p * 0.7 - g.current.position.y) * k;
  });
  return <group ref={g}>{children}</group>;
}

export default function AuctionScene({ onPhase, active = true }: { onPhase?: (p: Phase) => void; active?: boolean }) {
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas flat shadows={!small} dpr={[1, small ? 1.5 : 1.8]} camera={{ position: [6.4, 4.9, 8.6], fov: 33 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "demand" : active ? "always" : "never"} aria-label="Illustration: investors bid on a home in two rounds and the winning offer is highlighted" role="img">
      <ambientLight intensity={1.2} color="#ffffff" />
      <hemisphereLight args={["#ffffff", "#c9d2e0", 0.7]} />
      <directionalLight position={[4, 7.5, 4.5]} intensity={2.0} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004}
        shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} shadow-radius={6} />
      <Rig still={still}>
        <mesh position={[0, 0, 0]} receiveShadow><cylinderGeometry args={[3.05, 3.12, 0.18, 96]} /><meshStandardMaterial color="#ffffff" roughness={0.95} /></mesh>
        <mesh position={[0, 0.0905, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[2.98, 3.05, 96]} /><meshStandardMaterial color="#c9d2e0" /></mesh>
        <House />
        <Tree p={[-1.25, 0.09, -0.85]} s={1.05} />
        <Tree p={[1.3, 0.09, -1.05]} s={0.8} />
        <Tree p={[-1.45, 0.09, 0.75]} s={0.7} />
        <Bids onPhase={onPhase} still={still} />
        <ContactShadows position={[0, -0.095, 0]} scale={9} blur={2.6} opacity={0.32} far={3} resolution={256} frames={1} color="#4a4a4a" />
      </Rig>
    </Canvas>
  );
}
