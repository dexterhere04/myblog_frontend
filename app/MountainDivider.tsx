import React from "react";

function ForestRidgeDivider() {
  return (
    <div className="relative w-full h-56 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,180 C80,160 160,190 240,170 C320,150 400,180 480,160 C560,140 640,170 720,150 C800,130 880,160 960,140 C1040,120 1120,150 1200,130 C1280,110 1360,140 1440,120 L1440,320 L0,320 Z"
          fill="#142E22"
        />
      </svg>
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,220 C120,190 240,230 360,200 C480,170 600,210 720,190 C840,170 960,200 1080,180 C1200,160 1320,190 1440,170 L1440,320 L0,320 Z"
          fill="#1E3A2A"
        />
      </svg>
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,260 C160,230 320,270 480,240 C640,210 800,250 960,230 C1120,210 1280,240 1440,220 L1440,320 L0,320 Z"
          fill="#2D4A3A"
        />
      </svg>
    </div>
  );
}

export default ForestRidgeDivider;
