import React from 'react';
import { WalletConnect } from './WalletConnect';

interface HeaderProps {
  wallet: any;
  address: string | null;
  error: string | null;
  isMockMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ wallet, address, error, isMockMode }) => {
  return (
    <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white tracking-tight">Dashboard</h1>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
          Preview Testnet
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <WalletConnect wallet={wallet} address={address} error={error} isMockMode={isMockMode} />
      </div>
    </header>
  );
};
