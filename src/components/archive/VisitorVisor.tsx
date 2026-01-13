import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArchiveImage } from '../../types';
import { PeanutIcon, ButterflyIcon, Star, Lock, Search, RoseIcon, TulipIcon, Crosshair, WakuWakuIcon } from '../icons/index';
import { CHARACTERS } from '../../constants';
import VisionGallery from './VisionGallery';

interface VisitorVisorProps {
  images: ArchiveImage[];
  agentId: string;
}

const FloatingElement = ({ children, delay = 0, duration = 10, x = 0, y = 0 }: any) => (
  <motion.div
    initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
    animate={{ 
      y: [`${y}vh`, `${y - 10}vh`, `${y}vh`],
      opacity: [0.2, 0.5, 0.2],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute pointer-events-none z-0"
  >
    {children}
  </motion.div>
);

const VisitorVisor: React.FC<VisitorVisorProps> = ({ images, agentId }) => {
  const [selectedImage, setSelectedImage] = useState<ArchiveImage | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const decorativeElements = useMemo(() => [
    { id: 1, x: 10, y: 20, delay: 1, icon: <TulipIcon className="w-8 h-8 text-garden-pink/20" /> },
    { id: 2, x: 80, y: 15, delay: 2, icon: <ButterflyIcon className="w-10 h-10 text-garden-tulip/20" /> },
    { id: 3, x: 15, y: 70, delay: 4, icon: <PeanutIcon className="w-6 h-6 text-garden-pink/10" /> },
    { id: 4, x: 85, y: 80, delay: 5, icon: <RoseIcon className="w-12 h-12 text-spy-red/10" /> },
  ], []);

  return (
    <div className="relative w-full max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6">
      {/* Watermark */}
      <div className="fixed bottom-4 right-4 z-[9999] opacity-30 font-mono text-[10px] text-spy-gold tracking-[0.2em] pointer-events-none uppercase">
        Made With MHFADev
      </div>
      {/* Progress Bar for Scroll */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-garden-pink via-spy-red to-garden-pink z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Interactive Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {decorativeElements.map(el => (
          <FloatingElement key={el.id} x={el.x} y={el.y} delay={el.delay}>
            {el.icon}
          </FloatingElement>
        ))}
        
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 183, 197, 0.15) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Cute HUD Elements */}
      <div className="absolute -top-10 left-6 right-6 flex items-center justify-between text-garden-pink/60 font-mono text-[10px] tracking-[0.3em] uppercase">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-3 border border-garden-pink/20 bg-spy-dark/90 px-5 py-2 rounded-full backdrop-blur-2xl shadow-xl"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]" />
          WAKU_SYSTEM: <span className="text-white">ONLINE</span>
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden sm:flex items-center gap-3 border border-garden-pink/20 bg-spy-dark/90 px-5 py-2 rounded-full backdrop-blur-2xl shadow-xl"
        >
          <PeanutIcon className="w-4 h-4 text-garden-pink" />
          <span className="text-spy-red">ANYA_MODE</span>
        </motion.div>
      </div>

      {/* Main Visor Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-spy-dark/60 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] group/visor z-10"
      >
        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10" />

        {/* Header Area */}
        <div className="p-8 sm:p-12 border-b border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-40 bg-gradient-to-br from-garden-pink/10 via-transparent to-spy-red/5">
          <div className="flex items-center gap-4 sm:gap-8 w-full lg:w-auto">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="relative shrink-0"
            >
              <div className="absolute -inset-4 bg-garden-pink blur-3xl opacity-20 animate-pulse" />
              <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-[1.5rem] sm:rounded-[2rem] bg-spy-dark/80 border-2 border-garden-pink/40 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(255,183,197,0.3)] relative z-10 backdrop-blur-md">
                <WakuWakuIcon className="w-10 h-10 sm:w-16 sm:h-16 text-garden-pink animate-pulse drop-shadow-[0_0_8px_rgba(255,183,197,0.8)]" />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-spy-gold fill-spy-gold" />
                <span className="text-[8px] sm:text-xs font-serif font-bold text-spy-gold tracking-[0.2em] sm:tracking-[0.4em] uppercase">
                  Anak Kesayangan Bu Retno
                </span>
              </div>
              <h1 className="text-3xl sm:text-7xl font-display font-black text-white tracking-tighter leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-garden-pink to-white drop-shadow-2xl">ESBEKAHH</span>
                <span className="block text-white/30 text-lg sm:text-4xl tracking-[0.1em] sm:tracking-[0.2em] mt-0.5 sm:mt-1 font-mono">ARCHIVE_V2</span>
              </h1>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none bg-white/5 border border-white/10 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-xl group hover:border-garden-pink/40 transition-colors text-center lg:text-left">
              <div className="text-[8px] sm:text-[10px] font-mono text-garden-pink/60 mb-1 sm:mb-2 tracking-[0.2em] sm:tracking-[0.3em]">INTEL_COUNT</div>
              <div className="text-2xl sm:text-4xl font-display font-bold text-white flex items-baseline justify-center lg:justify-start gap-1 sm:gap-2">
                {images.length}
                <span className="text-[10px] sm:text-xs text-white/30 font-mono uppercase">FILES</span>
              </div>
            </div>
            <div className="flex-1 lg:flex-none bg-white/5 border border-white/10 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] backdrop-blur-xl group hover:border-spy-red/40 transition-colors text-center">
              <div className="text-[8px] sm:text-[10px] font-mono text-spy-red/60 mb-1 sm:mb-2 tracking-[0.2em] sm:tracking-[0.3em]">THREAT_LVL</div>
              <div className="text-2xl sm:text-4xl font-display font-bold text-spy-red uppercase">LOW</div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 relative z-40 min-h-[500px]">
          {images.length > 0 ? (
            <VisionGallery images={images} onImageSelect={setSelectedImage} />
          ) : (
            <div className="py-40 flex flex-col items-center justify-center text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 mb-8 relative"
              >
                <div className="absolute inset-0 border-2 border-dashed border-garden-pink/20 rounded-full" />
                <div className="absolute inset-4 flex items-center justify-center">
                  <PeanutIcon className="w-16 h-16 text-garden-pink/20" />
                </div>
              </motion.div>
              <h2 className="text-3xl font-display text-white/20 tracking-widest">ARCHIVE_EMPTY</h2>
              <p className="mt-4 font-mono text-xs text-white/10 tracking-[0.5em] uppercase">Waiting for operation strix data</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-12 py-10 bg-black/20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-spy-blue rounded-full shadow-[0_0_10px_#4a90e2]" />
              <span className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">ULTRA_SMOOTH_RENDER</span>
            </div>
            <div className="hidden sm:block h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">PING: 1ms</span>
            </div>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-gradient-to-r from-garden-pink/20 to-spy-red/20 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md cursor-help"
          >
            <span className="font-hand text-xl text-white">Heh.</span>
            <ButterflyIcon className="w-6 h-6 text-garden-pink animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      {/* Lightbox Enhancement */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-6xl w-full bg-spy-dark/80 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_150px_rgba(255,183,197,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                <div className="flex-1 bg-black/40 flex items-center justify-center p-4 min-h-[40vh] relative group">
                  <img 
                    src={selectedImage.url} 
                    alt={selectedImage.name}
                    className="max-h-full w-auto object-contain shadow-2xl rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-garden-pink transition-colors z-50 lg:hidden"
                  >
                    ×
                  </button>
                </div>
                
                <div className="w-full lg:w-[400px] p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-b from-white/5 to-transparent border-t lg:border-t-0 lg:border-l border-white/5 overflow-y-auto">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-1 bg-garden-pink rounded-full" />
                      <span className="font-mono text-[10px] text-garden-pink tracking-[0.4em] uppercase">CLASSIFIED_FILE</span>
                    </div>
                    
                    <h2 className="text-4xl font-display font-black text-white mb-6 leading-tight tracking-tight uppercase">
                      {selectedImage.name}
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-[10px] font-mono text-white/30 mb-2 tracking-widest uppercase">INTEL_DESCRIPTION</div>
                        <p className="text-white/80 font-hand text-2xl leading-relaxed italic">
                          "{selectedImage.description}"
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">TIMESTAMP</span>
                          <span className="text-xs font-mono text-garden-pink">{new Date(selectedImage.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">FILE_ID</span>
                          <span className="text-[10px] font-mono text-white/40">{selectedImage.id.toString().substring(0, 12)}...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="mt-12 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-display text-lg tracking-widest hover:bg-white/10 hover:border-garden-pink/50 transition-all active:scale-95 hidden lg:block"
                  >
                    CLOSE_ARCHIVE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisitorVisor;
