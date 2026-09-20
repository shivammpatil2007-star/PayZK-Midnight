import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, Users, X, Shield } from 'lucide-react';

interface AuthModalProps {
  onConnectWallet: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onConnectWallet }) => {
  const { showAuthModal, setShowAuthModal, login } = useAuth();

  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-500"></div>
        
        <button 
          onClick={() => setShowAuthModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 mb-4 shadow-lg shadow-indigo-500/10">
              <Shield className="text-indigo-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Connect Identity</h2>
            <p className="text-gray-400 text-sm">Choose how you want to authenticate with PayZK.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                onConnectWallet();
                login(); // Set authenticated, actual wallet state handled by useMidnight
              }}
              className="w-full group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Wallet size={20} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Midnight Wallet</div>
                  <div className="text-xs text-gray-400">Connect via Lace or Nightly</div>
                </div>
              </div>
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-slate-900 px-2 text-gray-500 uppercase tracking-widest">Or try a demo role</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => login('Employee (Prover)')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 transition-all group"
              >
                <Users size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white">Employee</span>
              </button>
              
              <button
                onClick={() => login('Verifier (Institution)')}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 transition-all group"
              >
                <Shield size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white">Verifier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
