import React from 'react';

export const StellaStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Glow Layer */}
    <g opacity="0.3">
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        fill="currentColor"
        filter="url(#glow)"
      />
    </g>

    {/* Main Star Body */}
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill="currentColor"
    />

    {/* Inner Gradient Highlight */}
    <path 
      d="M12 4.5L14.3 9.2L19.5 9.9L15.75 13.5L16.6 18.7L12 16.2L7.4 18.7L8.25 13.5L4.5 9.9L9.7 9.2L12 4.5Z" 
      fill="white"
      opacity="0.2"
    />

    {/* Center Sparkle */}
    <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.6"/>
    <circle cx="12" cy="12" r="0.8" fill="white" opacity="0.9"/>

    {/* Top Point Highlight */}
    <path 
      d="M12 2L12 6L11.5 4L12 2Z" 
      fill="white" 
      opacity="0.5"
    />

    {/* Sparkle Points */}
    <g opacity="0.8">
      {/* Top sparkle */}
      <path d="M12 1L12 3M11 2L13 2" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>

      {/* Right sparkle */}
      <path d="M21 10L19 10M20 9L20 11" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>

      {/* Bottom sparkle */}
      <path d="M12 22L12 20M11 21L13 21" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>

      {/* Left sparkle */}
      <path d="M3 10L5 10M4 9L4 11" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>
    </g>

    {/* Subtle inner details on star points */}
    <g opacity="0.15">
      <line x1="12" y1="2" x2="12" y2="8" stroke="white" strokeWidth="0.3"/>
      <line x1="15.09" y1="8.26" x2="18" y2="9" stroke="white" strokeWidth="0.3"/>
      <line x1="18.18" y1="21.02" x2="15" y2="18" stroke="white" strokeWidth="0.3"/>
      <line x1="5.82" y1="21.02" x2="9" y2="18" stroke="white" strokeWidth="0.3"/>
      <line x1="8.91" y1="8.26" x2="6" y2="9" stroke="white" strokeWidth="0.3"/>
    </g>

    {/* Premium stroke outline */}
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill="none"
      stroke="currentColor" 
      strokeWidth="0.5" 
      strokeLinejoin="round"
      opacity="0.6"
    />

    {/* Glow filter definition */}
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* Radial gradient for depth */}
      <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* Subtle radial overlay */}
    <circle 
      cx="12" 
      cy="12" 
      r="8" 
      fill="url(#starGradient)" 
      opacity="0.4"
    />
  </svg>
);