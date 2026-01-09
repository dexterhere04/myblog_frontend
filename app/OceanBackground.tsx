"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function WaterfallPlane() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
      materialRef.current.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      )
    }
  })

  return (
    <mesh scale={[40, 25, 1]} position={[0, 0, -2]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;

          float hash(float n) {
            return fract(sin(n) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i.x + i.y * 57.0);
            float b = hash(i.x + 1.0 + i.y * 57.0);
            float c = hash(i.x + (i.y + 1.0) * 57.0);
            float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);

            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          void main() {
            vUv = uv;
            vec3 pos = position;

            float wave1 = sin(uv.x * 18.0 - uTime * 1.5) * 0.02;
            float wave2 = sin(uv.x * 12.0 + uTime * 1.2) * 0.018;
            float wave3 = noise(vec2(uv.x * 8.0, uv.y * 6.0 + uTime * 0.8)) * 0.025;

            pos.z += wave1 + wave2 + wave3;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;

          float hash(float n) {
            return fract(sin(n) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i.x + i.y * 57.0);
            float b = hash(i.x + 1.0 + i.y * 57.0);
            float c = hash(i.x + (i.y + 1.0) * 57.0);
            float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);

            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
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
            vec2 uv = vUv;
            float aspect = uResolution.x / uResolution.y;
            uv.x *= aspect;

            float t = uTime * 0.5;

            vec2 flowUV = vec2(uv.x * 4.0, uv.y * 6.0 + t * 2.0);

            float turb = turbulence(flowUV + vec2(0.0, t * 0.3));

            float streaks1 = pow(abs(sin(uv.x * 35.0 + turb * 2.0)), 3.0);
            float streaks2 = pow(abs(sin(uv.x * 18.0 + turb * 1.5)), 4.0);
            float verticalStreaks = max(streaks1 * 0.6, streaks2 * 0.4);

            float water = fbm(flowUV + vec2(turb * 0.2, 0.0));

            float foamNoise = fbm(vec2(uv.x * 12.0, uv.y * 8.0 + t * 3.0));
            float foamMask = smoothstep(0.3, 0.8, vUv.y);
            float foam = pow(foamNoise, 2.0) * foamMask;
            foam += verticalStreaks * smoothstep(0.4, 0.7, foamNoise) * 0.6;

            float depth = fbm(vec2(uv.x * 2.0, uv.y * 3.0 + t * 0.5));
            water = mix(water, depth, 0.3);

            // 🌊 BLUE COLORS
            vec3 deep = vec3(0.02, 0.08, 0.18);
            vec3 mid = vec3(0.08, 0.25, 0.45);
            vec3 light = vec3(0.15, 0.55, 0.75);
            vec3 foamColor = vec3(0.85, 0.95, 1.0);

            vec3 color = mix(deep, mid, water);
            color = mix(color, light, pow(water, 2.0) * 0.6);
            color = mix(color, light * 1.2, verticalStreaks * 0.3);
            color = mix(color, foamColor, foam * 0.7);

            float mist =
              smoothstep(0.25, 0.0, vUv.y) *
              fbm(uv * 1.8 + vec2(0.0, t * 0.3));

            color = mix(color, vec3(0.6, 0.8, 0.95), mist * 0.5);

            color *= smoothstep(
              1.0,
              0.7,
              abs(uv.x - aspect * 0.5) * 2.0 / aspect
            );

            color *= 1.0 - smoothstep(0.85, 1.0, vUv.y);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}

export default function WaterfallBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        zIndex: -10,
        pointerEvents: "none",
        WebkitOverflowScrolling: "touch",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <WaterfallPlane />
      </Canvas>
    </div>
  )
}
export { WaterfallBackground }