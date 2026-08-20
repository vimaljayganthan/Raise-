import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, Search, Star, Layers, BarChart3, 
  Settings as SettingsIcon, LogOut, Bell, CheckCircle2, AlertTriangle, 
  FileText, ChevronRight, ArrowRight, ChevronLeft, Menu, Calendar, 
  ToggleLeft, ToggleRight, ShieldCheck, Mail, Phone, MapPin, Clock, Check
} from 'lucide-react';
import type { 
  Candidate, CandidateAnalysis, Job, Application, MessageThread, Evidence, RecentActivity 
} from '../types';
import { mockRecentActivities } from '../data/mockCandidates';
import logoSymbolImg from '../assets/logo_symbol.png';

interface AdminPortalProps {
  candidates: Candidate[];
  analyses: Record<string, CandidateAnalysis>;
  jobs: Job[];
  applications: Application[];
  messages: MessageThread[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  setMessages: React.Dispatch<React.SetStateAction<MessageThread[]>>;
  onSignOut: () => void;
  recruiter: { name: string; email: string; company: string };
  setRecruiter: React.Dispatch<React.SetStateAction<{ name: string; email: string; company: string }>>;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  candidates,
  analyses,
  jobs,
  applications,
  messages: _messages,
  setApplications,
  setMessages: _setMessages,
  onSignOut,
  recruiter,
  setRecruiter: _setRecruiter
}) => {
  // Navigation & Layout
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Global Search state
  const [globalSearch, setGlobalSearch] = useState('');

  // Candidates & Applications filtering/search
  const [candidateSearch, setCandidateSearch] = useState('');
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');

  const [jobStatusFilter, setJobStatusFilter] = useState<'active' | 'draft' | 'closed' | 'paused'>('active');

  // Selected details
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Evidence panel slide-over drawer
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);
  const [drawerEvidence, setDrawerEvidence] = useState<Evidence | null>(null);

  // Settings sub-navigation
  const [activeSettingsSection, setActiveSettingsSection] = useState<'company' | 'recruitment' | 'ai' | 'notifications' | 'security' | 'privacy'>('company');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Settings form states
  const [companyName, setCompanyName] = useState(recruiter.company);
  const [companyIndustry, setCompanyIndustry] = useState('Technology & SaaS');
  const [companySize, setCompanySize] = useState('50 - 200 Employees');
  const [companyWebsite, setCompanyWebsite] = useState('https://nexus-intelligence.ai');
  const [companyLocation, setCompanyLocation] = useState('San Francisco, CA');
  const [companyType, setCompanyType] = useState('Private');
  const [companyDescription, setCompanyDescription] = useState('Enterprise recruitment intelligence platforms and neural candidate screening networks.');
  const [recruitmentTeamSize, setRecruitmentTeamSize] = useState(6);
  const [defaultHiringRegion, setDefaultHiringRegion] = useState('North America, EMEA');

  const [matchScoreThreshold, setMatchScoreThreshold] = useState(75);
  const [autoShortlistThreshold, setAutoShortlistThreshold] = useState(90);
  const [parsingConfidence, setParsingConfidence] = useState(85);
  const [duplicateDetection, setDuplicateDetection] = useState(true);
  const [autoStageAssignment, setAutoStageAssignment] = useState(true);
  const [candidateRanking, setCandidateRanking] = useState(true);
  const [defaultStages, setDefaultStages] = useState('Applied');
  const [defaultJobType, setDefaultJobType] = useState('Full-time');
  const [defaultInterviewDuration, setDefaultInterviewDuration] = useState(45);

  const [evidenceRequired, setEvidenceRequired] = useState(true);
  const [semanticMatching, setSemanticMatching] = useState(true);
  const [keywordMatching, setKeywordMatching] = useState(false);
  const [aiExplanation, setAiExplanation] = useState(true);
  const [evidenceConfidence, setEvidenceConfidence] = useState(85);
  const [evidenceVerificationMode, setEvidenceVerificationMode] = useState<'Strict' | 'Balanced'>('Strict');

  const [notifMatrix, setNotifMatrix] = useState({
    newApp: { inApp: true, email: true },
    analysis: { inApp: true, email: true },
    highMatch: { inApp: true, email: true },
    shortlisted: { inApp: true, email: true },
    scheduled: { inApp: true, email: true },
    feedback: { inApp: true, email: true },
    offerPending: { inApp: true, email: true },
    deadline: { inApp: true, email: false }
  });

  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [resumeRetention, setResumeRetention] = useState('365 days');
  const [candDataRetention, setCandDataRetention] = useState('365 days');
  const [autoDeleteRejected, setAutoDeleteRejected] = useState(false);
  const [allowExport, setAllowExport] = useState(true);

  // Job creation modal state
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobDept, setNewJobDept] = useState('');
  const [newJobLoc, setNewJobLoc] = useState('');
  const [newJobType, setNewJobType] = useState('Full-time');
  const [newJobSalary, setNewJobSalary] = useState('');
  const [newJobExp, setNewJobExp] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobReqs, setNewJobReqs] = useState('');

  // Activity filter state
  const [activityCategoryFilter, setActivityCategoryFilter] = useState('All');
  const [activitySearchQuery, setActivitySearchQuery] = useState('');
  const [activityDateFilter, setActivityDateFilter] = useState('This Week');
  const [activities, setActivities] = useState<RecentActivity[]>(mockRecentActivities);

  // Applications view settings
  const [applicationsViewMode, setApplicationsViewMode] = useState<'kanban' | 'table'>('kanban');
  const [appSearch, setAppSearch] = useState('');
  const [appJobFilter, setAppJobFilter] = useState('all');
  const [appScoreFilter, setAppScoreFilter] = useState('all');
  const [appSort, setAppSort] = useState('Highest Match');

  // Drag and drop confirmation modal & toast
  const [dragConfirmModal, setDragConfirmModal] = useState<{ appId: string; targetStage: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Alerts list
  const [alerts] = useState([
    { id: 1, text: 'New resume uploaded: Arjun Patel (ML Engineer)', read: false, type: 'upload' },
    { id: 2, text: 'Candidate Priya Sharma moved to Shortlisted stage', read: false, type: 'shortlist' },
    { id: 3, text: 'Interview scheduled: David Chen, Friday 2:00 PM', read: false, type: 'interview' },
    { id: 4, text: 'Job application received: Backend Developer position', read: true, type: 'application' },
    { id: 5, text: 'AI screening checklist completed for Aisha Patel', read: true, type: 'ai' }
  ]);

  const [analyticsDateRange, setAnalyticsDateRange] = useState('Last 30 days');

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConfirmMove = () => {
    if (!dragConfirmModal) return;
    const { appId, targetStage } = dragConfirmModal;
    
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        // Add log activity
        const newAct: RecentActivity = {
          id: `act-stage-${Date.now()}`,
          text: `${a.candidateName} moved to ${targetStage} stage.`,
          category: 'stage_change',
          timestamp: 'Just now'
        };
        setActivities(prevAct => [newAct, ...prevAct]);
        return { ...a, status: targetStage as any };
      }
      return a;
    }));

    showToast(`Successfully moved candidate to ${targetStage}`);
    setDragConfirmModal(null);
  };

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    e.dataTransfer.setData('text/plain', appId);
  };

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidateId(id);
    setActiveTab('candidate-detail');
    setActiveEvidenceId(null);
    setIsEvidenceDrawerOpen(false);
  };

  const handleSelectJob = (id: string) => {
    setSelectedJobId(id);
    setActiveTab('job-details');
  };

  const handleOpenEvidenceDrawer = (evidenceId: string) => {
    const analysis = selectedCandidateId ? analyses[selectedCandidateId] : null;
    const evidenceItem = analysis?.evidence.find(ev => ev.id === evidenceId);
    if (!evidenceItem) return;

    setDrawerEvidence(evidenceItem);
    setIsEvidenceDrawerOpen(true);
    setActiveEvidenceId(evidenceId);
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim() || !newJobDept.trim()) return;

    const created: Job = {
      id: `job-new-${Date.now()}`,
      title: newJobTitle,
      department: newJobDept,
      location: newJobLoc,
      type: newJobType,
      description: newJobDesc,
      requirements: newJobReqs.split('\n').filter(r => r.trim()),
      responsibilities: ['Architect APIs', 'Write tests', 'Lead developer checkins'],
      applicantsCount: 0,
      shortlistedCount: 0,
      interviewsCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'active',
      salaryRange: newJobSalary,
      experience: newJobExp,
      skills: newJobReqs.split('\n').map(r => r.trim())
    };

    jobs.push(created);
    setIsCreateJobOpen(false);

    setNewJobTitle('');
    setNewJobDept('');
    setNewJobLoc('');
    setNewJobSalary('');
    setNewJobExp('');
    setNewJobDesc('');
    setNewJobReqs('');
    
    setActiveTab('jobs');
    showToast('Job opening created successfully');
  };

  const getMatchBadgeStyle = (score: number) => {
    if (score >= 90) return 'bg-emerald-50 border border-emerald-200 text-emerald-800';
    if (score >= 75) return 'bg-sky-50 border border-sky-200 text-sky-805';
    return 'bg-amber-50 border border-amber-250 text-amber-800';
  };

  const getFitMeterColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-sky-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getFitMeterTextColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-sky-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  // Filter candidates list
  const filteredCandidates = candidates.filter(c => {
    const analysis = analyses[c.id];
    const score = analysis?.matchResult.overallScore || 0;
    
    const matchesSearch = c.name.toLowerCase().includes(candidateSearch.toLowerCase()) || 
                          c.skills.some(cat => cat.items.some(item => item.toLowerCase().includes(candidateSearch.toLowerCase())));
    if (!matchesSearch) return false;

    if (selectedJobFilter !== 'all') {
      const app = applications.find(a => a.candidateId === c.id);
      if (app?.jobId !== selectedJobFilter) return false;
    }
    if (selectedScoreFilter === 'strong' && score < 80) return false;
    if (selectedScoreFilter === 'good' && (score < 70 || score >= 80)) return false;
    if (selectedScoreFilter === 'review' && score >= 70) return false;
    if (selectedStageFilter !== 'all') {
      const app = applications.find(a => a.candidateId === c.id);
      if (app?.status !== selectedStageFilter) return false;
    }

    return true;
  });

  // Filter applications list
  const filteredAppList = applications.filter(a => {
    if (appSearch && !a.candidateName.toLowerCase().includes(appSearch.toLowerCase())) return false;
    if (appJobFilter !== 'all' && a.jobId !== appJobFilter) return false;
    if (appScoreFilter === '90' && a.matchScore < 90) return false;
    if (appScoreFilter === '75' && (a.matchScore < 75 || a.matchScore >= 90)) return false;
    if (appScoreFilter === 'review' && a.matchScore >= 75) return false;
    return true;
  }).sort((a, b) => {
    if (appSort === 'Highest Match') return b.matchScore - a.matchScore;
    if (appSort === 'Newest') return b.appliedDate.localeCompare(a.appliedDate);
    return a.appliedDate.localeCompare(b.appliedDate);
  });

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col font-sans text-slate-805 antialiased select-none">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-100/80 bg-gradient-to-r from-white via-white to-sky-50/10 px-6 h-16 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div 
            className="flex items-center space-x-2.5 cursor-pointer active:scale-98 transition-transform select-none" 
            onClick={() => { setActiveTab('overview'); setSelectedCandidateId(null); }}
          >
            <img 
              src={logoSymbolImg} 
              alt="NEXUS" 
              style={{ 
                width: '32px', 
                height: '32px', 
                objectFit: 'contain'
              }} 
            />
            <span className="font-extrabold text-xl text-[#0A1428] tracking-tight">NEXUS</span>
          </div>

          <div className="relative w-[400px] hidden md:block">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${isSearchFocused ? 'text-sky-500' : 'text-slate-405'}`} />
            <input
              type="text"
              value={globalSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search candidates, jobs, skills..."
              className="w-full bg-slate-50 border border-slate-200 rounded pl-10 pr-12 h-10 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all hover:border-slate-300"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] bg-slate-200/80 text-slate-500 border border-slate-300 rounded px-1.5 py-0.5 font-bold">
              ⌘ K
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative font-sans text-xs">
            <button 
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 hover:shadow-xs border border-slate-200 px-2.5 py-1 rounded text-xs font-bold text-slate-700 transition-all active:scale-98"
            >
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
              <span>Hiring operations active</span>
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded shadow-lg p-3.5 z-50 animate-fade-in font-sans text-xs space-y-2">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-150 pb-1">
                  Recruitment Status
                </span>
                <div className="space-y-2 text-slate-700 font-semibold">
                  <div className="flex justify-between">
                    <span>Active Jobs:</span>
                    <span className="font-extrabold text-[#0A1428]">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Candidates Under Review:</span>
                    <span className="font-extrabold text-[#0A1428]">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interviews Today:</span>
                    <span className="font-extrabold text-[#0A1428]">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offers Pending:</span>
                    <span className="font-extrabold text-emerald-600">1</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setIsStatusDropdownOpen(false); setActiveTab('overview'); }}
                  className="w-full text-center block text-[10px] text-sky-505 font-bold hover:underline pt-2 border-t border-slate-100"
                >
                  View Overview
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 hover:bg-slate-50 rounded text-slate-405 hover:text-sky-500 transition-colors active:scale-95 duration-150 relative"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 rounded shadow-lg z-50 p-4 animate-fade-in text-xs space-y-3">
                <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block border-b border-slate-100 pb-1">Notifications Alerts</span>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {alerts.map(a => (
                    <div key={a.id} className="p-2.5 bg-slate-50 rounded border border-slate-100 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 flex-shrink-0"></span>
                      <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-grow items-stretch relative">
        
        {/* Sidebar Nav */}
        <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-60'} bg-white border-r border-slate-105 p-3.5 flex flex-col flex-shrink-0 transition-all duration-200 h-screen sticky top-0`}>
          <div className="flex items-center justify-between px-2 h-12 mb-4 border-b border-slate-50 pb-2">
            {isSidebarCollapsed ? (
              <img 
                src={logoSymbolImg} 
                alt="N" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  objectFit: 'contain'
                }} 
                className="mx-auto" 
              />
            ) : (
              <div className="flex items-center space-x-2.5 select-none">
                <img 
                  src={logoSymbolImg} 
                  alt="NEXUS" 
                  style={{ 
                    width: '30px', 
                    height: '30px', 
                    objectFit: 'contain'
                  }} 
                />
                <span className="font-extrabold text-lg text-[#0A1428] tracking-tight">NEXUS</span>
              </div>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded ml-2"
            >
              {isSidebarCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          <nav className="space-y-1.5 flex-grow">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'candidates', label: 'Candidates', icon: Users },
              { id: 'jobs', label: 'Jobs', icon: Briefcase },
              { id: 'applications', label: 'Applications', icon: Layers },
              { id: 'shortlists', label: 'Shortlists', icon: Star },
              { id: 'pipeline', label: 'Interview Pipeline', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'activity', label: 'Activity', icon: Clock },
              { id: 'settings', label: 'Settings', icon: SettingsIcon },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || 
                (item.id === 'candidates' && activeTab === 'candidate-detail') ||
                (item.id === 'jobs' && activeTab === 'job-details');
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedCandidateId(null);
                    setSelectedJobId(null);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 h-11 rounded transition-all duration-150 relative ${
                    isActive
                      ? 'bg-sky-50 text-[#0A1428] font-bold border-l-4 border-sky-500 pl-2.5'
                      : 'text-slate-500 hover:text-[#0A1428] hover:bg-sky-50/45 hover:translate-x-1 pl-3.5'
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-sky-500' : 'text-slate-405'}`} />
                  <span className={`${isSidebarCollapsed ? 'hidden' : 'block'} truncate text-[14px] font-semibold py-1.5`}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="border-t border-slate-105 pt-4 mt-6">
            <button 
              onClick={onSignOut}
              className="w-full flex items-center space-x-3 px-3.5 h-11 text-[14px] font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded active:scale-95 transition-all"
            >
              <LogOut className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span className={`${isSidebarCollapsed ? 'hidden' : 'block'}`}>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <div className="flex-grow overflow-y-auto px-8 py-6 w-full max-w-[1600px] mx-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-32px font-extrabold text-[#0A1428]">Recruitment Overview</h1>
                  <p className="text-[14px] text-slate-500 mt-0.5">Track candidate activity, hiring progress and recruitment performance.</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsCreateJobOpen(true)}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white text-xs font-bold rounded shadow-xs transition-all"
                  >
                    Create Job
                  </button>
                  <button 
                    onClick={() => setActiveTab('candidates')}
                    className="px-4 py-2 border border-sky-350 bg-white hover:bg-sky-50 active:scale-98 text-[#0A1428] text-xs font-bold rounded shadow-xs transition-all"
                  >
                    Import Candidates
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Total Candidates', value: candidates.length, trend: '+18%', desc: 'Parsed profiles', color: 'border-sky-500' },
                  { label: 'Active Jobs', value: jobs.filter(j => j.status === 'active').length, trend: 'Steady', desc: 'Accepting submissions', color: 'border-blue-500' },
                  { label: 'Under Review', value: applications.filter(a => a.status === 'Screening').length, trend: '-4%', desc: 'Awaiting screening', color: 'border-amber-500' },
                  { label: 'Shortlisted', value: applications.filter(a => a.status === 'Shortlisted').length, trend: '+12%', desc: 'Qualified leads', color: 'border-emerald-500' },
                  { label: 'Interviews', value: applications.filter(a => a.status === 'Interview').length, trend: '+8%', desc: 'Scheduled loops', color: 'border-indigo-500' }
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-white p-4.5 rounded border border-slate-200/80 shadow-xs border-t-2 ${stat.color} space-y-1`}>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{stat.label}</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-[26px] font-extrabold text-[#0A1428]">{stat.value}</span>
                      <span className="text-[9px] text-emerald-600 font-bold">{stat.trend}</span>
                    </div>
                    <span className="block text-[9px] text-slate-400 font-semibold">{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* Pipeline funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-6 rounded border border-slate-200/80 shadow-xs space-y-4">
                  <h3 className="text-[18px] font-bold text-[#0A1428]">Hiring Pipeline Funnel</h3>
                  <div className="grid grid-cols-6 gap-2 text-center text-xs">
                    {[
                      { label: 'Applied', count: 248, conv: '100%' },
                      { label: 'Screening', count: 180, conv: '72%' },
                      { label: 'AI Reviewed', count: 96, conv: '53%' },
                      { label: 'Shortlisted', count: 36, conv: '37%' },
                      { label: 'Interview', count: 18, conv: '50%' },
                      { label: 'Offer', count: 6, conv: '33%' }
                    ].map((stage, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setSelectedStageFilter(stage.label === 'AI Reviewed' ? 'all' : stage.label as any);
                          setActiveTab('candidates');
                        }}
                        className="bg-sky-50/10 border border-sky-100 hover:border-sky-300 hover:bg-sky-50 transition-all rounded p-3.5 cursor-pointer space-y-1"
                      >
                        <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">{stage.label}</span>
                        <div className="text-[20px] font-extrabold text-[#0A1428]">{stage.count}</div>
                        <span className="block text-[9px] text-sky-655 font-semibold">{stage.conv} conv</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white p-6 rounded border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-105 pb-2">
                    <h3 className="text-[18px] font-bold text-[#0A1428]">Recruitment Health</h3>
                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      Healthy
                    </span>
                  </div>

                  <div className="space-y-3 text-xs font-semibold text-slate-550">
                    {[
                      { label: 'Average Match Score', val: '84%', pct: 84 },
                      { label: 'Time to Shortlist', val: '2.8 days', pct: 90 },
                      { label: 'Candidate Response Rate', val: '76%', pct: 76 },
                      { label: 'Interview Conversion', val: '42%', pct: 42 }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#0A1428] font-bold">{row.label}</span>
                          <span className="font-extrabold text-slate-800">{row.val}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="bg-sky-400 h-full rounded-full" style={{ width: `${row.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded shadow-xs overflow-hidden">
                  <div className="px-6 py-4.5 border-b border-slate-105 flex items-center justify-between">
                    <h3 className="text-[18px] font-bold text-[#0A1428]">Recent Candidate Screening</h3>
                    <button onClick={() => setActiveTab('candidates')} className="text-xs font-bold text-sky-505 hover:underline">
                      View All Candidates
                    </button>
                  </div>

                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-extrabold text-[#0A1428] uppercase tracking-wider">
                        <th className="px-6 py-3">Candidate</th>
                        <th className="px-6 py-3">Target Role</th>
                        <th className="px-6 py-3">Match</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.slice(0, 4).map((app) => {
                        const badge = getMatchBadgeStyle(app.matchScore);
                        return (
                          <tr key={app.id} className="hover:bg-sky-50/10 transition-colors">
                            <td className="px-6 py-3.5 flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-[#0A1428] flex items-center justify-center font-bold">
                                {app.candidateName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-bold text-[#0A1428]">{app.candidateName}</span>
                            </td>
                            <td className="px-6 py-3.5 font-semibold text-slate-600">{app.jobTitle}</td>
                            <td className="px-6 py-3.5">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${badge}`}>{app.matchScore}%</span>
                            </td>
                            <td className="px-6 py-3.5 text-right">
                              <button 
                                onClick={() => handleSelectCandidate(app.candidateId)}
                                className="px-2.5 py-1.5 border border-sky-300 bg-white hover:bg-sky-50 text-[#0A1428] rounded font-bold shadow-xs active:scale-95 transition-all"
                              >
                                View Fit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-5 rounded border border-slate-200/80 shadow-xs space-y-3">
                    <h4 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Top Matches (Active Job)</h4>
                    <div className="space-y-2.5 text-xs">
                      {[
                        { name: 'Sarah Jenkins', skill: 'React & TS expert', score: 94 },
                        { name: 'Priya Sharma', skill: 'Tailwind layout design', score: 91 }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-50/50 p-2.5 border border-slate-100 rounded">
                          <div>
                            <span className="font-bold text-[#0A1428] block">{item.name}</span>
                            <span className="text-[10px] text-slate-400 block font-semibold">{item.skill}</span>
                          </div>
                          <span className="font-extrabold text-sky-600 text-sm">{item.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CANDIDATES */}
          {activeTab === 'candidates' && (
            <div className="space-y-6 animate-fade-in w-full text-xs font-semibold">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-32px font-extrabold text-[#0A1428]">Candidates | {filteredCandidates.length}</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Filter and shortlist candidate parsed documents.</p>
                </div>
                <button onClick={() => alert('Importing candidates')} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded font-bold shadow-xs active:scale-95 transition-all">
                  Import Candidates
                </button>
              </div>

              {/* Filters */}
              <div className="bg-white p-4 rounded border border-slate-200/80 shadow-xs grid grid-cols-2 md:grid-cols-5 gap-3">
                <input
                  type="text"
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  placeholder="Search name, skills..."
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs font-semibold text-slate-800 w-full focus:outline-none col-span-2"
                />
                <select value={selectedJobFilter} onChange={e => setSelectedJobFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-semibold text-slate-600 w-full">
                  <option value="all">Job: All</option>
                  {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
                <select value={selectedScoreFilter} onChange={e => setSelectedScoreFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-semibold text-slate-600 w-full">
                  <option value="all">Score: All</option>
                  <option value="strong">80%+</option>
                  <option value="good">70% - 79%</option>
                </select>
                <select value={selectedStageFilter} onChange={e => setSelectedStageFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-semibold text-slate-600 w-full">
                  <option value="all">Stage: All</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Shortlisted">Shortlisted</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-white border border-slate-200/80 rounded shadow-xs overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-extrabold text-[#0A1428] uppercase tracking-wider">
                      <th className="px-6 py-4">Candidate</th>
                      <th className="px-6 py-4">Target Role</th>
                      <th className="px-6 py-4 text-center">Match</th>
                      <th className="px-6 py-4 text-center">Experience</th>
                      <th className="px-6 py-4 text-center">Stage</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.map((c) => {
                      const app = applications.find(a => a.candidateId === c.id);
                      const score = analyses[c.id]?.matchResult.overallScore || 75;
                      const badge = getMatchBadgeStyle(score);
                      const scoreText = score >= 90 ? 'Strong' : score >= 75 ? 'Good' : 'Review';

                      return (
                        <tr key={c.id} className="hover:bg-sky-50/10 hover:border-l-2 hover:border-sky-500 transition-all duration-155">
                          <td className="px-6 py-4.5 flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-[#0A1428] flex items-center justify-center font-bold">
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <span className="font-bold text-[#0A1428] block">{c.name}</span>
                              <span className="text-[10px] text-slate-450 block mt-0.5">{c.location}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4.5 font-semibold text-slate-655">{app?.jobTitle || 'General Application'}</td>
                          <td className="px-6 py-4.5 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${badge}`}>
                              {score}% &bull; {scoreText}
                            </span>
                          </td>
                          <td className="px-6 py-4.5 text-center font-medium text-slate-500">
                            {c.experience[0]?.duration.includes('Present') ? 'Senior' : 'Mid Level'}
                          </td>
                          <td className="px-6 py-4.5 text-center font-semibold text-slate-500">{app?.status || 'Awaiting Action'}</td>
                          <td className="px-6 py-4.5 text-right relative">
                            <div className="inline-block text-left">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveActionMenuId(activeActionMenuId === c.id ? null : c.id);
                                }}
                                className="px-2.5 py-1.5 border border-sky-300 text-[#0A1428] bg-white hover:bg-sky-50 rounded text-xs font-bold transition-all shadow-xs active:scale-95"
                              >
                                View Fit
                              </button>
                              {activeActionMenuId === c.id && (
                                <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded shadow-lg z-50 py-1 text-left font-semibold text-slate-605">
                                  <button 
                                    onClick={() => { setActiveActionMenuId(null); handleSelectCandidate(c.id); }}
                                    className="block w-full px-3 py-1.5 hover:bg-slate-50 text-[11px]"
                                  >
                                    View Fit
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setActiveActionMenuId(null);
                                      setApplications(prev => prev.map(a => a.candidateId === c.id ? { ...a, status: 'Shortlisted' } : a));
                                      showToast('Candidate shortlisted');
                                    }}
                                    className="block w-full px-3 py-1.5 hover:bg-slate-50 text-[11px]"
                                  >
                                    Shortlist
                                  </button>
                                  <button 
                                    onClick={() => { setActiveActionMenuId(null); handleSelectCandidate(c.id); }}
                                    className="block w-full px-3 py-1.5 hover:bg-slate-50 text-[11px]"
                                  >
                                    View Resume
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: JOBS */}
          {activeTab === 'jobs' && (
            <div className="space-y-6 animate-fade-in w-full text-xs font-semibold">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-32px font-extrabold text-[#0A1428]">Job Openings</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Manage job postings and match statistics.</p>
                </div>
                <button 
                  onClick={() => setIsCreateJobOpen(true)}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded font-bold shadow-xs active:scale-95 transition-all"
                >
                  Create Job Opening
                </button>
              </div>

              {/* Status selectors */}
              <div className="border-b border-slate-200 flex space-x-6 text-xs font-bold text-slate-400 uppercase tracking-wider select-none">
                {['active', 'draft', 'paused', 'closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setJobStatusFilter(status as any)}
                    className={`pb-2 border-b-2 transition-all ${
                      jobStatusFilter === status ? 'border-sky-500 text-sky-600 font-bold' : 'border-transparent hover:text-slate-750'
                    }`}
                  >
                    {status} Jobs
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {jobs.filter(j => j.status === jobStatusFilter).map(job => (
                  <div key={job.id} className="bg-white border border-slate-200/80 rounded p-6 shadow-xs flex justify-between items-center hover:border-slate-300 hover:shadow transition-all duration-200">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-bold text-[#0A1428] text-[18px]">{job.title}</h3>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-sky-50 border border-sky-100 text-sky-700">{job.status}</span>
                      </div>
                      <div className="text-xs text-slate-455 font-semibold flex space-x-4">
                        <span>Salary: <strong>{job.salaryRange || 'Not Spec'}</strong></span>
                        <span>•</span>
                        <span>Exp: <strong>{job.experience || 'Not Spec'}</strong></span>
                        <span>•</span>
                        <span>Department: <strong>{job.department}</strong></span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleSelectJob(job.id)}
                        className="px-4 py-2 border border-sky-300 bg-white hover:bg-sky-50 text-[#0A1428] rounded font-bold shadow-xs active:scale-95 transition-all"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedJobFilter(job.id);
                          setActiveTab('candidates');
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold shadow-xs active:scale-95 transition-all"
                      >
                        Manage Candidates
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JOB DETAILS */}
          {activeTab === 'job-details' && (() => {
            const jobObj = jobs.find(j => j.id === selectedJobId) || jobs[0];
            return (
              <div className="space-y-6 animate-fade-in">
                <button onClick={() => setActiveTab('jobs')} className="flex items-center space-x-1 text-xs font-bold text-slate-450 hover:text-slate-700">
                  <ArrowRight className="w-3.5 h-3.5 rotate-180 mr-1" />
                  <span>Back to Jobs</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded p-8 space-y-6 shadow-xs">
                    <h2 className="text-2xl font-bold text-[#0A1428]">{jobObj.title}</h2>
                    <p className="text-xs text-slate-655 leading-relaxed">{jobObj.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#0A1428] text-xs uppercase tracking-wider">Requirements</h4>
                      <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1.5">
                        {jobObj.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded p-6 space-y-6 shadow-xs sticky top-24">
                    <h3 className="font-bold text-[#0A1428] text-xs uppercase tracking-wider border-b border-slate-100 pb-2">Status Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-[26px] font-extrabold text-[#0A1428]">{jobObj.applicantsCount}</div>
                        <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Applicants</span>
                      </div>
                      <div>
                        <div className="text-[26px] font-extrabold text-[#0A1428]">{jobObj.shortlistedCount}</div>
                        <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Shortlisted</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedJobFilter(jobObj.id);
                        setActiveTab('candidates');
                      }}
                      className="w-full px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold shadow-xs"
                    >
                      View Applicants
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* TAB 5: APPLICATIONS PIPELINE (CONCURRENT MODES) */}
          {activeTab === 'applications' && (
            <div className="space-y-6 animate-fade-in w-full text-xs font-semibold">
              <div>
                <h1 className="text-32px font-extrabold text-[#0A1428]">Application Pipeline</h1>
                <p className="text-[14px] text-slate-500 mt-0.5">Manage candidate applications from initial submission through offer.</p>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Total Applications', value: '248', color: 'border-sky-500' },
                  { label: 'New Today', value: '12', color: 'border-blue-500' },
                  { label: 'Under Review', value: '47', color: 'border-amber-500' },
                  { label: 'Shortlisted', value: '18', color: 'border-emerald-500' },
                  { label: 'Interviews', value: '9', color: 'border-indigo-500' },
                  { label: 'Offers', value: '3', color: 'border-rose-500' }
                ].map((kpi, idx) => (
                  <div key={idx} className={`bg-white p-4.5 rounded border border-slate-200/80 shadow-xs border-l-4 ${kpi.color} space-y-1`}>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">{kpi.label}</span>
                    <div className="text-[20px] font-extrabold text-[#0A1428]">{kpi.value}</div>
                  </div>
                ))}
              </div>

              {/* Summary horizontal bar */}
              <div className="bg-white p-4 rounded border border-slate-200/80 shadow-xs space-y-2">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">Pipeline Stage Summary</span>
                <div className="grid grid-cols-6 gap-2 text-center text-[10px]">
                  {[
                    { label: 'Applied', count: 248, conv: '100%' },
                    { label: 'Screening', count: 180, conv: '72%' },
                    { label: 'AI Reviewed', count: 96, conv: '53%' },
                    { label: 'Shortlisted', count: 36, conv: '37%' },
                    { label: 'Interview', count: 18, conv: '50%' },
                    { label: 'Offer', count: 6, conv: '33%' }
                  ].map((st, idx) => (
                    <div key={idx} className="bg-slate-50/50 p-2.5 border border-slate-100 rounded">
                      <span className="block text-slate-400 font-bold uppercase text-[8px] mb-1">{st.label}</span>
                      <span className="font-extrabold text-[#0A1428] text-xs mr-2">{st.count}</span>
                      <span className="text-sky-505 font-bold">({st.conv} conv)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter Toolbar */}
              <div className="bg-white border border-slate-200/80 rounded p-4 shadow-xs grid grid-cols-1 md:grid-cols-9 gap-3 items-center">
                <div className="col-span-2 relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={appSearch}
                    onChange={e => setAppSearch(e.target.value)}
                    placeholder="Search candidates..."
                    className="bg-slate-50 border border-slate-200 rounded pl-9 pr-2 py-1.5 text-xs w-full focus:outline-none"
                  />
                </div>

                <select value={appJobFilter} onChange={e => setAppJobFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-semibold text-slate-605 w-full col-span-2">
                  <option value="all">Job: All</option>
                  {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>

                <select value={appScoreFilter} onChange={e => setAppScoreFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-semibold text-slate-605 w-full col-span-2">
                  <option value="all">Score: All</option>
                  <option value="90">90%+</option>
                  <option value="75">75%+</option>
                  <option value="review">Below 75%</option>
                </select>

                <select value={appSort} onChange={e => setAppSort(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1.5 text-[11px] font-semibold text-slate-605 w-full col-span-2">
                  <option>Highest Match</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>

                {/* View toggle */}
                <div className="flex bg-slate-100 rounded p-0.5 justify-end col-span-1">
                  <button 
                    onClick={() => setApplicationsViewMode('kanban')}
                    className={`flex-grow py-1 rounded text-[10px] font-bold transition-all ${applicationsViewMode === 'kanban' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-800'}`}
                  >
                    Kanban
                  </button>
                  <button 
                    onClick={() => setApplicationsViewMode('table')}
                    className={`flex-grow py-1 rounded text-[10px] font-bold transition-all ${applicationsViewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-850'}`}
                  >
                    Table
                  </button>
                </div>
              </div>

              {/* DUAL MODE CONTAINER */}
              {applicationsViewMode === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 items-start overflow-x-auto pb-4">
                  {[
                    { title: 'Applied', status: 'Applied', conv: '100%', color: 'border-t-2 border-sky-400' },
                    { title: 'Screening', status: 'Screening', conv: '38%', color: 'border-t-2 border-blue-500' },
                    { title: 'AI Reviewed', status: 'AI Reviewed', conv: '53%', color: 'border-t-2 border-purple-500' },
                    { title: 'Shortlisted', status: 'Shortlisted', conv: '37%', color: 'border-t-2 border-emerald-500' },
                    { title: 'Interview', status: 'Interview', conv: '50%', color: 'border-t-2 border-indigo-500' },
                    { title: 'Offer', status: 'Offer', conv: '33%', color: 'border-t-2 border-emerald-800' },
                    { title: 'Rejected', status: 'Rejected', conv: '0%', color: 'border-t-2 border-rose-500' }
                  ].map((column) => {
                    const colApps = filteredAppList.filter(a => a.status === column.status);
                    
                    return (
                      <div 
                        key={column.status} 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          const appId = e.dataTransfer.getData('text/plain');
                          if (appId) {
                            setDragConfirmModal({ appId, targetStage: column.status });
                          }
                        }}
                        className="bg-slate-50/50 border border-slate-200/50 rounded p-3 flex flex-col space-y-3 min-w-[185px] h-auto"
                      >
                        <div className="flex flex-col border-b border-slate-200/50 pb-2">
                          <span className="text-[10px] text-[#0A1428] font-bold uppercase tracking-wider">{column.title}</span>
                          <div className="flex justify-between items-center mt-1 text-[9px] text-slate-455 font-semibold uppercase leading-none">
                            <span>{colApps.length} candidates</span>
                            <span>{column.conv} conv</span>
                          </div>
                        </div>

                        <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[550px] pr-1">
                          {colApps.map((app) => (
                            <div 
                              key={app.id} 
                              draggable
                              onDragStart={(e) => handleDragStart(e, app.id)}
                              onClick={() => handleSelectCandidate(app.candidateId)}
                              className={`bg-white border border-slate-205 rounded p-3 shadow-xs hover:border-slate-350 hover:shadow hover:-translate-y-0.5 transition-all cursor-grab active:cursor-grabbing group h-[92px] flex flex-col justify-between ${column.color}`}
                            >
                              <div className="space-y-1">
                                <h4 className="font-bold text-[#0A1428] text-[11px] group-hover:text-sky-505">{app.candidateName}</h4>
                                <p className="text-[9px] text-slate-400 font-semibold leading-tight">{app.jobTitle}</p>
                              </div>
                              <div className="flex justify-between items-center text-[9px] font-bold text-slate-455 border-t border-slate-50 pt-2 mt-2">
                                <span className="text-sky-655">{app.matchScore}% Match</span>
                                <span>M-1</span>
                              </div>
                            </div>
                          ))}
                          {colApps.length === 0 && (
                            <div className="text-center py-12 text-[10px] text-slate-400 font-semibold italic">
                              Empty
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded border border-slate-200/80 shadow-xs overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-extrabold text-[#0A1428] uppercase tracking-wider">
                        <th className="px-6 py-3.5">Candidate</th>
                        <th className="px-6 py-3.5">Job Opening</th>
                        <th className="px-6 py-3.5 text-center">Match Score</th>
                        <th className="px-6 py-3.5 text-center">Experience</th>
                        <th className="px-6 py-3.5 text-center">Stage</th>
                        <th className="px-6 py-3.5 text-center">Applied</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAppList.map((app) => {
                        const candidateObj = candidates.find(c => c.id === app.candidateId);
                        const badge = getMatchBadgeStyle(app.matchScore);
                        const scoreText = app.matchScore >= 90 ? 'Strong' : app.matchScore >= 75 ? 'Good' : 'Review';

                        return (
                          <tr key={app.id} className="hover:bg-sky-50/10 hover:border-l-2 hover:border-sky-500 transition-all duration-150">
                            <td className="px-6 py-4.5 flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 text-[#0A1428] flex items-center justify-center font-bold">
                                {app.candidateName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <span className="font-bold text-[#0A1428] block">{app.candidateName}</span>
                                <span className="text-[10px] text-slate-450 block mt-0.5">{candidateObj?.location}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4.5 font-semibold text-slate-655">{app.jobTitle}</td>
                            <td className="px-6 py-4.5 text-center">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${badge}`}>
                                {app.matchScore}% &bull; {scoreText}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 text-center font-medium text-slate-500">
                              {candidateObj?.experience[0]?.duration.includes('Present') ? 'Senior' : 'Mid Level'}
                            </td>
                            <td className="px-6 py-4.5 text-center font-semibold text-slate-500">{app.status}</td>
                            <td className="px-6 py-4.5 text-center font-medium text-slate-455">{app.appliedDate}</td>
                            <td className="px-6 py-4.5 text-right relative">
                              <div className="inline-block text-left">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveActionMenuId(activeActionMenuId === app.id ? null : app.id);
                                  }}
                                  className="px-2.5 py-1.5 border border-sky-300 text-[#0A1428] bg-white hover:bg-sky-50 rounded text-xs font-bold transition-all shadow-xs active:scale-95"
                                >
                                  View Fit
                                </button>
                                {activeActionMenuId === app.id && (
                                  <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded shadow-lg z-50 py-1 text-left font-semibold text-slate-600">
                                    <button 
                                      onClick={() => { setActiveActionMenuId(null); handleSelectCandidate(app.candidateId); }}
                                      className="block w-full px-3 py-1.5 hover:bg-slate-50 text-[11px]"
                                    >
                                      View Fit
                                    </button>
                                    <button 
                                      onClick={() => {
                                        setActiveActionMenuId(null);
                                        setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: 'Shortlisted' } : a));
                                        showToast('Candidate shortlisted');
                                      }}
                                      className="block w-full px-3 py-1.5 hover:bg-slate-50 text-[11px]"
                                    >
                                      Shortlist
                                    </button>
                                    <button 
                                      onClick={() => { setActiveActionMenuId(null); handleSelectCandidate(app.candidateId); }}
                                      className="block w-full px-3 py-1.5 hover:bg-slate-50 text-[11px]"
                                    >
                                      View Resume
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pipeline Insights */}
              <div className="bg-slate-50/50 p-4 rounded border border-slate-200/50 grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Highest Conversion Stage</span>
                  <p className="font-extrabold text-[#0A1428] text-sm">Applied ➜ Screening (72%)</p>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Longest Waiting Stage</span>
                  <p className="font-extrabold text-[#0A1428] text-sm">Interview Schedule (3.4d)</p>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Average Application Age</span>
                  <p className="font-extrabold text-[#0A1428] text-sm">4.8 Days</p>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Average Match Score</span>
                  <p className="font-extrabold text-sky-600 text-sm">84% Match</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded text-amber-800">
                  <span className="block text-[10px] font-bold uppercase tracking-wider mb-1">Pipeline Insights</span>
                  <p className="font-extrabold text-sm">7 candidates waiting &gt;48h</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SHORTLISTS */}
          {activeTab === 'shortlists' && (
            <div className="space-y-6 animate-fade-in w-full text-xs font-semibold">
              <div>
                <h1 className="text-32px font-extrabold text-[#0A1428]">Shortlisted Candidates</h1>
                <p className="text-xs text-slate-505 mt-0.5">Evidence-driven assessments for qualifications verified by AI screening checkmarks.</p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded shadow-xs overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-extrabold text-[#0A1428] uppercase tracking-wider">
                      <th className="px-6 py-3.5">Candidate</th>
                      <th className="px-6 py-3.5">Job Opening</th>
                      <th className="px-6 py-3.5">Match Score</th>
                      <th className="px-6 py-3.5">Top Strength</th>
                      <th className="px-6 py-3.5">Main Gap</th>
                      <th className="px-6 py-3.5 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.filter(a => a.status === 'Shortlisted').map((app) => {
                      const analysis = analyses[app.candidateId];
                      return (
                        <tr key={app.id} className="hover:bg-sky-50/10 hover:border-l-2 hover:border-sky-500 transition-all duration-150">
                          <td className="px-6 py-4 flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-[#0A1428] flex items-center justify-center font-bold">
                              {app.candidateName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-bold text-[#0A1428]">{app.candidateName}</span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-705">{app.jobTitle}</td>
                          <td className="px-6 py-4 font-bold text-emerald-600">{app.matchScore}% Match</td>
                          <td className="px-6 py-4 font-medium text-slate-650 max-w-xs truncate">
                            {analysis?.matchResult.strengths[0]?.point || 'Foundational stack compliance'}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-450 max-w-xs truncate">
                            {analysis?.matchResult.gaps[0]?.point || 'None identified'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => handleSelectCandidate(app.candidateId)}
                              className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold transition-all shadow-xs"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: INTERVIEW PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="space-y-6 animate-fade-in flex flex-col h-[750px]">
              <div>
                <h1 className="text-32px font-extrabold text-[#0A1428]">Interview Pipeline</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage scheduled loops and stage conversions.</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-slate-200/80 rounded p-4 shadow-xs text-xs font-semibold text-slate-450">
                <div>
                  <span>Today's Interviews:</span>
                  <span className="block text-[20px] font-extrabold text-[#0A1428] mt-1">3</span>
                </div>
                <div>
                  <span>Upcoming:</span>
                  <span className="block text-[20px] font-extrabold text-[#0A1428] mt-1">7</span>
                </div>
                <div>
                  <span>Awaiting Feedback:</span>
                  <span className="block text-[20px] font-extrabold text-[#0A1428] mt-1">2</span>
                </div>
                <div>
                  <span>Completed:</span>
                  <span className="block text-[20px] font-extrabold text-[#0A1428] mt-1">14</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch flex-grow overflow-x-auto pb-4 text-xs font-semibold">
                {[
                  { title: 'Interview Scheduled / Today', status: 'Today' },
                  { title: 'Upcoming / This Week', status: 'Upcoming' },
                  { title: 'Completed', status: 'Completed' },
                  { title: 'Needs Feedback', status: 'Feedback' }
                ].map((col) => {
                  const colApps = col.status === 'Today' ? [
                    { candidateName: 'Sarah Jenkins', jobTitle: 'Senior Full-Stack Developer', matchScore: 94, date: 'Today', time: '2:30 PM', type: 'Technical Interview', interviewer: 'James Wilson' }
                  ] : col.status === 'Upcoming' ? [
                    { candidateName: 'David Chen', jobTitle: 'Machine Learning Engineer', matchScore: 89, date: 'Tomorrow', time: '10:00 AM', type: 'System Design', interviewer: 'Alex Thompson' }
                  ] : [];

                  return (
                    <div key={col.title} className="bg-slate-50 border border-slate-200/60 rounded p-3 flex flex-col space-y-3 min-w-[220px]">
                      <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                        <span className="text-[10px] text-[#0A1428] font-bold uppercase tracking-wider">{col.title}</span>
                        <span className="text-[10px] bg-slate-200/60 text-slate-655 px-1.5 py-0.5 rounded font-bold">{colApps.length}</span>
                      </div>

                      <div className="space-y-2.5 flex-grow overflow-y-auto max-h-[550px] pr-1">
                        {colApps.map((app, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white border border-slate-200 rounded p-3.5 space-y-3 shadow-xs hover:border-slate-355 hover:shadow hover:-translate-y-0.5 transition-all cursor-pointer"
                          >
                            <div className="space-y-1">
                              <h4 className="font-bold text-[#0A1428] text-xs">{app.candidateName}</h4>
                              <p className="text-[10px] text-slate-400 font-semibold">{app.jobTitle}</p>
                              <p className="text-[10px] text-sky-600 font-bold">{app.matchScore}% Match</p>
                            </div>
                            <div className="text-[10px] text-slate-650 leading-relaxed font-sans font-medium space-y-1 pt-2 border-t border-slate-100">
                              <div>Schedule: <strong>{app.date}, {app.time}</strong></div>
                              <div>Type: <strong>{app.type}</strong></div>
                              <div>Interviewer: <strong>{app.interviewer}</strong></div>
                            </div>
                            <div className="flex space-x-2 pt-2">
                              <button 
                                onClick={() => setActiveTab('candidates')}
                                className="flex-grow py-1 border border-sky-300 text-[#0A1428] hover:bg-sky-50 active:scale-95 text-[10px] font-bold rounded shadow-xs transition-all"
                              >
                                View Candidate
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 8: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in w-full text-xs font-semibold">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <h1 className="text-32px font-extrabold text-[#0A1428]">Recruitment Analytics</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Understand candidate quality, hiring velocity and recruitment performance.</p>
                </div>
                <div className="flex space-x-2">
                  <select 
                    value={analyticsDateRange} 
                    onChange={e => setAnalyticsDateRange(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-707"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This year</option>
                  </select>
                  <button onClick={() => alert('Downloading PDF analytics report.')} className="px-4 py-2 bg-slate-900 hover:bg-slate-850 active:scale-98 text-white text-xs font-bold rounded shadow-xs transition-all">
                    Export Report
                  </button>
                </div>
              </div>

              {/* ROW 1: 6 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Total Applications', value: '248', desc: 'Active candidate submissions', border: 'border-sky-200' },
                  { label: 'Avg Match Score', value: '84%', desc: 'Overall matching quotient', border: 'border-blue-200' },
                  { label: 'Shortlist Rate', value: '14.5%', desc: 'Shortlisted ratio', border: 'border-emerald-200' },
                  { label: 'Interview Rate', value: '7.2%', desc: 'Callbacks conversion', border: 'border-indigo-200' },
                  { label: 'Avg Time to Shortlist', value: '2.8 days', desc: 'Average velocity index', border: 'border-amber-200' },
                  { label: 'Offer Rate', value: '2.4%', desc: 'Hired offer signatures', border: 'border-rose-200' }
                ].map((kpi, idx) => (
                  <div key={idx} className={`bg-white p-4.5 rounded border border-slate-200/80 shadow-xs border-l-4 ${kpi.border} space-y-1`}>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">{kpi.label}</span>
                    <div className="text-[20px] font-extrabold text-[#0A1428]">{kpi.value}</div>
                    <span className="block text-[9px] text-slate-455 font-semibold">{kpi.desc}</span>
                  </div>
                ))}
              </div>

              {/* Volume line and stage conversion */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-slate-200/80 p-6 rounded shadow-xs space-y-4">
                  <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-105 pb-2">Candidate Volume Over Time</h3>
                  <div className="h-48 border-b border-l border-slate-105 flex items-end justify-between relative pt-6 px-4">
                    {[22, 35, 48, 40, 58, 85].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center w-1/6 space-y-2">
                        <div className="flex space-x-1 items-end w-10 justify-center">
                          <div className="bg-sky-400 w-2.5 rounded-t-sm" style={{ height: `${val * 1.5}px` }}></div>
                          <div className="bg-blue-600 w-2.5 rounded-t-sm" style={{ height: `${val * 1.0}px` }}></div>
                          <div className="bg-emerald-500 w-2.5 rounded-t-sm" style={{ height: `${val * 0.4}px` }}></div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold">M-{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 text-[9px] font-bold text-slate-450 uppercase tracking-wider">
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-sky-400 rounded-sm mr-1.5 block"></span>Applied</span>
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-blue-600 rounded-sm mr-1.5 block"></span>Screened</span>
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5 block"></span>Shortlisted</span>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-slate-200/80 p-6 rounded shadow-xs space-y-4 flex flex-col justify-between">
                  <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-105 pb-2">Hiring Stage Conversion</h3>
                  <div className="space-y-3.5 text-xs font-semibold text-slate-500">
                    {[
                      { stage: 'Application ➜ Screening', pct: 72 },
                      { stage: 'Screening ➜ AI Reviewed', pct: 53 },
                      { stage: 'AI Reviewed ➜ Shortlist', pct: 37 },
                      { stage: 'Shortlist ➜ Interview', pct: 50 },
                      { stage: 'Interview ➜ Offer', pct: 33 }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-[#0A1428] font-bold">{row.stage}</span>
                          <span className="font-extrabold text-slate-800">{row.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="bg-sky-400 h-full rounded-full" style={{ width: `${row.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS (Two-column stacked card layout) */}
          {activeTab === 'settings' && (
            <div className="flex gap-6 items-start animate-fade-in w-full text-xs font-semibold">
              {/* Settings Nav Left Column */}
              <div className="w-1/4 bg-white border border-slate-200/80 rounded shadow-xs p-4.5 space-y-4">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block font-semibold leading-none">Settings Configuration</span>
                <nav className="space-y-1 font-bold">
                  {[
                    { id: 'company', label: 'Company Information' },
                    { id: 'recruitment', label: 'Recruitment Settings' },
                    { id: 'ai', label: 'AI Screening' },
                    { id: 'notifications', label: 'Notification Center' },
                    { id: 'security', label: 'Security & 2FA' },
                    { id: 'privacy', label: 'Privacy & Retention' }
                  ].map(sec => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSettingsSection(sec.id as any)}
                      className={`w-full text-left px-3 py-2.5 rounded text-xs font-bold transition-colors ${
                        activeSettingsSection === sec.id ? 'bg-sky-50/50 text-[#0A1428] font-bold border-l-4 border-sky-500 pl-2' : 'text-slate-500 hover:text-slate-805 pl-3'
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Right Settings Pane Details */}
              <div className="w-3/4 space-y-6">
                {settingsSaved && (
                  <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-4 py-3 rounded flex items-center space-x-2 text-xs font-bold animate-fade-in mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span>Configuration settings saved successfully!</span>
                  </div>
                )}

                {/* COMPANY INFORMATION CARD */}
                {activeSettingsSection === 'company' && (
                  <div className="bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-5 text-xs font-semibold text-slate-600">
                    <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Company Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Company Name</label>
                        <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Website URL</label>
                        <input type="text" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Industry</label>
                        <input type="text" value={companyIndustry} onChange={e => setCompanyIndustry(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Location</label>
                        <input type="text" value={companyLocation} onChange={e => setCompanyLocation(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Company Size</label>
                        <select value={companySize} onChange={e => setCompanySize(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold">
                          <option>50 - 200 Employees</option>
                          <option>200+ Employees</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Company Type</label>
                        <input type="text" value={companyType} onChange={e => setCompanyType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Company Description</label>
                        <textarea value={companyDescription} onChange={e => setCompanyDescription(e.target.value)} rows={2} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-slate-750 font-medium resize-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Recruitment Team Size</label>
                        <input type="number" value={recruitmentTeamSize} onChange={e => setRecruitmentTeamSize(parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Default Hiring Regions</label>
                        <input type="text" value={defaultHiringRegion} onChange={e => setDefaultHiringRegion(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-slate-105">
                      <button type="button" onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); }} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded font-bold transition-all shadow-xs">Save Changes</button>
                      <button type="button" onClick={() => setCompanyName(recruiter.company)} className="px-4 py-2 border border-slate-250 text-slate-505 rounded font-bold">Reset</button>
                    </div>
                  </div>
                )}

                {/* RECRUITMENT SETTINGS CARD */}
                {activeSettingsSection === 'recruitment' && (
                  <div className="bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-5 text-xs font-semibold text-slate-655">
                    <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Recruitment Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Candidate Match Threshold</label>
                        <div className="flex items-center space-x-4">
                          <input type="range" min="0" max="100" value={matchScoreThreshold} onChange={e => setMatchScoreThreshold(parseInt(e.target.value))} className="w-64 accent-sky-500" />
                          <span className="font-extrabold text-[#0A1428] text-sm">{matchScoreThreshold}%</span>
                        </div>
                        <span className="block text-[10px] text-slate-400 font-semibold mt-1">Candidates below this score are marked for manual review.</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-50">
                        <div className="space-y-1">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Auto-Shortlist Threshold</label>
                          <input type="number" min="50" max="100" value={autoShortlistThreshold} onChange={e => setAutoShortlistThreshold(parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Resume Parsing Confidence Limit</label>
                          <input type="number" min="50" max="100" value={parsingConfidence} onChange={e => setParsingConfidence(parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold" />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Default Interview Duration</label>
                          <select value={defaultInterviewDuration} onChange={e => setDefaultInterviewDuration(parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold">
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-50">
                        <div className="space-y-1">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Default Application Stage</label>
                          <select value={defaultStages} onChange={e => setDefaultStages(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold">
                            <option value="Applied">Applied</option>
                            <option value="Screening">Screening</option>
                            <option value="Shortlisted">Shortlisted</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Default Job Type</label>
                          <select value={defaultJobType} onChange={e => setDefaultJobType(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2 text-[#0A1428] font-bold">
                            <option>Full-time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-50">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={duplicateDetection} onChange={e => setDuplicateDetection(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">Duplicate candidate detection</span>
                          </div>
                        </label>
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={autoStageAssignment} onChange={e => setAutoStageAssignment(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">Automatic stage assignment</span>
                          </div>
                        </label>
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={candidateRanking} onChange={e => setCandidateRanking(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">Candidate ranking</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); }} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded font-bold transition-all shadow-xs">Save</button>
                    </div>
                  </div>
                )}

                {/* AI SCREENING CARD */}
                {activeSettingsSection === 'ai' && (
                  <div className="bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-5 text-xs font-semibold text-slate-650">
                    <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">
                      Evidence Policy — Every AI claim must be supported by resume text
                    </h3>

                    <div className="space-y-4">
                      {/* visual: Evidence Integrity */}
                      <div className="p-4 bg-emerald-50 border border-emerald-250 text-emerald-805 rounded-lg flex items-center justify-between font-bold">
                        <span>Evidence Integrity</span>
                        <span className="text-[10px] uppercase bg-emerald-600 text-white rounded px-2 py-0.5 tracking-wider">100% Evidence Required</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={evidenceRequired} onChange={e => setEvidenceRequired(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">Exact evidence required</span>
                          </div>
                        </label>

                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={semanticMatching} onChange={e => setSemanticMatching(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">Semantic matching</span>
                          </div>
                        </label>

                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={keywordMatching} onChange={e => setKeywordMatching(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">Keyword-only matching</span>
                          </div>
                        </label>

                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input type="checkbox" checked={aiExplanation} onChange={e => setAiExplanation(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <div>
                            <span className="block text-[#0A1428] font-bold">AI explanation</span>
                          </div>
                        </label>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-50">
                        <div className="space-y-1.5">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Evidence Confidence Limit</label>
                          <div className="flex items-center space-x-4">
                            <input type="range" min="50" max="95" value={evidenceConfidence} onChange={e => setEvidenceConfidence(parseInt(e.target.value))} className="w-48 accent-sky-500" />
                            <span className="font-extrabold text-[#0A1428] text-xs">{evidenceConfidence}%</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Evidence Verification Mode</label>
                          <select value={evidenceVerificationMode} onChange={e => setEvidenceVerificationMode(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded p-2.5 text-[#0A1428] font-bold">
                            <option>Strict</option>
                            <option>Balanced</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-50 text-[10px] font-semibold text-slate-450 leading-relaxed font-sans">
                        <div className="bg-slate-50 p-3 rounded">
                          <span className="font-bold text-[#0A1428] block mb-1">Uncertain Claims Policy</span>
                          <span>Uncertain claims are automatically marked as "Needs Review" to trigger recruiter audit checks.</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded">
                          <span className="font-bold text-[#0A1428] block mb-1">Unsupported Claims Policy</span>
                          <span>Unsupported claims without resume quote proof segments are automatically marked as "Not Found".</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); }} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded font-bold transition-all shadow-xs">Save</button>
                    </div>
                  </div>
                )}

                {/* NOTIFICATION CENTER CARD */}
                {activeSettingsSection === 'notifications' && (
                  <div className="bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-5 text-xs font-semibold text-slate-650">
                    <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Notification Center</h3>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 text-[10px] font-extrabold text-[#0A1428] uppercase tracking-wider pb-2 border-b border-slate-50">
                        <span>Event Type</span>
                        <span className="text-center">In-App</span>
                        <span className="text-center">Email</span>
                      </div>

                      {[
                        { key: 'newApp', label: 'New Application' },
                        { key: 'analysis', label: 'Resume Analysis Completed' },
                        { key: 'highMatch', label: 'High Match Candidate' },
                        { key: 'shortlisted', label: 'Candidate Shortlisted' },
                        { key: 'scheduled', label: 'Interview Scheduled' },
                        { key: 'feedback', label: 'Interview Feedback Pending' },
                        { key: 'offerPending', label: 'Offer Pending' },
                        { key: 'deadline', label: 'Job Deadline' }
                      ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-3 items-center py-2.5 border-b border-slate-50 last:border-b-0">
                          <span className="text-slate-805 font-bold">{row.label}</span>
                          <div className="flex justify-center">
                            <input 
                              type="checkbox" 
                              checked={notifMatrix[row.key as keyof typeof notifMatrix].inApp} 
                              onChange={e => setNotifMatrix(prev => ({
                                ...prev,
                                [row.key]: { ...prev[row.key as keyof typeof notifMatrix], inApp: e.target.checked }
                              }))}
                              className="rounded text-sky-500 border-slate-350" 
                            />
                          </div>
                          <div className="flex justify-center">
                            <input 
                              type="checkbox" 
                              checked={notifMatrix[row.key as keyof typeof notifMatrix].email} 
                              onChange={e => setNotifMatrix(prev => ({
                                ...prev,
                                [row.key]: { ...prev[row.key as keyof typeof notifMatrix], email: e.target.checked }
                              }))}
                              className="rounded text-sky-500 border-slate-350" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); }} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded font-bold transition-all shadow-xs">Save</button>
                    </div>
                  </div>
                )}

                {/* SECURITY & 2FA CARD */}
                {activeSettingsSection === 'security' && (
                  <div className="bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-5 text-xs font-semibold text-slate-655">
                    <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Security & 2FA</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded">
                        <div className="space-y-1">
                          <span className="block text-[#0A1428] font-bold">Two-Factor Authentication (2FA)</span>
                          <span className="block text-[10px] text-slate-400 font-semibold">Active security token requirements.</span>
                        </div>
                        <button 
                          onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                          className="text-slate-400 hover:text-slate-605"
                        >
                          {twoFactorAuth ? <ToggleRight className="w-10 h-10 text-sky-500" /> : <ToggleLeft className="w-10 h-10" />}
                        </button>
                      </div>

                      <div className="space-y-2 text-xs text-slate-500 leading-normal font-semibold">
                        <div className="flex justify-between">
                          <span>Active Sessions:</span>
                          <span className="font-extrabold text-[#0A1428]">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Login:</span>
                          <span className="font-extrabold text-[#0A1428]">Today &bull; 6:42 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Password Status:</span>
                          <span className="font-extrabold text-[#0A1428]">Last changed 21 days ago</span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-55 max-w-xs">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Change Password</label>
                        <input type="password" placeholder="Current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2" />
                        <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 mt-2" />
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-slate-100 justify-end">
                      <button type="button" onClick={() => alert('Reviewing active sessions')} className="px-4 py-2 border border-sky-300 text-slate-909 bg-white hover:bg-slate-50 rounded font-bold shadow-xs active:scale-95 transition-all">Review Sessions</button>
                      <button type="button" onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); }} className="px-4 py-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white rounded font-bold transition-all shadow-xs">Change Password</button>
                    </div>
                  </div>
                )}

                {/* PRIVACY & RETENTION CARD */}
                {activeSettingsSection === 'privacy' && (
                  <div className="bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-5 text-xs font-semibold text-slate-650">
                    <h3 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Privacy & Retention</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Resume Retention Period</label>
                        <select value={resumeRetention} onChange={e => setResumeRetention(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold">
                          <option value="30 days">30 days</option>
                          <option value="90 days">90 days</option>
                          <option value="365 days">365 days (1 Year)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-slate-400 uppercase text-[9px] tracking-wider">Candidate Data Retention</label>
                        <select value={candDataRetention} onChange={e => setCandDataRetention(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-[#0A1428] font-bold">
                          <option value="30 days">30 days</option>
                          <option value="90 days">90 days</option>
                          <option value="365 days">365 days</option>
                        </select>
                      </div>
                      <div className="pt-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" checked={autoDeleteRejected} onChange={e => setAutoDeleteRejected(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-350" />
                          <span className="block text-[#0A1428] font-bold">Auto-delete rejected candidates</span>
                        </label>
                      </div>
                      <div className="pt-2 col-span-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input type="checkbox" checked={allowExport} onChange={e => setAllowExport(e.target.checked)} className="w-4 h-4 text-sky-500 rounded border-slate-355" />
                          <span className="block text-[#0A1428] font-bold">Allow candidate data export</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t border-slate-100 justify-end">
                      <button type="button" onClick={() => alert('Exporting data')} className="px-4 py-2 border border-sky-300 text-slate-900 bg-white hover:bg-slate-50 rounded font-bold shadow-xs active:scale-95 transition-all">Export Candidate Data</button>
                      <button type="button" onClick={() => alert('Deleting data')} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-rose-700 active:scale-95 rounded font-bold transition-all border border-red-200">Delete Selected Candidate Data</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: ACTIVITY TIMELINE */}
          {activeTab === 'activity' && (
            <div className="space-y-6 animate-fade-in w-full text-xs font-semibold">
              <div>
                <h1 className="text-[32px] font-extrabold text-[#0A1428]">Recruitment Activity & Operations</h1>
                <p className="text-[14px] text-slate-500 mt-0.5">Monitor hiring events, recruiter actions, candidate movement and system analysis activity.</p>
              </div>

              {/* TOP KPI ROW (6 compact cards) */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Total Activities', value: '184', trend: '+12%', desc: 'Hiring actions logged', border: 'border-l-4 border-sky-500' },
                  { label: 'Today', value: '24', trend: '+18%', desc: 'Events today', border: 'border-l-4 border-blue-500' },
                  { label: 'Candidate Events', value: '91', trend: '+5%', desc: 'Profiles created/edited', border: 'border-l-4 border-emerald-500' },
                  { label: 'Job Events', value: '28', trend: 'Steady', desc: 'Job pipeline updates', border: 'border-l-4 border-indigo-550' },
                  { label: 'Interview Events', value: '31', trend: '+20%', desc: 'Loops Scheduled', border: 'border-l-4 border-purple-500' },
                  { label: 'AI Analysis Events', value: '34', trend: '+8%', desc: 'Resume screenings', border: 'border-l-4 border-rose-500' }
                ].map((kpi, idx) => (
                  <div key={idx} className={`bg-white p-3.5 rounded border border-slate-200/80 shadow-xs ${kpi.border} flex flex-col justify-between h-[110px]`}>
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">{kpi.label}</span>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-[20px] font-extrabold text-[#0A1428] leading-none">{kpi.value}</span>
                      <span className="text-[9px] text-emerald-600 font-bold">{kpi.trend}</span>
                    </div>
                    <span className="block text-[9px] text-slate-405 font-medium leading-none">{kpi.desc}</span>
                  </div>
                ))}
              </div>

              {/* Volume & Distribution split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Activity Volume Area Chart */}
                <div className="lg:col-span-8 bg-white border border-slate-200/80 p-5 rounded shadow-xs flex flex-col justify-between h-[310px]">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                    <h3 className="text-[14px] font-bold text-[#0A1428]">Activity Volume</h3>
                    <div className="flex space-x-1 text-[9px] font-bold">
                      <button className="px-2 py-0.5 bg-slate-100 rounded">7 Days</button>
                      <button className="px-2 py-0.5 hover:bg-slate-50 rounded">30 Days</button>
                      <button className="px-2 py-0.5 hover:bg-slate-50 rounded">90 Days</button>
                    </div>
                  </div>
                  
                  {/* Visual SVG chart lines */}
                  <div className="h-40 border-b border-l border-slate-100 flex items-end justify-between relative pt-6 px-4">
                    {[
                      { label: 'Mon', cand: 12, app: 5, int: 2, ai: 8 },
                      { label: 'Tue', cand: 24, app: 12, int: 6, ai: 18 },
                      { label: 'Wed', cand: 42, app: 28, int: 12, ai: 30 },
                      { label: 'Thu', cand: 35, app: 20, int: 18, ai: 24 },
                      { label: 'Fri', cand: 48, app: 30, int: 24, ai: 32 },
                      { label: 'Sat', cand: 15, app: 8, int: 4, ai: 10 },
                      { label: 'Sun', cand: 8, app: 4, int: 2, ai: 5 }
                    ].map((row, idx) => (
                      <div key={idx} className="flex flex-col items-center w-[12%] space-y-2">
                        <div className="flex space-x-1 items-end w-12 justify-center">
                          <div className="bg-sky-400 w-1.5 rounded-t-sm" style={{ height: `${row.cand * 2.5}px` }} title="Candidates"></div>
                          <div className="bg-blue-600 w-1.5 rounded-t-sm" style={{ height: `${row.app * 2.5}px` }} title="Applications"></div>
                          <div className="bg-emerald-500 w-1.5 rounded-t-sm" style={{ height: `${row.int * 2.5}px` }} title="Interviews"></div>
                          <div className="bg-purple-500 w-1.5 rounded-t-sm" style={{ height: `${row.ai * 2.5}px` }} title="AI Analysis"></div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold">{row.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center space-x-4 text-[9px] font-bold text-slate-450 uppercase tracking-wider">
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-sky-400 rounded-sm mr-1.5 block"></span>Candidate Activity</span>
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-blue-600 rounded-sm mr-1.5 block"></span>Applications</span>
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5 block"></span>Interviews</span>
                    <span className="flex items-center"><span className="w-2.5 h-2.5 bg-purple-500 rounded-sm mr-1.5 block"></span>AI Analysis</span>
                  </div>
                </div>

                {/* Donut distribution */}
                <div className="lg:col-span-4 bg-white border border-slate-200/80 p-5 rounded shadow-xs flex flex-col justify-between h-[310px]">
                  <h3 className="text-[14px] font-bold text-[#0A1428] border-b border-slate-100 pb-1.5">Activity Distribution</h3>
                  
                  <div className="space-y-3.5">
                    {[
                      { label: 'Candidate Events', pct: 49, count: 91, color: 'bg-sky-400' },
                      { label: 'Applications', pct: 18, count: 33, color: 'bg-blue-600' },
                      { label: 'Interviews', pct: 17, count: 31, color: 'bg-emerald-500' },
                      { label: 'AI Analysis', pct: 11, count: 20, color: 'bg-purple-500' },
                      { label: 'Jobs', pct: 5, count: 9, color: 'bg-amber-500' }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-[#0A1428]">{row.label}</span>
                          <span>{row.pct}% ({row.count})</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full">
                          <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline list & operational insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded p-6 shadow-xs space-y-6">
                  <div className="flex flex-wrap gap-4 items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-450 uppercase tracking-wide">
                    <div className="flex space-x-2">
                      {['All', 'Candidates', 'Applications', 'Jobs', 'Interviews', 'AI Analysis'].map((cat, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setActivityCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded transition-colors ${
                            activityCategoryFilter === cat ? 'bg-sky-50 text-sky-600 font-bold' : 'hover:text-slate-805 hover:bg-slate-50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={activitySearchQuery}
                        onChange={e => setActivitySearchQuery(e.target.value)}
                        placeholder="Search logs..."
                        className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 w-32 focus:outline-none text-[11px]"
                      />
                      <select value={activityDateFilter} onChange={e => setActivityDateFilter(e.target.value)} className="bg-white border border-slate-200 rounded px-2 py-1 text-[11px]">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>This Week</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative border-l border-slate-150 ml-4 pl-6 space-y-5 text-xs leading-normal">
                    {activities.filter(act => {
                      if (activityCategoryFilter !== 'All') {
                        if (activityCategoryFilter === 'Candidates' && act.category !== 'stage_change' && act.category !== 'upload') return false;
                        if (activityCategoryFilter === 'Jobs' && act.category !== 'job_created') return false;
                        if (activityCategoryFilter === 'Applications' && act.category !== 'stage_change') return false;
                      }
                      if (activitySearchQuery && !act.text.toLowerCase().includes(activitySearchQuery.toLowerCase())) return false;
                      return true;
                    }).map((act) => (
                      <div key={act.id} className="relative">
                        <span className="absolute -left-10 top-0.5 w-8 h-8 rounded-full border-4 border-white bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">&bull;</span>
                        <div className="bg-slate-50/50 p-4 border border-slate-105 rounded flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-3 text-[10px] font-bold">
                              <span className="text-[#0A1428] uppercase bg-sky-50 border border-sky-100 text-sky-700 px-2 py-0.5 rounded">{act.category}</span>
                              <span className="text-slate-400">{act.timestamp}</span>
                            </div>
                            <p className="font-bold text-[#0A1428] text-xs">{act.text}</p>
                            <p className="text-[10px] text-slate-500 font-semibold leading-relaxed font-sans">
                              Sarah Jenkins | Senior Full-Stack Developer | Match Score: 94% | Evidence: 4/4 core requirements verified
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedCandidateId('sarah-jenkins');
                              setActiveTab('candidate-detail');
                            }}
                            className="px-2.5 py-1 border border-sky-300 text-sky-600 hover:bg-sky-50 rounded text-[10px] font-bold transition-all shadow-xs"
                          >
                            View Analysis
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operational Insights Column */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-5 rounded border border-slate-200/80 shadow-xs space-y-4">
                    <h4 className="text-[18px] font-bold text-[#0A1428] border-b border-slate-100 pb-2">Operational Insights</h4>
                    <ul className="space-y-3 leading-relaxed text-xs font-semibold text-slate-550">
                      <li className="flex items-start space-x-2">
                        <span className="text-sky-505 font-bold mt-0.5">&bull;</span>
                        <span>Candidate activity increased 18% this week.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                        <span>3 candidates in Screening stage for more than 48 hours.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-sky-505 font-bold mt-0.5">&bull;</span>
                        <span>Interview loops activity is highest for Engineering department roles.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-250 p-5 rounded shadow-xs space-y-2 text-xs font-semibold text-amber-805">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-amber-705">Attention Required</span>
                    <p className="leading-relaxed">
                      2 candidates have been waiting for review for more than 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: CANDIDATE DETAIL AUDIT */}
          {activeTab === 'candidate-detail' && (() => {
            const candidateObj = candidates.find(c => c.id === selectedCandidateId) || candidates[0];
            const analysisObj = analyses[selectedCandidateId || 'sarah-jenkins'] || analyses['sarah-jenkins'];
            
            return (
              <div className="space-y-6 animate-fade-in relative text-xs font-semibold">
                
                {/* Detail navigation header */}
                <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="flex items-center space-x-1.5 text-xs font-semibold text-slate-450 hover:text-slate-700"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    <span>Back to Overview</span>
                  </button>
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-405 uppercase tracking-wide">
                    <ShieldCheck className="w-4.5 h-4.5 text-sky-500" />
                    <span>Fact-Checked Audit Report</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left content (8 cols) */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded border border-slate-200/80 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xs">
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold text-[#0A1428] tracking-tight">{candidateObj.name}</h2>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">Position Screened: <strong className="text-slate-600">{analysisObj.jobTitle}</strong></p>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-slate-500">
                          <span className="flex items-center"><Mail className="w-3.5 h-3.5 text-slate-400 mr-1" />{candidateObj.email}</span>
                          <span className="flex items-center"><Phone className="w-3.5 h-3.5 text-slate-400 mr-1" />{candidateObj.phone}</span>
                          <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />{candidateObj.location}</span>
                        </div>
                      </div>
                      
                      {/* Redesigned Candidate Fit display */}
                      <div className="bg-slate-50/50 border border-slate-100 p-4 rounded min-w-[200px] space-y-3">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">CANDIDATE FIT</span>
                        <div className="flex items-baseline space-x-2">
                          <span className={`text-[28px] font-extrabold ${getFitMeterTextColor(analysisObj.matchResult.overallScore)}`}>
                            {analysisObj.matchResult.overallScore}%
                          </span>
                          <span className="text-[10px] font-bold text-slate-505">{analysisObj.matchResult.status}</span>
                        </div>
                        
                        {/* Horizontal meter */}
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getFitMeterColor(analysisObj.matchResult.overallScore)}`}
                            style={{ width: `${analysisObj.matchResult.overallScore}%` }}
                          ></div>
                        </div>

                        <div className="space-y-1.5 text-[10px] font-semibold text-slate-650 pt-2 border-t border-slate-100">
                          <div className="flex justify-between">
                            <span>Technical Match</span>
                            <span className="font-bold text-[#0A1428]">{analysisObj.matchResult.breakdown.technical}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Experience Match</span>
                            <span className="font-bold text-[#0A1428]">{analysisObj.matchResult.breakdown.experience}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Education Match</span>
                            <span className="font-bold text-[#0A1428]">{analysisObj.matchResult.breakdown.education}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Projects Match</span>
                            <span className="font-bold text-[#0A1428]">{analysisObj.matchResult.breakdown.projects}%</span>
                          </div>
                        </div>

                        <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100">
                          4 of 4 core requirements matched
                        </span>
                      </div>
                    </div>

                    {/* Evaluation AI */}
                    <div className="bg-white rounded border border-slate-200/80 p-6 space-y-4 shadow-xs">
                      <div>
                        <h4 className="font-bold text-[#0A1428] text-xs uppercase tracking-wider">AI Evaluation Statement</h4>
                        <div className="bg-slate-50 border border-slate-100 rounded p-4 text-xs text-slate-600 leading-relaxed font-sans mt-2.5">
                          {analysisObj.matchResult.aiExplanation}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-slate-100">
                        <div className="space-y-3">
                          <h5 className="font-bold text-slate-707 text-xs uppercase tracking-wider flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span>Strengths (Verified)</span>
                          </h5>
                          <div className="space-y-2">
                            {analysisObj.matchResult.strengths.map((str, idx) => (
                              <div 
                                key={idx} 
                                onClick={() => handleOpenEvidenceDrawer(str.evidenceId)}
                                className="p-3 bg-slate-50/50 border border-slate-100 rounded text-xs hover:border-sky-300 transition-colors cursor-pointer group space-y-1.5"
                              >
                                <p className="text-slate-700 leading-relaxed font-medium">{str.point}</p>
                                <div className="flex justify-between items-center text-[9px] font-bold text-sky-500 uppercase tracking-wide pt-1 border-t border-slate-200/30">
                                  <span>Inspect Evidence</span>
                                  <ChevronRight className="w-3 h-3" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h5 className="font-bold text-slate-707 text-xs uppercase tracking-wider flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <span>Identified Gaps</span>
                          </h5>
                          <div className="space-y-2">
                            {analysisObj.matchResult.gaps.length > 0 ? (
                              analysisObj.matchResult.gaps.map((gap, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded text-xs space-y-1">
                                  <span className="font-bold text-slate-805 block">{gap.point}</span>
                                  <p className="text-slate-505 leading-normal font-semibold">{gap.description}</p>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 bg-slate-50 border border-slate-100 rounded text-xs text-center text-slate-400 font-semibold">
                                No gaps identified.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requirements Matrix */}
                    <div className="bg-white rounded border border-slate-200/80 overflow-hidden shadow-xs">
                      <div className="px-6 py-4 border-b border-slate-100">
                        <h4 className="font-bold text-[#0A1428] text-xs uppercase tracking-wider">Job Requirements Matrix</h4>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-55 border-b border-slate-150 text-[10px] font-extrabold text-[#0A1428] uppercase tracking-wider">
                              <th className="px-6 py-3">Requirement</th>
                              <th className="px-6 py-3 w-28">Category</th>
                              <th className="px-6 py-3 w-32">Status</th>
                              <th className="px-6 py-3 text-right w-36">Evidence</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150 text-xs leading-normal">
                            {analysisObj.requirements.map((req) => (
                              <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-3.5">
                                  <div className="font-bold text-slate-805">{req.requirement}</div>
                                  <p className="text-[10px] text-slate-400 font-semibold mt-1">{req.explanation}</p>
                                </td>
                                <td className="px-6 py-3.5 capitalize font-bold text-slate-400 text-[10px] tracking-wide">{req.category}</td>
                                <td className="px-6 py-3.5">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold border ${
                                    req.status === 'strong_match' ? 'bg-emerald-55 border-emerald-250 text-emerald-805 border' :
                                    req.status === 'match' ? 'bg-blue-55 border-sky-200 text-sky-805 border' :
                                    req.status === 'not_met' ? 'bg-rose-55 border-rose-250 text-rose-805 border' : 'bg-slate-50 text-slate-655 border-slate-150'
                                  }`}>
                                    {req.status === 'strong_match' ? 'Strong Match' : req.status === 'match' ? 'Matches' : req.status === 'not_met' ? 'Not Met' : 'Not Found'}
                                  </span>
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                  {req.evidenceId ? (
                                    <div className="flex space-x-2 justify-end">
                                      <button 
                                        onClick={() => handleOpenEvidenceDrawer(req.evidenceId!)}
                                        className="px-2 py-1 bg-white border border-sky-300 text-sky-600 hover:bg-sky-50 active:scale-95 rounded font-bold uppercase tracking-wide text-[9px] shadow-xs transition-all"
                                      >
                                        Trace
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Omitted</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Right preview (4 cols) */}
                  <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded overflow-hidden shadow-xs flex flex-col h-[640px] lg:sticky lg:top-24 select-text">
                    <div className="px-4 py-3.5 bg-slate-50 border-b border-slate-150 flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="truncate max-w-[150px]">{candidateObj.name.replace(' ', '_')}_Resume.pdf</span>
                      </div>
                    </div>

                    <div className="flex-grow p-6 overflow-y-auto bg-slate-50/20">
                      <div className="bg-white border border-slate-200 shadow-inner rounded p-5 select-text">
                        {activeEvidenceId ? (() => {
                          const ev = analysisObj.evidence.find(item => item.id === activeEvidenceId);
                          const text = candidateObj.resumeText;
                          if (!ev || ev.quote === 'Not Mentioned') {
                            return <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-slate-550 font-sans">{text}</pre>;
                          }
                          const idx = text.toLowerCase().indexOf(ev.quote.toLowerCase());
                          if (idx === -1) {
                            return <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-slate-550 font-sans">{text}</pre>;
                          }
                          const before = text.substring(0, idx);
                          const match = text.substring(idx, idx + ev.quote.length);
                          const after = text.substring(idx + ev.quote.length);
                          return (
                            <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-slate-550 font-sans">
                              {before}
                              <mark data-highlight="true" className="bg-yellow-100 border-l-2 border-yellow-500 text-slate-900 rounded px-0.5 py-0.2 animate-pulse font-semibold">
                                {match}
                              </mark>
                              {after}
                            </pre>
                          );
                        })() : (
                          <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-slate-550 font-sans">{candidateObj.resumeText}</pre>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Evidence Slide-Over Drawer Side Panel */}
                {isEvidenceDrawerOpen && drawerEvidence && (() => {
                  const verifiedStatus = drawerEvidence.quote === 'Not Mentioned' ? 'Unsupported' : 'Verified';
                  
                  return (
                    <div className="fixed top-16 right-0 w-[30%] min-w-[340px] h-[calc(100vh-64px)] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col font-sans select-text animate-slide-in">
                      {/* Header */}
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-[10px] text-slate-405 font-bold uppercase tracking-wider">Evidence Information</span>
                        <button 
                          onClick={() => setIsEvidenceDrawerOpen(false)} 
                          className="text-xs font-bold text-slate-500 hover:text-slate-800"
                        >
                          Close
                        </button>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-grow overflow-y-auto p-4 space-y-4 text-xs font-semibold text-slate-655">
                        <div className="space-y-1">
                          <span className="text-slate-400 uppercase tracking-wider text-[9px] font-bold block">Claim</span>
                          <p className="font-extrabold text-[#0A1428] text-sm">"{drawerEvidence.claim}"</p>
                        </div>

                        <div className="space-y-3 p-4 bg-slate-50 border border-slate-100 rounded-lg">
                          <div>
                            <span className="text-slate-400 uppercase tracking-wider text-[8px] font-bold block">Verification Status</span>
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border mt-1 ${
                              verifiedStatus === 'Verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
                            }`}>{verifiedStatus}</span>
                          </div>

                          <div>
                            <span className="text-slate-400 uppercase tracking-wider text-[8px] font-bold block">Source Document</span>
                            <span className="font-semibold text-slate-700 flex items-center mt-1">
                              <FileText className="w-4 h-4 mr-1 text-slate-400" />
                              <span>Resume.pdf (Page {drawerEvidence.page || 1}, Section {drawerEvidence.section})</span>
                            </span>
                          </div>

                          <div>
                            <span className="text-slate-400 uppercase tracking-wider text-[8px] font-bold block">Exact Evidence Quote</span>
                            <div className="font-mono text-[10px] text-slate-800 bg-white border border-slate-100 rounded p-2.5 leading-relaxed mt-1 whitespace-pre-wrap select-text">
                              "{drawerEvidence.quote}"
                            </div>
                          </div>

                          <div>
                            <span className="text-slate-400 uppercase tracking-wider text-[8px] font-bold block">Why this supports the claim</span>
                            <p className="text-[10px] text-slate-600 font-medium leading-relaxed font-sans mt-1">
                              The matching document segments confirm full technical stack qualification alignment.
                            </p>
                          </div>

                          <div>
                            <span className="text-slate-400 uppercase tracking-wider text-[8px] font-bold block">Evidence Confidence</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="w-24 bg-slate-200 rounded-full h-1.5">
                                <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                              </div>
                              <span className="text-[10px] font-extrabold text-[#0A1428]">90%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sticky Footer */}
                      <div className="p-4 bg-slate-50 border-t border-slate-200 flex space-x-2 sticky bottom-0 z-10">
                        <button 
                          onClick={() => setIsEvidenceDrawerOpen(false)}
                          className="flex-grow py-2 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white rounded text-xs font-bold shadow-xs transition-all"
                        >
                          View in Resume
                        </button>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(drawerEvidence.quote);
                            alert('Evidence quote copied to clipboard!');
                          }}
                          className="flex-grow py-2 border border-sky-300 text-slate-900 bg-white hover:bg-sky-50 active:scale-98 rounded text-xs font-bold shadow-xs transition-all"
                        >
                          Copy Evidence
                        </button>
                      </div>
                    </div>
                  );
                })()}

              </div>
            );
          })()}

        </div>
      </div>

      {/* CREATE JOB Opening FORM */}
      {isCreateJobOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in font-sans">
          <div className="bg-white border border-slate-200 rounded p-8 max-w-xl w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-905">Create New Job Opening</h3>
              <button onClick={() => setIsCreateJobOpen(false)} className="text-slate-400 hover:text-slate-750 text-sm font-semibold">Cancel</button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs font-semibold text-slate-605">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-slate-450 uppercase text-[9px] tracking-wider">Job Title</label>
                  <input type="text" value={newJobTitle} onChange={e => setNewJobTitle(e.target.value)} required className="w-full bg-slate-55 border border-slate-200 rounded p-2.5" placeholder="e.g. Senior Backend Developer" />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-455 uppercase text-[9px] tracking-wider">Department</label>
                  <input type="text" value={newJobDept} onChange={e => setNewJobDept(e.target.value)} required className="w-full bg-slate-55 border border-slate-200 rounded p-2.5" placeholder="e.g. Engineering" />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-450 uppercase text-[9px] tracking-wider">Location</label>
                  <input type="text" value={newJobLoc} onChange={e => setNewJobLoc(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2.5" placeholder="e.g. SF / Hybrid" />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-450 uppercase text-[9px] tracking-wider">Salary Range</label>
                  <input type="text" value={newJobSalary} onChange={e => setNewJobSalary(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2.5" placeholder="e.g. $180k - $210k" />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-455 uppercase text-[9px] tracking-wider">Experience</label>
                  <input type="text" value={newJobExp} onChange={e => setNewJobExp(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2.5" placeholder="e.g. 5+ years" />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-450 uppercase text-[9px] tracking-wider">Employment Type</label>
                  <select value={newJobType} onChange={e => setNewJobType(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2.5">
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Part-time</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-455 uppercase text-[9px] tracking-wider">Job Description</label>
                <textarea rows={3} value={newJobDesc} onChange={e => setNewJobDesc(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2.5 resize-none" placeholder="Paste job details..."></textarea>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-450 uppercase text-[9px] tracking-wider">Requirements (One per line)</label>
                <textarea rows={3} value={newJobReqs} onChange={e => setNewJobReqs(e.target.value)} className="w-full bg-slate-55 border border-slate-200 rounded p-2.5 resize-none" placeholder="React frontend experience..."></textarea>
              </div>

              <button type="submit" className="w-full py-2.5 bg-slate-905 hover:bg-slate-800 active:scale-98 text-white rounded font-bold transition-all shadow-xs">Publish Opening</button>
            </form>
          </div>
        </div>
      )}

      {/* Drag & Drop Confirmation Modal */}
      {dragConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in font-sans">
          <div className="bg-white border border-slate-200 rounded p-6 max-w-sm w-full shadow-2xl space-y-4 text-xs font-semibold">
            <h3 className="text-sm font-bold text-slate-900">Confirm Stage Transition</h3>
            <p className="text-slate-500">Are you sure you want to move this candidate to the <strong>{dragConfirmModal.targetStage}</strong> stage?</p>
            <div className="flex space-x-2 pt-2 justify-end">
              <button 
                onClick={() => setDragConfirmModal(null)} 
                className="px-3.5 py-2 border border-slate-200 rounded font-bold text-slate-550"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmMove}
                className="px-3.5 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded font-bold transition-colors"
              >
                Confirm Move
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast alert system */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-2xl flex items-center space-x-2.5 z-50 animate-slide-in text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-500" />
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
};
