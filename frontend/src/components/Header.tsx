import React from 'react';
import { WalletConnect } from './WalletConnect';
import { useAuth } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';

interface HeaderProps {
  wallet: any;
  address: string | null;
  error: string | null;
  isMockMode: boolean;
  isConnecting: boolean;
  onConnect: () => void;
}

export const Header: React.FC<HeaderProps> = ({ wallet, address, error, isMockMode, isConnecting, onConnect }) => {
  const { isAuthenticated, activeRole, setShowAuthModal, logout } = useAuth();

  return (
    <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white tracking-tight">Dashboard</h1>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-midnight/10 border border-midnight/20 text-indigo-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Midnight Preview/Preprod Testnet
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <WalletConnect wallet={wallet} address={address} error={error} isMockMode={isMockMode} isConnecting={isConnecting} onConnect={onConnect} />
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white">Connected User</div>
                <div className="text-xs text-indigo-400">{activeRole || 'Authenticated'}</div>
              </div>
              <button 
                onClick={logout}
                className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/40 transition-colors"
                title="Logout"
              >
                <UserCircle size={20} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-indigo-500/20 text-sm flex items-center gap-2"
          >
            <UserCircle size={18} />
            Connect Identity
          </button>
        )}
      </div>
    </header>
  );
};
