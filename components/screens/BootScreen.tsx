"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const BOOT_LOGS = [
  "initializing kernel",
  "mounting secure filesystem",
  "verifying system integrity",
  "loading neural interface",
  "establishing secure channel",
  "booting portfolio environment",
];

export default function BootScreen() {
  const setScreen = useStore((s) => s.setScreen);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [exiting, setExiting] = useState(false);

  // Progress bar animasi
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Boot log muncul berurutan
  useEffect(() => {
    if (visibleLogs >= BOOT_LOGS.length) return;
    const timeout = setTimeout(() => {
      setVisibleLogs((v) => v + 1);
    }, 550);
    return () => clearTimeout(timeout);
  }, [visibleLogs]);

  // Setelah progress 100%, tunggu sebentar lalu transisi
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setExiting(true);
        setTimeout(() => setScreen("home"), 900);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, setScreen]);

  return (
    <motion.div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#05050A]"
      animate={exiting ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#05050A_75%)]" />

      {/* Ring scan di sekitar logo */}
      <div className="absolute flex h-80 w-80 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full border border-[#4A9EFF]/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#4A9EFF] shadow-[0_0_12px_#4A9EFF]" />
        </motion.div>
        <motion.div
          className="absolute inset-6 rounded-full border border-[#7C3AED]/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-12 rounded-full border border-[#4A9EFF]/8"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Logo Apple dengan materialize effect */}
      <motion.div
        className="relative z-10 mb-16"
        initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glow di belakang logo */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-[#4A9EFF]/20 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-24 w-24 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      </motion.div>

      {/* Progress bar */}
      <div className="relative z-10 mb-8 w-64">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#4A9EFF] via-[#7C3AED] to-[#4A9EFF]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 h-[2px] w-full"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </motion.div>
      </div>

      {/* Boot logs */}
      <div className="relative z-10 flex h-32 w-72 flex-col gap-1 font-mono text-[10px] tracking-wider text-[#4A9EFF]/50">
        {BOOT_LOGS.slice(0, visibleLogs).map((log, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white/30">&gt; {log}</span>
            <span className="text-[#4A9EFF]/70">OK</span>
          </motion.div>
        ))}
      </div>

      {/* Persentase */}
      <motion.p
        className="absolute bottom-12 font-mono text-xs tracking-[0.3em] text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {String(progress).padStart(3, "0")}%
      </motion.p>
    </motion.div>
  );
}