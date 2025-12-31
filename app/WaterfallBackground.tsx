"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaterfallPlane() {
  const materialRef = useRef(null);

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
          
          // Improved noise function
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
            
            // Create flowing ripples
            float wave1 = sin(uv.x * 20.0 + uTime * 2.0) * 0.02;
            float wave2 = sin(uv.x * 15.0 - uTime * 1.5) * 0.015;
            float wave3 = noise(vec2(uv.x * 10.0, uv.y * 5.0 + uTime)) * 0.03;
            
            pos.z += wave1 + wave2 + wave3;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          
          // Better noise function
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
            // Flowing downward motion
            float flow = fract(vUv.y - uTime * 0.15);
            
            // Create vertical streaks (water streams)
            float streaks = fbm(vec2(vUv.x * 15.0, flow * 20.0));
            
            // Horizontal ripples for water texture
            float ripples = sin(vUv.x * 30.0 + uTime * 3.0) * 0.5 + 0.5;
            ripples += sin(vUv.x * 45.0 - uTime * 2.0) * 0.3;
            
            // Turbulence for realistic water flow
            float turbulence = fbm(vec2(vUv.x * 8.0, flow * 15.0 + uTime * 0.5));
            
            // Foam at the top (white water effect)
            float foam = smoothstep(0.9, 1.0, flow) * (noise(vec2(vUv.x * 50.0, uTime * 5.0)) * 0.5 + 0.5);
            
            // Color gradient - realistic water colors
            vec3 deepWater = vec3(0.05, 0.35, 0.55);      // Deep blue-green
            vec3 midWater = vec3(0.15, 0.55, 0.65);       // Turquoise
            vec3 lightWater = vec3(0.35, 0.75, 0.85);     // Light cyan
            vec3 foamColor = vec3(0.9, 0.95, 1.0);        // White foam
            
            // Mix colors based on flow and turbulence
            vec3 color = mix(deepWater, midWater, flow);
            color = mix(color, lightWater, streaks * 0.6);
            
            // Add shimmer/highlights
            float shimmer = pow(streaks * ripples, 2.0) * 0.4;
            color += vec3(shimmer);
            
            // Add foam
            color = mix(color, foamColor, foam * 0.8);
            
            // Add depth variation
            color *= 0.7 + turbulence * 0.3;
            
            // Subtle transparency for depth
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
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0, 2] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -10,
        }}
      >
        <WaterfallPlane />
      </Canvas>
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '8rem 2rem 2rem',
        color: 'white',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Heyyy Tharun here</h1>
          <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
            This is my blogs site where I share my thoughts on technology, programming, and life.
          </p>
        </div>
      </div>
    </div>
  );
}
