"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { milestones, workshopItems } from "@/data/journey";
import DetailHeader from "./DetailHeader";

type ViewMode = "timeline" | "workshop";

export default function JourneyDetail() {
  const [view, setView] = useState<ViewMode>("timeline");
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // === DRAG-TO-SCROLL (desktop only) ===
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    e.preventDefault();
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    el.scrollLeft = scrollStart.current - dx;
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.userSelect = "";
    }
    isDragging.current = false;
  };

  // Reset drag state saat ganti view
  useEffect(() => {
    hasDragged.current = false;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [view]);

  return (
    <div className="relative flex h-full flex-col">
      <DetailHeader
        title="Journey"
        subtitle="15 Tahun Perjalanan"
        accent="#4A9EFF"
      />

      {/* Tab switcher */}
      <div className="relative z-10 flex gap-2 px-6 pb-4">
        <button
          onClick={() => setView("timeline")}
          className={`flex-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
            view === "timeline"
              ? "bg-[#4A9EFF]/20 text-[#4A9EFF]"
              : "bg-white/5 text-white/40 hover:text-white/70"
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setView("workshop")}
          className={`flex-1 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
            view === "workshop"
              ? "bg-[#7C3AED]/20 text-[#7C3AED]"
              : "bg-white/5 text-white/40 hover:text-white/70"
          }`}
        >
          Workshop
        </button>
      </div>

      {/* Timeline View */}
      {view === "timeline" && (
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`no-scrollbar relative flex-1 ${
            isMobile
              ? "overflow-y-auto px-6 pb-24"
              : "cursor-grab overflow-x-auto overflow-y-hidden px-6 pb-6 active:cursor-grabbing"
          }`}
        >
          <div
            className={`relative ${
              isMobile
                ? "flex flex-col gap-6"
                : "flex h-full min-w-max items-center gap-6"
            }`}
          >
            {milestones.map((m, i) => (
              <TimelineCard
                key={m.id}
                milestone={m}
                index={i}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Hint */}
          <p className="mt-6 text-center font-mono text-[9px] uppercase tracking-widest text-white/20">
            {isMobile ? "Scroll vertikal" : "Drag atau scroll horizontal →"}
          </p>
        </div>
      )}

      {/* Workshop View */}
      {view === "workshop" && (
        <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-24">
          <div className="space-y-4">
            {workshopItems.map((item, i) => (
              <WorkshopCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineCard({
  milestone,
  index,
  isMobile,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isMobile: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative shrink-0 ${isMobile ? "w-full" : "w-72"}`}
    >
      {/* Garis timeline (desktop) */}
      {!isMobile && (
        <div className="absolute left-0 top-1/2 -z-10 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      {/* Card */}
      <div
        className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
        style={{
          boxShadow: `0 0 40px ${milestone.accent}10`,
        }}
      >
        {/* Accent bar atas */}
        <div
          className="absolute -top-px left-5 right-5 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${milestone.accent}, transparent)`,
          }}
        />

        {/* Year + tag */}
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-3xl font-semibold tracking-tight"
            style={{ color: milestone.accent }}
          >
            {milestone.year}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
            style={{
              borderColor: `${milestone.accent}40`,
              color: `${milestone.accent}CC`,
              background: `${milestone.accent}10`,
            }}
          >
            {milestone.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-base font-semibold text-white">
          {milestone.title}
        </h3>
        <p className="mt-0.5 text-xs text-white/50">{milestone.subtitle}</p>

        {/* Description */}
        <p className="mt-3 text-[11px] leading-relaxed text-white/60">
          {milestone.description}
        </p>

        {/* Dot pada garis timeline (desktop) */}
        {!isMobile && (
          <div
            className="absolute -bottom-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{
              background: milestone.accent,
              boxShadow: `0 0 8px ${milestone.accent}`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

function WorkshopCard({
  item,
  index,
}: {
  item: (typeof workshopItems)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-white/[0.03]"
      >
        <div
          className="mt-1 h-2 w-2 shrink-0 rounded-full"
          style={{
            background: item.accent,
            boxShadow: `0 0 8px ${item.accent}`,
          }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white">{item.title}</h3>
          <p className="mt-0.5 text-[11px] text-white/50">{item.subtitle}</p>
        </div>
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1 h-4 w-4 shrink-0 text-white/30"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      {/* Content */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/5"
        >
          <div className="space-y-4 p-4">
            <WorkshopBlock
              label="Challenge"
              text={item.challenge}
              accent={item.accent}
            />
            <WorkshopBlock
              label="Approach"
              text={item.approach}
              accent={item.accent}
            />
            <WorkshopBlock
              label="Result"
              text={item.result}
              accent={item.accent}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function WorkshopBlock({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent: string;
}) {
  return (
    <div>
      <p
        className="font-mono text-[9px] uppercase tracking-widest"
        style={{ color: `${accent}CC` }}
      >
        {label}
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-white/60">
        {text}
      </p>
    </div>
  );
}