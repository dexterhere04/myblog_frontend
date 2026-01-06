"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function WaterfallPlane() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 256, 256]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          void main() {
            vUv = uv;
            vec3 pos = position;

            // 🔁 Reversed surface motion
            float wave1 = sin(uv.x * 20.0 - uTime * 2.0) * 0.02;
            float wave2 = sin(uv.x * 15.0 + uTime * 1.5) * 0.015;
            float wave3 = noise(vec2(uv.x * 10.0, uv.y * 5.0 - uTime)) * 0.03;

            pos.z += wave1 + wave2 + wave3;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for(int i = 0; i < 5; i++) {
              value += amplitude * noise(p);
              p *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            // 🔁 Reversed vertical flow (UPWARD)
            float flow = fract(vUv.y + uTime * 0.15);

            float streaks = fbm(vec2(vUv.x * 15.0, flow * 20.0));
            float ripples = sin(vUv.x * 30.0 + uTime * 3.0) * 0.5 + 0.5;
            ripples += sin(vUv.x * 45.0 - uTime * 2.0) * 0.3;

            float turbulence = fbm(vec2(vUv.x * 8.0, flow * 15.0 + uTime * 0.5));

            float foam = smoothstep(0.9, 1.0, flow) *
              (noise(vec2(vUv.x * 50.0, uTime * 5.0)) * 0.5 + 0.5);

            vec3 deepWater = vec3(0.05, 0.35, 0.55);
            vec3 midWater  = vec3(0.15, 0.55, 0.65);
            vec3 lightWater = vec3(0.35, 0.75, 0.85);
            vec3 foamColor = vec3(0.9, 0.95, 1.0);

            vec3 color = mix(deepWater, midWater, flow);
            color = mix(color, lightWater, streaks * 0.6);

            float shimmer = pow(streaks * ripples, 2.0) * 0.4;
            color += vec3(shimmer);

            color = mix(color, foamColor, foam * 0.8);
            color *= 0.7 + turbulence * 0.3;

            float alpha = 0.95 + foam * 0.05;

            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export default function WaterfallBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
      }}
    >
      <WaterfallPlane />
    </Canvas>
  );
}
