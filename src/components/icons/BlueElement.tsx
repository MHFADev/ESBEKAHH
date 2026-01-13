import React from 'react';
export const BlueElement: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 10H22L15 15L17 23L12 18L7 23L9 15L2 10H10L12 2Z" fill="#0B1026" stroke="#4A90E2" strokeWidth="1" />
    <circle cx="12" cy="12" r="3" fill="#4A90E2" fillOpacity="0.3" />
  </svg>
);
