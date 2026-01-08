import React from 'react';
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
