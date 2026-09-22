"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import PhoneScreen from "./PhoneScreen";
import DynamicIsland from "./DynamicIsland";

export default function PhoneFrame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Parallax mouse — nilai -1 s/d 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Tilt halus — hanya ±4° supaya tidak kelihatan tipis
  const rotateY = useTransform(springX, [-1, 1], [-4, 4]);
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);

  // Refleksi kaca bergerak mengikuti mouse
  const glareX = useTransform(springX, [-1, 1], ["30%", "70%"]);
  const glareY = useTransform(springY, [-1, 1], ["20%", "60%"]);

  // Responsif: scale berdasarkan viewport
  useEffect(() => {
    const updateScale = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const heightScale = (vh - 140) / 600;
      const widthScale = (vw - 80) / 290;
      const s = Math.min(heightScale, widthScale, 1);
      setScale(Math.max(s, 0.6));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Mouse move listener
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        perspective: "1600px",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <motion.div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          rotateY,
          rotateX,
        }}
        animate={{ y: [0, -16, 0] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Glow bernafas di belakang iPhone */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] bg-[#4A9EFF]/25 blur-3xl"
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glow ungu tambahan */}
        <motion.div
          className="pointer-events-none absolute -inset-8 -z-20 rounded-full bg-[#7C3AED]/15 blur-3xl"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Frame iPhone */}
        <div className="relative h-[600px] w-[290px] rounded-[3rem] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1e] to-[#0a0a0e] p-[3px] shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(74,158,255,0.25)]">
          <div className="relative h-full w-full rounded-[2.8rem] bg-black p-[3px]">
            <div className="relative h-full w-full overflow-hidden rounded-[2.6rem]">
              <PhoneScreen />

              {/* Refleksi kaca dinamis */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-30 rounded-[2.6rem]"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.15), transparent 55%)`
                  ),
                }}
              />
            </div>

            <DynamicIsland />
          </div>

          {/* Tombol samping */}
          <div className="absolute -right-[3px] top-32 h-12 w-[3px] rounded-r bg-[#2a2a2e]" />
          <div className="absolute -right-[3px] top-48 h-12 w-[3px] rounded-r bg-[#2a2a2e]" />
          <div className="absolute -left-[3px] top-32 h-8 w-[3px] rounded-l bg-[#2a2a2e]" />
          <div className="absolute -left-[3px] top-44 h-8 w-[3px] rounded-l bg-[#2a2a2e]" />
          <div className="absolute -left-[3px] top-56 h-8 w-[3px] rounded-l bg-[#2a2a2e]" />
        </div>
      </motion.div>
    </div>
  );
}