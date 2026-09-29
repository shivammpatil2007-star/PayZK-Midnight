import React from 'react';
import { LayoutDashboard, UserCheck, ShieldCheck, History } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'employee', label: 'Employee Studio', icon: UserCheck },
    { id: 'verifier', label: 'Verifier Suite', icon: ShieldCheck },
    { id: 'ledger', label: 'Proof Audit Ledger', icon: History },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-6 flex flex-col hidden md:flex z-20 shadow-2xl">
      <div className="mb-10">
        <Logo collapsed={false} />
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-950/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Midnight Network
        </div>
      </div>
    </aside>
  );
};
