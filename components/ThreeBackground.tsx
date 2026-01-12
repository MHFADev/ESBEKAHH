import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Stars, 
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';

// Floating 3D Rose
const FloatingRose = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[0.4, 0.15, 128, 16, 2, 3]} />
        <meshStandardMaterial 
          color="#dc2626" 
          metalness={0.3}
          roughness={0.2}
          emissive="#991b1b"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Floating 3D Butterfly
const FloatingButterfly = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Left wing */}
        <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <sphereGeometry args={[0.3, 16, 16, 0, Math.PI]} />
          <meshStandardMaterial 
            color="#fda4af" 
            metalness={0.1}
            roughness={0.3}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Right wing */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <sphereGeometry args={[0.3, 16, 16, 0, Math.PI]} />
          <meshStandardMaterial 
            color="#fda4af" 
            metalness={0.1}
            roughness={0.3}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* Body */}
        <mesh>
          <capsuleGeometry args={[0.05, 0.4, 8, 16]} />
          <meshStandardMaterial color="#ec4899" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

// Abstract Spy Element (geometric shape)
const SpyElement = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.8}
          roughness={0.1}
          emissive="#1e40af"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

// Soft glowing orbs (particles)
const GlowOrb = ({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
};

// Animated distorted sphere background
const BackgroundSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={15}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#0f172a"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

// Camera animation
const AnimatedCamera = () => {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime() * 0.1;
    camera.position.x = Math.sin(t) * 0.5;
    camera.position.y = Math.cos(t * 0.7) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Main scene
const Scene = ({ isMobile }: { isMobile: boolean }) => {
  // Generate random positions for elements with reduced count on mobile
  const elementCount = isMobile ? { roses: 3, butterflies: 2, spyElements: 4, orbs: 6 } : { roses: 5, butterflies: 4, spyElements: 6, orbs: 12 };
  
  const roses = useMemo(() => 
    Array.from({ length: elementCount.roses }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 - 3
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.3,
      key: `rose-${i}`
    })),
    [elementCount.roses]
  );

  const butterflies = useMemo(() => 
    Array.from({ length: elementCount.butterflies }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6 - 2
      ] as [number, number, number],
      scale: 0.4 + Math.random() * 0.2,
      key: `butterfly-${i}`
    })),
    [elementCount.butterflies]
  );

  const spyElements = useMemo(() => 
    Array.from({ length: elementCount.spyElements }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 - 4
      ] as [number, number, number],
      scale: 0.4 + Math.random() * 0.4,
      key: `spy-${i}`
    })),
    [elementCount.spyElements]
  );

  const orbs = useMemo(() => 
    Array.from({ length: elementCount.orbs }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      color: ['#fda4af', '#f472b6', '#ec4899', '#3b82f6', '#93c5fd'][Math.floor(Math.random() * 5)],
      scale: 0.3 + Math.random() * 0.3,
      key: `orb-${i}`
    })),
    [elementCount.orbs]
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <AnimatedCamera />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#fda4af" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.5} 
        penumbra={1} 
        intensity={0.5}
        color="#ffffff"
        castShadow
      />

      {/* Background elements */}
      <BackgroundSphere />
      <Stars 
        radius={50} 
        depth={50} 
        count={isMobile ? 1500 : 3000} 
        factor={3} 
        saturation={0} 
        fade 
        speed={0.5}
      />

      {/* 3D Objects */}
      {roses.map(rose => (
        <FloatingRose key={rose.key} position={rose.position} scale={rose.scale} />
      ))}
      
      {butterflies.map(butterfly => (
        <FloatingButterfly key={butterfly.key} position={butterfly.position} scale={butterfly.scale} />
      ))}
      
      {spyElements.map(element => (
        <SpyElement key={element.key} position={element.position} scale={element.scale} />
      ))}
      
      {orbs.map(orb => (
        <GlowOrb key={orb.key} position={orb.position} color={orb.color} scale={orb.scale} />
      ))}

      {/* Fog for depth */}
      <fog attach="fog" args={['#0f172a', 8, 25]} />
    </>
  );
};

// Main component
const ThreeBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ 
          antialias: !isMobile, 
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance"
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Scene isMobile={isMobile} />
      </Canvas>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-slate-950/80 pointer-events-none" />
    </div>
  );
};

export default ThreeBackground;
