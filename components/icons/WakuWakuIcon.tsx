import React from 'react';

export const WakuWakuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Glow background for the heart */}
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="currentColor"
    />
    {/* White Eyes for contrast */}
    <circle cx="8" cy="9" r="1.5" fill="white" />
    <circle cx="16" cy="9" r="1.5" fill="white" />
    {/* Black Pupils */}
    <circle cx="8" cy="9" r="0.7" fill="black" />
    <circle cx="16" cy="9" r="0.7" fill="black" />
    {/* Blushing cheeks */}
    <circle cx="5.5" cy="11" r="1" fill="#FF8DA1" fillOpacity="0.6" />
    <circle cx="18.5" cy="11" r="1" fill="#FF8DA1" fillOpacity="0.6" />
    {/* Happy Mouth */}
    <path
      d="M10 14c1 1 3 1 4 0"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);
