import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  role: 'admin' | 'candidate';
  onLogin: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ role, onLogin, onBack }) => {
  const isRecruiter = role === 'admin';
  
  const [email, setEmail] = useState(
    isRecruiter ? 'alex.thompson@proofhire.ai' : 'sarah.jenkins@stanford.edu'
  );
  const [password, setPassword] = useState(
    isRecruiter ? 'password123' : 'candidate123'
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex font-sans animate-fade-in">
      
      {/* Left Panel: Identical NEXUS Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="relative z-10 flex items-center space-x-2.5">
          <div className="p-1.5 bg-sky-500 text-white rounded-lg shadow-sm">
            <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="12" r="4" />
              <circle cx="15" cy="12" r="4" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight">NEXUS</span>
            <span className="block text-[8px] text-slate-400 font-bold tracking-wider uppercase leading-none mt-0.5">Recruitment Intelligence</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="text-3xl font-medium tracking-tight leading-snug">
            {isRecruiter 
              ? 'Verify qualifications with auditable evidence logs.' 
              : 'Discover career insights and build a stronger profile.'
            }
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            {isRecruiter
              ? 'Access candidate matching, configure requirement analysis weights, and map resumes directly to claims with verified text highlights.'
              : 'Outline your career preferences, inspect what our parser extracts from your resume, and discover strengths or areas to improve.'
            }
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800 text-[10px]">
            <div className="space-y-1">
              <span className="text-slate-500 block uppercase font-bold tracking-wider">Workspace</span>
              <span className="text-slate-200 font-medium block">
                {isRecruiter ? 'Recruiter Dashboard' : 'Candidate Dashboard'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block uppercase font-bold tracking-wider">Status</span>
              <span className="text-slate-200 font-medium block">Verified Environment</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-slate-500 font-semibold">
          &copy; 2026 NEXUS Inc. Connect talent with opportunity.
        </div>
      </div>

      {/* Right Panel: Login Credentials Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 md:px-24 py-12 relative">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 sm:left-12 flex items-center space-x-1 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to workspaces</span>
        </button>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <span className="inline-block bg-sky-50 text-sky-700 border border-sky-100 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
              {isRecruiter ? 'RECRUITER WORKSPACE' : 'CANDIDATE WORKSPACE'}
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-slate-900">
              {isRecruiter ? 'Admin Login' : 'Candidate Login'}
            </h2>
            <p className="text-slate-500 text-xs font-medium">
              {isRecruiter 
                ? 'Sign in to access your talent screening pipeline.' 
                : 'Sign in to verify and shape your professional profile.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-slate-500">
            
            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block uppercase tracking-wider text-slate-400 text-[10px]">Email Address</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all text-xs"
                required
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="block uppercase tracking-wider text-slate-400 text-[10px]">Password</label>
                <a href="#forgot" className="text-sky-500 hover:underline hover:text-sky-600">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3.5 pr-10 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all text-xs font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember device checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="login-remember"
                className="w-4 h-4 text-sky-500 border-slate-300 rounded focus:ring-sky-500"
                defaultChecked
              />
              <label htmlFor="login-remember" className="text-slate-500 font-medium cursor-pointer select-none">
                Remember this device for 30 days
              </label>
            </div>

            {/* Submit btn */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold rounded-lg text-xs shadow-sm transition-all duration-150"
              >
                Sign In
              </button>
            </div>

          </form>

          {/* Create Account line */}
          <div className="text-center pt-4 border-t border-slate-100 text-xs font-semibold text-slate-400">
            <span>New to NEXUS? </span>
            <a href="#create" className="text-sky-500 hover:underline hover:text-sky-600">Create account</a>
          </div>

        </div>

      </div>

    </div>
  );
};
