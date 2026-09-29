import React from 'react';
import { WalletConnect } from './WalletConnect';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  wallet: any;
  address: string | null;
  error: string | null;
  isMockMode: boolean;
  isConnecting: boolean;
  onConnect: () => void;
}

export const Header: React.FC<HeaderProps> = ({ wallet, address, error, isMockMode, isConnecting, onConnect }) => {
  const isConnected = !!wallet && address !== null;

  return (
    <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white tracking-tight">Dashboard</h1>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Midnight Preprod Testnet
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {!isConnected || address === null ? (
          <button 
            onClick={onConnect}
            className="btn-primary"
          >
            <Wallet className="w-4 h-4"/>
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <WalletConnect wallet={wallet} address={address} error={error} isMockMode={isMockMode} isConnecting={isConnecting} onConnect={onConnect} />
          </div>
        )}
      </div>
    </header>
  );
};
