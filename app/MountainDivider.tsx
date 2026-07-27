export default function ForestRidgeDivider() {
  return (
    <div className="relative w-full h-56 sm:h-64 overflow-hidden -mt-48 sm:-mt-52 md:-mt-56 lg:-mt-60">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        {/* Back ridge — darkest */}
        <path
          d="M0,160 C100,140 200,165 300,155 C400,145 500,170 600,150 C700,130 800,160 900,145
             C1000,130 1100,155 1200,140 C1300,125 1400,150 1440,140 L1440,320 L0,320 Z"
          fill="var(--deep-forest)"
        />
        {/* Middle ridge */}
        <path
          d="M0,210 C120,180 240,220 360,195 C480,170 600,215 720,195 C840,175 960,210 1080,190
             C1200,170 1320,200 1440,185 L1440,320 L0,320 Z"
          fill="var(--pine)"
        />
        {/* Front ridge — lightest */}
        <path
          d="M0,260 C160,235 320,270 480,245 C640,220 800,265 960,240 C1120,215 1280,250 1440,235
             L1440,320 L0,320 Z"
          fill="var(--pine-light)"
        />
        {/* Mist layer overlay */}
        <path
          d="M0,290 C200,270 400,300 600,280 C800,260 1000,290 1200,275 C1320,265 1400,280 1440,285
             L1440,320 L0,320 Z"
          fill="var(--dark-forest)"
        />
      </svg>
    </div>
  );
}
