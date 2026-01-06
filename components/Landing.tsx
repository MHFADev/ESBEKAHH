import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PeanutIcon, PistolIcon, Star, RoseIcon, TulipIcon, ButterflyIcon } from './Icons';
import { CHARACTERS } from '../constants';

interface LandingProps {
  onVisitorEntry: () => void;
  onMemberEntry: () => void;
}

const Landing: React.FC<LandingProps> = ({ onVisitorEntry, onMemberEntry }) => {
  const [hoveredSide, setHoveredSide] = useState<'visitor' | 'member' | null>(null);

  return (
    <div className="relative z-10 min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT SIDE: VISITOR (Garden/Anya Theme - Soft Pink, Tulips, Butterflies) */}
      <motion.div 
        className="flex-1 relative flex items-center justify-center p-8 group border-b md:border-b-0 md:border-r border-garden-pink/30 cursor-pointer overflow-hidden"
        onMouseEnter={() => setHoveredSide('visitor')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={onVisitorEntry}
        animate={{ 
            backgroundColor: hoveredSide === 'visitor' ? 'rgba(255, 183, 197, 0.15)' : 'rgba(5, 5, 5, 0.8)',
            flex: hoveredSide === 'visitor' ? 1.5 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        {/* New Decorative Tulips */}
        <motion.img 
            src={CHARACTERS.tulips}
            alt="Tulips Decoration"
            className="absolute -top-10 -right-10 w-40 opacity-30 pointer-events-none mix-blend-screen"
            animate={{ 
                rotate: hoveredSide === 'visitor' ? [0, 5, -5, 0] : 0,
                scale: hoveredSide === 'visitor' ? 1.1 : 1
            }}
            transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.img 
            src={CHARACTERS.white_tulip}
            alt="White Tulip"
            className="absolute bottom-20 right-10 w-24 opacity-40 pointer-events-none mix-blend-screen"
            animate={{ 
                y: hoveredSide === 'visitor' ? [0, -10, 0] : 0
            }}
            transition={{ repeat: Infinity, duration: 4 }}
        />
        
        {/* Soft Pink Glow */}
        <motion.div 
          className="absolute inset-0 bg-garden-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundImage: 'radial-gradient(#FFB7C5 1px, transparent 1px)', backgroundSize: '25px 25px' }}
        />
        
        {/* ANYA IMAGES */}
        {/* Anya Peace - Main Focus */}
        <motion.img 
            src={CHARACTERS.anya_peace}
            alt="Anya Peace"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[60%] md:h-[70%] object-contain z-10 drop-shadow-2xl filter brightness-110 pointer-events-none"
            initial={{ y: 500, opacity: 0 }}
            animate={{ 
                y: hoveredSide === 'visitor' ? 0 : 200, 
                opacity: hoveredSide === 'visitor' ? 1 : 0.6,
                scale: hoveredSide === 'visitor' ? 1.1 : 0.9
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        />

        {/* Bond - Background/Side */}
        <motion.img 
            src={CHARACTERS.anya_bond}
            alt="Bond"
            className="absolute bottom-10 -left-20 h-[40%] object-contain z-0 opacity-80 mix-blend-multiply pointer-events-none"
            animate={{ 
                x: hoveredSide === 'visitor' ? 50 : 0,
                rotate: hoveredSide === 'visitor' ? 5 : 0
            }}
            transition={{ duration: 1 }}
        />

        <div className="relative z-20 text-center mb-40 md:mb-0">
            <motion.div 
                animate={hoveredSide === 'visitor' ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 p-4 bg-garden-pink rounded-full text-spy-dark shadow-[0_0_30px_rgba(255,183,197,0.6)]"
            >
                <TulipIcon className="w-12 h-12" />
            </motion.div>
            <h2 className="text-5xl font-hand font-bold text-garden-pink mb-2 group-hover:tracking-widest transition-all drop-shadow-md">
                WAKU WAKU!
            </h2>
            <div className="flex items-center justify-center gap-2 text-garden-tulip/80 mb-6 font-mono text-sm tracking-[0.2em]">
                <ButterflyIcon className="w-4 h-4" />
                <span>VISITOR ACCESS</span>
                <ButterflyIcon className="w-4 h-4 scale-x-[-1]" />
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span className="bg-garden-pink text-spy-dark font-bold px-6 py-2 rounded-full text-xs shadow-[0_0_15px_rgba(255,183,197,0.5)]">
                    ENTER GARDEN
                </span>
            </div>
        </div>
      </motion.div>

      {/* CENTER DIVIDER (Visual) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:block">
        <div className="bg-spy-dark text-spy-gold font-display font-bold text-xl px-4 py-2 rounded border border-spy-gold/50 shadow-2xl rotate-45">
            X
        </div>
      </div>

      {/* RIGHT SIDE: MEMBER (Spy/Yor/Loid Theme - Deep Red Rose, Navy, Black) */}
      <motion.div 
        className="flex-1 relative flex items-center justify-center p-8 group cursor-pointer overflow-hidden"
        onMouseEnter={() => setHoveredSide('member')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={onMemberEntry}
        animate={{ 
            backgroundColor: hoveredSide === 'member' ? '#0B1026' : 'rgba(5, 5, 5, 0.8)',
            flex: hoveredSide === 'member' ? 1.5 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Deep Navy/Red Glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-spy-navy/50 to-spy-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* New Decorative Roses */}
        <motion.img 
            src={CHARACTERS.rose}
            alt="Rose Decoration"
            className="absolute top-10 left-10 w-32 opacity-20 pointer-events-none mix-blend-screen"
            animate={{ 
                rotate: hoveredSide === 'member' ? 360 : 0,
                scale: hoveredSide === 'member' ? 1.2 : 1
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.img 
            src={CHARACTERS.rose}
            alt="Rose Decoration Lower"
            className="absolute bottom-40 right-10 w-48 opacity-10 pointer-events-none mix-blend-screen rotate-45"
            animate={{ 
                scale: hoveredSide === 'member' ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 5, repeat: Infinity }}
        />

        {/* CHARACTER IMAGES */}
        {/* Loid - Standing Main */}
        <motion.img 
            src={CHARACTERS.loid_standing}
            alt="Loid"
            className="absolute bottom-0 right-10 md:right-20 h-[75%] object-contain z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] pointer-events-none"
            initial={{ x: 100, opacity: 0 }}
            animate={{ 
                x: hoveredSide === 'member' ? 0 : 50, 
                opacity: hoveredSide === 'member' ? 1 : 0.5,
                scale: hoveredSide === 'member' ? 1.05 : 0.95
            }}
            transition={{ type: 'spring', damping: 20 }}
        />

        {/* Yor - Support/Background */}
        <motion.img 
            src={CHARACTERS.yor_portrait}
            alt="Yor"
            className="absolute top-20 right-0 md:-right-10 h-[50%] object-contain z-0 opacity-0 md:opacity-100 mix-blend-lighten pointer-events-none"
            animate={{ 
                opacity: hoveredSide === 'member' ? 0.8 : 0,
                x: hoveredSide === 'member' ? -20 : 50
            }}
            transition={{ duration: 0.8 }}
        />

        <div className="relative z-20 text-center mb-40 md:mb-0">
             <motion.div 
                animate={hoveredSide === 'member' ? { y: -10 } : {}}
                className="inline-block mb-4 p-4 bg-spy-red rounded-sm text-spy-cream shadow-[0_0_30px_rgba(114,47,55,0.8)]"
            >
                <PistolIcon className="w-12 h-12" />
            </motion.div>
            <h2 className="text-4xl font-display font-bold text-spy-cream mb-2 group-hover:tracking-widest transition-all">
                OPERATION STRIX
            </h2>
            <div className="flex items-center justify-center gap-2 text-spy-red mb-6 font-mono text-sm tracking-[0.2em]">
                <RoseIcon className="w-4 h-4" />
                <span>TOP SECRET</span>
                <RoseIcon className="w-4 h-4" />
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span className="bg-transparent border border-spy-red text-spy-red font-bold px-6 py-2 rounded-sm text-xs shadow-[0_0_10px_rgba(114,47,55,0.5)] hover:bg-spy-red hover:text-spy-cream transition-colors font-display">
                    IDENTIFY YOURSELF
                </span>
            </div>
        </div>
      </motion.div>

      {/* FOOTER OVERLAY */}
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none z-20 mix-blend-overlay">
         <h1 className="text-8xl md:text-9xl font-display font-black text-white/5 tracking-tighter">
            ESBEKAHH
         </h1>
      </div>
      <div className="absolute top-10 w-full text-center pointer-events-none z-20">
         <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black/40 border border-spy-gold/30 backdrop-blur-md">
            <Star className="w-4 h-4 text-spy-gold fill-spy-gold" />
            <span className="text-xs font-serif font-bold text-spy-gold tracking-[0.3em] uppercase">
                Anak Kesayangan Bu Retno
            </span>
            <Star className="w-4 h-4 text-spy-gold fill-spy-gold" />
         </div>
      </div>
    </div>
  );
};

export default Landing;