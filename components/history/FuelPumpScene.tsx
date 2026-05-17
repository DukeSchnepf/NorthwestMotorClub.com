"use client";

import { Suspense, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";

/**
 * Procedural stylized PNW gas pump — no glTF, all primitives (Phase 5,
 * Option B). Rotates with timeline scroll progress; only mounted while
 * the History section is in view (offscreen idle motion paused).
 */
function Pump({ progress }: { progress: RefObject<number> }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = progress.current * Math.PI * 3;
    // ease toward scroll-driven angle + a faint idle drift
    group.current.rotation.y +=
      (target - group.current.rotation.y) * Math.min(1, delta * 3) +
      delta * 0.05;
  });

  return (
    <group ref={group} position={[0, -0.6, 0]}>
      {/* base */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.2, 1]} />
        <meshStandardMaterial color="#1c2420" roughness={0.9} />
      </mesh>
      {/* body */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1.1, 2.2, 0.8]} />
        <meshStandardMaterial color="#2a332e" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* display panel — lime, faintly emissive */}
      <mesh position={[0, 1.8, 0.42]}>
        <boxGeometry args={[0.8, 0.55, 0.05]} />
        <meshStandardMaterial
          color="#e8ff3a"
          emissive="#e8ff3a"
          emissiveIntensity={0.45}
          roughness={0.4}
        />
      </mesh>
      {/* top cap */}
      <mesh position={[0, 2.55, 0]}>
        <boxGeometry args={[1.2, 0.25, 0.9]} />
        <meshStandardMaterial color="#141a17" roughness={0.8} />
      </mesh>
      {/* hose */}
      <mesh position={[0.7, 1.2, 0.2]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 12]} />
        <meshStandardMaterial color="#0a0e0c" roughness={1} />
      </mesh>
      {/* nozzle */}
      <mesh position={[1.05, 0.55, 0.2]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.07, 0.05, 0.4, 12]} />
        <meshStandardMaterial color="#ff7a1a" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}

export default function FuelPumpScene({
  progress,
}: {
  progress: RefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [3.2, 2.4, 4.2], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <directionalLight position={[-4, 2, -2]} intensity={0.3} color="#b8c4bd" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
          <Pump progress={progress} />
        </Float>
      </Suspense>
    </Canvas>
  );
}
