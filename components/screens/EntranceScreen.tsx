"use client";

import { motion } from "motion/react";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";

type Star = {
  id: number;
  size: number;
  top: number;
  left: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function EntranceScreen() {
  const setScreen = useStore((s) => s.setScreen);
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generated: Star[] = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }));
    setStars(generated);
  }, []);

  const handlePower = () => {
    setScreen("booting");
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#05050A]">
      {/* Bintang — hanya render setelah mounted */}
      {mounted && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          {stars.map((s) => (
            <span
              key={s.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                top: `${s.top}%`,
                left: `${s.left}%`,
                opacity: s.opacity,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette halus */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05050A_80%)]" />

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-[#4A9EFF]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-[#7C3AED]/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-[#4A9EFF]/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          <motion.button
            onClick={handlePower}
            className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-white text-black shadow-[0_0_60px_rgba(74,158,255,0.4)]"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Power on"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-[#4A9EFF]/40 blur-2xl"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 h-10 w-10"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </motion.button>
        </div>

        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4A9EFF]/70">
            Reboot System to Explore
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
            Maulizar Nauval — Portfolio 2025
          </p>
        </motion.div>
      </div>
    </div>
  );
}