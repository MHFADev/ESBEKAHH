import React from 'react';

export const PistolIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="white" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Barrel (Laras) */}
    <path d="M13 9 L22 9 L22 10.5 L13 10.5 Z" fill="white"/>
    <rect x="21.8" y="8.7" width="0.5" height="2.1" rx="0.1" fill="white"/>

    {/* Slide Upper */}
    <path d="M10.5 6.5 L22 6.5 L22 7.2 L21.7 7.5 L21.7 12 L22 12.3 L22 13 L10.5 13 L10.5 6.5 Z" fill="white"/>

    {/* Slide Serrations (Cocking) */}
    <g opacity="0.4">
      <rect x="14" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="14.6" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="15.2" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="15.8" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="16.4" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="17" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="17.6" y="6.7" width="0.35" height="1.8" fill="black"/>
      <rect x="18.2" y="6.7" width="0.35" height="1.8" fill="black"/>
    </g>

    {/* Ejection Port */}
    <rect x="15" y="7.8" width="5" height="1.5" rx="0.3" fill="black" opacity="0.2"/>

    {/* Front Sight */}
    <path d="M21.2 5.5 L21.8 5.5 L21.8 6.5 L21.2 6.5 Z" fill="white"/>
    <rect x="21.35" y="5.7" width="0.3" height="0.5" fill="black" opacity="0.3"/>

    {/* Rear Sight */}
    <path d="M11.5 5.5 L11.2 6 L11.2 6.5 L12.3 6.5 L12.3 6 L12 5.5 Z" fill="white"/>
    <rect x="11.6" y="5.8" width="0.3" height="0.5" fill="black" opacity="0.3"/>

    {/* Frame/Body */}
    <path d="M10.5 8.5 L10.5 15.2 L9.5 15.5 L9.5 16.8 L8.5 17 L8.5 15.5 L6.5 15.5 L6.5 16.2 L5.8 16.5 L5.8 17.8 L4 17.8 L4 13.8 C4 12.6 4.5 11.8 5.5 11.2 L5.5 8.5 Z" fill="white"/>

    {/* Trigger Guard */}
    <path d="M7.5 12 Q7.5 11.5 8 11.5 L10 11.5 L10 14.5 Q9.5 15 9 15 L8.2 15 Q7.5 14.5 7.5 14 Z" fill="white"/>
    <path d="M8.5 12.5 Q8 12.5 8 13 L8 14 Q8 14.5 8.5 14.5 Q9 14.5 9 14 L9 13 Q9 12.5 8.5 12.5 Z" fill="none" stroke="white" strokeWidth="0.6"/>

    {/* Trigger */}
    <path d="M8.3 13.2 L8.8 13.2 Q9 13.2 9 13.5 L9 14.8 L8.7 15.2 L8.3 15 Q8.2 14.8 8.2 14.5 L8.2 13.5 Q8.2 13.2 8.3 13.2 Z" fill="white"/>

    {/* Magazine */}
    <path d="M6.5 15.5 L8.5 15.5 L8.5 18 Q8.5 18.3 8.2 18.3 L6.8 18.3 Q6.5 18.3 6.5 18 Z" fill="white"/>
    <rect x="6.8" y="16" width="1.4" height="0.25" rx="0.1" fill="black" opacity="0.25"/>
    <rect x="6.8" y="16.5" width="1.4" height="0.25" rx="0.1" fill="black" opacity="0.25"/>
    <rect x="6.8" y="17" width="1.4" height="0.25" rx="0.1" fill="black" opacity="0.25"/>
    <rect x="6.8" y="17.5" width="1.4" height="0.25" rx="0.1" fill="black" opacity="0.25"/>

    {/* Magazine Base Plate */}
    <rect x="6.3" y="18" width="2.4" height="0.5" rx="0.1" fill="white"/>

    {/* Slide Stop/Release */}
    <circle cx="10" cy="10.5" r="0.45" fill="white"/>
    <circle cx="10" cy="10.5" r="0.25" fill="black" opacity="0.2"/>

    {/* Takedown Lever */}
    <ellipse cx="9.2" cy="11.8" rx="0.35" ry="0.5" fill="white"/>

    {/* Grip Stippling/Texture */}
    <g opacity="0.3">
      <circle cx="6.5" cy="13.2" r="0.12" fill="black"/>
      <circle cx="7" cy="13.2" r="0.12" fill="black"/>
      <circle cx="7.5" cy="13.2" r="0.12" fill="black"/>
      <circle cx="8" cy="13.2" r="0.12" fill="black"/>

      <circle cx="6.5" cy="13.7" r="0.12" fill="black"/>
      <circle cx="7" cy="13.7" r="0.12" fill="black"/>
      <circle cx="7.5" cy="13.7" r="0.12" fill="black"/>
      <circle cx="8" cy="13.7" r="0.12" fill="black"/>

      <circle cx="6.5" cy="14.2" r="0.12" fill="black"/>
      <circle cx="7" cy="14.2" r="0.12" fill="black"/>
      <circle cx="7.5" cy="14.2" r="0.12" fill="black"/>
      <circle cx="8" cy="14.2" r="0.12" fill="black"/>

      <circle cx="6.5" cy="14.7" r="0.12" fill="black"/>
      <circle cx="7" cy="14.7" r="0.12" fill="black"/>
      <circle cx="7.5" cy="14.7" r="0.12" fill="black"/>
      <circle cx="8" cy="14.7" r="0.12" fill="black"/>

      <circle cx="6.5" cy="15.2" r="0.12" fill="black"/>
      <circle cx="7" cy="15.2" r="0.12" fill="black"/>
      <circle cx="7.5" cy="15.2" r="0.12" fill="black"/>
    </g>

    {/* Accessory Rail */}
    <rect x="11" y="12.2" width="1.2" height="0.25" rx="0.05" fill="white"/>
    <rect x="11" y="12.6" width="1.2" height="0.25" rx="0.05" fill="white"/>

    {/* Slide Contour Lines */}
    <line x1="10.5" y1="9.3" x2="21" y2="9.3" stroke="black" strokeWidth="0.15" opacity="0.2"/>
    <line x1="10.5" y1="10.2" x2="21" y2="10.2" stroke="black" strokeWidth="0.15" opacity="0.2"/>
    <line x1="10.5" y1="11.8" x2="21" y2="11.8" stroke="black" strokeWidth="0.15" opacity="0.2"/>

    {/* Loaded Chamber Indicator */}
    <rect x="13.5" y="6.6" width="0.4" height="0.3" rx="0.1" fill="white"/>

    {/* Frame Shadow/Depth */}
    <path d="M10.5 12 L10.5 13 L5.5 13 L5.5 11.2 C4.5 11.8 4 12.6 4 13.8 L4 17.8 L5.8 17.8 L5.8 16.5 L6.5 16.2 L6.5 15.5 L8.5 15.5 L8.5 17 L9.5 16.8 L9.5 15.5 L10.5 15.2 L10.5 13 Z" fill="black" opacity="0.08"/>
  </svg>
);