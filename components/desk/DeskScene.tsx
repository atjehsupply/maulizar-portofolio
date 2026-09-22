"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { deskItems } from "@/data/desk";
import { useStore } from "@/lib/store";
import DeskItem from "./DeskItem";
import InfoPanel from "./InfoPanel";
import PolaroidPhoto from "./items/PolaroidPhoto";
import Certificate from "./items/Certificate";
import Notebook from "./items/Notebook";
import Laptop from "./items/Laptop";
import Camera from "./items/Camera";
import CoffeeCup from "./items/CoffeeCup";
import Keyboard from "./items/Keyboard";
import PenPaper from "./items/PenPaper";

const ITEM_COMPONENTS: Record<string, React.ComponentType> = {
  polaroid: PolaroidPhoto,
  certificate: Certificate,
  notebook: Notebook,
  laptop: Laptop,
  camera: Camera,
  coffee: CoffeeCup,
  keyboard: Keyboard,
  "pen-paper": PenPaper,
};

export default function DeskScene() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const closeDetail = useStore((s) => s.closeDetail);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Rotasi meja
  const rotateY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDragged.current = true;
    }

    const rotFactor = isMobile ? 0.15 : 0.3;
    const rotXFactor = isMobile ? 0.1 : 0.2;

    rotateY.set(
      Math.max(-25, Math.min(25, rotateY.get() + dx * rotFactor))
    );
    rotateX.set(
      Math.max(-15, Math.min(15, rotateX.get() - dy * rotXFactor))
    );

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if (hasDragged.current) {
      setTimeout(() => {
        if (!isDragging.current) {
          rotateY.set(0);
          rotateX.set(0);
        }
      }, 1200);
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="no-scrollbar relative h-full w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-[#0a0a18] to-[#05050A]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05050A_100%)]" />

      {/* Tombol Back */}
      <motion.button
        onClick={closeDetail}
        className="absolute left-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        aria-label="Back"
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
      </motion.button>

      {/* Title bar */}
      <div className="absolute left-0 right-0 top-6 z-20 flex flex-col items-center gap-1 px-4 md:top-8">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#4A9EFF]/60">
          The Desk
        </span>
        <h1 className="text-center text-sm font-semibold tracking-tight text-white/80 md:text-lg">
          Tap sesuatu untuk mulai
        </h1>
      </div>

      {/* Meja 3D — sama di semua device */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1400px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        <motion.div
          className="relative aspect-square cursor-grab touch-none active:cursor-grabbing"
          style={{
            transformStyle: "preserve-3d",
            rotateY: springY,
            rotateX: springX,
            // KUNCI: ukuran meja selalu 448px, tapi di-scale di mobile
            width: "448px",
            height: "448px",
            transform: isMobile
              ? `scale(0.72) translateY(-4%)`
              : "scale(1)",
          }}
        >
          {/* Permukaan meja */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3D2415] via-[#2A1810] to-[#1A0F08] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -5deg,
                  transparent,
                  transparent 3px,
                  rgba(0,0,0,0.15) 3px,
                  rgba(0,0,0,0.15) 4px
                )`,
              }}
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-black/20" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-amber-950/40" />
          </div>

          {/* Benda-benda */}
          <div className="absolute inset-0">
            {deskItems.map((item) => {
              const Component = ITEM_COMPONENTS[item.id];
              if (!Component) return null;

              return (
                <DeskItem
                  key={item.id}
                  x={item.x}
                  y={item.y}
                  rotation={item.rotation}
                  z={item.z}
                  label={item.label}
                  accent={item.accent}
                  active={activeItem === item.id}
                  onClick={() =>
                    setActiveItem(activeItem === item.id ? null : item.id)
                  }
                >
                  <Component />
                </DeskItem>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Info panel */}
      <InfoPanel itemId={activeItem} onClose={() => setActiveItem(null)} />

      {/* Hint */}
      {!activeItem && (
        <motion.div
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center md:bottom-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
            {isMobile ? "Tap benda untuk membuka" : "Drag untuk putar meja"}
          </p>
        </motion.div>
      )}
    </div>
  );
}