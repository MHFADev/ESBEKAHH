import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ====================================
// CUTE 3D SHAPES - No Float Component
// ====================================

// Rounded Cube (Cute mascot-style shape)
interface ShapeProps {
  position: [number, number, number];
  scale: number;
  color: string;
  layer: 'foreground' | 'midground' | 'background';
}

const RoundedCube = ({ position, scale, color, layer }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialRotation = useMemo(() => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  ], []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle breathing scale animation
      const breathe = Math.sin(clock.getElapsedTime() * 0.8 + position[0]) * 0.05 + 1;
      meshRef.current.scale.setScalar(scale * breathe);
      
      // Slow rotation grounded in space
      meshRef.current.rotation.x = initialRotation[0] + clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = initialRotation[1] + clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1, 4, 4, 4]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.6}
        metalness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

// Soft Sphere (Organic shape)
const SoftSphere = ({ position, scale, color, layer }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitSpeed = useMemo(() => 0.05 + Math.random() * 0.1, []);
  const orbitRadius = useMemo(() => 0.2 + Math.random() * 0.3, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * orbitSpeed;
      
      // Circular orbit motion
      meshRef.current.position.x = position[0] + Math.cos(time) * orbitRadius;
      meshRef.current.position.y = position[1] + Math.sin(time * 1.3) * orbitRadius * 0.5;
      
      // Pulsing scale
      const pulse = Math.sin(clock.getElapsedTime() * 1.5 + position[1]) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.4}
        metalness={0.3}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

// Torus (Playful donut shape)
const PlayfulTorus = ({ position, scale, color, layer }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wobbleSpeed = useMemo(() => 0.6 + Math.random() * 0.4, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Wobble rotation
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * wobbleSpeed) * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.z = Math.cos(clock.getElapsedTime() * wobbleSpeed * 0.7) * 0.2;
      
      // Gentle scale breathing
      const breathe = Math.sin(clock.getElapsedTime() * 1.2 + position[2]) * 0.08 + 1;
      meshRef.current.scale.setScalar(scale * breathe);
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <torusGeometry args={[0.6, 0.25, 24, 48]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.5}
        metalness={0.25}
      />
    </mesh>
  );
};

// Star Shape (Decorative icon)
const StarShape = ({ position, scale, color, layer }: ShapeProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const spinSpeed = useMemo(() => 0.3 + Math.random() * 0.3, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * spinSpeed;
      
      // Twinkle effect
      const twinkle = Math.sin(clock.getElapsedTime() * 2 + position[0] * 2) * 0.15 + 1;
      meshRef.current.scale.setScalar(scale * twinkle);
    }
  });

  // Create star shape using extruded geometry
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 0.5;
    const innerRadius = 0.2;
    const points = 5;
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[starShape, { depth: 0.15, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 }]} />
        <meshStandardMaterial 
          color={color}
          roughness={0.3}
          metalness={0.4}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};

// Heart Shape (Cute mascot element)
const HeartShape = ({ position, scale, color, layer }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Heartbeat animation
      const beat = Math.sin(clock.getElapsedTime() * 2.5 + position[0]) * 0.12 + 1;
      meshRef.current.scale.setScalar(scale * beat);
      
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  // Create heart shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.25);
    shape.bezierCurveTo(0, 0.25, -0.25, 0.6, -0.5, 0.35);
    shape.bezierCurveTo(-0.75, 0.1, -0.75, -0.2, -0.5, -0.4);
    shape.bezierCurveTo(-0.25, -0.6, 0, -0.8, 0, -1);
    shape.bezierCurveTo(0, -0.8, 0.25, -0.6, 0.5, -0.4);
    shape.bezierCurveTo(0.75, -0.2, 0.75, 0.1, 0.5, 0.35);
    shape.bezierCurveTo(0.25, 0.6, 0, 0.25, 0, 0.25);
    return shape;
  }, []);

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <extrudeGeometry args={[heartShape, { depth: 0.2, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08 }]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
};

// Pill Shape (Modern capsule)
const PillShape = ({ position, scale, color, layer }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rotationAxis = useMemo(() => Math.random() > 0.5 ? 'x' : 'z', []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (rotationAxis === 'x') {
        meshRef.current.rotation.x = clock.getElapsedTime() * 0.4;
      } else {
        meshRef.current.rotation.z = clock.getElapsedTime() * 0.4;
      }
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <capsuleGeometry args={[0.3, 0.8, 16, 32]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.4}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

// ====================================
// CINEMATIC CAMERA
// ====================================

const CinematicCamera = () => {
  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime() * 0.08;
    
    // Slow orbital movement
    camera.position.x = Math.sin(time) * 1.5;
    camera.position.y = Math.cos(time * 0.7) * 0.8;
    camera.position.z = 10 + Math.sin(time * 0.5) * 0.5;
    
    // Always look at center
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// ====================================
// LIGHTING SYSTEM
// ====================================

const SoftLighting = () => {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (keyLightRef.current) {
      // Gentle light movement
      const time = clock.getElapsedTime() * 0.3;
      keyLightRef.current.position.x = Math.sin(time) * 5;
      keyLightRef.current.position.z = Math.cos(time) * 5;
    }
  });

  return (
    <>
      {/* Soft ambient for overall brightness */}
      <ambientLight intensity={0.4} color="#fef3f9" />
      
      {/* Key light - warm pink */}
      <pointLight 
        ref={keyLightRef}
        position={[8, 8, 5]} 
        intensity={0.8} 
        color="#fda4af"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Fill light - cool blue */}
      <pointLight 
        ref={fillLightRef}
        position={[-6, 4, 8]} 
        intensity={0.5} 
        color="#bae6fd"
      />
      
      {/* Back light for rim lighting */}
      <pointLight 
        position={[0, -5, -8]} 
        intensity={0.3} 
        color="#e9d5ff"
      />
      
      {/* Top spotlight for bloom effect */}
      <spotLight
        position={[0, 12, 0]}
        angle={0.8}
        penumbra={1}
        intensity={0.4}
        color="#ffffff"
        castShadow
      />
    </>
  );
};

// ====================================
// DEPTH-LAYERED SCENE COMPOSITION
// ====================================

interface SceneObject {
  component: React.ComponentType<ShapeProps>;
  position: [number, number, number];
  scale: number;
  color: string;
  layer: 'foreground' | 'midground' | 'background';
  key: string;
}

const Scene = ({ isMobile }: { isMobile: boolean }) => {
  // Soft pastel palette - cute & elegant
  const colors = {
    pastelPink: '#fda4af',
    pastelBlue: '#93c5fd',
    pastelPurple: '#d8b4fe',
    pastelYellow: '#fde68a',
    pastelGreen: '#a7f3d0',
    pastelPeach: '#fcd34d',
    softRose: '#fecdd3',
    softLavender: '#e9d5ff',
  };

  const colorArray = Object.values(colors);

  // Component types for variety
  const shapeTypes = [
    RoundedCube,
    SoftSphere,
    PlayfulTorus,
    StarShape,
    HeartShape,
    PillShape,
  ];

  // Generate layered objects with clear depth separation
  const sceneObjects = useMemo<SceneObject[]>(() => {
    const objects: SceneObject[] = [];
    const count = isMobile ? 30 : 60; // Many objects for visual richness
    
    for (let i = 0; i < count; i++) {
      // Determine layer based on z-position
      const layerRandom = Math.random();
      let layer: 'foreground' | 'midground' | 'background';
      let zRange: [number, number];
      let scaleRange: [number, number];
      let spreadX: number;
      let spreadY: number;
      
      if (layerRandom < 0.25) {
        // Foreground - closest to camera, larger, limited spread
        layer = 'foreground';
        zRange = [3, 6];
        scaleRange = [0.8, 1.4];
        spreadX = 8;
        spreadY = 6;
      } else if (layerRandom < 0.65) {
        // Midground - medium depth, medium size
        layer = 'midground';
        zRange = [-2, 3];
        scaleRange = [0.5, 0.9];
        spreadX = 12;
        spreadY = 8;
      } else {
        // Background - far from camera, smaller, wide spread
        layer = 'background';
        zRange = [-8, -2];
        scaleRange = [0.3, 0.6];
        spreadX = 16;
        spreadY = 10;
      }
      
      const position: [number, number, number] = [
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        zRange[0] + Math.random() * (zRange[1] - zRange[0])
      ];
      
      const scale = scaleRange[0] + Math.random() * (scaleRange[1] - scaleRange[0]);
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      const component = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      
      objects.push({
        component,
        position,
        scale,
        color,
        layer,
        key: `shape-${i}-${layer}`
      });
    }
    
    // Sort by z-position for proper rendering order
    return objects.sort((a, b) => a.position[2] - b.position[2]);
  }, [isMobile]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />
      <CinematicCamera />
      
      <SoftLighting />

      {/* Render all 3D objects */}
      {sceneObjects.map(obj => {
        const Component = obj.component;
        return (
          <Component
            key={obj.key}
            position={obj.position}
            scale={obj.scale}
            color={obj.color}
            layer={obj.layer}
          />
        );
      })}

      {/* Soft fog for atmospheric depth */}
      <fog attach="fog" args={['#0f172a', 12, 30]} />
    </>
  );
};

// ====================================
// MAIN COMPONENT
// ====================================

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
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: 'transparent' }}
        frameloop="always"
      >
        <Scene isMobile={isMobile} />
      </Canvas>
      
      {/* Soft gradient overlay for UI readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-slate-950/85 pointer-events-none" />
    </div>
  );
};

export default ThreeBackground;
