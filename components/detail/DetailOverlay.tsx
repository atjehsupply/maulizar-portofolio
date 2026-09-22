"use client";

import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/lib/store";
import ProfileDetail from "./ProfileDetail";
import ProjectsDetail from "./ProjectsDetail";
import ProjectItemDetail from "./ProjectItemDetail";
import GalleryDetail from "./GalleryDetail";
import ContactDetail from "./ContactDetail";
import CameraDetail from "./CameraDetail";
import GameDetail from "./GameDetail";
import SecurityLabDetail from "./SecurityLabDetail";
import JourneyDetail from "./JourneyDetail";

export default function DetailOverlay() {
  const activeDetail = useStore((s) => s.activeDetail);
  const activeProjectId = useStore((s) => s.activeProjectId);
  const closeDetail = useStore((s) => s.closeDetail);

  let content = null;
  if (activeDetail === "profile") content = <ProfileDetail />;
  else if (activeDetail === "projects") {
    content = activeProjectId ? <ProjectItemDetail /> : <ProjectsDetail />;
  } else if (activeDetail === "gallery") content = <GalleryDetail />;
  else if (activeDetail === "contact") content = <ContactDetail />;
  else if (activeDetail === "camera") content = <CameraDetail />;
  else if (activeDetail === "game") content = <GameDetail />;
  else if (activeDetail === "security") content = <SecurityLabDetail />;
  else if (activeDetail === "journey") content = <JourneyDetail />;

  const accents: Record<string, string> = {
    profile: "#4A9EFF",
    projects: "#7C3AED",
    gallery: "#F59E0B",
    contact: "#10B981",
    camera: "#EF4444",
    game: "#7C3AED",
    security: "#10B981",
    journey: "#4A9EFF",
  };
  const accent = activeDetail ? accents[activeDetail] : "#4A9EFF";

  return (
    <AnimatePresence>
      {activeDetail && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDetail}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="no-scrollbar relative h-full w-full overflow-hidden bg-[#0A0A12] sm:h-[95vh] sm:max-h-[900px] sm:w-full sm:max-w-md sm:rounded-[2.5rem]"
              style={{
                boxShadow: `0 30px 100px ${accent}30, 0 0 0 1px ${accent}20`,
              }}
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 28,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-48"
                style={{
                  background: `radial-gradient(ellipse at top, ${accent}25, transparent 70%)`,
                }}
              />

              <div className="relative z-10 h-full overflow-hidden">
                {content}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}