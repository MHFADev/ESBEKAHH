import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// ====================================
// TECH WAVE PARTICLES
// ====================================

const WaveParticles = ({ count = 3000, color = '#a855f7' }) => {
  const points = useRef<THREE.Points>(null);
  
  // Generate initial positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 2; // Flat layer
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire system slowly
      points.current.rotation.y = time * 0.05;
      
      // Wavy motion for particles
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        
        // Sine wave movement based on position and time
        positions[i * 3 + 1] = Math.sin(x * 0.5 + time) * 0.5 + Math.sin(z * 0.3 + time * 0.5) * 0.5;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

// ====================================
// DIGITAL GRID LINES
// ====================================

const DigitalGrid = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating/breathing effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 - 2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <gridHelper args={[40, 40, 0x444444, 0x222222]} />
      {/* Second grid layer for depth */}
      <group position={[0, 0.5, 0]}>
        <gridHelper args={[40, 10, 0x3b82f6, 0x000000]} />
      </group>
    </group>
  );
};

// ====================================
// CONNECTING NODES (Floating Elements)
// ====================================

const FloatingNodes = () => {
  const count = 15;
  
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={1} 
          floatIntensity={2} 
          position={[
            (Math.random() - 0.5) * 15, 
            (Math.random() - 0.5) * 10, 
            (Math.random() - 0.5) * 10
          ]}
        >
          <mesh>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              emissive="#3b82f6"
              emissiveIntensity={2}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// ====================================
// SCENE COMPOSITION
// ====================================

const Scene = () => {
  return (
    <>
      <fog attach="fog" args={['#020617', 5, 20]} />
      <ambientLight intensity={0.5} />
      
      {/* Primary Particle Wave (Purple/Primary) */}
      <WaveParticles count={2000} color="#a855f7" />
      
      {/* Secondary Particle Wave (Blue/Cyan/Accent) */}
      <group position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]}>
         <WaveParticles count={1500} color="#3b82f6" />
      </group>

      <DigitalGrid />
      <FloatingNodes />
    </>
  );
};

// ====================================
// MAIN COMPONENT
// ====================================

const ThreeBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      {/* Vignette & Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default ThreeBackground;
