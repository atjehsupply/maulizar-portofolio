"use client";

import { motion } from "motion/react";
import { gridApps, dockApps } from "@/data/apps";
import AppIcon from "./AppIcon";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function PhoneScreen() {
  const openDetail = useStore((s) => s.openDetail);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B] via-[#0F0A2E] to-[#05050A]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,158,255,0.25),transparent_55%)]" />

      {/* Status bar */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-3 text-white">
        <span className="text-[13px] font-semibold">{time}</span>
        <div className="flex items-center gap-1.5">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="10" width="2.5" height="5" rx="0.5" />
            <rect x="5" y="7" width="2.5" height="8" rx="0.5" />
            <rect x="9" y="4" width="2.5" height="11" rx="0.5" />
            <rect x="13" y="1" width="2.5" height="14" rx="0.5" />
          </svg>
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8 8c1.4 0 2.7.5 3.7 1.4l1-1A6.5 6.5 0 0 0 8 6.5 6.5 6.5 0 0 0 3.3 8.4l1 1A5 5 0 0 1 8 8zM8 3c2.4 0 4.6.9 6.2 2.4l1-1A9 9 0 0 0 8 1.5 9 9 0 0 0 .8 4.4l1 1A7.5 7.5 0 0 1 8 3z" />
          </svg>
          <div className="flex items-center gap-0.5">
            <div className="relative h-3 w-6 rounded-[3px] border border-white/60 p-[1px]">
              <div className="h-full w-[70%] rounded-[1.5px] bg-white" />
            </div>
            <div className="h-1.5 w-0.5 rounded-r bg-white/60" />
          </div>
        </div>
      </div>

      <div className="h-10" />

      {/* Grid icon utama */}
      <div className="relative z-10 grid grid-cols-4 gap-x-3 gap-y-5 px-6">
        {gridApps.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
          >
            <AppIcon app={app} onClick={() => openDetail(app.detail)} />
          </motion.div>
        ))}
      </div>

      {/* Dock */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-3xl bg-white/10 px-4 py-2.5 backdrop-blur-xl">
        {dockApps.map((app, i) =>
          app ? (
            <motion.button
              key={app.id}
              onClick={() => openDetail(app.detail)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl shadow-md transition-transform"
              style={{
                background: `linear-gradient(145deg, ${app.accent}, ${app.accent}CC)`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
              aria-label={app.label}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent opacity-60" />
              <DockIcon id={app.id} />

              {/* Badge NEW untuk journey */}
              {app.id === "journey" && (
                <motion.span
                  className="absolute -right-1 -top-1 z-20 rounded-full bg-gradient-to-r from-[#4A9EFF] to-[#7C3AED] px-1.5 py-[1px] font-mono text-[7px] font-bold uppercase tracking-wider text-white shadow-[0_0_8px_rgba(74,158,255,0.6)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 400 }}
                >
                  New
                </motion.span>
              )}

              {/* Dot hijau untuk Security (active) */}
              {app.id === "security" && (
                <motion.span
                  className="absolute right-0 top-0 z-20 h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]"
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          ) : (
            <div
              key={i}
              className="h-10 w-10 rounded-xl bg-white/5"
              aria-hidden
            />
          )
        )}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-1.5 left-1/2 z-10 h-1 w-28 -translate-x-1/2 rounded-full bg-white/40" />
    </div>
  );
}

// Icon SVG untuk dock
function DockIcon({ id }: { id: string }) {
  const iconClass = "relative z-10 h-5 w-5 text-white";
  switch (id) {
    case "security":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "camera":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case "game":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" />
          <line x1="18" y1="11" x2="18.01" y2="11" />
          <rect x="2" y="6" width="20" height="12" rx="4" />
        </svg>
      );
    case "journey":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    default:
      return null;
  }
}