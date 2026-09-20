import React from 'react';
import { useAuth, type Role } from '../context/AuthContext';
import { LogOut, Copy, UserCircle2, ShieldCheck, Fingerprint } from 'lucide-react';

export const ProfileModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentUser, logout, switchRole } = useAuth();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !currentUser) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentUser, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleColors = {
    Employee: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Verifier: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    Issuer: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case 'Employee': return <UserCircle2 size={16} />;
      case 'Verifier': return <ShieldCheck size={16} />;
      case 'Issuer': return <Fingerprint size={16} />;
    }
  };

  return (
    <div className="absolute top-16 right-8 z-50 animate-in slide-in-from-top-2 duration-200">
      {/* Click outside overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      
      <div className="relative z-50 w-80 glass-panel border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-white/5 flex flex-col items-center">
          <img 
            src={`https://api.dicebear.com/9.x/identicon/svg?seed=${currentUser.avatarSeed}`} 
            alt="avatar" 
            className="w-16 h-16 rounded-full bg-white/10 mb-3 border-2 border-indigo-500/50"
          />
          <h3 className="text-lg font-bold text-white">{currentUser.name}</h3>
          <p className="text-xs text-gray-400 font-mono mt-1">{currentUser.id}</p>
          
          <div className={`mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${roleColors[currentUser.role]}`}>
            {getRoleIcon(currentUser.role)}
            {currentUser.role}
          </div>
        </div>

        {/* Details */}
        <div className="p-4 space-y-4">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-semibold mb-1">Wallet Address</div>
            <div className="text-xs font-mono text-gray-300 truncate bg-black/20 p-2 rounded-lg border border-white/5">
              {currentUser.walletAddress}
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
          {(['Employee', 'Verifier', 'Issuer'] as Role[]).map(role => (
            currentUser.role !== role && (
              <button 
                key={role}
                onClick={() => { switchRole(role); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {getRoleIcon(role)}
                Switch to {role}
              </button>
            )
          ))}

          <div className="h-px bg-white/5 my-1 mx-2"></div>
          
          <button 
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
