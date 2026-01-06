import React from 'react';
import { motion } from 'framer-motion';
import { ArchiveImage } from '../types';
import { PeanutIcon, ButterflyIcon, Star, Lock, Search } from './Icons';

interface VisitorVisorProps {
  images: ArchiveImage[];
  agentId: string;
}

const VisitorVisor: React.FC<VisitorVisorProps> = ({ images, agentId }) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto mt-8 px-4">
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative"
              >
                {/* Frame Decoration */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-garden-pink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-sm" />
                
                <div className="relative aspect-[4/5] bg-spy-dark rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Image with Advanced Hover */}
                  <img 
                    src={img.thumbnailUrl} 
                    alt={img.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* HUD Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] p-6 flex flex-col justify-end">
                    <div className="absolute top-4 right-4 text-garden-pink/50">
                      <Search className="w-5 h-5" />
                    </div>
                    
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-4 bg-garden-pink rounded-full" />
                        <h4 className="font-display font-bold text-lg text-white tracking-wide uppercase">{img.name}</h4>
                      </div>
                      <p className="text-xs font-hand text-garden-pink/80 line-clamp-2 leading-relaxed italic">
                        "{img.description}"
                      </p>
                      <div className="pt-4 flex items-center justify-between border-t border-white/10">
                        <span className="text-[9px] font-mono text-white/40">{new Date(img.timestamp).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-garden-rose/20 border border-garden-rose/30 rounded text-[8px] font-mono text-garden-rose">
                          SECURE
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-garden-pink/30 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-garden-pink/30 rounded-br-xl" />
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