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
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30 overflow-hidden">
        {/* Shield / Lock Motif */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white z-10">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 11a4 4 0 1 1 8 0c0 1.5-.5 2.5-1.5 3.5-.5.5-1.5 1.5-2.5 1.5v3h-4v-3c-1 0-2-1-2.5-1.5C8.5 13.5 8 12.5 8 11z" fill="currentColor" />
        </svg>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20"></div>
      </div>
      
      {!collapsed && (
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-tight">
            PayZK
          </span>
          <span className="text-[9px] font-bold tracking-widest text-indigo-200 bg-indigo-900/50 border border-indigo-500/30 px-1.5 py-0.5 rounded-sm">
            PROTOCOL
          </span>
        </div>
      )}
    </div>
  );
};
