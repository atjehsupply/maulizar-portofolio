"use client";

import { motion } from "motion/react";
import { useStore } from "@/lib/store";

type DetailHeaderProps = {
  title: string;
  subtitle?: string;
  accent?: string;
};

export default function DetailHeader({
  title,
  subtitle,
  accent = "#4A9EFF",
}: DetailHeaderProps) {
  const closeDetail = useStore((s) => s.closeDetail);

  return (
    <div className="relative z-20 flex items-start justify-between px-6 pt-8 pb-4">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: `${accent}99` }}
        >
          {subtitle || "Detail"}
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h1>
      </motion.div>

      <motion.button
        onClick={closeDetail}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        aria-label="Close"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-4 w-4"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </motion.button>
    </div>
  );
}