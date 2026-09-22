"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function DynamicIsland() {
  const [expanded, setExpanded] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Pulse tiap beberapa detik — seperti notifikasi masuk
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute left-1/2 top-2 z-20 -translate-x-1/2 cursor-pointer"
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onClick={() => setExpanded((v) => !v)}
      animate={{
        width: expanded ? 120 : pulse ? 100 : 92,
        height: expanded ? 30 : 22,
        borderRadius: 20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-black shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]">
        {/* Konten yang muncul saat expanded */}
        <motion.div
          className="flex h-full items-center justify-between px-3"
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#4A9EFF] shadow-[0_0_6px_#4A9EFF]" />
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/60">
            online
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
        </motion.div>

        {/* Pulse ring saat notifikasi */}
        {pulse && !expanded && (
          <motion.div
            className="absolute inset-0 rounded-full border border-[#4A9EFF]/50"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
      </div>
    </motion.div>
  );
}