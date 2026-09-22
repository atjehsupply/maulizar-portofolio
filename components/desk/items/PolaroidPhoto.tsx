"use client";

import Image from "next/image";
import { profile } from "@/data/profile";

export default function PolaroidPhoto() {
  return (
    <div
      className="relative w-32 rounded-sm bg-white p-2 pb-8 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
      style={{
        transform: "rotate(0deg)",
      }}
    >
      {/* Foto */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
        <Image
          src={profile.photo}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>

      {/* Caption tulisan tangan */}
      <p
        className="absolute bottom-2 left-0 right-0 text-center text-[9px] text-gray-800"
        style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
      >
        {profile.name.split(" ")[0]}
      </p>
    </div>
  );
}