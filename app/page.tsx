"use client";

import dynamic from "next/dynamic";
import { useStore } from "@/lib/store";
import EntranceScreen from "@/components/screens/EntranceScreen";
import BootScreen from "@/components/screens/BootScreen";
import HomeScreen from "@/components/screens/HomeScreen";

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
    </main>
  );
}