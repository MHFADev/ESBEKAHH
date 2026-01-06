import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchiveImage } from '../types';
import { PeanutIcon, ButterflyIcon, Star, Lock, Search, RoseIcon, TulipIcon } from './Icons';
import { CHARACTERS } from '../constants';

interface VisitorVisorProps {
  images: ArchiveImage[];
  agentId: string;
}

const VisitorVisor: React.FC<VisitorVisorProps> = ({ images, agentId }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-4 px-4 sm:px-6">
      {/* Optimized Background Decorations - Minimal Particles to avoid lag */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <motion.img 
          src={CHARACTERS.anya_peace}
          alt="Anya"
          className="absolute -top-10 -left-10 w-32 sm:w-48 opacity-20 filter drop-shadow-[0_0_15px_rgba(255,183,197,0.3)]"
          animate={{ 
            y: [0, -15, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.img 
          src={CHARACTERS.anya_bond}
          alt="Anya Bond"
          className="absolute -bottom-10 -right-10 w-40 sm:w-56 opacity-20 filter drop-shadow-[0_0_20px_rgba(255,183,197,0.3)]"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [5, -5, 5]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Subtle Theme Accents */}
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-spy-blue/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-spy-red/10 blur-[100px] rounded-full" />
      </div>

      {/* Cute HUD Elements */}
      <div className="absolute -top-8 left-6 right-6 flex items-center justify-between text-garden-pink/60 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
        <div className="flex items-center gap-3 border border-garden-pink/20 bg-spy-dark/80 px-4 py-1.5 rounded-full backdrop-blur-xl">
          <span className="w-2 h-2 bg-spy-gold rounded-full animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
          VISOR: <span className="text-spy-gold">ACTIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 border border-garden-pink/20 bg-spy-dark/80 px-4 py-1.5 rounded-full backdrop-blur-xl">
          <span className="w-2 h-2 bg-spy-red rounded-full animate-pulse shadow-[0_0_8px_rgba(114,47,55,0.8)]" />
          STATUS: <span className="text-spy-red">SECURE</span>
        </div>
      </div>

      {/* Main Visor Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-spy-dark/60 border-2 border-garden-pink/10 rounded-[2.5rem] overflow-hidden backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(255,183,197,0.05)]"
      >
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none z-30 opacity-20">
          <motion.div 
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-full h-1 bg-gradient-to-r from-transparent via-garden-pink to-transparent blur-[2px]"
          />
        </div>

        {/* Header Area */}
        <div className="p-6 sm:p-10 border-b border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-40 bg-gradient-to-b from-garden-pink/5 to-transparent">
          <div className="flex items-center gap-6 sm:gap-8 w-full lg:w-auto">
            <div className="relative group shrink-0">
              <div className="absolute -inset-4 bg-garden-pink blur-2xl opacity-10 group-hover:opacity-30 transition-opacity rounded-full" />
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-spy-dark border-2 border-garden-pink/30 flex items-center justify-center overflow-hidden shadow-2xl relative z-10"
              >
                <PeanutIcon className="w-12 h-12 sm:w-16 sm:h-16 text-garden-pink animate-wiggle" />
              </motion.div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tighter flex flex-wrap items-center gap-x-4">
                <span className="text-garden-pink drop-shadow-[0_0_15px_rgba(255,183,197,0.3)]">ANYA</span>
                <span className="text-spy-gold/40">ARCHIVE</span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="px-4 py-1 bg-garden-pink/5 border border-garden-pink/20 rounded-full text-[10px] font-mono text-garden-pink tracking-widest font-bold">
                  PROTOCOL: A.N.Y.A
                </div>
                <div className="px-4 py-1 bg-spy-red/5 border border-spy-red/20 rounded-full text-[10px] font-mono text-spy-red tracking-widest font-bold">
                  SECURITY: S.T.R.I.X
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-spy-gold/60">
                  <Star className="w-3 h-3 fill-spy-gold text-spy-gold" />
                  STELLA RANK
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <div className="bg-spy-dark/80 border border-garden-pink/10 p-5 rounded-3xl backdrop-blur-md min-w-[120px] shrink-0">
              <div className="text-[10px] font-mono text-garden-pink/40 mb-1 tracking-widest">INTEL_FOUND</div>
              <div className="text-3xl font-display font-bold text-white flex items-center gap-2">
                {images.length}
                <span className="text-[10px] text-garden-pink/40 font-mono">PCS</span>
              </div>
            </div>
            <div className="bg-spy-dark/80 border border-spy-gold/10 p-5 rounded-3xl backdrop-blur-md min-w-[120px] shrink-0">
              <div className="text-[10px] font-mono text-spy-gold/40 mb-1 tracking-widest">MODE</div>
              <div className="text-3xl font-display font-bold text-spy-gold">WAKU</div>
            </div>
          </div>
        </div>

        {/* Grid Content */}
        <div className="p-6 sm:p-10 relative z-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: (idx % 3) * 0.1 
                }}
                className="group relative"
              >
                {/* Visual Accent - Refined Gold/Pink mix */}
                <div className="absolute -inset-1 bg-gradient-to-br from-garden-pink/20 to-spy-gold/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[2rem] blur-xl" />
                
                <div className="relative aspect-[4/5] bg-spy-dark rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:border-garden-pink/20">
                  {/* Internal Technical HUD - only shows on hover */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-20 pointer-events-none"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-garden-pink/5 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-spy-gold/5 to-transparent" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Image with Zoom */}
                  <img 
                    src={img.thumbnailUrl} 
                    alt={img.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 filter group-hover:brightness-110"
                  />
                  
                  {/* Cute Info Card Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-spy-dark via-spy-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                    <div className="space-y-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-6 bg-garden-pink rounded-full shadow-[0_0_10px_rgba(255,183,197,0.5)]" />
                          <h4 className="font-display font-black text-xl text-white tracking-wide uppercase leading-none">
                            {img.name}
                          </h4>
                        </div>
                        <div className="p-2 bg-white/10 rounded-full backdrop-blur-md">
                          <Search className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="bg-black/60 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                        <p className="text-sm font-hand text-garden-pink/90 leading-relaxed italic line-clamp-2">
                          "{img.description}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-white/30 tracking-[0.2em]">INTEL_DATE</span>
                          <span className="text-[10px] font-mono text-garden-pink/60">{new Date(img.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="px-4 py-1.5 bg-black/40 border border-garden-pink/20 rounded-full text-[9px] font-mono font-bold tracking-widest text-garden-pink/80">
                          GUEST
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Corner Accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/10 rounded-tl-xl group-hover:border-garden-pink/30 transition-colors" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/10 rounded-br-xl group-hover:border-garden-pink/30 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_50px_rgba(255,183,197,0.1)]"
              >
                <ButterflyIcon className="w-20 h-20 text-garden-pink/20" />
              </motion.div>
              <h4 className="font-display text-4xl text-white/40 mb-4 tracking-tighter">ARCHIVE_OFFLINE</h4>
              <p className="font-mono text-[10px] text-spy-blue tracking-[0.4em] uppercase">Ready for mission data ingestion</p>
            </div>
          )}
        </div>

        {/* Optimized Footer */}
        <div className="px-10 py-8 bg-gradient-to-t from-spy-dark to-transparent flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">SYSTEM_STABLE</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-spy-blue rounded-full shadow-[0_0_10px_#4a90e2]" />
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">LOW_LATENCY_MODE</span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/5 px-6 py-2 rounded-full border border-white/10">
            <span className="font-hand text-lg text-garden-pink">Powered by Peanuts</span>
            <ButterflyIcon className="w-6 h-6 text-garden-pink/60" />
          </div>
        </div>
      </motion.div>

      {/* Static Glows - Lighter than particles */}
      <div className="absolute -z-10 top-0 left-1/4 w-[40%] h-[40%] bg-spy-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -z-10 bottom-0 right-1/4 w-[40%] h-[40%] bg-spy-red/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default VisitorVisor;