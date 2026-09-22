"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type DeskItemProps = {
  x: number;
  y: number;
  rotation: number;
  z: number;
  label: string;
  accent: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function DeskItem({
  x,
  y,
  rotation,
  z,
  label,
  accent,
  active,
  onClick,
  children,
}: DeskItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: z,
        rotate: `${rotation}deg`,
        transform: "translate(-50%, -50%)",
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={label}
    >
      {/* Glow saat hover */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: accent }}
      />

      {/* Ring saat active */}
      {active && (
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-2xl border-2"
          style={{ borderColor: accent }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Benda */}
      <div className="relative">{children}</div>

      {/* Tooltip desktop only */}
      <div
        className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 md:block"
        style={{ color: accent }}
      >
        {label}
      </div>
    </motion.button>
  );
}