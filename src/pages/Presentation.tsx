import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, X, ShieldAlert, Award, FileText, 
  Layers, Users, Briefcase, Database, Search, Cpu
} from 'lucide-react';
import logoSymbolImg from '../assets/logo_symbol.png';

interface PresentationProps {
  onBack: () => void;
}

export const Presentation: React.FC<PresentationProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const slides = [
    // SLIDE 1: Title
    {
      title: "Title Slide",
      content: (
        <div className="flex flex-col justify-between h-full p-12 text-left bg-gradient-to-br from-white via-white to-sky-50/20 relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
          
          <div className="flex items-center space-x-2.5">
            <img src={logoSymbolImg} alt="NEXUS logo" className="h-10 w-10 object-contain" />
            <span className="font-extrabold text-2xl text-[#0A1428] tracking-tight">NEXUS</span>
          </div>

          <div className="space-y-4 my-auto z-10 max-w-2xl">
            <span className="text-[11px] bg-sky-100 text-sky-600 px-3 py-1 rounded-full font-bold border border-sky-200 uppercase tracking-widest inline-block">
              Hackathon Project Pitch
            </span>
            <h1 className="text-[52px] font-extrabold text-[#0A1428] leading-none tracking-tight">NEXUS</h1>
            <h2 className="text-[28px] font-bold text-sky-500 leading-tight">Evidence-Backed Recruitment Intelligence</h2>
            <p className="text-slate-550 text-base font-semibold max-w-xl leading-relaxed">
              "From Resume Chaos to Evidence-Backed Hiring Decisions"
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-between items-center text-xs font-semibold text-slate-400">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Team Identifier</span>
              <span className="text-slate-800 text-sm font-bold">Nexus Development Team</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-bold">Hackathon Venue</span>
              <span className="text-slate-800 text-sm font-bold">Recruitment Tech Hackathon &apos;26</span>
            </div>
          </div>
        </div>
      )
    },

    // SLIDE 2: Problem
    {
      title: "The Problem",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">01. The Challenge</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">The Resume Screening Bottleneck</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto items-center">
            <div className="space-y-5 text-sm font-medium text-slate-600">
              <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl space-y-2">
                <span className="text-rose-600 font-bold text-[12px] flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-1.5" />
                  Inconsistent Candidate Formats
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Resumes arrive as single-column PDFs, multi-column DOCX files, scanned paper, or broken plain text files. Manually reading each format causes high cognitive fatigue.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                <span className="text-[#0A1428] font-bold text-[12px] flex items-center">
                  <Cpu className="w-4 h-4 mr-1.5 text-slate-400" />
                  Keyword Matching Shortcomings
                </span>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Simple keyword filters fail because candidates copy-paste terms without matching real work experience. AI models often summarize without grounding findings.
                </p>
              </div>
            </div>

            {/* Visual Process Flow */}
            <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-center items-center space-y-3 shadow-inner">
              <div className="w-full flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg text-xs font-bold text-slate-700 shadow-xs">
                <span>Hundreds of Resumes</span>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-extrabold uppercase">Unstructured</span>
              </div>
              <div className="text-slate-400 text-sm font-bold">↓</div>
              <div className="w-full flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg text-xs font-bold text-slate-700 shadow-xs">
                <span>Manual Screening</span>
                <span className="text-[9px] bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded font-extrabold uppercase">Slow & Fatiguing</span>
              </div>
              <div className="text-slate-400 text-sm font-bold">↓</div>
              <div className="w-full flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-lg text-xs font-bold text-[#0A1428] border-l-4 border-rose-500 shadow-xs">
                <span>Operational Bottleneck</span>
                <span className="text-[9px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-extrabold uppercase">Hiring Lag</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-rose-600 font-extrabold text-[12px] bg-rose-50 border border-rose-100 rounded px-4 py-1.5 inline-block">
              "Traditional search checks for keywords. NEXUS verifies actual claims."
            </span>
          </div>
        </div>
      )
    },

    // SLIDE 3: Solution
    {
      title: "Introducing Nexus",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none bg-gradient-to-br from-white via-white to-sky-50/10">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">02. The Innovation</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">Introducing Nexus</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto items-center">
            <div className="md:col-span-7 space-y-4 text-xs font-semibold text-slate-600">
              <p className="text-sm font-bold text-slate-700 leading-relaxed mb-2">
                Nexus is an evidence-backed recruitment intelligence platform designed to eliminate recruiter validation fatigue while maintaining absolute transparency.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "01", name: "Structure Extraction", desc: "Ingests resumes and extracts raw text while preserving structural context." },
                  { num: "02", name: "Semantic Evaluation", desc: "Evaluates candidate-job fit using large language models against real parameters." },
                  { num: "03", name: "Weighted Scores", desc: "Produces transparent category scores, not just an abstract match index." },
                  { num: "04", name: "Claim Grounding", desc: "Links every single extracted claim back to actual quotes in the source resume." }
                ].map(item => (
                  <div key={item.num} className="p-3.5 bg-white border border-slate-200/80 rounded-xl shadow-xs space-y-1">
                    <span className="text-[10px] text-sky-500 font-bold block">{item.num}. {item.name}</span>
                    <p className="text-[10px] text-slate-500 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm text-center space-y-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Process Paradigm</span>
              <div className="flex flex-col space-y-2 font-bold text-xs">
                <span className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-600">Extract Structure</span>
                <span className="text-sky-500">↓</span>
                <span className="p-2 bg-sky-50 border border-sky-100 rounded-lg text-sky-600">Verify Evidence</span>
                <span className="text-sky-500">↓</span>
                <span className="p-2 bg-[#0A1428] text-white rounded-lg">Explain & Score</span>
              </div>
              <span className="text-[9px] text-slate-400 font-semibold block leading-relaxed mt-1">
                "Human recruiters always retain ultimate control and make the final decision."
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>Core Principle: Grounded Explanations</span>
            <span className="text-sky-500">Extract → Verify → Score → Explain</span>
          </div>
        </div>
      )
    },

    // SLIDE 4: How it works Workflow
    {
      title: "How it Works",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">03. Technical Workflow</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">End-to-End Recruitment Workflow</h2>
          </div>

          {/* Workflow Diagram */}
          <div className="my-auto py-2">
            <div className="flex justify-between items-center bg-slate-50/50 border border-slate-200/60 rounded-2xl p-6 overflow-x-auto gap-4">
              {[
                { step: "1", title: "Ingestion", icon: FileText, label: "PDF / DOCX Upload" },
                { step: "2", title: "Parsing", icon: Layers, label: "Text Extraction" },
                { step: "3", title: "Target Calibration", icon: Briefcase, label: "JD Requirements" },
                { step: "4", title: "AI Screen", icon: Cpu, label: "Evidence Matching" },
                { step: "5", title: "Verification", icon: Award, label: "Source Mapping" },
                { step: "6", title: "Trace UI", icon: Search, label: "Recruiter Review" }
              ].map((item, idx, arr) => (
                <React.Fragment key={item.step}>
                  <div className="flex flex-col items-center space-y-2 text-center min-w-[100px]">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-xs text-sky-500 relative">
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sky-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
                        {item.step}
                      </span>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-[#0A1428] font-extrabold block">{item.title}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 leading-none">{item.label}</span>
                    </div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="text-slate-300 font-extrabold text-base select-none">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>Every verification claim traces back to the source PDF line indices.</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded px-2.5 py-0.5">
              Zero Hallucination Tolerance
            </span>
          </div>
        </div>
      )
    },

    // SLIDE 5: Two Portals
    {
      title: "Two Portals",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">04. Platform Architecture</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">One Platform. Two Roles.</h2>
          </div>

          <div className="grid grid-cols-2 gap-8 my-auto">
            {/* Admin Portal Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:border-sky-300 transition-all">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-[#0A1428] flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-sky-500" />
                  RECRUITER WORKSPACE
                </span>
                <span className="text-[8px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded font-extrabold border border-sky-100 uppercase">
                  Admin Portal
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 list-disc list-inside">
                <li>Recruitment Dashboard</li>
                <li>Candidate Pipeline</li>
                <li>Job Description Setup</li>
                <li>Weighted AI Settings</li>
                <li>Table / Kanban Toggle</li>
                <li>Score Breakdown Matrix</li>
                <li>Interactive Claims Drawer</li>
                <li>Operational Logs</li>
              </ul>
            </div>

            {/* Candidate Portal Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 hover:border-sky-300 transition-all">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-[#0A1428] flex items-center">
                  <Users className="w-4 h-4 mr-2 text-sky-500" />
                  CANDIDATE WORKSPACE
                </span>
                <span className="text-[8px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded font-extrabold border border-slate-200 uppercase">
                  Candidate Portal
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 list-disc list-inside">
                <li>Profile Completeness</li>
                <li>Resume Uploader</li>
                <li>Career Requirements</li>
                <li>Location Preferences</li>
                <li>Parsed Skills Audit</li>
                <li>Grounded Match Insights</li>
                <li>Application Tracker</li>
                <li>Evidence Audit Trail</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-slate-500 text-xs font-semibold">
              "Recruiters manage the screening workflow. Candidates manage their verified profile details."
            </span>
          </div>
        </div>
      )
    },

    // SLIDE 6: Resume Intelligence
    {
      title: "Resume Intelligence",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">05. Data Structuring</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">From Unstructured Resume to Structured Profile</h2>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-stretch">
            {/* Input Unstructured */}
            <div className="col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between h-48 shadow-inner">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">Input: Resume.pdf</span>
              <div className="font-mono text-[9px] text-slate-500 leading-normal overflow-y-auto space-y-1.5 flex-grow select-text">
                <p>"Senior Software Engineer... Jan 2022 - Present..."</p>
                <p>"Technical stack: Node.js, TypeScript, React..."</p>
                <p>"B.S. in Computer Science, Georgia Tech..."</p>
              </div>
            </div>

            {/* Transform Arrow */}
            <div className="col-span-2 flex flex-col justify-center items-center text-sky-500 font-bold text-sm">
              <span>Extract</span>
              <span>→</span>
              <span>Verify</span>
            </div>

            {/* Output Structured */}
            <div className="col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-48">
              <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-2">Output: Structured Profile</span>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Candidate Name</span>
                  <span className="text-slate-805">Sarah Jenkins</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Years Experience</span>
                  <span className="text-slate-805">6 Years</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Core Tech Stack</span>
                  <span className="text-slate-805">Node.js, TS, React</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Education</span>
                  <span className="text-slate-805">B.S. Computer Science</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>Information not found in the original source resume is marked "Not Mentioned".</span>
            <span className="text-rose-600 font-bold">No Extrapolations. No Fabrications.</span>
          </div>
        </div>
      )
    },

    // SLIDE 7: Evidence-Backed AI (Trace)
    {
      title: "Evidence-Backed AI",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none bg-gradient-to-br from-white via-white to-sky-50/10">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">06. Verification Core</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">AI That Can Show Its Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto items-stretch">
            {/* Traditional AI Box */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-extrabold text-slate-500">TRADITIONAL ATS / AI</span>
                <span className="text-[9px] bg-rose-50 text-rose-500 px-2 py-0.5 border border-rose-100 rounded font-extrabold uppercase">Unverified</span>
              </div>
              <div className="space-y-2 text-xs font-semibold text-slate-500">
                <div className="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Match Score:</span>
                  <span className="font-extrabold text-rose-600">94%</span>
                </div>
                <p className="text-[10px] text-slate-400 font-normal leading-relaxed">
                  Generates match scores based on hidden semantic weights. Recruiters must trust the score blindly, with no path to verify if the candidate actually possesses the skills.
                </p>
              </div>
            </div>

            {/* Nexus AI Box */}
            <div className="p-5 bg-white border border-sky-200 rounded-2xl shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-sky-100 pb-2">
                <span className="text-xs font-extrabold text-[#0A1428]">NEXUS VERIFICATION</span>
                <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 border border-emerald-100 rounded font-extrabold uppercase">Traceable</span>
              </div>
              <div className="space-y-3 text-[10px] font-bold text-slate-600">
                <div className="flex justify-between p-2 bg-emerald-50/50 border border-emerald-100 rounded text-xs">
                  <span>Match Score:</span>
                  <span className="font-extrabold text-emerald-600">94% (Verified)</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[8px] text-slate-400 uppercase font-bold block">Status: Matches</span>
                  <div className="bg-slate-50 p-2 border border-slate-100 rounded font-mono text-[9px] text-slate-700 leading-normal">
                    "Senior Software Engineer... Jan 2022 - Present"
                    <span className="text-sky-500 font-bold block mt-1 text-[8px] uppercase tracking-wide">→ Source: Page 1, Experience Section</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>Traceability transforms black-box screening into audits.</span>
            <span className="text-sky-500 font-extrabold">Live TRACE Button Auditing</span>
          </div>
        </div>
      )
    },

    // SLIDE 8: Match Scoring
    {
      title: "Match Scoring",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">07. Match Scoring</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">Transparent Candidate Fit Scoring</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto items-center">
            {/* Circular score display */}
            <div className="md:col-span-4 bg-slate-50/50 border border-slate-200/80 rounded-2xl p-6 text-center space-y-2 shadow-inner">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Overall Fit</span>
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-[6px] border-sky-500 bg-white shadow-sm relative">
                <span className="text-3xl font-extrabold text-[#0A1428]">94</span>
                <span className="text-slate-400 text-xs font-bold absolute bottom-4">/ 100</span>
              </div>
              <span className="text-xs font-extrabold text-sky-500 block uppercase tracking-wide">Strong Match</span>
            </div>

            {/* Categorized score breakdown */}
            <div className="md:col-span-8 space-y-3.5 text-xs font-semibold text-slate-600">
              {[
                { label: 'Technical Match', pct: 96, color: 'bg-emerald-500' },
                { label: 'Experience Match', pct: 95, color: 'bg-emerald-500' },
                { label: 'Education Match', pct: 90, color: 'bg-sky-500' },
                { label: 'Project Relevance', pct: 95, color: 'bg-emerald-500' }
              ].map((row, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#0A1428]">{row.label}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>Score calculations are determined by grounded LLM matching.</span>
            <span className="text-slate-400 italic">Recruiter holds final hiring call.</span>
          </div>
        </div>
      )
    },

    // SLIDE 9: Admin Dashboard (Mockup UI)
    {
      title: "Admin Dashboard",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">08. Operational Dashboard</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">Recruiter Command Center</h2>
          </div>

          {/* Clean Dashboard Layout Mockup */}
          <div className="my-auto bg-slate-900 rounded-xl p-4 shadow-xl border border-slate-800 text-[10px] text-slate-400 font-sans font-semibold space-y-3 max-w-3xl mx-auto">
            {/* Top Row navbar */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-extrabold text-white text-[11px] tracking-tight">NEXUS</span>
                <span className="text-[8px] bg-slate-800 text-sky-400 px-1.5 py-0.2 rounded font-extrabold">Recruitment Ops</span>
              </div>
              <span className="text-[8px] bg-slate-800 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-extrabold">● Hiring operations active</span>
            </div>

            {/* KPI Cards row */}
            <div className="grid grid-cols-4 gap-2 text-left">
              {[
                { label: "Total Candidates", val: "184", trend: "+12%" },
                { label: "Active Jobs", val: "4", trend: "Steady" },
                { label: "Interviews today", val: "3", trend: "+20%" },
                { label: "Avg Match Score", val: "78%", trend: "+5%" }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700/50 p-2.5 rounded-lg space-y-1">
                  <span className="text-[7px] text-slate-550 uppercase block">{kpi.label}</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold text-white">{kpi.val}</span>
                    <span className="text-[7px] text-emerald-500 font-extrabold">{kpi.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row split */}
            <div className="grid grid-cols-12 gap-3 pt-1">
              <div className="col-span-8 bg-slate-800/50 border border-slate-700/50 rounded-lg p-2.5 space-y-2">
                <span className="text-[8px] text-white font-extrabold uppercase border-b border-slate-700 pb-1 block">Hiring Pipeline Funnel</span>
                <div className="flex justify-between items-center text-[8px] py-1 text-slate-400">
                  <span>Applied (184)</span>
                  <span>→</span>
                  <span>AI Screened (91)</span>
                  <span>→</span>
                  <span>Interview (31)</span>
                  <span>→</span>
                  <span>Offer (9)</span>
                </div>
              </div>
              <div className="col-span-4 bg-slate-800/50 border border-slate-700/50 rounded-lg p-2.5 space-y-1 text-left">
                <span className="text-[8px] text-white font-extrabold uppercase border-b border-slate-700 pb-1 block">Recent screening logs</span>
                <p className="text-[7px] text-slate-500 leading-snug">Sarah Jenkins: 94% Match (Software Engineer)<br/>Liam Patel: 88% Match (Frontend Engineer)</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-slate-500 text-xs font-semibold">
              Recruiters get a high-density, centralized pipeline funnel, operational logs, and fit scoring.
            </span>
          </div>
        </div>
      )
    },

    // SLIDE 10: Candidate Analysis Details
    {
      title: "Candidate Analysis",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">09. Evaluation Details</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">Deep Candidate Evaluation Interface</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto items-stretch">
            {/* Left Card: Core evaluation details */}
            <div className="md:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div className="flex items-center space-x-2.5">
                  <span className="font-extrabold text-slate-800 text-sm">Sarah Jenkins</span>
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Software Engineer</span>
                </div>
                <span className="text-xs font-extrabold text-sky-650">Score: 94/100</span>
              </div>
              
              <div className="space-y-3 text-[10px] font-bold text-slate-500">
                <div className="space-y-1">
                  <span className="text-slate-400 uppercase text-[8px]">Job Requirements Match Matrix</span>
                  <div className="border border-slate-100 rounded-lg overflow-hidden text-[9px]">
                    <div className="grid grid-cols-4 gap-2 bg-slate-55 p-2 font-extrabold text-[#0A1428]">
                      <span>Requirement</span>
                      <span>Category</span>
                      <span>Status</span>
                      <span className="text-right">Evidence</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 p-2 border-t border-slate-100 items-center">
                      <span className="text-slate-800 font-extrabold">Node.js + TS</span>
                      <span className="uppercase text-[8px] text-slate-400">Technical</span>
                      <span className="text-emerald-600 font-extrabold">Strong Match</span>
                      <span className="text-right"><button className="px-2 py-0.5 border border-sky-300 text-sky-600 rounded text-[8px] uppercase tracking-wide bg-white">Trace</button></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Audit Details */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-inner space-y-3 text-left">
              <span className="text-[9px] text-slate-405 font-bold uppercase tracking-widest block border-b border-slate-200 pb-1.5">Evidence Trace</span>
              <div className="space-y-2 text-[10px] font-bold text-slate-500">
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[8px] block">Claimed Experience:</span>
                  <p className="text-slate-800 font-extrabold">"Led Stripe integration using Node.js/TS microservices"</p>
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1">
                  <span className="text-[8px] text-slate-400 uppercase block">Source Document:</span>
                  <span className="text-slate-700 block font-semibold text-[9px] leading-tight">Sarah_Jenkins_Resume.pdf<br/>Page 1, Projects Section</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-semibold text-slate-400">
            <span>Provides audit logs showing the source PDF coordinates.</span>
            <span className="text-sky-500 font-bold">1-Click Verification Drawers</span>
          </div>
        </div>
      )
    },

    // SLIDE 11: Technical Architecture
    {
      title: "Technical Architecture",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">10. Architecture</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">Nexus Technical Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto items-stretch">
            {/* Left Stack description */}
            <div className="md:col-span-5 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs space-y-4 text-left">
              <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block border-b border-slate-100 pb-2">Full Technology Stack</span>
              <div className="space-y-3 text-[10px] font-bold text-slate-500">
                <div className="flex justify-between">
                  <span>Frontend Client:</span>
                  <span className="text-slate-805">React + Vite + Tailwind</span>
                </div>
                <div className="flex justify-between">
                  <span>Logic Layer:</span>
                  <span className="text-slate-805">Python + FastAPI / TS</span>
                </div>
                <div className="flex justify-between">
                  <span>Document Parser:</span>
                  <span className="text-slate-805">PDFMiner / python-docx</span>
                </div>
                <div className="flex justify-between">
                  <span>Structured Database:</span>
                  <span className="text-slate-805">PostgreSQL (Supabase)</span>
                </div>
                <div className="flex justify-between">
                  <span>LLM Provider:</span>
                  <span className="text-slate-805">Claude / GPT-4 (Grounded JSON)</span>
                </div>
              </div>
            </div>

            {/* Right stack visualization tree */}
            <div className="md:col-span-7 bg-slate-50 border border-slate-200/60 rounded-2xl p-5 shadow-inner flex flex-col justify-center space-y-2.5 font-bold text-xs">
              <div className="flex justify-between items-center bg-white border border-slate-200/80 p-2.5 rounded-lg shadow-xs">
                <span className="text-[#0A1428] font-extrabold flex items-center"><Layers className="w-4 h-4 mr-1.5 text-sky-500" />Frontend Pages</span>
                <span className="text-slate-400 font-semibold text-[10px]">Admin Portal | Candidate Portal</span>
              </div>
              <div className="text-center text-slate-300 font-extrabold">↓</div>
              <div className="flex justify-between items-center bg-white border border-slate-200/80 p-2.5 rounded-lg shadow-xs">
                <span className="text-[#0A1428] font-extrabold flex items-center"><Database className="w-4 h-4 mr-1.5 text-sky-500" />Supabase Backend</span>
                <span className="text-slate-400 font-semibold text-[10px]">Auth | Storage (Resume PDFs) | PostgreSQL</span>
              </div>
              <div className="text-center text-slate-300 font-extrabold">↓</div>
              <div className="flex justify-between items-center bg-white border border-slate-200/80 p-2.5 rounded-lg shadow-xs">
                <span className="text-[#0A1428] font-extrabold flex items-center"><Cpu className="w-4 h-4 mr-1.5 text-sky-500" />LLM Processing</span>
                <span className="text-slate-400 font-semibold text-[10px]">Extract → Verify → Score → Explain</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-slate-500 text-xs font-semibold">
              Direct API integrations secure candidate PII while serving high-concurrency recruiters.
            </span>
          </div>
        </div>
      )
    },

    // SLIDE 12: Safety + Impact
    {
      title: "Safety + Impact",
      content: (
        <div className="h-full p-12 flex flex-col justify-between select-none bg-gradient-to-br from-white via-white to-sky-50/10">
          <div>
            <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block mb-1">11. Operational Impact</span>
            <h2 className="text-3xl font-extrabold text-[#0A1428]">Safety, Integrity & Recruitment Impact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
            {/* Core safety principles */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs space-y-4">
              <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest block border-b border-slate-100 pb-2">Safety Principles</span>
              <div className="space-y-3 text-[10px] font-bold text-slate-500">
                <div className="space-y-1">
                  <span className="text-slate-800 font-extrabold block">1. Source Preservation</span>
                  <p className="text-[9px] text-slate-400 font-normal leading-relaxed">Original candidate resume documents are preserved unmodified as structured read-only sources.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-800 font-extrabold block">2. Evidence Traceability</span>
                  <p className="text-[9px] text-slate-400 font-normal leading-relaxed">Every score parameter maps to verifiable text fragments in the original document, removing bias.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-800 font-extrabold block">3. Human Oversight</span>
                  <p className="text-[9px] text-slate-400 font-normal leading-relaxed">AI acts as an analytical copilot; recruiters make all pipeline status transitions manually.</p>
                </div>
              </div>
            </div>

            {/* Impact Table */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <span className="text-[10px] text-[#0A1428] font-bold uppercase tracking-widest block border-b border-slate-100 pb-2">Hiring Efficiency Transition</span>
              <div className="border border-slate-100 rounded-lg overflow-hidden text-[9px] font-bold">
                <div className="grid grid-cols-2 gap-2 bg-slate-55 p-2 text-[#0A1428]">
                  <span>Before NEXUS</span>
                  <span>After NEXUS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2 border-t border-slate-100 items-start text-slate-500">
                  <p className="font-normal leading-relaxed">Manual resume reading takes hours; keywords filter qualified profiles; opaque screening criteria.</p>
                  <p className="text-emerald-600 font-extrabold leading-relaxed">Structured profiles generated instantly; evidence-backed match scoring; 1-click trace verification.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-sky-600 font-extrabold text-[12px] bg-sky-50 border border-sky-100 rounded px-4 py-1.5 inline-block">
              "Nexus doesn&apos;t replace the recruiter. It eliminates the bottleneck between parsing and understanding."
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 relative select-none font-sans">
      {/* Top navbar controls */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-white z-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img src={logoSymbolImg} alt="NEXUS logo" className="h-7 w-7 object-contain brightness-0 invert" />
            <span className="font-extrabold text-sm text-white tracking-tight">NEXUS</span>
          </div>
          <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider hidden sm:inline-block">|</span>
          <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider hidden sm:inline-block">Recruitment Pitch</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all border border-slate-700"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Slideshow</span>
        </button>
      </div>

      {/* Main Slide frame 16:9 aspect ratio */}
      <div className="w-full max-w-[1000px] aspect-[16/9] bg-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden relative flex flex-col justify-between">
        <div className="flex-grow">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Bottom slide controls */}
      <div className="mt-6 flex flex-col items-center space-y-3 w-full max-w-[1000px] text-white">
        <div className="flex justify-between items-center w-full px-2 text-xs font-bold text-slate-400">
          <span>Slide {currentSlide + 1} of {slides.length}</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 transition-all ${currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'}`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded-lg bg-slate-800 border border-slate-700 transition-all ${currentSlide === slides.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-700'}`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Progress bar */}
        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-sky-500 h-1 transition-all duration-300" 
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block pt-1">
          Use Left / Right Arrow keys or Spacebar to navigate.
        </span>
      </div>
    </div>
  );
};
