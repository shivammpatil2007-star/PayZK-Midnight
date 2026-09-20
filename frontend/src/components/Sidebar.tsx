import React from 'react';
import { LayoutDashboard, UserCheck, ShieldCheck, FileKey } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'employee', label: 'Employee Studio', icon: <UserCheck size={20} /> },
    { id: 'verifier', label: 'Verifier Suite', icon: <ShieldCheck size={20} /> },
    { id: 'audit', label: 'Proof Audit Ledger', icon: <FileKey size={20} /> },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col hidden md:flex z-20 shadow-2xl">
      <div className="mb-10">
        <Logo collapsed={false} />
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
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
