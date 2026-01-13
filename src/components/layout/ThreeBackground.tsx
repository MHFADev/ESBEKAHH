import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ====================================
// THEMATIC PARTICLES (Garden Petals & Tech Dust)
// ====================================

const ThematicParticles = ({ count = 2000, color = '#FFB7C5', size = 0.05 }) => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.getElapsedTime();
      points.current.rotation.y = time * 0.02;
      points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        positions[i * 3 + 1] += Math.sin(time + x) * 0.002; // Gentle floating
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// ====================================
// STELLA STARS (Floating Achievements)
// ====================================

const StellaStars = () => {
  const groupRef = useRef<THREE.Group>(null);
  const count = 8;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <Float 
          key={i} 
          speed={2} 
          rotationIntensity={2} 
          floatIntensity={1.5}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10
          ]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusKnotGeometry args={[0.15, 0.05, 64, 8, 2, 3]} />
            <meshStandardMaterial 
              color="#C5A059" 
              emissive="#C5A059" 
              emissiveIntensity={2} 
              metalness={1} 
              roughness={0.2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// ====================================
// INTERACTIVE SCENE
// ====================================

const Scene = () => {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth parallax based on mouse
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.1, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={['#050505', 5, 25]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFB7C5" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
      
      {/* Background Stars */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Garden Petals (Pink) */}
      <ThematicParticles count={1500} color="#FFB7C5" size={0.08} />
      
      {/* Tech Dust (Blue) */}
      <ThematicParticles count={800} color="#4A90E2" size={0.04} />
      
      {/* Stella Stars */}
      <StellaStars />

      {/* Grid Floor */}
      <group position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <gridHelper args={[50, 50, '#E14D68', '#0B1026']} opacity={0.2} transparent />
      </group>
    </group>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-spy-dark">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <Scene />
      </Canvas>
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-spy-dark/40 via-transparent to-spy-dark/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-60" />
    </div>
  );
};

export default ThreeBackground;
