import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchiveImage } from '../types';
import { Search, Lock, Star } from './Icons';

interface VisionGalleryProps {
  images: ArchiveImage[];
}

const VisionGallery: React.FC<VisionGalleryProps> = ({ images }) => {
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
    <div className="relative w-full h-[400px] sm:h-[600px] flex items-center justify-center overflow-hidden touch-none py-10">
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          {images.map((img, idx) => {
            // Calculate relative position to active index
            let position = idx - activeIndex;
            
            // Handle wrapping for circular behavior
            if (position > 1) position = position - images.length;
            if (position < -1) position = position + images.length;

            // Only render neighbors and active
            if (Math.abs(position) > 1) return null;

            return (
              <motion.div
                key={img.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={false}
                animate={{
                  x: position * 300, // Distance between images
                  scale: position === 0 ? 1 : 0.8,
                  opacity: position === 0 ? 1 : 0.4,
                  filter: position === 0 ? 'blur(0px)' : 'blur(4px)',
                  zIndex: position === 0 ? 50 : 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="absolute w-[280px] sm:w-[400px] aspect-[4/5] cursor-grab active:cursor-grabbing"
              >
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 bg-spy-dark shadow-2xl">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                  {/* Overlay for active image */}
                  {position === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-spy-dark via-transparent to-transparent p-8 flex flex-col justify-end"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-2 h-6 bg-garden-pink rounded-full shadow-[0_0_10px_rgba(255,183,197,0.5)]" />
                        <h4 className="font-display font-black text-xl text-white uppercase">{img.name}</h4>
                      </div>
                      <p className="text-sm font-hand text-garden-pink/90 italic line-clamp-2">
                        "{img.description}"
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-white/30 tracking-[0.2em]">INTEL_DATE</span>
                          <span className="text-[10px] font-mono text-garden-pink/60">{new Date(img.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="px-3 py-1 bg-black/40 border border-garden-pink/20 rounded-full text-[9px] font-mono text-garden-pink/80">
                          CENTERED
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Glass tint for side images */}
                  {position !== 0 && (
                    <div className="absolute inset-0 bg-spy-dark/40 backdrop-blur-[2px]" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-garden-pink/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-spy-gold/20 to-transparent" />
    </div>
  );
};

export default VisionGallery;