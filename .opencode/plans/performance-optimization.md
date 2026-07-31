# Performance Optimization Plan

## Overview

Aggressive quality-tiered rendering for the Three.js waterfall, lazy audio loading, code splitting, and CSS optimizations to dramatically reduce GPU, RAM, and CPU usage across devices.

---

## Step 1 — Create `app/useDeviceCapability.ts`

New file — detects device capability and returns `"low" | "medium" | "high"`.

```ts
"use client"

import { useState, useEffect } from "react"

export type QualityTier = "low" | "medium" | "high"

declare global {
  interface Navigator {
    deviceMemory?: number
  }
}

function detectTier(): QualityTier {
  if (typeof window === "undefined") return "high"

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
  const concurrency = navigator.hardwareConcurrency ?? 4
  const memory = navigator.deviceMemory ?? 4
  const isSmallScreen = window.innerWidth < 768

  if (
    isMobile ||
    isSmallScreen ||
    concurrency <= 4 ||
    memory <= 4
  ) {
    return "low"
  }

  if (concurrency <= 7 || memory <= 6) {
    return "medium"
  }

  if (isTouch && concurrency <= 8) {
    return "medium"
  }

  return "high"
}

export function useDeviceCapability(): QualityTier {
  const [tier, setTier] = useState<QualityTier>(() => detectTier())

  useEffect(() => {
    setTier(detectTier())
  }, [])

  return tier
}
```

---

## Step 2 — Modify `app/WaterfallBackground.tsx` (High Impact)

Quality-aware rendering with drastic cuts on low tier.

### Changes:

**a) Configuration constants become quality-dependent:**

Replace static constants with a function that returns quality-dependent values:

```ts
function getConfig(q: QualityTier) {
  switch (q) {
    case "low":
      return {
        WALL_SEG_W: 16,
        WALL_SEG_H: 14,
        WALL_LAYERS: 1,
        SHOW_FOLIAGE: false,
        SHOW_CANOPY: false,
        SHOW_MIST: false,
        SHOW_RAYS: false,
        DPR: [0.5, 0.75] as [number, number],
        ANTIALIAS: false,
        FRAMELOOP: "demand" as const,
        FPS: 20,
      }
    case "medium":
      return {
        WALL_SEG_W: 32,
        WALL_SEG_H: 28,
        WALL_LAYERS: 2,
        SHOW_FOLIAGE: true,
        SHOW_CANOPY: true,
        SHOW_MIST: true,
        SHOW_RAYS: false,
        DPR: [0.75, 1.25] as [number, number],
        ANTIALIAS: false,
        FRAMELOOP: "demand" as const,
        FPS: 30,
      }
    default:
      return {
        WALL_SEG_W: 48,
        WALL_SEG_H: 40,
        WALL_LAYERS: 3,
        SHOW_FOLIAGE: true,
        SHOW_CANOPY: true,
        SHOW_MIST: true,
        SHOW_RAYS: true,
        DPR: [1, 1.5] as [number, number],
        ANTIALIAS: true,
        FRAMELOOP: "demand" as const,
        FPS: 60,
      }
  }
}
```

**b) Add `quality` prop to `WaterfallBackground`:**

```ts
export default function WaterfallBackground({ quality }: { quality: QualityTier }) {
```

**c) Frame throttling:**

Use `frameloop="demand"` and invalidate at the target FPS via `setInterval`:

```ts
const [ready, setReady] = useState(false)
const invalidate = useThree((s) => s.invalidate)

useEffect(() => {
  setReady(true)
}, [])

useEffect(() => {
  if (!ready) return
  const interval = setInterval(() => {
    invalidate()
  }, 1000 / config.FPS)
  return () => clearInterval(interval)
}, [ready, config.FPS, invalidate])
```

Wait — `useThree` must be inside the Canvas. We need a separate `ThrottleFrames` component inside `SceneContent`.

```tsx
function ThrottleFrames({ fps }: { fps: number }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    const id = setInterval(() => invalidate(), 1000 / fps)
    return () => clearInterval(id)
  }, [fps, invalidate])
  return null
}
```

**d) SceneContent conditions out layers based on quality:**

```tsx
<group ref={groupRef}>
  <CliffFace />
  {config.WALL_LAYERS >= 1 && <WaterWallLayer speed={0.35} opacity={0.65} zOff={0} />}
  {config.WALL_LAYERS >= 2 && <WaterWallLayer speed={0.6} opacity={0.45} zOff={0.15} />}
  {config.WALL_LAYERS >= 3 && <WaterWallLayer speed={1.0} opacity={0.3} zOff={0.3} />}
  {config.SHOW_CANOPY && <ForestCanopy />}
  {config.SHOW_FOLIAGE && <SideFoliage side="left" />}
  {config.SHOW_FOLIAGE && <SideFoliage side="right" />}
  <Foreground />
  {config.SHOW_RAYS && <LightRays mouse={mouse} />}
  {config.SHOW_MIST && <MistLayer />}
  <WaterPool />
  <ThrottleFrames fps={config.FPS} />
</group>
```

**e) Dispose cleanup:**

Add cleanup `useEffect` to dispose geometries and materials when Canvas unmounts:

In SceneContent:
```tsx
useEffect(() => {
  return () => {
    groupRef.current?.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose()
        if (obj.material instanceof THREE.ShaderMaterial) {
          obj.material.dispose()
        }
      }
    })
  }
}, [])
```

**f) DPR removed from component state, use config:**

```tsx
<Canvas
  dpr={config.DPR}
  frameloop={config.FRAMELOOP}
  gl={{
    antialias: config.ANTIALIAS,
    // ... rest same
  }}
>
```

### Complete modified WaterfallBackground.tsx

```tsx
"use client"

import React, { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { QualityTier } from "./useDeviceCapability"

const WALL_RADIUS = 7
const WALL_HEIGHT = 14
const WALL_ARC = Math.PI * 0.92
const WALL_CURVE_DEPTH = 4
const WALL_BASE_Z = 3.5

const POOL_RADIUS = 6
const POOL_SEG = 48

const C = {
  deep: new THREE.Color(0x0a2e28),
  mid: new THREE.Color(0x1a5a4a),
  light: new THREE.Color(0x3a8a7a),
  foam: new THREE.Color(0xc0e0d4),
  mist: new THREE.Color(0xb8d0c8),
  pDeep: new THREE.Color(0x061a16),
  pSurf: new THREE.Color(0x0e2e26),
  pRipple: new THREE.Color(0x2a6a5a),
  fDark: new THREE.Color(0x142e22),
  fMid: new THREE.Color(0x2a4a3a),
  fLight: new THREE.Color(0x4a7a5a),
  rDark: new THREE.Color(0x222622),
  rMid: new THREE.Color(0x3a3e3a),
  rLight: new THREE.Color(0x5a5e5a),
  moss: new THREE.Color(0x3a5a3a),
  sun: new THREE.Color(0xd4a84b),
}

function getConfig(q: QualityTier) {
  switch (q) {
    case "low":
      return {
        WALL_SEG_W: 16,
        WALL_SEG_H: 14,
        WALL_LAYERS: 1,
        SHOW_FOLIAGE: false,
        SHOW_CANOPY: false,
        SHOW_MIST: false,
        SHOW_RAYS: false,
        DPR: [0.5, 0.75] as [number, number],
        ANTIALIAS: false,
        FPS: 20,
      }
    case "medium":
      return {
        WALL_SEG_W: 32,
        WALL_SEG_H: 28,
        WALL_LAYERS: 2,
        SHOW_FOLIAGE: true,
        SHOW_CANOPY: true,
        SHOW_MIST: true,
        SHOW_RAYS: false,
        DPR: [0.75, 1.25] as [number, number],
        ANTIALIAS: false,
        FPS: 30,
      }
    default:
      return {
        WALL_SEG_W: 48,
        WALL_SEG_H: 40,
        WALL_LAYERS: 3,
        SHOW_FOLIAGE: true,
        SHOW_CANOPY: true,
        SHOW_MIST: true,
        SHOW_RAYS: true,
        DPR: [1, 1.5] as [number, number],
        ANTIALIAS: true,
        FPS: 60,
      }
  }
}

// ─── Shared GLSL Noise ────────────────────────────────────────
const NOISE = `
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float n(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i+vec2(0,0)),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);
}
float f(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<5;i++){v+=a*n(p);p*=2.;a*=.5;}
  return v;
}
`

const VERT_UV = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`

// [Keep all shader strings exactly as they are — FRAG_WALL, FRAG_CLIFF, FRAG_FOLIAGE,
//  FRAG_CANOPY, FRAG_MIST, FRAG_FOREGROUND, FRAG_RAYS, FRAG_POOL]

// ─── Frame Throttle ────────────────────────────────────────────
function ThrottleFrames({ fps }: { fps: number }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    const id = setInterval(() => invalidate(), 1000 / fps)
    return () => clearInterval(id)
  }, [fps, invalidate])
  return null
}

// ─── Water Wall Layer ──────────────────────────────────────────
// Replace hardcoded WALL_SEG_W, WALL_SEG_H with config values.
// WaterWallLayer now accepts segW and segH props:

const WaterWallLayer = React.memo(function WaterWallLayer({
  speed, opacity, zOff, segW, segH,
}: {
  speed: number; opacity: number; zOff: number; segW: number; segH: number
}) {
  // ... (same as before, but use segW/segH in planeGeometry args)
  // Add useEffect cleanup for dispose.
})

// ─── SceneContent ──────────────────────────────────────────────
const SceneContent = React.memo(function SceneContent({
  mouse,
  reducedMotion,
  quality,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
  quality: QualityTier
}) {
  const config = getConfig(quality)
  const groupRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()

  useEffect(() => {
    return () => {
      groupRef.current?.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material?.dispose()
          }
        }
      })
    }
  }, [])

  // [keep existing resize layout useEffect]

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return
    const targetRotY = mouse.current.x * 0.025
    const targetRotX = mouse.current.y * 0.018
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      <CliffFace />
      {config.WALL_LAYERS >= 1 && (
        <WaterWallLayer speed={0.35} opacity={0.65} zOff={0} segW={config.WALL_SEG_W} segH={config.WALL_SEG_H} />
      )}
      {config.WALL_LAYERS >= 2 && (
        <WaterWallLayer speed={0.6} opacity={0.45} zOff={0.15} segW={config.WALL_SEG_W} segH={config.WALL_SEG_H} />
      )}
      {config.WALL_LAYERS >= 3 && (
        <WaterWallLayer speed={1.0} opacity={0.3} zOff={0.3} segW={config.WALL_SEG_W} segH={config.WALL_SEG_H} />
      )}
      {config.SHOW_CANOPY && <ForestCanopy />}
      {config.SHOW_FOLIAGE && <SideFoliage side="left" />}
      {config.SHOW_FOLIAGE && <SideFoliage side="right" />}
      <Foreground />
      {config.SHOW_RAYS && <LightRays mouse={mouse} />}
      {config.SHOW_MIST && <MistLayer />}
      <WaterPool />
      <ThrottleFrames fps={config.FPS} />
    </group>
  )
})

// ─── [keep useReducedMotion hook as is] ─────────────────────────

// ─── Main Export ────────────────────────────────────────────────
export default function WaterfallBackground({ quality }: { quality: QualityTier }) {
  const config = getConfig(quality)
  const mouse = useRef({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  return (
    <div
      id="waterfall-bg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 55, near: 0.1, far: 30 }}
        dpr={config.DPR}
        frameloop="demand"
        performance={{ min: 0.5 }}
        gl={{
          antialias: config.ANTIALIAS,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <color attach="background" args={["#060F0C"]} />
        <ambientLight intensity={0.3} />
        <SceneContent mouse={mouse} reducedMotion={reducedMotion} quality={quality} />
      </Canvas>
    </div>
  )
}
```

---

## Step 3 — Modify `app/layout.tsx`

### Changes:

**a) Import quality hook, pass prop to WaterfallBackground:**

```tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import EnableWheelScroll from "./EnableWheelScroll";
import AudioProvider from "./AudioContext";
import WaterfallAudio from "./WaterfallAudio";
import { QualityProvider } from "./useDeviceCapability";

const WaterfallBackground = dynamic(() => import("./WaterfallBackground"));

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Wrap body content in a client component that reads quality:
import { WaterfallWrapper } from "./WaterfallWrapper";
```

**b) Create `app/WaterfallWrapper.tsx`:**

```tsx
"use client"
import dynamic from "next/dynamic"
import { useDeviceCapability } from "./useDeviceCapability"

const WaterfallBackground = dynamic(() => import("./WaterfallBackground"))

export function WaterfallWrapper() {
  const quality = useDeviceCapability()
  return <WaterfallBackground quality={quality} />
}
```

**c) Remove direct WaterfallBackground import, use wrapper:**

```tsx
<WaterfallWrapper />
```

---

## Step 4 — Modify `app/page.tsx`

Dynamic import below-the-fold sections:

```tsx
import dynamic from "next/dynamic"
import HeroSection from "./HeroSection";
import ForestRidgeDivider from "./MountainDivider";
import FallenLogDivider from "./FallenLogDivider";
import DeepRootsDivider from "./DeepRootsDivider";

const BlogsSection = dynamic(() => import("./BlogsSection"))
const ContactSection = dynamic(() => import("./ContactSection"))
const AboutSection = dynamic(() => import("./AboutSection"))

export default function Home() {
  return (
    <div className="relative z-[1] min-h-dvh">
      <HeroSection />
      <ForestRidgeDivider />
      <BlogsSection />
      <FallenLogDivider />
      <ContactSection />
      <DeepRootsDivider />
      <AboutSection />
    </div>
  );
}
```

---

## Step 5 — Modify `app/globals.css`

### Changes:

**a) Remove `will-change: transform` on `#waterfall-bg`:**

```css
/* DELETE this block:
#waterfall-bg {
  will-change: transform;
}
*/
```

**b) Wrapping backdrop-filter rules (no change needed — these are inline styles. See Navbar step below).**

**c) Add `content-visibility: auto` to sections:**

Add a utility class:
```css
.section-auto {
  content-visibility: auto;
  contain-intrinsic-size: 100vh;
}
```

**d) Optimize grain animation on reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .grain-overlay::after {
    animation: none !important;
  }
}
```

**e) Add low-performance media query for backdrop:**

```css
@media (max-device-memory: 4), (pointer: coarse) {
  .glass {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

---

## Step 6 — Modify `app/WaterfallAudio.tsx`

Defer AudioContext + fetch until unmute:

```tsx
"use client"
import { useEffect, useRef } from "react"
import { useAudio } from "./AudioContext"

export default function WaterfallAudio() {
  const { isMuted } = useAudio()
  const ctxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const startedRef = useRef(false)
  const loadedRef = useRef(false)
  const suspendTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const createAudio = () => {
    if (loadedRef.current) return
    loadedRef.current = true

    const ctx = new AudioContext()
    ctxRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)
    masterGainRef.current = masterGain

    fetch("/audio/waterfall.mp3")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        if (!ctxRef.current) return
        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.loop = true
        source.connect(masterGain)
        source.start()
        sourceRef.current = source

        if (!isMuted) {
          ctx.resume()
          masterGain.gain.linearRampToValueAtTime(0.45, ctx.currentTime + 0.8)
        }
      })
      .catch(() => {})
  }

  useEffect(() => {
    if (!ctxRef.current || !masterGainRef.current) return

    if (isMuted) {
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.8)
      // Suspend AudioContext after 30s of mute to free resources
      suspendTimerRef.current = setTimeout(() => {
        ctxRef.current?.suspend()
      }, 30000)
    } else {
      if (suspendTimerRef.current) {
        clearTimeout(suspendTimerRef.current)
      }
      if (!loadedRef.current) {
        createAudio()
        return
      }
      ctxRef.current.resume()
      masterGainRef.current.gain.linearRampToValueAtTime(0.45, ctxRef.current.currentTime + 0.8)
    }
  }, [isMuted])

  useEffect(() => {
    return () => {
      if (suspendTimerRef.current) clearTimeout(suspendTimerRef.current)
      ctxRef.current?.close()
    }
  }, [])

  return null
}
```

---

## Step 7 — Modify `app/Navbar.tsx`

Replace backdrop-filter on mobile with opaque fallback. No file changes needed — add `@media` logic via inline style:

In the nav style, change:
```tsx
style={{
  background: 'rgba(9, 20, 16, 0.8)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderBottom: '1px solid rgba(74, 106, 74, 0.2)',
}}
```

But since inline styles can't do media queries, we need a CSS class approach or a JS check. Better approach:

```tsx
"use client"
import { useState, useEffect } from 'react'
import { useDeviceCapability } from './useDeviceCapability'

// ... inside component:
const quality = useDeviceCapability()
const isLow = quality === "low"

// In style:
style={{
  background: isLow ? 'rgba(9, 20, 16, 0.98)' : 'rgba(9, 20, 16, 0.8)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  backdropFilter: isLow ? 'none' : 'blur(18px)',
  WebkitBackdropFilter: isLow ? 'none' : 'blur(18px)',
  borderBottom: '1px solid rgba(74, 106, 74, 0.2)',
}}
```

Same pattern for mobile menu and ContactSection buttons.

---

## Step 8 — Verify

```bash
npm run lint
npm run build
```

Check that:
- No TypeScript errors
- Build succeeds
- Bundle sizes reduced (below-the-fold sections split)
- No runtime errors

---

## Summary of Expected Impact

| Metric | Before | After (High) | After (Low) |
|--------|--------|-------------|-------------|
| GPU layers | 11 shader meshes | 11 | 5 |
| Wall segments | 5760 (3x 1920) | 5760 | 224 (1x 224) |
| Framerate | 60fps | 60fps | 20fps |
| DPR cap | 1.75 | 1.5 | 0.75 |
| Antialiasing | Yes | Yes | No |
| Audio RAM | Always decoded | On-demand | On-demand |
| Font weights loaded | 10 | 8 | 8 |
| Below-fold JS | Inlined | Code-split | Code-split |
| Backdrop filter | Always | Always | None |
| Grain animation | Always | Always | Static |
