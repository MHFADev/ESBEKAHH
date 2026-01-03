import React from 'react';
import { Lock, Unlock, Upload, LogOut, Eye, Search, AlertTriangle, Star, Bomb, Crosshair } from 'lucide-react';

export { Lock, Unlock, Upload, LogOut, Eye, Search, AlertTriangle, Star, Bomb, Crosshair };

export const PeanutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 6C7 3.5 9 2 12 2C15 2 17 3.5 17 6C17 7.5 16 9 15 10C16 11 17 12.5 17 14C17 16 17 17 16 18C15 19 15 20 16 21C17 22 15 23 12 23C9 23 7 22 8 21C9 20 9 19 8 18C7 17 7 16 7 14C7 12.5 8 11 9 10C8 9 7 7.5 7 6Z" />
  </svg>
);

export const StellaStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

export const HehFace: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 30 Q30 20 40 30" strokeLinecap="round"/>
    <path d="M60 30 Q70 20 80 30" strokeLinecap="round"/>
    <path d="M25 40 Q30 35 35 40" fill="currentColor"/>
    <path d="M65 40 Q70 35 75 40" fill="currentColor"/>
    <path d="M30 65 Q50 75 70 65" strokeLinecap="round"/>
    <path d="M20 55 Q10 60 20 65" strokeLinecap="round"/>
    <path d="M80 55 Q90 60 80 65" strokeLinecap="round"/>
  </svg>
);

export const PistolIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8H8V5H20V8ZM6 11V5H2V14C2 15.65 3.35 17 5 17H11V15H6C5.45 15 5 14.55 5 14V11ZM18 11H8V9H18V11Z"/>
  </svg>
);

export const ButterflyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8C12 8 10 3 6 3C2 3 2 8 4 10C2 12 2 16 5 18C8 20 10 16 11 14C11 14 12 18 12 18C12 18 13 14 13 14C14 16 16 20 19 18C22 16 22 12 20 10C22 8 22 3 18 3C14 3 12 8 12 8Z" opacity="0.8"/>
  </svg>
);

export const RoseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10 2 8 3 7 5C5 4 3 5 2 7C4 9 6 8 8 9C7 11 5 12 3 14C5 17 9 16 11 15C10 18 8 20 6 22C9 21 11 19 12 17C13 19 15 21 18 22C16 20 14 18 13 15C15 16 19 17 21 14C19 12 17 11 16 9C18 8 20 9 22 7C21 5 19 4 17 5C16 3 14 2 12 2Z" />
  </svg>
);

export const TulipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M12 2C9 2 6 4 6 8V12C6 15 9 17 12 17C15 17 18 15 18 12V8C18 4 15 2 12 2Z" opacity="0.8"/>
     <path d="M12 17V22M8 22H16M12 17C10 19 8 19 6 18M12 17C14 19 16 19 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);