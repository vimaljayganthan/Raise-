import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, User, Settings as SettingsIcon, 
  Bell, CheckCircle, Clock, Sparkles, AlertTriangle, Search
} from 'lucide-react';
import type { Candidate, Job, Application } from '../types';

interface CandidatePortalProps {
  candidate: Candidate;
  jobs: Job[];
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  onSignOut: () => void;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({
  candidate,
  jobs,
  applications,
  setApplications: _setApplications,
  onSignOut
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Preferences Form States (Sarah Jenkins)
  const [prefTargetRole, setPrefTargetRole] = useState(candidate.careerPreferences?.targetRole || 'Senior Full-Stack Developer');
  const [prefRolesInput, setPrefRolesInput] = useState(candidate.careerPreferences?.preferredRoles.join(', ') || '');
  const [prefExpLevel, setPrefExpLevel] = useState(candidate.careerPreferences?.experienceLevel || 'Senior');
  const [prefLocations, setPrefLocations] = useState(candidate.careerPreferences?.preferredLocations.join(', ') || '');
  const [prefEmpTypes, setPrefEmpTypes] = useState(candidate.careerPreferences?.employmentTypes.join(', ') || '');
  const [prefIndustries, setPrefIndustries] = useState(candidate.careerPreferences?.preferredIndustries.join(', ') || '');
  const [prefSalaryMin, setPrefSalaryMin] = useState(candidate.careerPreferences?.expectedSalaryMin || 170000);
  const [prefSalaryMax, setPrefSalaryMax] = useState(candidate.careerPreferences?.expectedSalaryMax || 220000);
  const [prefWorkMode, setPrefWorkMode] = useState(candidate.careerPreferences?.preferredWorkMode || 'Remote');
  const [prefTechnologies, setPrefTechnologies] = useState(candidate.careerPreferences?.preferredTechnologies.join(', ') || '');
  const [prefInterests, setPrefInterests] = useState(candidate.careerPreferences?.careerInterests.join(', ') || '');
  const [prefGoals, setPrefGoals] = useState(candidate.careerPreferences?.careerGoals || '');

  // Edit Profile form fields
  const [profName, setProfName] = useState(candidate.name);
  const [profEmail, setProfEmail] = useState(candidate.email);
  const [profPhone, setProfPhone] = useState(candidate.phone);
  const [profLocation, setProfLocation] = useState(candidate.location);
  const [profSummary, setProfSummary] = useState('Senior Full-Stack Engineer with 6+ years of experience building payment infrastructures and developer checkout dashboards. Highly skilled in React, TypeScript, and Node.js.');
  const [profileSaved, setProfileSaved] = useState(false);
  const [prefSaved, setPrefSaved] = useState(false);

  // Resume State
  const [resumeFile] = useState<string>('Sarah_Jenkins_Resume.pdf');
  const [resumeParsedDate] = useState('2026-08-15');

  // Resume Analyzer States (Migrated from Recruiter)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customJobDesc, setCustomJobDesc] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [analyzerError, setAnalyzerError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [analyzerMatchScore, setAnalyzerMatchScore] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState([
    { text: 'Reading uploaded PDF structures...', status: 'pending' },
    { text: 'Extracting clean text logs...', status: 'pending' },
    { text: 'Pinpointing resume claim segments...', status: 'pending' },
    { text: 'Grounded keyword alignment matches...', status: 'pending' },
    { text: 'Authoring evidence verification matrix...', status: 'pending' }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your profile parse check completed with 85% accuracy.', date: '3 days ago', unread: false }
  ]);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 2500);

    setNotifications(prev => [
      { id: Date.now(), text: 'Career preferences saved successfully.', date: 'Just now', unread: true },
      ...prev
    ]);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  // Run candidate self analysis
  const handleRunAnalysis = () => {
    if (!uploadedFile) {
      setAnalyzerError('Please upload your resume document first.');
      return;
    }
    if (!customJobDesc.trim()) {
      setAnalyzerError('Please paste target job requirements or select a template.');
      return;
    }

    setAnalyzerError(null);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisSteps(prev => prev.map((s, idx) => ({ ...s, status: idx === 0 ? 'loading' : 'pending' })));

    const durations = [700, 800, 1000, 900, 600];
    let step = 0;

    const runStep = () => {
      if (step >= durations.length) {
        setIsAnalyzing(false);
        setAnalyzerMatchScore(selectedTemplateId === 'job-fs' ? 94 : selectedTemplateId === 'job-ml' ? 65 : 82);
        setShowAnalysisResult(true);
        return;
      }

      setTimeout(() => {
        setAnalysisSteps(prev => prev.map((s, idx) => {
          if (idx === step) return { ...s, status: 'complete' };
          if (idx === step + 1) return { ...s, status: 'loading' };
          return s;
        }));
        step += 1;
        setAnalysisProgress(Math.round((step / durations.length) * 100));
        runStep();
      }, durations[step]);
    };

    runStep();
  };

  const myApps = applications.filter(a => a.candidateId === candidate.id);

  // Profile completeness calculation
  const completionSections = [
    { label: 'Personal Information', completed: !!profName && !!profEmail && !!profPhone, warning: 'Add contact details' },
    { label: 'Professional Summary', completed: !!profSummary, warning: 'Add professional summary' },
    { label: 'Career Preferences', completed: !!prefTargetRole && !!prefGoals, warning: 'Define target role and goals' },
    { label: 'Education', completed: candidate.education.length > 0, warning: 'Add education details' },
    { label: 'Work Experience', completed: candidate.experience.length > 0, warning: 'Add professional history' },
    { label: 'Skills Grid', completed: candidate.skills.length > 0, warning: 'Add technical skills' },
    { label: 'Social & Project Links', completed: !!candidate.links.github && !!candidate.links.linkedin, warning: 'Link GitHub and LinkedIn' }
  ];
  
  const completedCount = completionSections.filter(s => s.completed).length;
  const profilePercent = Math.round((completedCount / completionSections.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50/20 flex flex-col font-sans text-slate-800 antialiased">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => { setActiveTab('dashboard'); }}>
              <div className="p-1.5 bg-sky-500 text-white rounded-lg shadow-sm">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="12" r="4" />
                  <circle cx="15" cy="12" r="4" />
                  <path d="M12 9v6" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 tracking-tight">NEXUS</span>
                <span className="block text-[8px] text-slate-400 font-bold tracking-wider uppercase leading-none mt-0.5">Candidate Workspace</span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'analyzer', label: 'Resume Analyzer', icon: Search },
                { id: 'preferences', label: 'Career Preferences', icon: SettingsIcon },
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'resume', label: 'My Resume', icon: FileText },
                { id: 'insights', label: 'My Insights', icon: Sparkles },
                { id: 'applications', label: 'Applications', icon: Clock }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setShowAnalysisResult(false);
                    setUploadedFile(null);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    activeTab === item.id
                      ? 'text-sky-600 bg-sky-50/50'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('notifications')}
              className="text-slate-400 hover:text-slate-700 relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-sky-500 rounded-full"></span>
              )}
            </button>
            <button
              onClick={onSignOut}
              className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-all"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-slate-900">Welcome back, {candidate.name.split(' ')[0]}</h2>
              <p className="text-xs text-slate-505 mt-0.5">Let's understand your career goals and build a stronger professional profile.</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Profile Completion', value: `${profilePercent}%`, desc: 'Completed sections' },
                { label: 'Resume Status', value: 'Parsed', desc: 'Sarah_Jenkins_Resume.pdf' },
                { label: 'Skills Identified', value: candidate.skills.reduce((acc, cat) => acc + cat.items.length, 0), desc: 'Extracted from resume' },
                { label: 'Profile Strength', value: profilePercent >= 80 ? 'High' : 'Moderate', desc: 'Score criteria check' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-1">
                  <span className="text-[9px] text-slate-455 uppercase font-bold tracking-wider">{stat.label}</span>
                  <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                  <span className="block text-[9px] text-slate-400 font-semibold">{stat.desc}</span>
                </div>
              ))}
            </div>

            {/* WHAT ARE YOU LOOKING FOR? Preference section */}
            <div className="bg-white border border-slate-200/85 rounded-xl p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                  <Sparkles className="w-4.5 h-4.5 text-sky-500 mr-2" />
                  <span>What are you looking for? (Career Preferences)</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-semibold">Step 1 of profile calibration</span>
              </div>

              {prefSaved && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center space-x-2 text-xs font-bold animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Preferences saved successfully! Profile Insights updated.</span>
                </div>
              )}

              <form onSubmit={handleSavePreferences} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold text-slate-600">
                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Target Role</label>
                  <input 
                    type="text" 
                    value={prefTargetRole} 
                    onChange={e => setPrefTargetRole(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                    placeholder="e.g. Senior Backend Architect" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-455 uppercase tracking-wider text-[9px]">Preferred Roles (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={prefRolesInput} 
                    onChange={e => setPrefRolesInput(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                    placeholder="e.g. Backend Developer, API Engineer" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Experience Level</label>
                  <select 
                    value={prefExpLevel} 
                    onChange={e => setPrefExpLevel(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  >
                    <option>Fresher</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Preferred Locations</label>
                  <input 
                    type="text" 
                    value={prefLocations} 
                    onChange={e => setPrefLocations(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Employment Type</label>
                  <input 
                    type="text" 
                    value={prefEmpTypes} 
                    onChange={e => setPrefEmpTypes(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Preferred Industry</label>
                  <input 
                    type="text" 
                    value={prefIndustries} 
                    onChange={e => setPrefIndustries(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Expected Salary Range</label>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="number" 
                      value={prefSalaryMin} 
                      onChange={e => setPrefSalaryMin(parseInt(e.target.value))} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                    />
                    <span>to</span>
                    <input 
                      type="number" 
                      value={prefSalaryMax} 
                      onChange={e => setPrefSalaryMax(parseInt(e.target.value))} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Preferred Work Mode</label>
                  <select 
                    value={prefWorkMode} 
                    onChange={e => setPrefWorkMode(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium"
                  >
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Office</option>
                  </select>
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Technologies & Frameworks Focus (Comma-separated)</label>
                  <input 
                    type="text" 
                    value={prefTechnologies} 
                    onChange={e => setPrefTechnologies(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Career Interests</label>
                  <input 
                    type="text" 
                    value={prefInterests} 
                    onChange={e => setPrefInterests(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium" 
                  />
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Career Goals</label>
                  <textarea 
                    value={prefGoals} 
                    onChange={e => setPrefGoals(e.target.value)} 
                    rows={3} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium resize-none" 
                    placeholder="Describe what kind of role you are trying to build your career toward..."
                  ></textarea>
                </div>

                <div className="col-span-2 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold shadow-sm"
                  >
                    Save Career Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: RESUME ANALYZER (MIGRATED FROM RECRIUTER) */}
        {activeTab === 'analyzer' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-slate-900">Self Resume Analyzer</h2>
              <p className="text-xs text-slate-505 mt-0.5">Upload your resume and test its parsing matching index against target job descriptions.</p>
            </div>

            {analyzerError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-lg flex items-start space-x-3 text-xs animate-fade-in font-semibold">
                <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span>{analyzerError}</span>
              </div>
            )}

            {isAnalyzing ? (
              /* Loading screen steps */
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8 max-w-lg mx-auto">
                <div className="text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-sky-500 animate-pulse mx-auto" />
                  <h3 className="font-bold text-slate-800 text-sm">Parsing Verification Pipeline</h3>
                  <p className="text-[10px] text-slate-400">Comparing profile credentials to requirements.</p>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Progress</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-sky-500 h-full transition-all duration-150" style={{ width: `${analysisProgress}%` }}></div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-5 border border-slate-100 text-xs divide-y divide-slate-100">
                  {analysisSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-3 py-3 first:pt-0 last:pb-0">
                      {step.status === 'complete' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : step.status === 'loading' ? (
                        <Search className="w-4 h-4 text-sky-500 animate-pulse" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-slate-200 rounded-full"></div>
                      )}
                      <span className={`font-semibold ${
                        step.status === 'loading' ? 'text-sky-500 font-bold' : step.status === 'complete' ? 'text-slate-700' : 'text-slate-400'
                      }`}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : showAnalysisResult ? (
              /* Simulated matching results output */
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 text-sm">Analyzer Screening Results</h3>
                  <button onClick={() => setShowAnalysisResult(false)} className="text-xs font-bold text-sky-500 hover:underline">Run Another Test</button>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-sky-50 text-sky-600 rounded-full font-extrabold text-2xl">
                    {analyzerMatchScore}%
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-800 font-bold text-sm block">Match Quotient Index</span>
                    <p className="text-xs text-slate-455 font-medium leading-relaxed font-sans">
                      {analyzerMatchScore >= 80 
                        ? 'Excellent qualification alignment! Your parsed profile meets all core parameters.' 
                        : 'Partial qualification alignment. Review missing skills to calibrate.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard paste JD upload area */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="space-y-4">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">1. Upload Resume Document</label>
                  <div 
                    onClick={() => document.getElementById('candidate-analyzer-input')?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px] transition-colors ${
                      uploadedFile ? 'border-emerald-400 bg-emerald-50/10' : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <input
                      type="file"
                      id="candidate-analyzer-input"
                      className="hidden"
                      accept=".pdf,.docx,.doc"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                          setAnalyzerError(null);
                        }
                      }}
                    />
                    {uploadedFile ? (
                      <div className="space-y-3">
                        <FileText className="w-10 h-10 text-emerald-500 mx-auto" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs truncate max-w-[200px]">{uploadedFile.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                        </div>
                        <span className="text-[10px] bg-slate-105 hover:bg-slate-200 border border-slate-200 px-3 py-1 rounded font-bold text-slate-600 transition-colors">
                          Change Document
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800">Drag & drop your resume file here</h4>
                          <p className="text-slate-400 font-semibold">Supports PDF or DOCX up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">2. Target Job Description</label>
                      <span className="text-[9px] text-slate-400 font-semibold">Active job templates</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {jobs.filter(j => j.status === 'active').map((j) => (
                        <button
                          key={j.id}
                          onClick={() => {
                            setSelectedTemplateId(j.id);
                            setCustomJobDesc(j.description);
                            setAnalyzerError(null);
                          }}
                          className={`px-2.5 py-1.5 border text-[10px] font-bold rounded-lg transition-colors ${
                            selectedTemplateId === j.id
                              ? 'bg-sky-500 border-sky-500 text-white'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {j.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={customJobDesc}
                    onChange={(e) => {
                      setCustomJobDesc(e.target.value);
                      setSelectedTemplateId(null);
                    }}
                    placeholder="Paste the target job description details here..."
                    rows={9}
                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 flex-grow mt-2 resize-none"
                  ></textarea>

                  <button
                    onClick={handleRunAnalysis}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs shadow-sm transition-colors mt-4"
                  >
                    Analyze Resume Match
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CAREER PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-slate-900">Career Preferences Calibration</h2>
              <p className="text-xs text-slate-500 mt-0.5">Define your ideal roles, environments, and industries to align suggestions.</p>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-4">
              <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">Goal Statement</span>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-xs leading-relaxed font-sans font-medium text-slate-650">
                "{prefGoals || 'No goals specified yet. Fill out the dashboard form.'}"
              </div>
            </div>
            
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-lg animate-pulse"
            >
              Edit Preferences Form
            </button>
          </div>
        )}

        {/* TAB 4: MY PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-8 animate-fade-in max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 cols: profile lists */}
            <form onSubmit={handleSaveProfile} className="lg:col-span-8 space-y-6">
              
              {profileSaved && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg flex items-center space-x-2 text-xs font-bold animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              {/* Personal */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Full Name</label>
                    <input type="text" value={profName} onChange={e => setProfName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Location</label>
                    <input type="text" value={profLocation} onChange={e => setProfLocation(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Email</label>
                    <input type="email" value={profEmail} onChange={e => setProfEmail(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-slate-450 uppercase tracking-wider text-[9px]">Phone</label>
                    <input type="text" value={profPhone} onChange={e => setProfPhone(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2" />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Professional Summary</h3>
                <textarea 
                  value={profSummary} 
                  onChange={e => setProfSummary(e.target.value)} 
                  rows={3} 
                  className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs font-medium resize-none focus:outline-none"
                ></textarea>
              </div>

              {/* Education */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Education</h3>
                {candidate.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <span className="font-bold text-slate-805 block">{edu.degree}</span>
                    <p className="text-slate-500 font-semibold">{edu.institution} &bull; GPA: {edu.gpa}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{edu.details}</p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Work Experience</h3>
                <div className="space-y-4">
                  {candidate.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1.5 text-xs border-b border-slate-50 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{exp.title}</span>
                        <span className="text-[10px] text-slate-450 font-semibold">{exp.duration}</span>
                      </div>
                      <p className="text-slate-505 font-bold text-[10px] uppercase tracking-wide">{exp.company}</p>
                      <ul className="list-disc pl-5 text-slate-550 space-y-1 text-[11px] font-medium leading-relaxed font-sans">
                        {exp.responsibilities.map((r, rIdx) => <li key={rIdx}>{r}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2.5 bg-slate-900 text-white rounded font-bold text-xs shadow-sm">Save Profile Changes</button>
              </div>

            </form>

            {/* Right 4 cols: Completion checklists */}
            <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-6 sticky top-24">
              <div className="space-y-2 border-b border-slate-100 pb-3 text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Profile Strength</span>
                <div className="text-3xl font-extrabold text-slate-800">{profilePercent}%</div>
                <div className="w-full bg-slate-105 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-sky-500 h-full rounded-full transition-all" style={{ width: `${profilePercent}%` }}></div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Completeness Check</span>
                {completionSections.map((sec, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    {sec.completed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className={`font-semibold ${sec.completed ? 'text-slate-700' : 'text-slate-405'}`}>{sec.label}</span>
                      {!sec.completed && (
                        <span className="block text-[9px] text-amber-600 font-semibold">{sec.warning}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  const incomplete = completionSections.find(s => !s.completed);
                  if (incomplete) {
                    alert(`Focusing section: ${incomplete.label}. Please adjust fields above.`);
                  }
                }}
                className="w-full py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded text-xs transition-colors"
              >
                Improve Profile
              </button>
            </div>

          </div>
        )}

        {/* TAB 5: MY RESUME */}
        {activeTab === 'resume' && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-slate-900">Parsed Resume Credentials</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage your active document index and check extracted metadata.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-sky-50 text-sky-500 rounded-xl shadow-sm">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{resumeFile}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Uploaded on {resumeParsedDate} &bull; PDF format parsed successfully</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-905 text-xs uppercase tracking-wider border-b border-slate-105 pb-2">Information extracted from your resume</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Education</span>
                  <p className="text-xs text-slate-750 font-bold mt-1">Stanford University — Bachelor of Science in Computer Science</p>
                </div>
                
                <div className="pt-3 border-t border-slate-50">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Experience</span>
                  <p className="text-xs text-slate-755 font-bold mt-1">Senior Software Engineer at Stripe (Jan 2022 - Present)</p>
                </div>

                <div className="pt-3 border-t border-slate-50">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Skills</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'].map((skill, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MY INSIGHTS */}
        {activeTab === 'insights' && (() => {
          const insightsObj = candidate.insights || {
            profileStrength: 85,
            strengths: ['Solid React and TypeScript expertise.', 'Mentored junior developers at Stripe.'],
            improvements: ['Lack AWS deployment details.'],
            nextSteps: ['Complete summary details.']
          };

          return (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div>
                <h2 className="text-xl font-medium tracking-tight text-slate-900">Your Insights Dashboard</h2>
                <p className="text-xs text-slate-500 mt-0.5">Self-understanding, strengths, and areas to improve derived from actual profile statistics.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-500 mr-1.5" />
                      <span>Your Strengths</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-655 font-medium font-sans">
                      {insightsObj.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                          <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-805 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center">
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-500 mr-1.5" />
                      <span>Areas to Improve</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-650 font-medium font-sans">
                      {insightsObj.improvements.map((imp, idx) => (
                        <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                          <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">⚠</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Suggested Next Steps
                </h3>
                <div className="space-y-3.5 text-xs leading-relaxed font-sans font-semibold text-slate-650">
                  {insightsObj.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5">
                      <div className="w-5 h-5 bg-sky-50 border border-sky-100 text-sky-600 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* TAB 7: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-fade-in max-w-3xl">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-slate-900">Application Stages</h2>
              <p className="text-xs text-slate-500 mt-0.5">Track your active loops and pipeline stages.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-55 border-b border-slate-150 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-3.5">Application</th>
                    <th className="px-6 py-3.5">Applied Date</th>
                    <th className="px-6 py-3.5">Current Stage</th>
                    <th className="px-6 py-3.5">Recruiter Updates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {myApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-55/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{app.jobTitle}</td>
                      <td className="px-6 py-4 font-medium text-slate-505">{app.appliedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded font-semibold border ${
                          app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          app.status === 'Interview' ? 'bg-blue-50 text-blue-700 border-blue-105' :
                          app.status === 'Offer' ? 'bg-indigo-50 text-indigo-700 border-indigo-105' : 'bg-slate-55 text-slate-600 border-slate-200/50'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{app.nextStep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 animate-fade-in max-w-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium tracking-tight text-slate-900">Notifications</h2>
              <button 
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                className="text-xs font-semibold text-sky-500 hover:text-sky-600"
              >
                Mark all as read
              </button>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden divide-y divide-slate-100">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-5 flex items-start space-x-3 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? 'bg-sky-500' : 'bg-transparent'}`}></div>
                  <div className="flex-grow space-y-1">
                    <p className="text-xs text-slate-705 font-semibold">{notif.text}</p>
                    <span className="text-[10px] text-slate-400 font-medium block">{notif.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-8 text-center text-xs text-slate-400 font-semibold mt-12 w-full font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 NEXUS. Connect talent with opportunity.
          </div>
          <div className="flex space-x-4">
            <span>Career Calibration Workspace</span>
            <span>&bull;</span>
            <span>Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
