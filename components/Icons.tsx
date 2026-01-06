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
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C10 2 6 2 4 4C2 6 2 10 4 12C6 14 10 16 12 18C14 16 18 14 20 12C22 10 22 6 20 4C18 2 14 2 12 4Z" fill="#722F37" />
    <path d="M12 7C11 6 9 6 8 7C7 8 7 10 8 11C9 12 11 13 12 14" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 18V22M12 22C12 22 10 21 8 20M12 22C12 22 14 21 16 20" stroke="#2D4F1E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const TulipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16C15 16 18 13 18 9C18 5 15 2 12 2C9 2 6 5 6 9C6 13 9 16 12 16Z" fill="#FF8FAB" />
    <path d="M12 2V16M6 9C6 9 8 7 12 7M18 9C18 9 16 7 12 7" stroke="#E14D68" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 16V22M12 18C10 18 7 19 6 21M12 19C14 19 17 18 18 20" stroke="#2D4F1E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const BlueElement: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 10H22L15 15L17 23L12 18L7 23L9 15L2 10H10L12 2Z" fill="#0B1026" stroke="#4A90E2" strokeWidth="1" />
    <circle cx="12" cy="12" r="3" fill="#4A90E2" fillOpacity="0.3" />
  </svg>
);