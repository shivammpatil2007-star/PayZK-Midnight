import React, { useState } from 'react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { ProfileModal } from './ProfileModal';

interface HeaderProps {
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Logo collapsed={true} onClick={onNavigateHome} />
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-midnight/10 border border-midnight/20 text-indigo-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Midnight Preview/Preprod Testnet
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative">
        {isAuthenticated && currentUser ? (
          <>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 px-2 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="hidden sm:block text-right pr-1">
                <div className="text-sm font-semibold text-white leading-tight">{currentUser.name}</div>
                <div className="text-xs text-indigo-300">{currentUser.role}</div>
              </div>
              <img 
                src={`https://api.dicebear.com/9.x/identicon/svg?seed=${currentUser.avatarSeed}`} 
                alt="avatar" 
                className="w-8 h-8 rounded-full border border-indigo-500/50 bg-black"
              />
            </button>
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          </>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20"
          >
            Login / Connect Identity
          </button>
        )}
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};
