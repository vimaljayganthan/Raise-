import React from 'react';
import { ShieldCheck, Users, Search, Settings as SettingsIcon, LayoutDashboard } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
  recruiter: {
    name: string;
    company: string;
  };
}

export const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage, recruiter }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'analyze', label: 'Analyze Resume', icon: Search },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActivePage('dashboard')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm group-hover:bg-blue-700 transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">Proof<span className="text-blue-600">Hire</span></span>
            <span className="block text-[10px] text-slate-500 font-medium -mt-1 tracking-wider uppercase">Evidence-Backed AI</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id || (item.id === 'candidates' && activePage === 'candidate-detail');
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Recruiter Profile info */}
        <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold text-slate-800 leading-3">{recruiter.name}</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">{recruiter.company}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-inner">
            {recruiter.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </nav>
  );
};
