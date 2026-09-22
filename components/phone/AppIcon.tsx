"use client";

import { motion } from "motion/react";
import type { AppItem } from "@/data/apps";

type AppIconProps = {
  app: AppItem;
  onClick: () => void;
};

// Icon SVG per app
const ICONS: Record<string, React.ReactNode> = {
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
};

export default function AppIcon({ app, onClick }: AppIconProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group flex flex-col items-center gap-1.5"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg"
        style={{
          background: `linear-gradient(145deg, ${app.accent}, ${app.accent}CC)`,
          boxShadow: `0 4px 16px ${app.accent}40, inset 0 1px 0 rgba(255,255,255,0.25)`,
        }}
      >
        {/* Highlight kaca */}
        <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-gradient-to-b from-white/25 to-transparent opacity-60" />

        {/* Icon */}
        <span className="relative z-10">{ICONS[app.id]}</span>
      </div>

      <span className="text-[9px] font-medium tracking-wide text-white/80">
        {app.label}
      </span>
    </motion.button>
  );
}