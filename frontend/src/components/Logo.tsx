import React from 'react';

interface LogoProps {
  collapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ collapsed = false, onClick, className = '' }) => {
  return (
    <div 
      className={`flex items-center space-x-3 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 shrink-0">
        <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
      
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-black tracking-wider text-white leading-tight">PayZK</span>
          <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase leading-tight">Protocol</span>
        </div>
      )}
    </div>
  );
};
