export type DeskItemType =
  | "polaroid"
  | "certificate"
  | "notebook"
  | "laptop"
  | "camera"
  | "coffee"
  | "keyboard"
  | "pen-paper";

export type DeskItem = {
  id: DeskItemType;
  label: string;
  x: number;
  y: number;
  rotation: number;
  z: number;
  accent: string;
};

export const deskItems: DeskItem[] = [
  {
    id: "polaroid",
    label: "Polaroid",
    x: 18,
    y: 20,
    rotation: -8,
    z: 3,
    accent: "#4A9EFF",
  },
  {
    id: "notebook",
    label: "Notebook",
    x: 40,
    y: 14,
    rotation: 5,
    z: 2,
    accent: "#F59E0B",
  },
  {
    id: "laptop",
    label: "Laptop",
    x: 72,
    y: 16,
    rotation: -3,
    z: 4,
    accent: "#7C3AED",
  },
  {
    id: "camera",
    label: "Camera",
    x: 14,
    y: 56,
    rotation: 6,
    z: 2,
    accent: "#EF4444",
  },
  {
    id: "coffee",
    label: "Coffee",
    x: 42,
    y: 60,
    rotation: 0,
    z: 1,
    accent: "#D97706",
  },
  {
    id: "certificate",
    label: "Certificate",
    x: 70,
    y: 54,
    rotation: -10,
    z: 3,
    accent: "#10B981",
  },
  {
    id: "keyboard",
    label: "Keyboard",
    x: 26,
    y: 86,
    rotation: -2,
    z: 5,
    accent: "#6B7280",
  },
  {
    id: "pen-paper",
    label: "Contact",
    x: 70,
    y: 84,
    rotation: 12,
    z: 4,
    accent: "#10B981",
  },
];