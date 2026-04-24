"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticlesProps = {
  hoverState: "data" | "dev" | "none";
};

function Particles({ hoverState }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const targetColor = useMemo(() => {
    if (hoverState === "data") return new THREE.Color("#1a6cf5");
    if (hoverState === "dev") return new THREE.Color("#f07040");
    return new THREE.Color("#ffffff");
  }, [hoverState]);

  const materialRef = useRef<THREE.PointsMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    materialRef.current.color.lerp(targetColor, 0.03);
    materialRef.current.opacity = hoverState !== "none" ? 0.55 : 0.25;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.25}
        sizeAttenuation
      />
    </points>
  );
}

type Props = {
  hoverState: "data" | "dev" | "none";
};

export default function Background({ hoverState }: Props) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles hoverState={hoverState} />
      </Canvas>
    </div>
  );
}
