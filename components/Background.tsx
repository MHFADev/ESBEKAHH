import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, ButterflyIcon, RoseIcon, TulipIcon, BlueElement } from './Icons';

const Background: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Soft Pink Butterflies (Anya Side)
  const butterflies = Array.from({ length: 4 }).map((_, i) => ({
    id: `b-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 15,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  // Deep Red Roses (Yor Side)
  const roses = Array.from({ length: 12 }).map((_, i) => ({
    id: `r-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 35 + 20,
    duration: Math.random() * 25 + 20,
    delay: Math.random() * 10,
  }));

  // Soft Tulips (Garden Side)
  const tulips = Array.from({ length: 4 }).map((_, i) => ({
    id: `t-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 15,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 3,
  }));

  // Blue Elements (Spy Side)
  const blueElements = Array.from({ length: 3 }).map((_, i) => ({
    id: `b-el-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 15 + 10,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 15,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-spy-dark">
      {/* Deep Navy to Black Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-spy-navy via-spy-dark to-spy-red/20 opacity-80" />
      <div className="absolute inset-0 bg-floral-pattern mix-blend-overlay" />
      
      {/* Dynamic Sniper Scope (Mouse Follower) */}
      <motion.div 
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full border border-spy-red/10 pointer-events-none z-0 hidden md:block"
        animate={{ 
          x: mousePos.x - 250, 
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div className="absolute inset-0 border-[400px] border-black/50 rounded-full blur-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
             <Crosshair className="w-full h-full text-spy-red/20 opacity-30 p-20" strokeWidth={0.5} />
        </div>
      </motion.div>

      {/* Floating Roses (Deep Red) */}
      {roses.map((r) => (
        <motion.div
          key={r.id}
          className="absolute text-spy-red/30 blur-[1px]"
          initial={{ x: `${r.x}vw`, y: `110vh`, rotate: 0 }}
          animate={{ 
            y: `-10vh`, 
            rotate: [0, 90, 180],
            x: [`${r.x}vw`, `${r.x + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{
            duration: r.duration,
            repeat: Infinity,
            delay: r.delay,
            ease: "linear",
          }}
          style={{ width: r.size, height: r.size }}
        >
          <RoseIcon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Floating Tulips (Soft Pink) */}
      {tulips.map((t) => (
        <motion.div
          key={t.id}
          className="absolute text-garden-tulip/20 blur-[0.5px]"
          initial={{ x: `${t.x}vw`, y: `110vh`, rotate: -10 }}
          animate={{ 
            y: `-10vh`, 
            rotate: [-10, 10, -10],
            x: [`${t.x}vw`, `${t.x + (Math.random() * 20 - 10)}vw`]
          }}
          transition={{
            duration: t.duration,
            repeat: Infinity,
            delay: t.delay,
            ease: "linear",
          }}
          style={{ width: t.size, height: t.size }}
        >
          <TulipIcon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Floating Butterflies (Soft Pink/White) */}
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute text-garden-pink/40"
          initial={{ x: `${b.x}vw`, y: `110vh`, opacity: 0, rotate: 0 }}
          animate={{ 
            y: `-10vh`, 
            opacity: [0, 0.8, 0],
            rotate: [0, 45, -45, 0],
            x: [`${b.x}vw`, `${b.x + (Math.random() * 30 - 15)}vw`]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
          style={{ width: b.size, height: b.size }}
        >
          <ButterflyIcon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Floating Blue Elements */}
      {blueElements.map((be) => (
        <motion.div
          key={be.id}
          className="absolute text-spy-blue/20"
          initial={{ x: `${be.x}vw`, y: `110vh`, rotate: 0 }}
          animate={{ 
            y: `-10vh`, 
            rotate: 360,
            x: [`${be.x}vw`, `${be.x + (Math.random() * 10 - 5)}vw`]
          }}
          transition={{
            duration: be.duration,
            repeat: Infinity,
            delay: be.delay,
            ease: "linear",
          }}
          style={{ width: be.size, height: be.size }}
        >
          <BlueElement className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
};

export default Background;