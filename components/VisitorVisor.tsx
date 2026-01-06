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
    <div className="relative w-full max-w-7xl mx-auto mt-8 px-4">
      {/* Interactive Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <motion.img 
          src={CHARACTERS.anya_peace}
          alt="Anya"
          className="absolute -top-10 -left-10 w-48 opacity-20"
          animate={{ 
            y: [0, -10, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.img 
          src={CHARACTERS.anya_bond}
          alt="Anya Bond"
          className="absolute -bottom-10 -right-10 w-56 opacity-20"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* HUD Elements */}
      <div className="absolute -top-10 left-4 flex items-center gap-4 text-garden-pink/50 font-mono text-[10px] tracking-[0.3em] uppercase">
        <div className="flex items-center gap-2 border border-garden-pink/20 px-3 py-1 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-garden-pink rounded-full animate-pulse" />
          SYSTEM STATUS: STEALTH
        </div>
        <div className="flex items-center gap-2 border border-garden-pink/20 px-3 py-1 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-garden-rose rounded-full animate-pulse" />
          TARGET: WORLD PEACE
        </div>
      </div>

      {/* Main Visor Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-black/40 border border-garden-pink/20 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(255,183,197,0.1)]"
      >
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: ['0%', '1000%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-garden-pink/20 to-transparent"
          />
        </div>

        {/* Header Area */}
        <div className="p-8 border-b border-garden-pink/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-garden-pink blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
              <div className="w-20 h-20 rounded-2xl bg-spy-dark border-2 border-garden-pink/50 flex items-center justify-center overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                <PeanutIcon className="w-12 h-12 text-garden-pink animate-wiggle" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-garden-pink tracking-tighter">
                ANYA'S <span className="text-white/20">VISOR</span>
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="px-3 py-0.5 bg-garden-pink/10 border border-garden-pink/30 rounded text-[10px] font-mono text-garden-pink tracking-widest">
                  GUEST_PROTOCOL_V2.0
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-garden-rose/80">
                  <Star className="w-3 h-3 fill-current" />
                  STELLA READY
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-[10px] font-mono text-garden-pink/50 mb-1">INTEL_COUNT</div>
              <div className="text-2xl font-display font-bold text-white">{images.length}</div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-[10px] font-mono text-garden-pink/50 mb-1">ACCESS_LEVEL</div>
              <div className="text-2xl font-display font-bold text-garden-pink">VISITOR</div>
            </div>
          </div>
        </div>

        {/* Advanced Grid Layout */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ scale: 1.02, z: 50 }}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  delay: idx * 0.05 
                }}
                className="group relative preserve-3d cursor-crosshair"
              >
                {/* 3D Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                
                {/* Frame Decoration */}
                <div className="absolute -inset-1 bg-gradient-to-br from-garden-pink/40 via-transparent to-garden-rose/40 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-md" />
                
                <div className="relative aspect-[4/5] bg-spy-dark rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:shadow-[0_0_30px_rgba(255,183,197,0.3)]">
                  {/* Scanning Bar for individual images */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-garden-pink/40 z-20 shadow-[0_0_10px_rgba(255,183,197,0.8)]"
                      />
                    )}
                  </AnimatePresence>

                  {/* Image with Advanced Hover */}
                  <img 
                    src={img.thumbnailUrl} 
                    alt={img.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 filter group-hover:brightness-110"
                  />
                  
                  {/* Interactive Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0">
                    <div className="absolute top-4 left-4 flex gap-1">
                      {[1,2,3].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                          className="w-1 h-1 bg-garden-pink rounded-full"
                        />
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-4 bg-garden-pink rounded-full animate-pulse" />
                          <h4 className="font-display font-bold text-lg text-white tracking-wider uppercase group-hover:text-garden-pink transition-colors">
                            {img.name}
                          </h4>
                        </div>
                        <Search className="w-4 h-4 text-garden-pink/50" />
                      </div>
                      
                      <div className="bg-black/40 p-3 rounded border border-white/5 backdrop-blur-sm">
                        <p className="text-xs font-hand text-garden-pink/90 leading-relaxed italic">
                          "{img.description}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[8px] font-mono tracking-tighter">
                        <div className="flex flex-col">
                          <span className="text-white/30">TIMESTAMP</span>
                          <span className="text-garden-pink/60">{new Date(img.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded flex items-center gap-1">
                          <Lock className="w-2 h-2 text-garden-rose" />
                          <span className="text-white/50">VERIFIED</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Overlays */}
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-garden-pink/40 transition-colors">
                    ID: {img.id.slice(0, 8)}
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-garden-pink/30 rounded-tl-xl group-hover:border-garden-pink transition-colors" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-garden-pink/30 rounded-br-xl group-hover:border-garden-pink transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {images.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-garden-pink/5 rounded-full flex items-center justify-center mb-6 animate-pulse border border-garden-pink/10">
                <ButterflyIcon className="w-16 h-16 text-garden-pink/20" />
              </div>
              <h4 className="font-display text-2xl text-garden-pink/50 mb-2">ARCHIVES EMPTY</h4>
              <p className="font-mono text-[10px] text-white/20 tracking-[0.2em]">WAITING FOR AGENT MISSION DATA...</p>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <div className="px-8 py-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Encryption: AES-256 Enabled</span>
          </div>
          <div className="flex items-center gap-2 font-hand text-garden-pink/40 text-sm">
            <span>Powered by Peanuts</span>
            <ButterflyIcon className="w-4 h-4" />
          </div>
        </div>
      </motion.div>

      {/* Background Floating Elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-garden-pink/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default VisitorVisor;