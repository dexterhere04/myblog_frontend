"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function WaterfallPlane() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  
  const noiseTexture = useLoader(THREE.TextureLoader, "/textures/noise.png");
  const flowTexture = useLoader(THREE.TextureLoader, "/textures/flow.png");

  useMemo(() => {
    [noiseTexture, flowTexture].forEach(tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.minFilter = THREE.LinearMipMapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 4;
      tex.generateMipmaps = true;
    });
  }, [noiseTexture, flowTexture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uNoise: { value: noiseTexture },
          uFlow: { value: flowTexture },
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform sampler2D uNoise;
          uniform sampler2D uFlow;

          void main() {
            vUv = uv;
            vec3 pos = position;

            vec2 flowUv = uv + vec2(0.0, uTime * 0.15);
            vec2 flowVector = texture2D(uFlow, flowUv).rg * 2.0 - 1.0;
            
            float wave1 = sin(uv.x * 20.0 - uTime * 2.0) * 0.02;
            float wave2 = sin(uv.x * 15.0 + uTime * 1.5) * 0.015;
            
            vec2 noiseUv = vec2(uv.x * 10.0, uv.y * 5.0 - uTime * 0.1);
            float noiseVal = texture2D(uNoise, noiseUv).r;
            float wave3 = noiseVal * 0.03;

            pos.z += wave1 + wave2 + wave3;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform sampler2D uNoise;
          uniform sampler2D uFlow;

          // Hash function for procedural noise
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          // Simple 2D noise
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

          // FBM for detailed variation
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

          // Multi-layer texture sampling
          float layeredNoise(vec2 uv) {
            float n1 = texture2D(uNoise, uv).r;
            float n2 = texture2D(uNoise, uv * 1.3 + vec2(0.5, 0.3)).r;
            float n3 = texture2D(uNoise, uv * 0.7 + vec2(0.2, 0.7)).r;
            float n4 = texture2D(uNoise, uv * 0.5 + vec2(0.8, 0.1)).r;
            
            return (n1 * 0.4 + n2 * 0.3 + n3 * 0.2 + n4 * 0.1);
          }

          void main() {
            float flow = fract(vUv.y + uTime * 0.15);

            vec2 flowUv = vec2(vUv.x * 1.2, flow * 2.0);
            vec2 flowVector = texture2D(uFlow, flowUv).rg * 2.0 - 1.0;
            
            vec2 distortedUv1 = vec2(vUv.x * 1.5, flow * 3.0) + flowVector * 0.3;
            vec2 distortedUv2 = vec2(vUv.x * 1.2, flow * 2.5 + uTime * 0.5) + flowVector * 0.25;
            
            // Texture-based base
            float streaks = layeredNoise(distortedUv1);
            float turbulence = layeredNoise(distortedUv2);

            // Layer procedural detail with more presence
            float proceduralStreaks = fbm(vec2(vUv.x * 15.0, flow * 20.0));
            float proceduralTurbulence = fbm(vec2(vUv.x * 8.0, flow * 15.0 + uTime * 0.5));
            
            // Additional detail layers
            float fineDetail = fbm(vec2(vUv.x * 25.0, flow * 30.0 - uTime * 0.3));
            float crossFlow = fbm(vec2(vUv.x * 12.0 + uTime * 0.2, flow * 18.0));
            
            // Blend with more procedural influence
            streaks = mix(streaks, proceduralStreaks, 0.35);
            streaks = mix(streaks, fineDetail, 0.2);
            turbulence = mix(turbulence, proceduralTurbulence, 0.3);
            turbulence = mix(turbulence, crossFlow, 0.15);

            // Enhanced ripples with more variation
            float ripples = sin(vUv.x * 30.0 + uTime * 3.0) * 0.5 + 0.5;
            ripples += sin(vUv.x * 45.0 - uTime * 2.0) * 0.3;
            ripples += sin(vUv.x * 60.0 + uTime * 2.5) * 0.2;
            
            // Add noise-based ripple variation
            float rippleNoise = noise(vec2(vUv.x * 40.0, flow * 25.0 + uTime * 1.5));
            ripples += rippleNoise * 0.25;

            // Enhanced foam with more procedural detail
            vec2 foamUv = vec2(vUv.x * 6.0, uTime * 2.0);
            float foamNoise = layeredNoise(foamUv);
            float proceduralFoam = noise(vec2(vUv.x * 50.0, uTime * 5.0));
            float foamDetail = fbm(vec2(vUv.x * 35.0, flow * 40.0 + uTime * 3.0));
            
            float foam = smoothstep(0.9, 1.0, flow) * 
              mix(foamNoise * 0.5 + 0.5, proceduralFoam * 0.5 + 0.5, 0.4);
            foam += smoothstep(0.85, 0.95, flow) * foamDetail * 0.3;

            // Color mixing with enhanced depth
            vec3 deepWater = vec3(0.05, 0.35, 0.55);
            vec3 midWater  = vec3(0.15, 0.55, 0.65);
            vec3 lightWater = vec3(0.35, 0.75, 0.85);
            vec3 foamColor = vec3(0.9, 0.95, 1.0);

            vec3 color = mix(deepWater, midWater, flow);
            color = mix(color, lightWater, streaks * 0.6);

            // Enhanced shimmer with more complexity
            float shimmer = pow(streaks * ripples, 2.0) * 0.4;
            shimmer += pow(fineDetail * 0.8, 3.0) * 0.3;
            color += vec3(shimmer);

            color = mix(color, foamColor, foam * 0.8);
            
            // More dynamic turbulence
            color *= 0.7 + turbulence * 0.3;
            
            // Add subtle color variation for depth
            float depthVariation = fbm(vec2(vUv.x * 7.0, flow * 12.0));
            color = mix(color, deepWater, depthVariation * 0.1);

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
      dpr={[1, 1.5]}
    >
      <WaterfallPlane />
    </Canvas>
  );
}