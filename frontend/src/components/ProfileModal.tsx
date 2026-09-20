import React from 'react';
import { useAuth, type Role } from '../context/AuthContext';
import { LogOut, Copy, UserCircle2, ShieldCheck, Fingerprint } from 'lucide-react';
import { useMidnight } from '../hooks/useMidnight';

export const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { activeRole, login, logout } = useAuth();
  const { account } = useMidnight();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !activeRole) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify({ role: activeRole, account }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRoleIcon = (role: Role) => {
    if (role === 'Employee (Prover)') return <UserCircle2 size={16} />;
    if (role === 'Verifier (Institution)') return <ShieldCheck size={16} />;
    if (role === 'Employer (Issuer)') return <Fingerprint size={16} />;
    return <UserCircle2 size={16} />;
  };

  const getRoleColor = (role: Role) => {
    if (role === 'Employee (Prover)') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (role === 'Verifier (Institution)') return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    if (role === 'Employer (Issuer)') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return '';
  };

  const allRoles: Role[] = ['Employee (Prover)', 'Verifier (Institution)', 'Employer (Issuer)'];

  return (
    <div className="absolute top-16 right-8 z-50 animate-in slide-in-from-top-2 duration-200">
      {/* Click outside overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      
      <div className="relative z-50 w-80 glass-panel border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-slate-900/90 backdrop-blur-xl">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/5 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-cyan-500/30 mb-3 border-2 border-indigo-500/50 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            {getRoleIcon(activeRole)}
          </div>
          <h3 className="text-lg font-bold text-white">Demo User</h3>
          <p className="text-xs text-gray-400 font-mono mt-1">ID: DEMO-77</p>
          
          <div className={`mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(activeRole)}`}>
            {getRoleIcon(activeRole)}
            {activeRole}
          </div>
        </div>

        {/* Details */}
        <div className="p-4 space-y-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Wallet Address</div>
            <div className="text-xs font-mono text-gray-300 truncate bg-black/20 p-2 rounded-lg border border-white/5">
              {account || 'Not Connected'}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Privacy Status</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <ShieldCheck size={14} />
              100% Shielded
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-2 border-t border-white/5 flex flex-col gap-1">
          <button 
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Copy size={16} />
            {copied ? 'Copied Payload!' : 'Export Identity Payload'}
          </button>
          
          <div className="h-px bg-white/5 my-1 mx-2"></div>
          
          <div className="px-4 py-1.5 text-[10px] text-gray-500 uppercase font-semibold">Switch Role</div>
          {allRoles.map(role => (
            activeRole !== role && (
              <button 
                key={role!}
                onClick={() => { login(role); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {getRoleIcon(role)}
                Switch to {role?.split(' ')[0]}
              </button>
            )
          ))}

          <div className="h-px bg-white/5 my-1 mx-2"></div>
          
          <button 
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout Session
          </button>
        </div>
      </div>
    </div>
  );
};
