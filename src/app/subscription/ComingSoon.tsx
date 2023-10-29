import type { ReactNode } from "react";

export default function ComingSoon() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      // blur the background
      style={{
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-4xl font-bold text-white">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
