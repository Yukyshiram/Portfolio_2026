import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Galaxia espiral ────────────────────────────────────────────────────────
function Galaxy() {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 8000;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const arms      = 3;       // brazos espirales
    const spread    = 0.25;    // dispersión perpendicular al brazo
    const colorInner = new THREE.Color('#a8c8ff'); // azul hielo (centro)
    const colorOuter = new THREE.Color('#ffffff'); // blanco puro (borde)

    for (let i = 0; i < count; i++) {
      const t       = Math.random();           // 0 = centro, 1 = borde
      const radius  = 0.3 + t * 2.2;          // radio en units
      const arm     = (i % arms) * ((Math.PI * 2) / arms);
      const spin    = radius * 1.1;            // curvatura del brazo
      const angle   = arm + spin;

      const randX   = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * radius;
      const randY   = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * 0.15;
      const randZ   = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * radius;

      positions[i * 3]     = Math.cos(angle) * radius + randX;
      positions[i * 3 + 1] = randY;
      positions[i * 3 + 2] = Math.sin(angle) * radius + randZ;

      const mixed = colorInner.clone().lerp(colorOuter, t);
      colors[i * 3]     = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, []);

  // Rotación galáctica lenta
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    // Leve inclinación en X para verla de 3/4
    ref.current.rotation.x = 0.45;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false} position={[0, 0.55, 0]}>
      <PointMaterial
        transparent
        vertexColors
        size={0.006}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// ── Polvo de fondo (estrellas distantes) ───────────────────────────────────
function BackgroundStars() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.003}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

// ── Canvas raíz ────────────────────────────────────────────────────────────
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 3.5], fov: 65 }}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <BackgroundStars />
      <Galaxy />
    </Canvas>
  );
}
