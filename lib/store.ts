import { create } from "zustand";

export type ScreenState = "entrance" | "booting" | "home";
export type DetailType =
  | "profile"
  | "projects"
  | "gallery"
  | "contact"
  | "camera"
  | "game"
  | "security"
  | "journey";

export type Selfie = {
  id: string;
  dataUrl: string;
  createdAt: number;
};

type Store = {
  screen: ScreenState;
  activeDetail: DetailType | null;
  activeProjectId: string | null;
  selfies: Selfie[];
  highScore: number;

  setScreen: (screen: ScreenState) => void;
  openDetail: (detail: DetailType) => void;
  closeDetail: () => void;
  openProject: (projectId: string) => void;
  closeProject: () => void;
  addSelfie: (dataUrl: string) => void;
  removeSelfie: (id: string) => void;
  setHighScore: (score: number) => void;
};

export const useStore = create<Store>()((set) => ({
  screen: "entrance",
  activeDetail: null,
  activeProjectId: null,
  selfies: [],
  highScore: 0,

  setScreen: (screen) => set({ screen }),
  openDetail: (detail) => set({ activeDetail: detail, activeProjectId: null }),
  closeDetail: () => set({ activeDetail: null, activeProjectId: null }),
  openProject: (projectId) => set({ activeProjectId: projectId }),
  closeProject: () => set({ activeProjectId: null }),
  addSelfie: (dataUrl) =>
    set((state) => ({
      selfies: [
        { id: `selfie-${Date.now()}`, dataUrl, createdAt: Date.now() },
        ...state.selfies,
      ],
    })),
  removeSelfie: (id) =>
    set((state) => ({
      selfies: state.selfies.filter((s) => s.id !== id),
    })),
  setHighScore: (score) => set({ highScore: score }),
}));