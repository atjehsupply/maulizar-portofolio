"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Stars from "./Stars";
import Nebula from "./Nebula";

function MouseParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    camera.position.x += (target.current.x * 3 - camera.position.x) * 0.03;
    camera.position.y += (target.current.y * 2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function GalaxyCanvas() {
  const [starCount, setStarCount] = useState(3000);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setStarCount(isMobile ? 800 : 3000);
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Stars count={starCount} />
        <Nebula />
        <MouseParallax />
      </Canvas>
    </div>
  );
}