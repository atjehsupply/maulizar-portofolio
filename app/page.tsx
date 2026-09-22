"use client";

import dynamic from "next/dynamic";
import { useStore } from "@/lib/store";
import EntranceScreen from "@/components/screens/EntranceScreen";
import BootScreen from "@/components/screens/BootScreen";
import HomeScreen from "@/components/screens/HomeScreen";

// Lazy load DetailOverlay — hanya di-load saat screen === "home"
// Mengurangi bundle awal, mempercepat first paint
const DetailOverlay = dynamic(
  () => import("@/components/detail/DetailOverlay"),
  { ssr: false }
);

export default function Home() {
  const screen = useStore((s) => s.screen);

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#05050A]">
      {screen === "entrance" && <EntranceScreen />}
      {screen === "booting" && <BootScreen />}
      {screen === "home" && (
        <>
          <HomeScreen />
          <DetailOverlay />
        </>
      )}

      {/* Copyright */}
      <div className="pointer-events-none fixed bottom-3 left-1/2 z-[200] -translate-x-1/2 md:bottom-4 md:left-4 md:translate-x-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
          © MaulizarNauval 2024
        </p>
      </div>
    </main>
  );
}