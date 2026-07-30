"use client"

import React, { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// ─── Configuration ───────────────────────────────────────────────
const WALL_RADIUS = 7
const WALL_HEIGHT = 14
const WALL_ARC = Math.PI * 0.92
const WALL_CURVE_DEPTH = 4
const WALL_BASE_Z = 3.5
const WALL_SEG_W = 48
const WALL_SEG_H = 40

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

const VERT_WALL = `
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

const FRAG_WALL = `
  uniform float uT, uS, uO;
  uniform vec2 uRes;
  uniform vec3 cD, cM, cL, cF, cFoliage;
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
    float mobile = smoothstep(1.25, 0.65, aspect);
    uv.x *= aspect;
    float stripeBoost = mix(1.0, 2.3, mobile);
    float stretchBoost = mix(1.0, 1.42, mobile);

    float t = uT * uS;

    vec2 flowUV = vec2(uv.x * 4.0 * stretchBoost, uv.y * 6.0 + t * 2.0);

    float turb = turbulence(flowUV + vec2(0.0, t * 0.3));

    float streaks1 = pow(abs(sin(uv.x * (35.0 * stripeBoost) + turb * 2.0)), mix(3.0, 1.8, mobile));
    float streaks2 = pow(abs(sin(uv.x * (18.0 * stripeBoost) + turb * 1.5)), mix(4.0, 2.2, mobile));
    float streaks3 = pow(abs(sin(uv.x * (9.0 * stripeBoost) + turb * 0.9)), 2.0);
    float streaks4 = pow(abs(sin(uv.x * (52.0 * stripeBoost) + turb * 2.8)), mix(5.0, 2.4, mobile));
    float verticalStreaks = max(streaks1 * 0.55, streaks2 * 0.45);
    verticalStreaks = max(verticalStreaks, streaks3 * (0.15 + mobile * 0.32));
    verticalStreaks = max(verticalStreaks, streaks4 * (0.12 + mobile * 0.26));
    verticalStreaks = smoothstep(0.15, 0.95, verticalStreaks);

    float water = fbm(flowUV + vec2(turb * 0.2, 0.0));

    float foamNoise = fbm(vec2(uv.x * 12.0, uv.y * 8.0 + t * 3.0));
    float foamMask = smoothstep(0.3, 0.8, v.y);
    float foam = pow(foamNoise, 2.0) * foamMask;
    foam += verticalStreaks * smoothstep(0.4, 0.7, foamNoise) * 0.6;

    float depth = fbm(vec2(uv.x * 2.0, uv.y * 3.0 + t * 0.5));
    water = mix(water, depth, 0.3);

    vec3 color = mix(cD, cM, water);
    color = mix(color, cL, pow(water, 2.0) * 0.6);
    color = mix(color, cL * 1.2, verticalStreaks * mix(0.3, 0.42, mobile));
    color = mix(color, cF, foam * 0.7);
    color = mix(color, cD, mobile * 0.12 * (1.0 - verticalStreaks));

    float greenReflect = smoothstep(0.3, 0.7, v.x) * smoothstep(0.0, 0.5, v.y * v.y);
    greenReflect *= 0.5 + 0.5 * sin(uv.x * 8.0 + t * 0.2);
    color = mix(color, cFoliage, greenReflect * 0.06);

    float mist = smoothstep(0.25, 0.0, v.y) * fbm(uv * 1.8 + vec2(0.0, t * 0.3));
    color = mix(color, vec3(0.6, 0.8, 0.75), mist * mix(0.34, 0.46, 1.0 - mobile));

    float band = smoothstep(0.15, 0.8, sin(uv.y * mix(5.5, 9.8, mobile) + turb * 2.0) * 0.5 + 0.5);
    color = mix(color, cM, band * mobile * 0.16);

    color *= smoothstep(1.0, mix(0.78, 0.7, mobile), abs(uv.x - aspect * 0.5) * 2.0 / aspect);
    color *= 1.0 - smoothstep(0.85, 1.0, v.y);

    gl_FragColor = vec4(color, uO);
  }
`

const FRAG_CLIFF = `
  uniform float uT;
  uniform vec3 cDark, cMid, cLight, cMoss, cFoliage, cFoam;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 uv = vUv;
    float r = f(uv * 6.0);
    float r2 = f(uv * 12.0 + 1.5);
    float cracks = pow(f(uv * 18.0 + uT * 0.005), 2.0);

    vec3 cl = mix(cDark, cMid, r);
    cl = mix(cl, cLight, smoothstep(0.5, 0.8, r));
    cl = mix(cl, vec3(0.08, 0.06, 0.05), cracks * 0.3);

    float moss = f(uv * 5.0 + 3.0);
    moss *= (1.0 - r) * smoothstep(0.0, 0.5, uv.y);
    cl = mix(cl, cMoss, moss * 0.45);

    float veg = f(vec2(uv.x * 12.0, (1.0 - uv.y) * 8.0 + uT * 0.01));
    float vegMask = smoothstep(0.4, 0.7, veg) * smoothstep(0.0, 0.12, uv.y);
    cl = mix(cl, cFoliage, vegMask * 0.6);

    float stream = pow(f(vec2(uv.x * 20.0, uv.y * 5.0 + uT * 0.1)), 3.0);
    cl = mix(cl, cFoam, stream * 0.12 * (1.0 - uv.y));

    float edge = 1.0 - smoothstep(0.82, 1.0, abs(uv.x - 0.5) * 2.0);
    cl *= edge * (1.0 - smoothstep(0.0, 0.08, uv.y));

    gl_FragColor = vec4(cl, 1.0);
  }
`

const FRAG_FOLIAGE = `
  uniform float uT;
  uniform vec3 cDark, cMid, cLight, cMist;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 uv = vUv;

    float n1 = f(uv * 6.0 + vec2(0.0, uT * 0.008));
    float n2 = f(uv * 10.0 + vec2(uT * 0.005, uT * 0.012));

    float mask = smoothstep(0.2, 0.45, n1);
    mask = mix(mask, mask * (0.5 + 0.5 * n2), 0.25);
    mask *= 0.5 + 0.5 * (1.0 - uv.x);
    float vTaper = 1.0 - pow(abs(uv.y - 0.5) * 1.6, 2.0);
    mask *= 0.3 + 0.7 * vTaper;
    float detail = f(uv * 16.0 + uT * 0.01);
    mask *= 0.85 + 0.15 * detail;

    float vineSeed = floor(uv.x * 4.0 + 0.5) / 4.0;
    float vine = 1.0 - abs(uv.x - vineSeed - 0.125) * 10.0;
    vine = pow(max(0.0, vine), 10.0);
    vine *= (1.0 - uv.y * 0.6) * 0.4;
    vine *= 0.5 + 0.5 * sin(uv.y * 8.0 + uT * 0.5 + vineSeed * 20.0);
    vine *= smoothstep(0.0, 0.4, uv.x);

    float alpha = max(mask, vine * 0.35);

    float density = n1 * 0.5 + n2 * 0.5;
    vec3 color = mix(cDark, cMid, density);
    color = mix(color, cLight, smoothstep(0.55, 0.8, density));
    color = mix(color, cMist, vine * 0.25);
    color *= 0.85 + 0.15 * (1.0 - uv.x);

    float fade = smoothstep(0.0, 0.08, uv.x)
               * smoothstep(0.0, 0.05, uv.y)
               * smoothstep(0.0, 0.05, 1.0 - uv.y);
    alpha *= fade;

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`

const FRAG_CANOPY = `
  uniform float uT;
  uniform vec3 cDark, cMid, cLight, cSun;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 uv = vUv;

    float canopy = f(vec2(uv.x * 8.0 + uT * 0.005, uv.y * 5.0 + uT * 0.003));
    float leaves = smoothstep(0.3, 0.55, canopy);
    float gapLight = smoothstep(0.8, 0.95, canopy);

    float lightHit = 1.0 - pow(abs(uv.x - 0.5) * 2.0, 2.0);
    lightHit *= 1.5 - uv.y;

    vec3 color = mix(cDark, cMid, leaves * (0.4 + 0.6 * lightHit));
    color = mix(color, cLight, smoothstep(0.55, 0.8, canopy) * lightHit * 0.5);
    color = mix(color, cSun, gapLight * lightHit * 0.4);

    float alpha = smoothstep(0.18, 0.4, leaves);
    alpha *= 1.0 - smoothstep(0.0, 0.12, 1.0 - uv.y);
    alpha *= 1.0 - smoothstep(0.0, 0.06, abs(uv.x - 0.5) * 2.0);

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`

const FRAG_MIST = `
  uniform float uT;
  uniform vec3 uC;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 u = vUv;
    float ml = f(vec2(u.x * 5.0 + uT * 0.05, u.y * 2.0 + uT * 0.08)) * 0.5 + 0.5;
    float mg = 1.0 - u.y;
    float edge = 1.0 - pow(abs(u.x - 0.5) * 2.0, 2.0);
    float a = ml * mg * mg * edge * 0.4;
    gl_FragColor = vec4(uC, a);
  }
`

const FRAG_FOREGROUND = `
  uniform float uT;
  uniform vec3 cDark, cMid, cLight, cRock, cMoss, cSun;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 uv = vUv;

    float grass = f(vec2(uv.x * 20.0 + uT * 0.015, uv.y * 6.0));
    float grassMask = smoothstep(0.3, 0.5, grass);

    float rocks = f(vec2(uv.x * 5.0, uv.y * 4.0 + 1.0));
    float rockMask = smoothstep(0.5, 0.7, rocks);

    float moss = f(vec2(uv.x * 10.0, uv.y * 5.0 + uT * 0.01));
    float mossMask = smoothstep(0.45, 0.65, moss) * rockMask;

    float smallFlowers = f(vec2(uv.x * 30.0 + 10.0, uv.y * 15.0));
    float flowerMask = smoothstep(0.7, 0.85, smallFlowers) * (1.0 - rockMask) * 0.2;

    float alpha = max(grassMask * 0.6, rockMask * 0.85);
    alpha = max(alpha, flowerMask);

    vec3 color = mix(cDark, cMid, grass);
    color = mix(color, cRock, rockMask);
    color = mix(color, cMoss, mossMask * 0.45);
    color = mix(color, cSun, flowerMask * 0.5);
    color = mix(color, cLight, smoothstep(0.6, 0.8, grass) * 0.2);

    alpha *= smoothstep(0.0, 0.18, 1.0 - uv.y);
    alpha *= smoothstep(0.0, 0.04, uv.x);
    alpha *= smoothstep(0.0, 0.04, 1.0 - uv.x);
    alpha *= smoothstep(0.0, 0.08, uv.y);

    gl_FragColor = vec4(color, alpha * 0.8);
  }
`

const FRAG_RAYS = `
  uniform float uT;
  uniform vec2 uMouse;
  uniform vec3 cSun;
  varying vec2 vUv;
  ${NOISE}
  void main() {
    vec2 uv = vUv;
    float mx = uMouse.x * 0.3;

    float ray = exp(-pow((uv.x - 0.5 + mx) * 4.0, 2.0));
    ray *= 1.0 - uv.y * 0.8;
    float shimmer = 0.6 + 0.4 * sin(uv.y * 12.0 + uT * 0.3);
    ray *= shimmer;
    float noiseVal = f(vec2(uv.x * 6.0 + uT * 0.02 + mx, uv.y * 4.0 + uT * 0.01));
    ray *= 0.65 + 0.35 * noiseVal;

    float ray2 = exp(-pow((uv.x - 0.35 + mx * 0.5) * 7.0, 2.0));
    ray2 *= (1.0 - uv.y) * 0.25;
    float ray3 = exp(-pow((uv.x - 0.7 + mx * 0.7) * 6.0, 2.0));
    ray3 *= (1.0 - uv.y) * 0.2;

    float total = ray + ray2 + ray3;
    float alpha = total * 0.1;
    alpha *= smoothstep(0.0, 0.1, uv.y);
    alpha *= smoothstep(0.0, 0.05, abs(uv.x - 0.5) * 2.0);

    gl_FragColor = vec4(cSun, alpha);
  }
`

const FRAG_POOL = `
  uniform float uT;
  uniform vec3 cD, cS, cR, cFoliage;
  varying vec2 vUv;
  ${NOISE}
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
    float refl = 0.5 + 0.5 * sin(u.x * 6.0 + uT * 0.15);
    refl *= smoothstep(0.0, 0.3, edge) * 0.08;
    cl = mix(cl, cFoliage, refl);
    float spec = pow(1.0 - d * 2.0, 3.0) * 0.08;
    cl += spec;
    float a = edge * 0.55;
    gl_FragColor = vec4(cl, a);
  }
`

// ─── Water Wall Layer ──────────────────────────────────────────
function WaterWallLayer({
  speed, opacity, zOff,
}: {
  speed: number; opacity: number; zOff: number
}) {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const prevSize = useRef({ w: 0, h: 0 })
  const wallWidth = WALL_ARC * WALL_RADIUS

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
    cD: { value: C.deep.clone() },
    cM: { value: C.mid.clone() },
    cL: { value: C.light.clone() },
    cF: { value: C.foam.clone() },
    cFoliage: { value: C.fMid.clone() },
  }), [speed, opacity, zOff])

  useFrame(({ clock, size }) => {
    if (!ref.current) return
    ref.current.uniforms.uT.value = clock.elapsedTime
    const w = size.width, h = size.height
    if (w !== prevSize.current.w || h !== prevSize.current.h) {
      prevSize.current = { w, h }
      ref.current.uniforms.uRes.value.set(w, h)
    }
  })

  return (
    <mesh>
      <planeGeometry args={[wallWidth, WALL_HEIGHT, WALL_SEG_W, WALL_SEG_H]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_WALL}
        fragmentShader={FRAG_WALL}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── Cliff Face ─────────────────────────────────────────────────
function CliffFace() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    cDark: { value: C.rDark.clone() },
    cMid: { value: C.rMid.clone() },
    cLight: { value: C.rLight.clone() },
    cMoss: { value: C.moss.clone() },
    cFoliage: { value: C.fDark.clone() },
    cFoam: { value: C.foam.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  return (
    <mesh position={[0, 5.5, -4]} scale={[11, 4, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_CLIFF}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Side Foliage ───────────────────────────────────────────────
function SideFoliage({ side }: { side: "left" | "right" }) {
  const ref = useRef<THREE.ShaderMaterial>(null!)
  const isLeft = side === "left"

  const uni = useMemo(() => ({
    uT: { value: 0 },
    cDark: { value: C.fDark.clone() },
    cMid: { value: C.fMid.clone() },
    cLight: { value: C.fLight.clone() },
    cMist: { value: C.mist.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  const xPos = isLeft ? -5.5 : 5.5

  return (
    <mesh position={[xPos, 0.5, -0.5]} scale={[isLeft ? 2.5 : -2.5, 11, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_FOLIAGE}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Forest Canopy ──────────────────────────────────────────────
function ForestCanopy() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    cDark: { value: C.fDark.clone() },
    cMid: { value: C.fMid.clone() },
    cLight: { value: C.fLight.clone() },
    cSun: { value: C.sun.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  return (
    <mesh position={[0, 7, -1.5]} scale={[14, 3, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_CANOPY}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Mist Layer ─────────────────────────────────────────────────
function MistLayer() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    uC: { value: C.mist.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  return (
    <mesh position={[0, -4, -WALL_BASE_Z + 1]} scale={[WALL_ARC * WALL_RADIUS * 1.2, 3, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_MIST}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Foreground ─────────────────────────────────────────────────
function Foreground() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    cDark: { value: C.fDark.clone() },
    cMid: { value: C.fMid.clone() },
    cLight: { value: C.fLight.clone() },
    cRock: { value: C.rMid.clone() },
    cMoss: { value: C.moss.clone() },
    cSun: { value: C.sun.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  return (
    <mesh position={[0, -4.5, 0]} scale={[11, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_FOREGROUND}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ─── Light Rays ─────────────────────────────────────────────────
function LightRays({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}) {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    cSun: { value: C.sun.clone() },
  }), [])

  const targetVec = useMemo(() => new THREE.Vector2(), [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouse.current = { x, y }
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mouse])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.uniforms.uT.value = clock.elapsedTime
    targetVec.set(mouse.current.x, mouse.current.y)
    ref.current.uniforms.uMouse.value.lerp(targetVec, 0.05)
  })

  return (
    <mesh position={[0, 5, 0.5]} scale={[8, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_RAYS}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// ─── Water Pool ─────────────────────────────────────────────────
function WaterPool() {
  const ref = useRef<THREE.ShaderMaterial>(null!)

  const uni = useMemo(() => ({
    uT: { value: 0 },
    cD: { value: C.pDeep.clone() },
    cS: { value: C.pSurf.clone() },
    cR: { value: C.pRipple.clone() },
    cFoliage: { value: C.fLight.clone() },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uT.value = clock.elapsedTime
  })

  return (
    <mesh position={[0, -5.5, -WALL_BASE_Z + 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[POOL_RADIUS, POOL_SEG]} />
      <shaderMaterial
        ref={ref}
        uniforms={uni}
        vertexShader={VERT_UV}
        fragmentShader={FRAG_POOL}
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

  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    const updateLayout = () => {
      const aspect = window.innerWidth / window.innerHeight
      const isPortrait = aspect < 1
      const scale = isPortrait
        ? Math.max(1.0, 1.08 + (aspect - 1) * 0.02)
        : 1
      if (groupRef.current) {
        groupRef.current.scale.setScalar(scale)
        groupRef.current.position.y = isPortrait ? 0.5 : 0
      }
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = isPortrait ? 50 : 55
        camera.position.set(0, isPortrait ? 1.15 : 1.5, isPortrait ? 7.0 : 8)
        camera.lookAt(0, isPortrait ? -0.35 : -0.5, 0)
        camera.updateProjectionMatrix()
      }
    }
    updateLayout()
    window.addEventListener("resize", updateLayout)
    return () => window.removeEventListener("resize", updateLayout)
  }, [camera])
  /* eslint-enable react-hooks/immutability */

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
      <WaterWallLayer speed={0.35} opacity={0.65} zOff={0} />
      <WaterWallLayer speed={0.6} opacity={0.45} zOff={0.15} />
      <WaterWallLayer speed={1.0} opacity={0.3} zOff={0.3} />
      <ForestCanopy />
      <SideFoliage side="left" />
      <SideFoliage side="right" />
      <Foreground />
      <LightRays mouse={mouse} />
      <MistLayer />
      <WaterPool />
    </group>
  )
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
      const isMobile = window.innerWidth < 768
      return isMobile ? [1, 1.75] : [1, Math.min(1.85, window.devicePixelRatio)]
    }
    return [1, 1.85]
  })

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
          <color attach="background" args={["#060F0C"]} />
          <ambientLight intensity={0.3} />
          <SceneContent mouse={mouse} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
  )
}
