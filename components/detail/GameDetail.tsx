"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { useBreakout } from "@/lib/useBreakout";
import { useStore } from "@/lib/store";
import DetailHeader from "./DetailHeader";

export default function GameDetail() {
  const {
    canvasRef,
    state,
    score,
    lives,
    level,
    start,
    togglePause,
    CANVAS_W,
    CANVAS_H,
  } = useBreakout();

  const highScore = useStore((s) => s.highScore);
  const setHighScore = useStore((s) => s.setHighScore);

  // Update high score saat game over
  useEffect(() => {
    if (state === "gameover" && score > highScore) {
      setHighScore(score);
    }
  }, [state, score, highScore, setHighScore]);

  // Keyboard shortcut: Space untuk pause/start
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (state === "idle" || state === "gameover" || state === "win") {
          start();
        } else {
          togglePause();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state, start, togglePause]);

  return (
    <div className="relative flex h-full flex-col">
      <DetailHeader title="Breakout" subtitle="Nebula Arcade" accent="#7C3AED" />

      {/* Stats bar */}
      <div className="relative z-10 flex items-center justify-between px-6 pb-3">
        <div className="flex items-center gap-4">
          <Stat label="Score" value={score} />
          <Stat label="Level" value={level} />
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${
                i < lives ? "bg-[#EF4444]" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="no-scrollbar relative flex-1 overflow-hidden px-6 pb-4">
        <div className="relative mx-auto flex h-full max-w-md items-center justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="h-auto max-h-full w-full touch-none rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(124,58,237,0.3)]"
            style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
          />

          {/* Overlay state: idle */}
          <AnimatePresence>
            {state === "idle" && (
              <Overlay>
                <h3 className="text-xl font-semibold text-white">Breakout</h3>
                <p className="mt-1 text-xs text-white/50">Nebula Arcade</p>
                <p className="mt-4 max-w-[220px] text-center text-[11px] leading-relaxed text-white/40">
                  Gerakkan paddle dengan mouse atau jari. Hancurkan semua balok.
                </p>
                <PrimaryButton onClick={start}>Mulai</PrimaryButton>
                {highScore > 0 && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#F59E0B]/70">
                    High Score: {highScore}
                  </p>
                )}
              </Overlay>
            )}
          </AnimatePresence>

          {/* Overlay state: paused */}
          <AnimatePresence>
            {state === "paused" && (
              <Overlay>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#4A9EFF]/70">
                  Paused
                </p>
                <PrimaryButton onClick={togglePause}>Lanjut</PrimaryButton>
                <button
                  onClick={start}
                  className="mt-2 text-[11px] text-white/40 hover:text-white/70"
                >
                  Restart
                </button>
              </Overlay>
            )}
          </AnimatePresence>

          {/* Overlay state: gameover */}
          <AnimatePresence>
            {state === "gameover" && (
              <Overlay>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#EF4444]/70">
                  Game Over
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {score}
                </p>
                {score >= highScore && score > 0 && (
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-[#F59E0B]">
                    New High Score!
                  </p>
                )}
                <PrimaryButton onClick={start}>Main Lagi</PrimaryButton>
              </Overlay>
            )}
          </AnimatePresence>

          {/* Overlay state: win */}
          <AnimatePresence>
            {state === "win" && (
              <Overlay>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#10B981]/70">
                  Level Clear
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  Level {level}
                </p>
                <p className="mt-1 text-xs text-white/50">Score: {score}</p>
                <PrimaryButton onClick={start}>Level Baru</PrimaryButton>
              </Overlay>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// === Sub-komponen ===

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
        {label}
      </p>
      <p className="font-mono text-sm text-white">{value}</p>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="mt-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4A9EFF] px-6 py-2 text-xs font-medium uppercase tracking-widest text-white shadow-[0_0_24px_rgba(124,58,237,0.5)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}