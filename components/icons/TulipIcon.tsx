import React from 'react';
export const TulipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16C15 16 18 13 18 9C18 5 15 2 12 2C9 2 6 5 6 9C6 13 9 16 12 16Z" fill="#FF8FAB" />
    <path d="M12 2V16M6 9C6 9 8 7 12 7M18 9C18 9 16 7 12 7" stroke="#E14D68" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 16V22M12 18C10 18 7 19 6 21M12 19C14 19 17 18 18 20" stroke="#2D4F1E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
