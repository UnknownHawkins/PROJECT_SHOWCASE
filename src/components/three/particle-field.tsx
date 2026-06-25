"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";

function Orb() {
  return (
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial color="#0284c7" wireframe transparent opacity={0.32} />
      </mesh>
    </Float>
  );
}

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 mix-blend-exclusion">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 3, 5]} intensity={2} color="#7c3aed" />
        <Stars radius={80} depth={45} count={1600} factor={4} saturation={0} fade speed={0.55} />
        <Orb />
      </Canvas>
    </div>
  );
}
