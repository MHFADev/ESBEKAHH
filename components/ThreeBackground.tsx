import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ====================================
// STYLIZED FLOWERS
// ====================================

interface ShapeProps {
  position: [number, number, number];
  scale: number;
  rotation?: [number, number, number];
  color?: string;
}

// Stylized Red Rose (Procedural)
const RedRose = ({ position, scale, rotation = [0, 0, 0] }: ShapeProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Hover scale effect
      const targetScale = hovered ? scale * 1.2 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position} 
      rotation={new THREE.Euler(...rotation)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Rose Head - Complex Torus Knot resembles petals */}
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          <torusKnotGeometry args={[0.6, 0.25, 128, 32, 3, 7]} />
          <meshStandardMaterial 
            color="#991111" 
            roughness={0.3}
            metalness={0.1}
            emissive="#550000"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Inner detail */}
        <mesh position={[0, 0.5, 0]} scale={0.5}>
          <torusKnotGeometry args={[0.5, 0.2, 64, 16, 2, 3]} />
          <meshStandardMaterial color="#bb0000" roughness={0.2} />
        </mesh>

        {/* Stem */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.08, 0.05, 3, 8]} />
          <meshStandardMaterial color="#1a472a" roughness={0.8} />
        </mesh>

        {/* Leaves */}
        <group position={[0, -0.5, 0]}>
          <mesh rotation={[0.5, 0, 0.5]} position={[0.4, 0, 0]}>
            <sphereGeometry args={[0.4, 32, 16]} />
            <meshStandardMaterial color="#2d5a3f" roughness={0.7} />
          </mesh>
          <mesh rotation={[0.5, 0, -0.5]} position={[-0.4, -0.2, 0]}>
            <sphereGeometry args={[0.4, 32, 16]} />
            <meshStandardMaterial color="#2d5a3f" roughness={0.7} />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// Stylized White Tulip (Procedural)
const WhiteTulip = ({ position, scale, rotation = [0, 0, 0] }: ShapeProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle sway
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1 + position[0]) * 0.05 + rotation[2];
      
      const targetScale = hovered ? scale * 1.15 : scale;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={new THREE.Euler(...rotation)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Tulip Head */}
        <mesh position={[0, 0.8, 0]} castShadow>
          {/* Deformed sphere/cone hybrid for tulip shape */}
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, 2.0]} />
          <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.2} 
            metalness={0.1}
            emissive="#ffffff"
            emissiveIntensity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Petal details */}
        <mesh position={[0, 0.8, 0]} rotation={[0, 1, 0]} scale={[0.9, 0.9, 0.9]}>
           <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, 1.8]} />
           <meshStandardMaterial color="#f0f0f0" roughness={0.3} side={THREE.DoubleSide}/>
        </mesh>

        {/* Stem */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.04, 2.5, 8]} />
          <meshStandardMaterial color="#4a7c59" roughness={0.8} />
        </mesh>

        {/* Long Leaf */}
        <mesh position={[0.2, -0.8, 0]} rotation={[0, 0, -0.2]} scale={[0.2, 1.2, 0.05]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#3a6b4a" roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
};

// ====================================
// INTERACTIVE CAMERA
// ====================================

const InteractiveCamera = () => {
  const { camera, mouse } = useThree();
  const initialPos = useRef(new THREE.Vector3(0, 0, 12));

  useFrame(() => {
    // Parallax effect based on mouse position
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// ====================================
// LIGHTING SYSTEM
// ====================================

const GardenLighting = () => {
  return (
    <>
      <ambientLight intensity={0.4} color="#e0f2fe" />
      <pointLight position={[10, 10, 10]} intensity={1.0} color="#fff1f2" castShadow />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#bbf7d0" />
      <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={0.8} color="#ffffff" />
      <Sparkles count={50} scale={12} size={4} speed={0.4} opacity={0.5} color="#fff" />
    </>
  );
};

// ====================================
// SCENE COMPOSITION
// ====================================

const Scene = ({ isMobile }: { isMobile: boolean }) => {
  // Create a composed garden scene
  const flowers = useMemo(() => {
    const items = [];
    
    // Central Rose (Hero)
    items.push(
      <RedRose 
        key="hero-rose" 
        position={[0, 0, 1]} 
        scale={isMobile ? 1.5 : 2} 
        rotation={[0.2, 0, 0]}
      />
    );

    // Surrounding White Tulips
    const tulipCount = isMobile ? 4 : 8;
    for (let i = 0; i < tulipCount; i++) {
      const angle = (i / tulipCount) * Math.PI * 2;
      const radius = isMobile ? 2.5 : 4.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.5 - 1; // Oval distribution
      const z = -2 - Math.random() * 3;
      
      items.push(
        <WhiteTulip 
          key={`tulip-${i}`}
          position={[x, y, z]} 
          scale={0.8 + Math.random() * 0.4}
          rotation={[Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2]} 
        />
      );
    }

    // Background Floating Roses (Small)
    const bgRoseCount = isMobile ? 3 : 6;
    for (let i = 0; i < bgRoseCount; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 10;
      const z = -5 - Math.random() * 5;
      
      items.push(
        <RedRose 
          key={`bg-rose-${i}`}
          position={[x, y, z]} 
          scale={0.4 + Math.random() * 0.3}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} 
        />
      );
    }

    return items;
  }, [isMobile]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
      <InteractiveCamera />
      <GardenLighting />
      
      {flowers}

      <fog attach="fog" args={['#020617', 5, 25]} />
    </>
  );
};

// ====================================
// MAIN COMPONENT
// ====================================

const ThreeBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/80 pointer-events-none" />
    </div>
  );
};

export default ThreeBackground;
