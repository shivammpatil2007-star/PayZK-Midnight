import React from 'react';
import { X, Wallet, ShieldCheck, ExternalLink } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLace: () => void;
  isConnecting: boolean;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onSelectLace,
  isConnecting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-emerald-950/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5"/>
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Wallet className="w-6 h-6"/>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Connect Wallet</h3>
            <p className="text-xs text-slate-400">Select your Midnight Preview Testnet wallet</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Lace Wallet Option */}
          <button
            onClick={() => {
              onSelectLace();
              onClose();
            }}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200 group text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
                ⚡
              </div>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                  Lace Wallet
                </div>
                <div className="text-xs text-slate-400">Midnight Preprod Native Wallet</div>
              </div>
            </div>
            <ShieldCheck className="w-5 h-5 text-emerald-400 opacity-80"/>
          </button>

          {/* Demo Preprod Mode Option */}
          <button
            onClick={() => {
              onSelectLace();
              onClose();
            }}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 font-mono font-bold">
                MN
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">Midnight Testnet Session</div>
                <div className="text-xs text-slate-400">Instant Preprod Sandbox</div>
              </div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">Demo</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          Need Lace Wallet?{' '}
          <a
            href="https://www.lace.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline inline-flex items-center gap-1"
          >
            Download Extension <ExternalLink className="w-3 h-3"/>
          </a>
        </div>
      </div>
    </div>
  );
};
