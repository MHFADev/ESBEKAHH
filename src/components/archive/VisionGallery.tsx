import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchiveImage } from '../../types';
import { Search, Lock, Star, ButterflyIcon } from '../icons/index';

interface VisionGalleryProps {
  images: ArchiveImage[];
  onImageSelect?: (img: ArchiveImage) => void;
}

const VisionGallery: React.FC<VisionGalleryProps> = ({ images, onImageSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] sm:h-[700px] flex items-center justify-center overflow-hidden touch-none py-10">
      {/* Watermark */}
      <div className="fixed bottom-4 right-4 z-[9999] opacity-30 font-mono text-[10px] text-spy-gold tracking-[0.2em] pointer-events-none uppercase">
        Made With MHFADev
      </div>
      {/* Interactive Background for Gallery */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-garden-pink/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          {images.map((img, idx) => {
            let position = idx - activeIndex;
            if (position > 1) position = position - images.length;
            if (position < -1) position = position + images.length;
            if (Math.abs(position) > 1) return null;

            return (
              <motion.div
                key={img.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                onClick={() => position === 0 && onImageSelect?.(img)}
                initial={false}
                animate={{
                  x: position * (window.innerWidth < 640 ? window.innerWidth * 0.85 : 450),
                  scale: position === 0 ? 1 : (window.innerWidth < 640 ? 0.6 : 0.75),
                  rotateY: position * (window.innerWidth < 640 ? 25 : 45),
                  opacity: position === 0 ? 1 : 0.3,
                  filter: position === 0 ? 'blur(0px)' : 'blur(8px)',
                  zIndex: position === 0 ? 50 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                className={`absolute w-[280px] sm:w-[450px] aspect-[4/5] ${position === 0 ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
                style={{ perspective: 1000 }}
              >
                <div className="relative w-full h-full rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-white/10 bg-spy-dark/40 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)] group">
                  {/* Glass Shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-30 pointer-events-none z-10" />
                  
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {position === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-spy-dark via-spy-dark/20 to-transparent p-6 sm:p-10 flex flex-col justify-end z-20"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                        <div className="w-1 h-6 sm:w-1.5 sm:h-8 bg-garden-pink rounded-full shadow-[0_0_20px_rgba(255,183,197,0.8)]" />
                        <h4 className="font-display font-black text-xl sm:text-3xl text-white uppercase tracking-tighter drop-shadow-2xl truncate">{img.name}</h4>
                      </div>
                      
                      <p className="text-sm sm:text-lg font-hand text-white leading-snug drop-shadow-md line-clamp-3">
                        "{img.description}"
                      </p>
                      
                      <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5 flex justify-between items-center">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                            <ButterflyIcon className="w-4 h-4 sm:w-6 sm:h-6 text-garden-pink/60" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7px] sm:text-[9px] font-mono text-white/30 tracking-widest uppercase">CAPTURED_ON</span>
                            <span className="text-[10px] sm:text-xs font-mono text-garden-pink">{new Date(img.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2.5 bg-white/5 border border-white/10 rounded-full text-[9px] sm:text-xs font-display text-white tracking-widest uppercase hover:bg-garden-pink hover:border-garden-pink transition-all">
                            {window.innerWidth < 640 ? 'VIEW' : 'VIEW_ARCHIVE'} <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {position !== 0 && (
                    <div className="absolute inset-0 bg-spy-dark/60 backdrop-blur-[4px] z-20" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Decorative Navigation Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === activeIndex ? 'w-12 bg-garden-pink shadow-[0_0_10px_rgba(255,183,197,0.5)]' : 'w-4 bg-white/10 hover:bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VisionGallery;
