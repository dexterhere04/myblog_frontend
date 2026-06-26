import React from "react";

function MountainDivider() {
  return (
    <div className="relative w-full h-56 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,180 C240,140 480,220 720,200 960,180 1200,140 1440,160 L1440,320 L0,320 Z" fill="#f2eadf" />
      </svg>
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,200 C300,160 500,260 760,220 1020,180 1200,200 1440,180 L1440,320 L0,320 Z" fill="#e3d5c3" />
      </svg>
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,230 C260,200 520,260 780,240 1040,220 1200,240 1440,220 L1440,320 L0,320 Z" fill="#d4c1a6" />
      </svg>
    </div>
  );
}

export default MountainDivider;
