"use client";

import { motion } from "motion/react";
import GalaxyCanvas from "@/components/scene/GalaxyCanvas";
import PhoneFrame from "@/components/phone/PhoneFrame";

export default function HomeScreen() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05050A]">
      {/* Galaxy canvas */}
      <GalaxyCanvas />

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05050A_95%)]" />

      {/* Nama di pojok kiri atas */}
      <motion.div
        className="absolute left-8 top-8 z-20 flex flex-col gap-0.5"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4A9EFF]/60">
          Portfolio
        </span>
        <span className="text-sm font-medium tracking-wide text-white/80">
          Maulizar Nauval
        </span>
      </motion.div>

      {/* Hint di pojok kanan atas */}
      <motion.div
        className="absolute right-8 top-8 z-20"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
          Tap an app to explore
        </span>
      </motion.div>

      {/* iPhone di tengah */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhoneFrame />
        </motion.div>
      </div>
    </div>
  );
}