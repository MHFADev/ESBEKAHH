import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { PeanutIcon, ButterflyIcon, Star } from './Icons';

const FloatingPeanut = () => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  
  return (
    <motion.div
      initial={position}
      animate={{
        x: [position.x, Math.random() * 100, position.x],
        y: [position.y, Math.random() * 100, position.y],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 20 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
      className="fixed pointer-events-none opacity-10 z-0 text-garden-pink"
      style={{ width: 40, height: 40 }}
    >
      <PeanutIcon className="w-full h-full" />
    </motion.div>
  );
};

const MouseFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[1000] hidden md:block"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <div className="relative">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 border border-spy-red/30 rounded-full scale-150" 
        />
        <CrosshairSVG className="w-full h-full text-spy-red" />
      </div>
    </motion.div>
  );
};

const CrosshairSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.5" />
    <path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const InteractiveDecoration = () => {
  return (
    <>
      <MouseFollower />
      {[...Array(6)].map((_, i) => <FloatingPeanut key={i} />)}
    </>
  );
};

export default InteractiveDecoration;
