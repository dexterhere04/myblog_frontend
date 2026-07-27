export default function FallenLogDivider() {
  /*
   * ViewBox: 1400 × 118
   * Log centre y = 60, half-height ≈ 28 (top y≈32, bottom y≈88)
   * Log span: x = 84 → 1316
   */
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(80px, 11vw, 118px)",
        background:
          "linear-gradient(to bottom, var(--mid-forest) 0%, var(--pine) 62%, var(--dark-forest) 100%)",
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 118"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lgB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#7E5438" />
            <stop offset="18%"  stopColor="#6C4428" />
            <stop offset="48%"  stopColor="#542E18" />
            <stop offset="80%"  stopColor="#3C1C0A" />
            <stop offset="100%" stopColor="#260E06" />
          </linearGradient>

          <linearGradient id="lgW" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#924E28" stopOpacity="0.14" />
            <stop offset="28%"  stopColor="#924E28" stopOpacity="0" />
            <stop offset="72%"  stopColor="#924E28" stopOpacity="0" />
            <stop offset="100%" stopColor="#7A4A28" stopOpacity="0.10" />
          </linearGradient>

          <linearGradient id="lgU" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#291008" />
            <stop offset="100%" stopColor="#150804" />
          </linearGradient>

          <radialGradient id="rgL" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#D09A6A" />
            <stop offset="16%"  stopColor="#B07A4A" />
            <stop offset="34%"  stopColor="#906038" />
            <stop offset="50%"  stopColor="#A07048" />
            <stop offset="66%"  stopColor="#764830" />
            <stop offset="84%"  stopColor="#8A5838" />
            <stop offset="100%" stopColor="#3C1A0C" />
          </radialGradient>

          <radialGradient id="rgR" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#C08A5C" />
            <stop offset="18%"  stopColor="#A06A3E" />
            <stop offset="38%"  stopColor="#825030" />
            <stop offset="54%"  stopColor="#946040" />
            <stop offset="70%"  stopColor="#6C4020" />
            <stop offset="100%" stopColor="#3C1A0C" />
          </radialGradient>

          <clipPath id="cpL">
            <path d="M 88,31
              C 220,26 380,29 460,27 C 560,25 680,26 780,27
              C 880,28 1020,27 1160,29 C 1270,31 1290,31 1312,31
              A 7.5 29 0 0 1 1312 89 C 1160,91 1020,91 880,91
              C 780,91 680,91 560,91 C 460,91 380,89 220,88
              C 150,87 100,89 88,89 A 7.5 29 0 0 1 88 31 Z" />
          </clipPath>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="700" cy="100" rx="560" ry="12" fill="rgba(0,0,0,0.30)" />
        <ellipse cx="700" cy="104" rx="460" ry="7"  fill="rgba(0,0,0,0.16)" />
        <ellipse cx="700" cy="107" rx="340" ry="4"  fill="rgba(0,0,0,0.10)" />

        {/* Underside band */}
        <path d="
          M 88,89
          C 100,89 150,87 220,88 C 380,89 460,91 560,91
          C 680,91 780,91 880,91 C 1020,91 1160,91 1312,89
          L 1312,100 C 1160,102 1020,102 880,102
          C 780,102 680,102 560,102 C 460,102 380,100 220,99
          C 150,98 100,100 88,100 Z"
          fill="url(#lgU)" opacity="0.90" />

        {/* Log body */}
        <path
          d="M 88,31
             C 220,26 380,29 460,27 C 560,25 680,26 780,27
             C 880,28 1020,27 1160,29 C 1270,31 1290,31 1312,31
             A 7.5 29 0 0 1 1312 89 C 1160,91 1020,91 880,91
             C 780,91 680,91 560,91 C 460,91 380,89 220,88
             C 150,87 100,89 88,89 A 7.5 29 0 0 1 88 31 Z"
          fill="url(#lgB)" stroke="#1A0A06" strokeWidth="1.6"
        />

        {/* Warm-ends colour wash */}
        <path
          d="M 88,31
             C 220,26 380,29 460,27 C 560,25 680,26 780,27
             C 880,28 1020,27 1160,29 C 1270,31 1290,31 1312,31
             A 7.5 29 0 0 1 1312 89 C 1160,91 1020,91 880,91
             C 780,91 680,91 560,91 C 460,91 380,89 220,88
             C 150,87 100,89 88,89 A 7.5 29 0 0 1 88 31 Z"
          fill="url(#lgW)"
        />

        {/* Ambient light rim */}
        <path
          d="M 88,31
             C 220,26 380,29 460,27 C 560,25 680,26 780,27
             C 880,28 1020,27 1160,29 C 1270,31 1290,31 1312,31"
          fill="none" stroke="rgba(255,215,158,0.24)"
          strokeWidth="2.4" strokeLinecap="round"
        />

        {/* Bark grain curves — each has slightly varied control pts */}
        {([
          ["M 116,36 C 300,30 620,29 920,31 C 1120,32 1256,35 1310,39", 0.72],
          ["M 114,43 C 280,37 600,36 900,38 C 1110,39 1258,42 1312,46", 0.66],
          ["M 112,51 C 300,45 620,44 900,46 C 1100,47 1255,50 1312,54", 0.60],
          ["M 112,59 C 300,53 620,52 900,54 C 1100,55 1255,58 1312,62", 0.58],
          ["M 113,67 C 300,61 620,60 900,62 C 1100,63 1255,66 1311,70", 0.60],
          ["M 115,76 C 280,70 600,69 900,71 C 1110,72 1258,75 1310,79", 0.66],
          ["M 117,83 C 300,77 620,76 920,78 C 1120,79 1256,82 1310,86", 0.70],
        ] as [string, number][]).map(([d, op], i) => (
          <path key={`gr${i}`} d={d} fill="none"
            stroke="rgba(0,0,0,0.07)" strokeWidth="0.88"
            opacity={op} clipPath="url(#cpL)" />
        ))}

        {/* Major bark cracks — cubic beziers that meander */}
        {([
          ["M 242,33 C 240,52 244,66 241,89", 1.35, 0.58],
          ["M 528,27 C 526,48 530,64 527,91", 1.45, 0.62],
          ["M 838,27 C 840,50 836,66 838,91", 1.35, 0.56],
          ["M 1128,29 C 1126,50 1130,66 1127,89", 1.25, 0.54],
        ] as [string, number, number][]).map(([d, w, op], i) => (
          <path key={`cm${i}`} d={d} fill="none"
            stroke="#160806" strokeWidth={w} opacity={op} clipPath="url(#cpL)" />
        ))}

        {/* Minor fissures — clustered near the majors */}
        {([
          ["M 182,35 C 181,52 183,66 182,82", 0.7, 0.36],
          ["M 210,34 C 212,50 209,62 211,80", 0.6, 0.30],
          ["M 378,29 C 376,48 379,62 378,82", 0.8, 0.40],
          ["M 460,28 C 462,46 459,60 461,80", 0.7, 0.34],
          ["M 666,27 C 664,46 668,62 666,84", 0.75, 0.38],
          ["M 700,27 C 702,48 698,64 700,86", 0.65, 0.32],
          ["M 964,27 C 962,46 966,62 963,84", 0.75, 0.38],
          ["M 1002,28 C 1004,48 1000,64 1002,86", 0.65, 0.30],
          ["M 1222,31 C 1220,50 1224,66 1222,86", 0.75, 0.38],
        ] as [string, number, number][]).map(([d, w, op], i) => (
          <path key={`cf${i}`} d={d} fill="none"
            stroke="#1C0C06" strokeWidth={w} opacity={op} clipPath="url(#cpL)" />
        ))}

        {/* Horizontal bark checks */}
        <path d="M 598,50 C 618,49 648,50 676,49" fill="none"
          stroke="#160806" strokeWidth="0.65" opacity="0.30" clipPath="url(#cpL)" />
        <path d="M 908,44 C 928,43 958,44 988,43" fill="none"
          stroke="#160806" strokeWidth="0.58" opacity="0.26" clipPath="url(#cpL)" />

        {/* Knots — tear-drop shaped */}
        <g clipPath="url(#cpL)">
          <ellipse cx="324" cy="60" rx="11" ry="16" fill="#281008" opacity="0.76" />
          <path d="M 324,44 C 332,50 334,64 330,74 C 326,80 318,76 316,66 C 314,54 318,48 324,44 Z"
            fill="#1E0C06" opacity="0.32" />
          <ellipse cx="324" cy="60" rx="7.5" ry="10.5" fill="none"
            stroke="#160806" strokeWidth="1.1" opacity="0.52" />
          <ellipse cx="324" cy="60" rx="4.5" ry="6.5" fill="none"
            stroke="#160806" strokeWidth="0.8" opacity="0.40" />
          <ellipse cx="324" cy="60" rx="2"   ry="3"   fill="none"
            stroke="#160806" strokeWidth="0.6" opacity="0.30" />
          <ellipse cx="324" cy="60" rx="0.9" ry="1.4" fill="#120604" opacity="0.68" />
        </g>
        <g clipPath="url(#cpL)">
          <ellipse cx="894" cy="54" rx="8" ry="12" fill="#281008" opacity="0.70" />
          <ellipse cx="894" cy="54" rx="5.2" ry="7.8" fill="none"
            stroke="#160806" strokeWidth="0.9" opacity="0.48" />
          <ellipse cx="894" cy="54" rx="2.8" ry="4.2" fill="none"
            stroke="#160806" strokeWidth="0.7" opacity="0.36" />
          <ellipse cx="894" cy="54" rx="1"   ry="1.6" fill="#120604" opacity="0.62" />
        </g>

        {/* Moss — organic bezier paths, not ellipses */}
        <path
          d="M 148,32 C 165,25 200,23 232,24 C 258,25 278,23 292,26
             C 302,29 296,34 278,36 C 256,38 228,37 200,36
             C 178,37 158,36 144,34 Z"
          fill="var(--moss)" opacity="0.60"
        />
        <path d="M 158,29 C 176,24 205,22 234,24 C 256,25 272,23 284,26"
          fill="none" stroke="var(--lichen)" strokeWidth="3.8"
          opacity="0.28" strokeLinecap="round" />

        <path
          d="M 448,25 C 468,19 502,18 534,19 C 558,20 578,18 592,22
             C 600,25 594,30 574,32 C 548,34 518,33 490,32
             C 464,33 444,32 440,29 Z"
          fill="var(--moss)" opacity="0.54"
        />

        <path
          d="M 688,25 C 706,19 734,18 762,19 C 784,20 804,19 816,23
             C 824,26 816,31 800,33 C 776,35 748,34 720,33
             C 696,34 678,33 672,30 Z"
          fill="var(--moss-light)" opacity="0.48"
        />
        <path d="M 696,22 C 712,18 736,17 760,18 C 778,19 796,17 808,21"
          fill="none" stroke="var(--sage)" strokeWidth="3.2"
          opacity="0.22" strokeLinecap="round" />

        <path
          d="M 1048,27 C 1066,21 1094,20 1122,21 C 1144,22 1162,20 1172,24
             C 1180,27 1172,32 1152,34 C 1126,36 1098,35 1070,34
             C 1046,35 1030,34 1026,31 Z"
          fill="var(--moss)" opacity="0.52"
        />

        {/* Moss spore dots */}
        {([
          [154,30],[172,27],[198,26],[230,25],[260,25],[286,27],
          [454,23],[478,21],[510,21],[548,21],[576,23],
          [694,22],[716,20],[744,20],[772,20],[806,23],
          [1054,23],[1080,21],[1110,21],[1148,22],[1166,24],
        ] as [number,number][]).map(([cx, cy], i) => (
          <circle key={`md${i}`} cx={cx} cy={cy} r={1.5}
            fill="var(--moss-light)" opacity={0.26 + (i % 5) * 0.04} />
        ))}

        {/* Mushrooms — proper agaric arc caps, tapered stipes */}
        <g>
          <path d="M 402,19 C 400,13 407,10 415,11 C 424,10 430,13 428,19
                   C 424,22 406,22 402,19 Z" fill="#EED8A6" />
          <path d="M 403,19 C 408,21 412,22 415,22 C 418,22 422,21 427,20"
            fill="none" stroke="#C8B87A" strokeWidth="0.65" opacity="0.48" />
          <path d="M 412,21 C 411,23 412,27 414,27 C 416,27 417,23 416,21 Z"
            fill="#D4C08A" />
          <path d="M 432,19 C 430,14 436,11 442,12 C 448,11 452,15 450,19
                   C 447,22 434,22 432,19 Z" fill="#E8CFA0" />
          <path d="M 433,20 C 437,21 440,22 442,22 C 444,22 447,21 449,20"
            fill="none" stroke="#BEB07A" strokeWidth="0.55" opacity="0.42" />
          <path d="M 439,21 C 438,23 439,26 441,26 C 443,26 444,23 443,21 Z"
            fill="#CCBA88" />
        </g>
        <g>
          <path d="M 668,20 C 667,14 675,11 684,12 C 693,11 700,15 698,20
                   C 695,24 671,24 668,20 Z" fill="#F0DEB6" />
          <path d="M 669,21 C 674,22 679,23 684,23 C 689,23 694,22 697,21"
            fill="none" stroke="#CAC088" strokeWidth="0.60" opacity="0.42" />
          <path d="M 681,22 C 680,25 681,28 683,28 C 685,28 686,25 685,22 Z"
            fill="#D8C898" />
        </g>

        {/* Branch stub */}
        <path
          d="M 1016,30 C 1014,22 1010,15 1006,8 C 1003,4 1000,3 998,5
             C 995,9 999,16 1003,22 C 1007,27 1012,31 1016,32"
          fill="#5C3E28" stroke="#1A0A06" strokeWidth="1.5"
        />
        <ellipse cx="999" cy="5" rx="4.5" ry="3" fill="#8C6240"
          stroke="#1A0A06" strokeWidth="0.9" />
        <ellipse cx="999" cy="5" rx="2.8" ry="1.8" fill="none"
          stroke="#C89060" strokeWidth="0.6" opacity="0.55" />
        <ellipse cx="999" cy="5" rx="1.2" ry="0.8" fill="#B07040" opacity="0.52" />

        {/* Left cut-face */}
        <ellipse cx="88" cy="60" rx="7.5" ry="29"
          fill="#3A1A0C" stroke="#1A0A06" strokeWidth="1.6" />
        <ellipse cx="88" cy="60" rx="6" ry="27.5"
          fill="none" stroke="rgba(185,135,82,0.22)" strokeWidth="3.5" />
        <ellipse cx="88" cy="60" rx="6" ry="27.5" fill="url(#rgL)" />
        {([0.86, 0.70, 0.54, 0.38, 0.22] as number[]).map((s, i) => (
          <ellipse key={`rl${i}`} cx="88" cy="60"
            rx={6 * s} ry={27.5 * s} fill="none"
            stroke={i % 2 === 0 ? "rgba(0,0,0,0.20)" : "rgba(218,152,68,0.12)"}
            strokeWidth={i < 2 ? 1.05 : 0.72} />
        ))}
        {[0, 36, 72, 108, 144].map(a => (
          <line key={`mrl${a}`} x1="88" y1="60"
            x2={88 + Math.cos(a * Math.PI / 180) * 5.5}
            y2={60 + Math.sin(a * Math.PI / 180) * 25}
            stroke="rgba(200,145,68,0.11)" strokeWidth="0.65" />
        ))}
        <ellipse cx="88" cy="60" rx="1.5" ry="5.5" fill="#1E0C06" opacity="0.72" />

        {/* Right cut-face */}
        <ellipse cx="1312" cy="60" rx="7.5" ry="29"
          fill="#3A1A0C" stroke="#1A0A06" strokeWidth="1.6" />
        <ellipse cx="1312" cy="60" rx="6" ry="27.5"
          fill="none" stroke="rgba(185,135,82,0.20)" strokeWidth="3.5" />
        <ellipse cx="1312" cy="60" rx="6" ry="27.5" fill="url(#rgR)" />
        {([0.86, 0.70, 0.54, 0.38, 0.22] as number[]).map((s, i) => (
          <ellipse key={`rr${i}`} cx="1312" cy="60"
            rx={6 * s} ry={27.5 * s} fill="none"
            stroke={i % 2 === 0 ? "rgba(0,0,0,0.20)" : "rgba(218,152,68,0.12)"}
            strokeWidth={i < 2 ? 1.05 : 0.72} />
        ))}
        {[0, 36, 72, 108, 144].map(a => (
          <line key={`mrr${a}`} x1="1312" y1="60"
            x2={1312 + Math.cos(a * Math.PI / 180) * 5.5}
            y2={60   + Math.sin(a * Math.PI / 180) * 25}
            stroke="rgba(200,145,68,0.11)" strokeWidth="0.65" />
        ))}
        <ellipse cx="1312" cy="60" rx="1.5" ry="5.5" fill="#1E0C06" opacity="0.72" />

        {/* Forest floor leaves & needles */}
        {([
          [198,  97, 8,   3.2, -14, "#5A7230", 0.48],
          [370,  99, 9,   3.5,  11, "#7A5022", 0.44],
          [594, 101, 7.5, 3,   -20, "#4E6228", 0.46],
          [820, 100, 8,   3.5,  18, "#6A4A1C", 0.42],
          [1060, 98, 8,   3,   -12, "#4E6A28", 0.46],
          [1248, 97, 7.5, 3.2,   9, "#6C5022", 0.42],
        ] as [number,number,number,number,number,string,number][]).map(
          ([cx,cy,rx,ry,rot,fill,op], i) => (
          <ellipse key={`lf${i}`} cx={cx} cy={cy} rx={rx} ry={ry}
            fill={fill} opacity={op}
            transform={`rotate(${rot},${cx},${cy})`} />
        ))}
        <line x1="450"  y1="97" x2="492"  y2="104" stroke="#3A4C18" strokeWidth="1.1" opacity="0.38" />
        <line x1="742"  y1="99" x2="788"  y2="105" stroke="#3A4C18" strokeWidth="1.0" opacity="0.34" />
        <line x1="1096" y1="97" x2="1138" y2="103" stroke="#3A4C18" strokeWidth="1.1" opacity="0.36" />

        {/* Bottom shadow edge */}
        <path d="
          M 88,89
          C 100,89 150,87 220,88 C 380,89 460,91 560,91
          C 680,91 780,91 880,91 C 1020,91 1160,91 1312,89"
          fill="none" stroke="rgba(0,0,0,0.22)"
          strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
