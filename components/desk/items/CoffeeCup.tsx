"use client";

export default function CoffeeCup() {
  return (
    <div className="relative w-12">
      {/* Uap */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 space-y-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-0.5 rounded-full bg-white/10"
            style={{
              marginLeft: `${i * 3 - 3}px`,
              animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Cangkir */}
      <div className="relative h-12 w-12 rounded-b-[40%] rounded-t-md bg-gradient-to-b from-white to-gray-200 shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
        {/* Handle */}
        <div className="absolute -right-2 top-2 h-6 w-3 rounded-r-full border-2 border-l-0 border-gray-200" />

        {/* Kopi */}
        <div className="absolute left-1 right-1 top-0.5 h-2 rounded-[50%] bg-gradient-to-b from-[#3D1E06] to-[#5C2E0A]" />

        {/* Steam effect di kopi */}
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-900/20 blur-sm" />
      </div>
    </div>
  );
}