"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import DetailHeader from "./DetailHeader";
import PasswordAnalyzer from "./security/PasswordAnalyzer";
import BreachChecker from "./security/BreachChecker";
import SecurityStats from "./security/SecurityStats";
import SecurityTips from "./security/SecurityTips";

type Tab = "password" | "breach" | "stats" | "tips";

const TABS: { id: Tab; label: string }[] = [
  { id: "password", label: "Password" },
  { id: "breach", label: "Breach" },
  { id: "stats", label: "Stats" },
  { id: "tips", label: "Tips" },
];

export default function SecurityLabDetail() {
  const [tab, setTab] = useState<Tab>("password");

  return (
    <div className="relative flex h-full flex-col">
      <DetailHeader title="Security Lab" subtitle="Cyber Awareness" accent="#10B981" />

      {/* Tabs */}
      <div className="relative z-10 flex gap-2 px-6 pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
              tab === t.id
                ? "bg-[#10B981]/20 text-[#10B981]"
                : "bg-white/5 text-white/40 hover:text-white/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "password" && <PasswordAnalyzer />}
            {tab === "breach" && <BreachChecker />}
            {tab === "stats" && <SecurityStats />}
            {tab === "tips" && <SecurityTips />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}