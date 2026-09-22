export type AppItem = {
  id: string;
  label: string;
  icon: string;
  accent: string;
  detail:
    | "profile"
    | "projects"
    | "gallery"
    | "contact"
    | "camera"
    | "game"
    | "security"
    | "journey";
};

export const gridApps: AppItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: "/icons/profile.svg",
    accent: "#4A9EFF",
    detail: "profile",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "/icons/projects.svg",
    accent: "#7C3AED",
    detail: "projects",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: "/icons/gallery.svg",
    accent: "#F59E0B",
    detail: "gallery",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "/icons/contact.svg",
    accent: "#10B981",
    detail: "contact",
  },
];

export const dockApps: (AppItem | null)[] = [
  {
    id: "security",
    label: "Security",
    icon: "/icons/security.svg",
    accent: "#10B981",
    detail: "security",
  },
  {
    id: "camera",
    label: "Camera",
    icon: "/icons/camera.svg",
    accent: "#EF4444",
    detail: "camera",
  },
  {
    id: "game",
    label: "Breakout",
    icon: "/icons/game.svg",
    accent: "#7C3AED",
    detail: "game",
  },
  {
    id: "journey",
    label: "Journey",
    icon: "/icons/journey.svg",
    accent: "#4A9EFF",
    detail: "journey",
  },
];