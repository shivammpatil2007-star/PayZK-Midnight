import React from 'react';

interface LogoProps {
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ collapsed = false, onClick, className = '' }) => {
  return (
    <div 
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950 shadow-lg shadow-emerald-500/20 overflow-hidden border border-emerald-500/30">
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15 L80 30 V55 C80 73 67 88 50 93 C33 88 20 73 20 55 V30 Z" fill="none" stroke="#10b981" strokeWidth="6" strokeLinejoin="round"/>
          <circle cx="50" cy="50" r="10" fill="#06b6d4"/>
          <path d="M50 60 V72" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round"/>
        </svg>
      </div>
      
      {!collapsed && (
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
            PayZK
          </span>
          <span className="text-[9px] font-bold tracking-widest text-emerald-200 bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm">
            PROTOCOL
          </span>
        </div>
      )}
    </div>
  );
};
