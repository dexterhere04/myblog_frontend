"use client"

import React, { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ─── Configuration ───────────────────────────────────────────────
const WALL_RADIUS = 7
const WALL_HEIGHT = 14
const WALL_ARC = Math.PI * 0.5
const WALL_CURVE_DEPTH = 3.5
const WALL_BASE_Z = 3.5
const WALL_SEG_W = 48
const WALL_SEG_H = 40

const POOL_RADIUS = 6
const POOL_SEG = 48

const COLORS = {
  deep: new THREE.Color(0x05142e),
  mid: new THREE.Color(0x144073),
  light: new THREE.Color(0x268cbf),
  foam: new THREE.Color(0xd9f2ff),
  mist: new THREE.Color(0xcde0ee),
  pDeep: new THREE.Color(0x030812),
  pSurf: new THREE.Color(0x0b2038),
  pRipple: new THREE.Color(0x2a6a92),
}

// ─── Shared GLSL Noise (for Mist + Pool) ────────────────────────
const NOISE_SHARED = `
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

// ─── Water Wall Layer ──────────────────────────────────────────
function WaterWallLayer({
  speed, opacity, zOff,
}: {
  speed: number; opacity: number; zOff: number
}) {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const wallWidth = WALL_ARC * WALL_RADIUS
  const wallHeight = WALL_HEIGHT

  const uni = useMemo(() => ({
    uT: { value: 0 },
    uS: { value: speed },
    uO: { value: opacity },
    uZ: { value: zOff },
    uRadius: { value: WALL_RADIUS },
    uArc: { value: WALL_ARC },
    uCurve: { value: WALL_CURVE_DEPTH },
    uBaseZ: { value: WALL_BASE_Z },
    uRes: { value: new THREE.Vector2(1920, 1080) },
    cD: { value: COLORS.deep.clone() },
    cM: { value: COLORS.mid.clone() },
    cL: { value: COLORS.light.clone() },
    cF: { value: COLORS.foam.clone() },
  }), [speed, opacity, zOff])

  useFrame(({ clock, size }) => {
    if (ref.current) {
      ref.current.uniforms.uT.value = clock.elapsedTime
      ref.current.uniforms.uRes.value.set(size.width, size.height)
    }
  })

  const vert = `
    uniform float uT, uS, uZ, uRadius, uArc, uCurve, uBaseZ;
    varying vec2 v;
    void main() {
      v = uv;
      float a = (uv.x - 0.5) * uArc;
      float cr = cos(a);
      vec3 p = position;
      p.x = sin(a) * uRadius;
      p.z = -uBaseZ + (1.0 - cr) * uCurve + uZ;
      float w1 = sin(uv.x * 12.0 - uT * uS * 0.6) * 0.025;
      float w2 = sin(uv.y * 10.0 + uT * uS * 0.4) * 0.02;
      float w3 = sin((uv.x + uv.y) * 8.0 + uT * uS * 0.3) * 0.015;
      p.z += w1 + w2 + w3;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `

  const frag = `
    uniform float uT, uS, uO;
    uniform vec2 uRes;
    uniform vec3 cD, cM, cL, cF;
    varying vec2 v;

    float hash(float n) {
      return fract(sin(n) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i.x + i.y * 57.0), hash(i.x + 1.0 + i.y * 57.0), f.x),
        mix(hash(i.x + (i.y + 1.0) * 57.0), hash(i.x + 1.0 + (i.y + 1.0) * 57.0), f.x),
        f.y
      );
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
      }
      return v;
    }

    float turbulence(vec2 p) {
      float t = 0.0;
      float a = 1.0;
      for (int i = 0; i < 3; i++) {
        t += abs(noise(p) - 0.5) * a;
        p *= 2.0;
        a *= 0.5;
      }
      return t;
    }

    void main() {
      vec2 uv = v;
      float aspect = uRes.x / uRes.y;
      uv.x *= aspect;

      float t = uT * uS;

      vec2 flowUV = vec2(uv.x * 4.0, uv.y * 6.0 + t * 2.0);

      float turb = turbulence(flowUV + vec2(0.0, t * 0.3));

      float streaks1 = pow(abs(sin(uv.x * 35.0 + turb * 2.0)), 3.0);
      float streaks2 = pow(abs(sin(uv.x * 18.0 + turb * 1.5)), 4.0);
      float verticalStreaks = max(streaks1 * 0.6, streaks2 * 0.4);

      float water = fbm(flowUV + vec2(turb * 0.2, 0.0));

      float foamNoise = fbm(vec2(uv.x * 12.0, uv.y * 8.0 + t * 3.0));
      float foamMask = smoothstep(0.3, 0.8, v.y);
      float foam = pow(foamNoise, 2.0) * foamMask;
      foam += verticalStreaks * smoothstep(0.4, 0.7, foamNoise) * 0.6;

      float depth = fbm(vec2(uv.x * 2.0, uv.y * 3.0 + t * 0.5));
      water = mix(water, depth, 0.3);

      vec3 color = mix(cD, cM, water);
      color = mix(color, cL, pow(water, 2.0) * 0.6);
      color = mix(color, cL * 1.2, verticalStreaks * 0.3);
      color = mix(color, cF, foam * 0.7);

      float mist = smoothstep(0.25, 0.0, v.y) * fbm(uv * 1.8 + vec2(0.0, t * 0.3));
      color = mix(color, vec3(0.6, 0.8, 0.95), mist * 0.5);

      color *= smoothstep(1.0, 0.7, abs(uv.x - aspect * 0.5) * 2.0 / aspect);

      color *= 1.0 - smoothstep(0.85, 1.0, v.y);

      gl_FragColor = vec4(color, uO);
    }
  `

  return (
    <mesh>
      <planeGeometry args={[wallWidth, wallHeight, WALL_SEG_W, WALL_SEG_H]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── Mist Layer ─────────────────────────────────────────────────
function MistLayer() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    uC: { value: COLORS.mist.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  const frag = `
    uniform float uT;
    uniform vec3 uC;
    varying vec2 vUv;
    ${NOISE_SHARED}
    void main() {
      vec2 u = vUv;
      float ml = f(vec2(u.x * 5.0 + uT * 0.05, u.y * 2.0 + uT * 0.08)) * 0.5 + 0.5;
      float mg = 1.0 - u.y;
      float edge = 1.0 - pow(abs(u.x - 0.5) * 2.0, 2.0);
      float a = ml * mg * mg * edge * 0.35;
      gl_FragColor = vec4(uC, a);
    }
  `

  return (
    <mesh position={[0, -4, -WALL_BASE_Z + 1]} scale={[WALL_ARC * WALL_RADIUS * 1.2, 3, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Water Pool ─────────────────────────────────────────────────
function WaterPool() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    cD: { value: COLORS.pDeep.clone() },
    cS: { value: COLORS.pSurf.clone() },
    cR: { value: COLORS.pRipple.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  const frag = `
    uniform float uT;
    uniform vec3 cD, cS, cR;
    varying vec2 vUv;
    ${NOISE_SHARED}
    void main() {
      vec2 u = vUv - 0.5;
      float d = length(u);
      float edge = 1.0 - smoothstep(0.0, 0.5, d);
      float r1 = sin(d * 30.0 - uT * 1.5) * 0.5 + 0.5;
      float r2 = sin(d * 20.0 + uT * 1.0) * 0.5 + 0.5;
      float r3 = sin(d * 45.0 - uT * 2.0) * 0.5 + 0.5;
      float rip = r1 * 0.5 + r2 * 0.3 + r3 * 0.2;
      float ring = pow(sin(d * 25.0 - uT * 0.8) * 0.5 + 0.5, 4.0);
      float nse = f(u * 4.0 + uT * 0.1);
      vec3 cl = mix(cD, cS, edge);
      cl = mix(cl, cR, rip * 0.15 * edge);
      cl += ring * cR * 0.08 * edge;
      cl += nse * 0.02 * edge;
      float spec = pow(1.0 - d * 2.0, 3.0) * 0.08;
      cl += spec;
      float a = edge * 0.5;
      gl_FragColor = vec4(cl, a);
    }
  `

  return (
    <mesh position={[0, -5.5, -WALL_BASE_Z + 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[POOL_RADIUS, POOL_SEG]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Scene ──────────────────────────────────────────────────────
function SceneContent({
  mouse,
  reducedMotion,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  reducedMotion: boolean
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.position.set(0, 1.5, 8)
      camera.lookAt(0, -0.5, 0)
    }
  }, [camera])

  useFrame(() => {
    if (!groupRef.current || reducedMotion) return
    const targetRotY = mouse.current.x * 0.025
    const targetRotX = mouse.current.y * 0.018
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      <WaterWallLayer speed={0.35} opacity={0.65} zOff={0} />
      <WaterWallLayer speed={0.6} opacity={0.45} zOff={0.15} />
      <WaterWallLayer speed={1.0} opacity={0.3} zOff={0.3} />
      <MistLayer />
      <WaterPool />
    </group>
  )
}

// ─── Mouse Tracker ──────────────────────────────────────────────
function MouseTracker({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouse.current = { x, y }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mouse])

  return null
}

// ─── Reduced Motion Hook ────────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }
    return false
  })
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

// ─── Main Export ────────────────────────────────────────────────
export default function WaterfallBackground() {
  const mouse = useRef({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()
  const [dpr] = useState<[number, number]>(() => {
    if (typeof window !== "undefined") {
      return [1, Math.min(1.5, window.devicePixelRatio)]
    }
    return [1, 1.5]
  })

  return (
    <>
      <MouseTracker mouse={mouse} />
      <div
        id="waterfall-bg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          zIndex: -10,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Canvas
          camera={{ position: [0, 1.5, 8], fov: 55, near: 0.1, far: 30 }}
          dpr={dpr}
          gl={{
            antialias: true,
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
          <color attach="background" args={["#030812"]} />
          <ambientLight intensity={0.3} />
          <SceneContent mouse={mouse} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </>
  )
}

export { WaterfallBackground }
