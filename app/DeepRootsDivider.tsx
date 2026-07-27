export default function DeepRootsDivider() {
  return (
    <div
      className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden"
      style={{ background: "var(--dark-forest)" }}
    >
      <svg
        className="absolute top-0 w-full h-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: var(--pine) - Connects directly to the ContactSection above */}
        <path
          d="M0,0 L1440,0 L1440,20 
             C1380,30 1360,110 1330,130 
             C1300,150 1260,60 1220,70 
             C1180,80 1160,160 1120,180 
             C1080,200 1020,80 980,100 
             C940,120 920,190 880,170 
             C840,150 800,50 760,70 
             C720,90 690,160 650,180 
             C610,200 550,60 510,80 
             C470,100 450,170 410,190 
             C370,210 310,70 270,90 
             C230,110 210,180 170,160 
             C130,140 80,40 40,60 
             C20,70 10,20 0,20 Z"
          fill="var(--pine)"
        />
        
        {/* Layer 2: var(--mid-forest) */}
        <path
          d="M0,0 L1440,0 L1440,10 
             C1390,10 1370,80 1340,90 
             C1310,100 1270,40 1230,50 
             C1190,60 1170,120 1130,140 
             C1090,160 1030,60 990,70 
             C950,80 930,140 890,130 
             C850,120 810,30 770,40 
             C730,50 700,110 660,130 
             C620,150 560,40 520,50 
             C480,60 460,120 420,140 
             C380,160 320,50 280,60 
             C240,70 220,130 180,120 
             C140,110 90,30 50,40 
             C30,45 15,10 0,10 Z"
          fill="var(--mid-forest)"
        />

        {/* Layer 3: var(--deep-forest) */}
        <path
          d="M0,0 L1440,0 L1440,5 
             C1400,5 1380,50 1350,60 
             C1320,70 1280,20 1240,30 
             C1200,40 1180,90 1140,100 
             C1100,110 1040,40 1000,50 
             C960,60 940,100 900,90 
             C860,80 820,20 780,25 
             C740,30 710,70 670,80 
             C630,90 570,25 530,30 
             C490,35 470,80 430,90 
             C390,100 330,30 290,40 
             C250,50 230,90 190,80 
             C150,70 100,20 60,25 
             C40,27 20,5 0,5 Z"
          fill="var(--deep-forest)"
        />

        {/* Subtle accent lines tracing the roots to add organic texture */}
        <path
          d="M1330,130 C1300,150 1260,60 1220,70
             M1120,180 C1080,200 1020,80 980,100
             M880,170 C840,150 800,50 760,70
             M650,180 C610,200 550,60 510,80
             M410,190 C370,210 310,70 270,90
             M170,160 C130,140 80,40 40,60"
          fill="none" stroke="#D4983A" strokeWidth="1.5" opacity="0.15" strokeLinecap="round"
        />
        <path
          d="M1340,90 C1310,100 1270,40 1230,50
             M1130,140 C1090,160 1030,60 990,70
             M890,130 C850,120 810,30 770,40
             M660,130 C620,150 560,40 520,50
             M420,140 C380,160 320,50 280,60
             M180,120 C140,110 90,30 50,40"
          fill="none" stroke="#C07840" strokeWidth="1.5" opacity="0.1" strokeLinecap="round"
        />
      </svg>
      
      {/* Glowing deep earth spores scattered through the roots */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <circle cx="150" cy="160" r="1.5" fill="#D4983A" />
          <circle cx="280" cy="110" r="2" fill="#D4983A" opacity="0.8" />
          <circle cx="400" cy="180" r="1" fill="#DEAE4A" opacity="0.6" />
          <circle cx="530" cy="90" r="1.5" fill="#D4983A" opacity="0.7" />
          <circle cx="680" cy="150" r="2.5" fill="#DEAE4A" opacity="0.5" />
          <circle cx="820" cy="130" r="1" fill="#D4983A" opacity="0.9" />
          <circle cx="950" cy="170" r="1.5" fill="#DEAE4A" opacity="0.4" />
          <circle cx="1100" cy="100" r="2" fill="#D4983A" opacity="0.7" />
          <circle cx="1250" cy="140" r="1.5" fill="#DEAE4A" opacity="0.8" />
          <circle cx="1380" cy="160" r="1" fill="#D4983A" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
