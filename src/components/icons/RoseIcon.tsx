import React from 'react';
export const RoseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C10 2 6 2 4 4C2 6 2 10 4 12C6 14 10 16 12 18C14 16 18 14 20 12C22 10 22 6 20 4C18 2 14 2 12 4Z" fill="#722F37" />
    <path d="M12 7C11 6 9 6 8 7C7 8 7 10 8 11C9 12 11 13 12 14" stroke="#C5A059" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 18V22M12 22C12 22 10 21 8 20M12 22C12 22 14 21 16 20" stroke="#2D4F1E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
