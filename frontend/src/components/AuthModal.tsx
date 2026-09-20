import React from 'react';
import { useAuth, type Role } from '../context/AuthContext';
import { Fingerprint, Wallet, ShieldCheck, UserCircle2 } from 'lucide-react';
import { Logo } from './Logo';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = (role: Role) => {
    login(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-panel w-full max-w-md p-8 border-indigo-500/20 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-6">
          <Logo collapsed={true} />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">Connect Identity</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Select a role to preview the dashboard experience</p>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('Employee')}
            className="w-full flex items-center p-4 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <UserCircle2 size={20} />
            </div>
            <div className="ml-4 text-left">
              <div className="font-semibold text-white">Employee (Prover)</div>
              <div className="text-xs text-gray-400">Generate zero-knowledge proofs</div>
            </div>
          </button>

          <button 
            onClick={() => handleLogin('Verifier')}
            className="w-full flex items-center p-4 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <div className="ml-4 text-left">
              <div className="font-semibold text-white">Verifier (Institution)</div>
              <div className="text-xs text-gray-400">Validate applicant proofs</div>
            </div>
          </button>

          <button 
            onClick={() => handleLogin('Issuer')}
            className="w-full flex items-center p-4 rounded-xl border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Fingerprint size={20} />
            </div>
            <div className="ml-4 text-left">
              <div className="font-semibold text-white">Employer (Issuer)</div>
              <div className="text-xs text-gray-400">Issue credential claims</div>
            </div>
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900 px-2 text-gray-500">OR</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-medium transition-all">
            <Wallet size={18} />
            Connect Lace Wallet
          </button>
        </div>
      </div>
    </div>
  );
};
