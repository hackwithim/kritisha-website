import React from 'react';
import logoImg from '../assets/logo.png';

export default function KritishaLogo({ 
  variant = 'full', // 'full' | 'icon' | 'dark' | 'light' | 'admin'
  size = 'md',       // 'sm' | 'md' | 'lg' | 'xl'
  showTagline = true,
  className = '' 
}) {
  // Dimensions for icon container based on size preset
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const iconSizeClass = sizeClasses[size] || sizeClasses.md;

  const logoSvg = (
    <img 
      src={logoImg} 
      alt="Kritisha Logo" 
      className="w-full h-full object-contain drop-shadow-sm"
    />
  );

  if (variant === 'icon') {
    return (
      <div className={`${iconSizeClass} ${className} transition-transform hover:scale-105 inline-block`}>
        {logoSvg}
      </div>
    );
  }

  const isLight = variant === 'light';
  const isAdmin = variant === 'admin';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className={`${iconSizeClass} shrink-0`}>
        {logoSvg}
      </div>
      <div className="flex flex-col">
        <span className={`font-editorial font-bold tracking-[0.14em] leading-none ${
          size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'
        } ${isLight ? 'text-white' : 'text-[#0B2341]'}`}>
          KRITISHA
        </span>
        {showTagline && (
          <span className={`font-sans-ui tracking-[0.26em] font-semibold uppercase mt-1 ${
            size === 'sm' ? 'text-[8.5px]' : 'text-[10px]'
          } ${isAdmin ? 'text-[#C5963D]' : isLight ? 'text-slate-300' : 'text-[#C5963D]'}`}>
            {isAdmin ? 'ADMIN CONTROL CENTER' : 'INFRASTRUCTURE'}
          </span>
        )}
      </div>
    </div>
  );
}
