import React from 'react';
import { ArrowRight, Briefcase, User } from 'lucide-react';

interface PortalSelectionProps {
  onSelectPortal: (portal: 'admin-login' | 'candidate-login' | 'presentation') => void;
}

export const PortalSelection: React.FC<PortalSelectionProps> = ({ onSelectPortal }) => {
  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-800 flex flex-col justify-between font-sans">
      
      {/* Small Header */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-sky-500 text-white rounded-lg shadow-sm">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="12" r="4" />
              <circle cx="15" cy="12" r="4" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">NEXUS</span>
            <span className="block text-[8px] text-slate-400 font-bold tracking-wider uppercase leading-none mt-0.5">Recruitment Intelligence</span>
          </div>
        </div>
        <div>
          <button 
            onClick={() => onSelectPortal('presentation')}
            className="flex items-center space-x-1.5 px-4 py-2 border border-sky-300 text-sky-600 bg-white hover:bg-sky-50 active:scale-95 rounded-lg text-xs font-bold shadow-xs transition-all"
          >
            <span>Presentation Mode</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Selector workspace */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center space-y-12 w-full">
        
        {/* Core Header Text */}
        <div className="text-center max-w-2xl space-y-3">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 leading-snug">
            Connect talent <span className="text-sky-500">with opportunity.</span>
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium">
            A professional recruitment intelligence platform. Choose your workspace to begin.
          </p>
        </div>

        {/* Portal cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          
          {/* Admin card */}
          <div 
            onClick={() => onSelectPortal('admin-login')}
            className="bg-white border border-slate-200/80 rounded-xl p-8 flex flex-col justify-between hover:border-sky-400 hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3.5 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold border border-slate-250/20 uppercase tracking-wider">
                  Recruiter Portal
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-900 group-hover:text-sky-500 transition-colors">ADMIN PORTAL</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Access the recruiter workspace to screen resumes, calibrate AI requirement weights, track pipeline stages, and manage analytics.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button className="w-full flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs shadow-sm transition-all group-hover:bg-sky-500">
                <span>Continue as Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Candidate card */}
          <div 
            onClick={() => onSelectPortal('candidate-login')}
            className="bg-white border border-slate-200/80 rounded-xl p-8 flex flex-col justify-between hover:border-sky-400 hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3.5 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold border border-slate-250/20 uppercase tracking-wider">
                  Candidate Portal
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-900 group-hover:text-sky-500 transition-colors">CANDIDATE PORTAL</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Access the candidate workspace to outline career preferences, explore profile completeness metrics, and review parsed skills.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button className="w-full flex items-center justify-center space-x-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs shadow-sm transition-all group-hover:bg-sky-500">
                <span>Continue as Candidate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-8 text-center text-xs text-slate-400 font-semibold mt-12 w-full">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 NEXUS Inc. Connect talent with opportunity.
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-slate-600 transition-colors cursor-pointer">Privacy Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-600 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
