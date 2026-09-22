"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Nebula() {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);
  const mesh3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh1.current) {
      mesh1.current.rotation.z = t * 0.02;
      mesh1.current.position.x = Math.sin(t * 0.1) * 2;
    }
    if (mesh2.current) {
      mesh2.current.rotation.z = -t * 0.015;
      mesh2.current.position.y = Math.cos(t * 0.08) * 2;
    }
    if (mesh3.current) {
      mesh3.current.rotation.z = t * 0.01;
    }
  });

  return (
    <group>
      {/* Nebula ungu */}
      <mesh ref={mesh1} position={[-15, 8, -40]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Nebula biru */}
      <mesh ref={mesh2} position={[18, -10, -50]}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshBasicMaterial
          color="#4A9EFF"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Nebula ungu-biru di belakang iPhone */}
      <mesh ref={mesh3} position={[0, 0, -30]}>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial
          color="#3B1E8A"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}