import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';

interface WalletConnectProps {
  wallet: any | null;
  address: string | null;
  error: string | null;
  isMockMode?: boolean;
  onConnect?: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ wallet, address, error, isMockMode, onConnect }) => {
  if (error) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        <AlertCircle size={16} />
        <span className="hidden sm:inline">{error}</span>
        {onConnect && (
          <button onClick={onConnect} className="ml-2 bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded transition-colors text-xs font-bold uppercase tracking-wider">
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm">
        <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
        Connecting...
      </div>
    );
  }

  const displayAddress = address 
    ? `${address.substring(0, 10)}...${address.substring(address.length - 6)}` 
    : 'Unknown Address';

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg border text-sm transition-all duration-300 ${
      isMockMode 
        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    }`}>
      <Wallet size={16} />
      <span className="font-mono font-medium">{displayAddress}</span>
      {isMockMode && (
        <div className="flex items-center gap-2 ml-2">
          <span className="text-xs uppercase tracking-wider font-bold bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">MOCK</span>
          {onConnect && (
            <button onClick={onConnect} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors text-xs font-bold">
              Connect Wallet
            </button>
          )}
        </div>
      )}
    </div>
  );
};
