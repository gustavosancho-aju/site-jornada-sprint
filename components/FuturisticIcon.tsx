import React from 'react';

const FuturisticIcon = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-brand-green/20 blur-xl rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 animate-flicker matrix-glow">
      {children}
    </div>
  </div>
);

export default FuturisticIcon;
