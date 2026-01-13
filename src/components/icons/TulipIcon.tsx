import React from 'react';

export const TulipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Soft glow background */}
    <g opacity="0.2">
      <ellipse cx="12" cy="10" rx="8" ry="10" fill="#FF8FAB" filter="url(#softGlow)"/>
    </g>

    {/* Left Petal - Outer */}
    <path 
      d="M12 2C9 2 6 5 6 9C6 11.5 7.5 13.5 9.5 15C10 15.3 10.5 15.6 11 15.8C11.3 15.9 11.6 16 12 16V2Z" 
      fill="#FF6B8E"
    />

    {/* Right Petal - Outer */}
    <path 
      d="M12 2C15 2 18 5 18 9C18 11.5 16.5 13.5 14.5 15C14 15.3 13.5 15.6 13 15.8C12.7 15.9 12.4 16 12 16V2Z" 
      fill="#FF8FAB"
    />

    {/* Center Petal - Front */}
    <path 
      d="M12 2C10.5 2 9.5 3.5 9.5 5.5C9.5 7.5 10 10 11 12.5C11.3 13.2 11.6 13.8 12 14.5C12.4 13.8 12.7 13.2 13 12.5C14 10 14.5 7.5 14.5 5.5C14.5 3.5 13.5 2 12 2Z" 
      fill="#FFB3C6"
    />

    {/* Petal Highlights */}
    <g opacity="0.4">
      {/* Left highlight */}
      <path 
        d="M8 6C8 6 9 4 10 4C10 4 9 7 9 9C9 10 8.5 11 8 11" 
        stroke="white" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Right highlight */}
      <path 
        d="M16 6C16 6 15 4 14 4C14 4 15 7 15 9C15 10 15.5 11 16 11" 
        stroke="white" 
        strokeWidth="0.8" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Center highlight */}
      <path 
        d="M12 3C12 3 11.5 5 11.5 7C11.5 8.5 12 10 12 11.5" 
        stroke="white" 
        strokeWidth="1" 
        strokeLinecap="round"
        fill="none"
      />
    </g>

    {/* Petal Details - Veins */}
    <g opacity="0.25">
      <path d="M10 5C10 5 9.5 7 9 9" stroke="#E14D68" strokeWidth="0.4" strokeLinecap="round"/>
      <path d="M14 5C14 5 14.5 7 15 9" stroke="#E14D68" strokeWidth="0.4" strokeLinecap="round"/>
      <path d="M12 3C12 3 12 6 12 10" stroke="#E14D68" strokeWidth="0.4" strokeLinecap="round"/>
    </g>

    {/* Petal Inner Shadow */}
    <g opacity="0.15">
      <path 
        d="M12 2V16" 
        stroke="#C41E3A" 
        strokeWidth="0.5"
      />
    </g>

    {/* Decorative dots on petals */}
    <g opacity="0.3">
      <circle cx="10" cy="8" r="0.3" fill="white"/>
      <circle cx="14" cy="8" r="0.3" fill="white"/>
      <circle cx="11" cy="11" r="0.25" fill="white"/>
      <circle cx="13" cy="11" r="0.25" fill="white"/>
      <circle cx="12" cy="9" r="0.35" fill="white"/>
    </g>

    {/* Stem - Main */}
    <path 
      d="M12 16V22" 
      stroke="#4A7C3C" 
      strokeWidth="2" 
      strokeLinecap="round"
    />

    {/* Stem - Inner highlight */}
    <path 
      d="M12.3 16V22" 
      stroke="#6BAF51" 
      strokeWidth="0.6" 
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Left Leaf */}
    <path 
      d="M12 18C10.5 18.2 8.5 19 7 20C6 20.5 5.5 21 6 21C7 21.2 9 20.5 10.5 19.5C11 19.2 11.5 18.8 12 18.5" 
      fill="#5C9147"
    />

    {/* Left Leaf - Highlight */}
    <path 
      d="M11 18.5C10 19 8.5 19.8 7.5 20.3" 
      stroke="#7FC465" 
      strokeWidth="0.5" 
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Left Leaf - Vein */}
    <path 
      d="M11.5 18.3C10.5 18.8 9 19.5 7.8 20.2" 
      stroke="#2D4F1E" 
      strokeWidth="0.3" 
      strokeLinecap="round"
      opacity="0.4"
    />

    {/* Right Leaf */}
    <path 
      d="M12 19C13.5 19.2 15.5 18.5 17 19.5C18 20 18.5 20.5 18 20.5C17 20.7 15 20.2 13.5 19.5C13 19.3 12.5 19.1 12 18.8" 
      fill="#6BAF51"
    />

    {/* Right Leaf - Highlight */}
    <path 
      d="M13 19C14 19.3 15.5 19.2 16.5 19.5" 
      stroke="#8FD97A" 
      strokeWidth="0.5" 
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Right Leaf - Vein */}
    <path 
      d="M12.5 19.1C13.5 19.4 15 19.5 16.2 19.7" 
      stroke="#2D4F1E" 
      strokeWidth="0.3" 
      strokeLinecap="round"
      opacity="0.4"
    />

    {/* Stem Base Shadow */}
    <ellipse 
      cx="12" 
      cy="21.5" 
      rx="1.5" 
      ry="0.5" 
      fill="#2D4F1E" 
      opacity="0.2"
    />

    {/* Cute sparkles around tulip */}
    <g opacity="0.6">
      <path d="M5 8L5.5 8.5L5 9L4.5 8.5L5 8Z" fill="#FFD1DC"/>
      <path d="M19 7L19.5 7.5L19 8L18.5 7.5L19 7Z" fill="#FFD1DC"/>
      <path d="M8 3L8.3 3.3L8 3.6L7.7 3.3L8 3Z" fill="#FFD1DC"/>
      <path d="M16 3L16.3 3.3L16 3.6L15.7 3.3L16 3Z" fill="#FFD1DC"/>
      <path d="M4 13L4.4 13.4L4 13.8L3.6 13.4L4 13Z" fill="#C8E6C9"/>
      <path d="M20 14L20.4 14.4L20 14.8L19.6 14.4L20 14Z" fill="#C8E6C9"/>
    </g>

    {/* Filter Definitions */}
    <defs>
      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);