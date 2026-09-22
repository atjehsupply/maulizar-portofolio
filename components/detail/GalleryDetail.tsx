"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { artworks } from "@/data/gallery";
import { useStore } from "@/lib/store";
import DetailHeader from "./DetailHeader";

type Tab = "art" | "selfie";

const BLUR_PLACEHOLDER =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

export default function GalleryDetail() {
  const [tab, setTab] = useState<Tab>("art");
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isTransitioning = useRef(false);

  const selfies = useStore((s) => s.selfies);
  const removeSelfie = useStore((s) => s.removeSelfie);

  // Deteksi prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const closeViewer = () => setSelected(null);

  const nextImage = () => {
    if (selected === null || isTransitioning.current) return;
    isTransitioning.current = true;
    setDirection(1);
    setSelected((selected + 1) % artworks.length);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 300);
  };

  const prevImage = () => {
    if (selected === null || isTransitioning.current) return;
    isTransitioning.current = true;
    setDirection(-1);
    setSelected((selected - 1 + artworks.length) % artworks.length);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 300);
  };

  useEffect(() => {
    if (selected === null || tab !== "art") return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, tab]);

  // Durasi animasi — hormati prefers-reduced-motion
  const dur = prefersReducedMotion ? 0.01 : 0.4;

  return (
    <div className="relative flex h-full flex-col">
      <DetailHeader title="Gallery" subtitle="3D Artworks" accent="#F59E0B" />

      {/* Tabs */}
      <div className="relative z-10 flex gap-2 px-6 pb-4">
        <button
          onClick={() => {
            setTab("art");
            setSelected(null);
          }}
          className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
            tab === "art"
              ? "bg-[#F59E0B]/20 text-[#F59E0B]"
              : "bg-white/5 text-white/40 hover:text-white/70"
          }`}
        >
          3D Artworks
        </button>
        <button
          onClick={() => {
            setTab("selfie");
            setSelected(null);
          }}
          className={`rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors ${
            tab === "selfie"
              ? "bg-[#4A9EFF]/20 text-[#4A9EFF]"
              : "bg-white/5 text-white/40 hover:text-white/70"
          }`}
        >
          Selfies {selfies.length > 0 && `(${selfies.length})`}
        </button>
      </div>

      {/* Content */}
      <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-24">
        {tab === "art" && (
          <div className="grid grid-cols-2 gap-3">
            {artworks.map((art, i) => (
              <motion.button
                key={art.id}
                onClick={() => setSelected(i)}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.05 + i * 0.03,
                  duration: dur,
                }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                <Image
                  src={art.thumbnail}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 200px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-[10px] font-medium text-white/90">
                    {art.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {tab === "selfie" && (
          <>
            {selfies.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-white/30"
                  >
                    <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
                <p className="text-sm text-white/40">Belum ada selfie.</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                  Buka Camera untuk memulai
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {selfies.map((selfie, i) => (
                  <motion.div
                    key={selfie.id}
                    className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : i * 0.05,
                      duration: dur,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selfie.dataUrl}
                      alt="Selfie"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => removeSelfie(selfie.id)}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white/70 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:text-white"
                      aria-label="Delete"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {selected !== null && tab === "art" && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
          >
            <motion.button
              onClick={closeViewer}
              className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.92 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.15 }}
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

            <div className="absolute left-5 top-5 z-30 font-mono text-xs tracking-widest text-white/40">
              {String(selected + 1).padStart(2, "0")} /{" "}
              {String(artworks.length).padStart(2, "0")}
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={artworks[selected].id}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: prefersReducedMotion ? 0 : direction > 0 ? 60 : -60,
                    scale: prefersReducedMotion ? 1 : 0.97,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: prefersReducedMotion ? 0 : direction > 0 ? -60 : 60,
                    scale: prefersReducedMotion ? 1 : 0.97,
                  }}
                  transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={artworks[selected].image}
                    alt={artworks[selected].title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Previous"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Next"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={`story-${artworks[selected].id}`}
                className="relative z-20 shrink-0 border-t border-white/5 px-6 py-5"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                transition={{ duration: dur, delay: prefersReducedMotion ? 0 : 0.05 }}
              >
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  {artworks[selected].title}
                </h2>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {artworks[selected].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-3 max-w-3xl text-sm italic leading-relaxed text-white/60">
                  {artworks[selected].story}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}