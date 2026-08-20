import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Mail, Phone, MapPin, ExternalLink, 
  ShieldCheck, FileText, CheckCircle2, AlertTriangle, XCircle, Info, Bookmark, HelpCircle
} from 'lucide-react';
import type { Candidate, CandidateAnalysis, Evidence, JobRequirement } from '../types';
import { ScoreGauge } from '../components/ScoreGauge';
import { EvidenceModal } from '../components/EvidenceModal';

interface CandidateDetailProps {
  candidate: Candidate;
  analysis: CandidateAnalysis;
  onBack: () => void;
}

export const CandidateDetail: React.FC<CandidateDetailProps> = ({
  candidate,
  analysis,
  onBack
}) => {
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const resumeContainerRef = useRef<HTMLDivElement>(null);
  
  // Clean up highlighting on candidate change
  useEffect(() => {
    setActiveEvidenceId(null);
    setSelectedEvidence(null);
  }, [candidate.id]);

  // Handle clicking an evidence trigger
  const handleEvidenceTrigger = (evidenceId: string) => {
    const evidenceItem = analysis.evidence.find(ev => ev.id === evidenceId);
    if (!evidenceItem) return;

    setActiveEvidenceId(evidenceId);
    
    // Smooth scroll to the highlighted element in the resume preview
    setTimeout(() => {
      const highlightElement = resumeContainerRef.current?.querySelector('[data-highlight="true"]');
      if (highlightElement) {
        highlightElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Handle opening detailed evidence verification modal
  const handleOpenEvidenceModal = (e: React.MouseEvent, evidenceId: string) => {
    e.stopPropagation(); // prevent double triggers
    const evidenceItem = analysis.evidence.find(ev => ev.id === evidenceId);
    if (evidenceItem) {
      setSelectedEvidence(evidenceItem);
      setIsEvidenceModalOpen(true);
    }
  };

  // Custom function to render the resume text with highlighted quotes
  const renderResumeWithHighlights = () => {
    const rawText = candidate.resumeText;
    
    if (!activeEvidenceId) {
      return <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-600 font-sans">{rawText}</pre>;
    }

    const currentEvidence = analysis.evidence.find(ev => ev.id === activeEvidenceId);
    if (!currentEvidence || currentEvidence.quote === 'Not Mentioned') {
      return <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-600 font-sans">{rawText}</pre>;
    }

    const quote = currentEvidence.quote;
    
    // Find matching text (case-insensitive substring split)
    const quoteIndex = rawText.toLowerCase().indexOf(quote.toLowerCase());
    if (quoteIndex === -1) {
      // In case we can't find a direct matches, show raw text
      return <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-600 font-sans">{rawText}</pre>;
    }

    // Split text by the exact text length to preserve casing
    const before = rawText.substring(0, quoteIndex);
    const match = rawText.substring(quoteIndex, quoteIndex + quote.length);
    const after = rawText.substring(quoteIndex + quote.length);

    return (
      <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-slate-600 font-sans">
        {before}
        <mark 
          data-highlight="true"
          className="bg-yellow-100 border-l-2 border-yellow-500 text-slate-900 px-1 py-0.5 rounded shadow-sm font-semibold transition-all duration-300 animate-pulse"
        >
          {match}
        </mark>
        {after}
      </pre>
    );
  };

  const getStatusIcon = (status: JobRequirement['status']) => {
    switch (status) {
      case 'strong_match':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />;
      case 'match':
        return <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />;
      case 'not_found':
        return <HelpCircle className="w-4 h-4 text-slate-400 fill-slate-50" />;
      case 'not_met':
        return <XCircle className="w-4 h-4 text-rose-500 fill-rose-50" />;
    }
  };

  const getStatusLabel = (status: JobRequirement['status']) => {
    switch (status) {
      case 'strong_match': return 'Strong Match';
      case 'match': return 'Matches';
      case 'not_found': return 'Not Found';
      case 'not_met': return 'Not Met';
    }
  };

  const getStatusBadgeColors = (status: JobRequirement['status']) => {
    switch (status) {
      case 'strong_match': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'match': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'not_found': return 'bg-slate-50 text-slate-600 border-slate-100';
      case 'not_met': return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 animate-fade-in">
      {/* Navigation and Actions Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Screening List</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>Fact-Checked Audit Report</span>
        </div>
      </div>

      {/* Main Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Fit Analysis & Candidate Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{candidate.name}</h1>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Position Screened: <span className="font-bold text-slate-700">{analysis.jobTitle}</span></p>
              </div>

              {/* Contact / Links */}
              <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-slate-600">
                <div className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{candidate.phone || 'Not Listed'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{candidate.location || 'Not Listed'}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-2.5 pt-1">
                {candidate.links.linkedin && (
                  <a href={`https://${candidate.links.linkedin}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 text-xs transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span>LinkedIn</span>
                  </a>
                )}
                {candidate.links.github && (
                  <a href={`https://${candidate.links.github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-900 text-xs transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span>GitHub</span>
                  </a>
                )}
                {candidate.links.portfolio && (
                  <a href={`https://${candidate.links.portfolio}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-500 text-xs transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>

            {/* Score Ring Gauge */}
            <div className="flex-shrink-0 self-center">
              <ScoreGauge score={analysis.matchResult.overallScore} status={analysis.matchResult.status} size="md" />
            </div>
          </div>

          {/* Breakdown Score & Categories */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-5">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-blue-500" />
              <span>Score Breakdown Category Comparison</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Technical bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Technical Skill Match</span>
                  <span>{analysis.matchResult.breakdown.technical}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${analysis.matchResult.breakdown.technical}%` }}></div>
                </div>
              </div>

              {/* Experience bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Tenure Requirements</span>
                  <span>{analysis.matchResult.breakdown.experience}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${analysis.matchResult.breakdown.experience}%` }}></div>
                </div>
              </div>

              {/* Education bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Education Background</span>
                  <span>{analysis.matchResult.breakdown.education}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${analysis.matchResult.breakdown.education}%` }}></div>
                </div>
              </div>

              {/* Projects bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Project & Case Validation</span>
                  <span>{analysis.matchResult.breakdown.projects}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${analysis.matchResult.breakdown.projects}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Explanation, Strengths & Gaps */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Why this candidate scored {analysis.matchResult.overallScore}/100</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Explainable AI hiring evaluation summary</p>
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-xs text-slate-700 leading-relaxed font-sans mt-3">
                {analysis.matchResult.aiExplanation}
              </div>
            </div>

            {/* Strengths and Gaps Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
              
              {/* Strengths (Grounded Checkmarks) */}
              <div className="space-y-3.5">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                  <span>Strengths (Evidence-Backed)</span>
                </h4>
                <div className="space-y-2.5">
                  {analysis.matchResult.strengths.map((str, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleEvidenceTrigger(str.evidenceId)}
                      className="group bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200/60 p-3 rounded-lg text-xs leading-relaxed text-slate-700 flex flex-col justify-between items-start gap-2 cursor-pointer transition-all"
                    >
                      <span>{str.point}</span>
                      <div className="flex items-center space-x-2.5 w-full justify-between pt-1 border-t border-slate-200/40 text-[10px] font-semibold">
                        <span className="text-blue-600 group-hover:underline">Locate Quote in Resume</span>
                        <button 
                          onClick={(e) => handleOpenEvidenceModal(e, str.evidenceId)}
                          className="text-slate-400 hover:text-slate-700 hover:underline"
                        >
                          Verify Source Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gaps / Limitations */}
              <div className="space-y-3.5">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 fill-amber-50" />
                  <span>Identified Gaps & Risks</span>
                </h4>
                <div className="space-y-2.5">
                  {analysis.matchResult.gaps.length > 0 ? (
                    analysis.matchResult.gaps.map((gap, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs space-y-1.5"
                      >
                        <div className="font-bold text-slate-800 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          <span>{gap.point}</span>
                        </div>
                        <p className="text-slate-500 leading-normal font-medium">{gap.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg text-xs text-center text-slate-400 font-medium">
                      No matching gaps or factual omissions found.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Job Requirements Alignment Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-150">
              <h3 className="font-bold text-slate-900 text-sm">Detailed Job Requirements Matrix</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Semantic checking and mapping of skills to verbatim document sentences</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Requirement</th>
                    <th className="px-6 py-3 w-32">Category</th>
                    <th className="px-6 py-3 w-36">Status</th>
                    <th className="px-6 py-3 text-right w-40">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs leading-normal">
                  {analysis.requirements.map((req) => (
                    <tr 
                      key={req.id} 
                      className={`hover:bg-slate-50/50 transition-colors ${
                        activeEvidenceId === req.evidenceId ? 'bg-yellow-50/20' : ''
                      }`}
                    >
                      <td className="px-6 py-3.5">
                        <div className="font-semibold text-slate-800">{req.requirement}</div>
                        <div className="text-slate-400 mt-0.5">{req.explanation}</div>
                      </td>
                      <td className="px-6 py-3.5 capitalize font-medium text-slate-500">
                        {req.category}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center space-x-1.5">
                          {getStatusIcon(req.status)}
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadgeColors(req.status)}`}>
                            {getStatusLabel(req.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        {req.evidenceId && req.status !== 'not_found' && req.status !== 'not_met' ? (
                          <div className="inline-flex space-x-2">
                            <button
                              onClick={() => handleEvidenceTrigger(req.evidenceId!)}
                              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-blue-600 rounded shadow-inner hover:border-slate-300 transition-colors"
                            >
                              Trace
                            </button>
                            <button
                              onClick={(e) => handleOpenEvidenceModal(e, req.evidenceId!)}
                              className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-[10px] font-bold transition-colors"
                              title="Inspection Log"
                            >
                              Verify
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                            {req.status === 'not_met' ? 'Omitted' : 'Not Found'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Candidate Profile Details (Factual Sections) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-6">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Extracted Profile Information
            </h3>

            {/* Work History */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Professional Experience</h4>
              <div className="space-y-4">
                {candidate.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-slate-200 pl-4 py-0.5 space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{exp.title}</span>
                      <span className="text-slate-400 font-medium">{exp.duration}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{exp.company}</div>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 pt-1 font-sans">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Key Skills & Tooling</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidate.skills.map((skillCat, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{skillCat.category}</span>
                    <div className="flex flex-wrap gap-1">
                      {skillCat.items.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium border border-slate-200/40">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              
              {/* Projects */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Featured Projects</h4>
                {candidate.projects.length > 0 ? (
                  candidate.projects.map((proj, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs space-y-1.5">
                      <div className="flex justify-between items-center font-bold text-slate-800">
                        <span>{proj.name}</span>
                        {proj.url && (
                          <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-slate-500 leading-normal font-medium">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.map((tech, tIdx) => (
                          <span key={tIdx} className="bg-white border border-slate-200 text-[10px] text-slate-500 px-1.5 py-0.2 rounded font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic block">Not Mentioned</span>
                )}
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Education History</h4>
                {candidate.education.map((edu, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between items-start font-bold text-slate-800 leading-tight">
                      <span>{edu.degree}</span>
                      <span className="text-slate-400 font-medium whitespace-nowrap ml-2">{edu.graduationYear}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">{edu.institution}</div>
                    {edu.gpa && (
                      <div className="text-[10px] text-slate-400 font-semibold">GPA: {edu.gpa}</div>
                    )}
                    {edu.details && (
                      <p className="text-slate-500 font-medium mt-1 leading-normal">{edu.details}</p>
                    )}
                  </div>
                ))}

                {/* Additional Sections */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Certifications</span>
                    <ul className="text-xs text-slate-600 font-medium list-disc pl-4 space-y-0.5 mt-1">
                      {candidate.certifications.length > 0 ? (
                        candidate.certifications.map((cert, idx) => <li key={idx}>{cert}</li>)
                      ) : (
                        <span className="text-slate-400 italic">Not Mentioned</span>
                      )}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Languages</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.languages.length > 0 ? (
                        candidate.languages.map((lang, idx) => (
                          <span key={idx} className="bg-slate-100 border border-slate-200/50 rounded px-1.5 py-0.5 text-[10px] text-slate-500 font-medium">
                            {lang}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">Not Mentioned</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Side: Interactive Resume Viewer (5 cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Interactive Document Preview</label>
            <span className="text-[10px] text-slate-400 font-medium flex items-center space-x-1">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              <span>Grounded Text Mapping</span>
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col h-[750px]">
            {/* Viewer Toolbar */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 font-semibold text-slate-700">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="truncate max-w-[200px]">{candidate.name.replace(' ', '_')}_Resume.pdf</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PAGE 1 OF 1</span>
            </div>

            {/* Instructions */}
            {!activeEvidenceId && (
              <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 flex items-start space-x-2.5 text-xs text-blue-800 leading-normal animate-fade-in">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>
                  Click any <strong>Trace</strong> or <strong>Locate</strong> button on the left to highlight the matching verbatim claim in the candidate's document in real-time.
                </p>
              </div>
            )}

            {/* Scrolling View Window */}
            <div 
              ref={resumeContainerRef}
              className="flex-grow p-6 overflow-y-auto bg-slate-50/20 border-b border-slate-100 select-text"
            >
              <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-6 min-h-[90%] select-text">
                {renderResumeWithHighlights()}
              </div>
            </div>
            
            {/* Viewer footer */}
            <div className="bg-slate-50 px-4 py-2 flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Zoom: 100%</span>
              <span className="text-emerald-500 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-ping"></span>
                <span>Factual Trace Sync Active</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Evidence Verification Details Modal popup */}
      <EvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        evidence={selectedEvidence}
        candidateName={candidate.name}
      />
    </div>
  );
};
