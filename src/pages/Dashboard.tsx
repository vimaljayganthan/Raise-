import React from 'react';
import { Search, Users, ShieldAlert, Sparkles, TrendingUp, CheckCircle, FileSpreadsheet } from 'lucide-react';
import type { Candidate, CandidateAnalysis } from '../types';

interface DashboardProps {
  candidates: Candidate[];
  analyses: Record<string, CandidateAnalysis>;
  setActivePage: (page: string) => void;
  setSelectedCandidateId: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  candidates,
  analyses,
  setActivePage,
  setSelectedCandidateId
}) => {
  // Statistics Calculations
  const totalAnalyzed = candidates.length;
  const avgScore = Math.round(
    candidates.reduce((sum, c) => sum + (analyses[c.id]?.matchResult.overallScore || 0), 0) / totalAnalyzed
  ) || 0;
  
  const strongMatches = candidates.filter(
    c => (analyses[c.id]?.matchResult.overallScore || 0) >= 80
  ).length;

  const needsReview = candidates.filter(
    c => {
      const score = analyses[c.id]?.matchResult.overallScore || 0;
      return score >= 50 && score < 80;
    }
  ).length;

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidateId(id);
    setActivePage('candidate-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 animate-fade-in">
      {/* Hero Banner Section */}
      <div className="relative bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 rounded-2xl p-8 md:p-12 overflow-hidden shadow-lg border border-slate-800">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Prototype v1.0</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Screen resumes with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">evidence</span>, not guesses.
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Extract candidate information, compare resumes against job requirements, and get explainable AI-powered hiring insights backed by exact text quotes.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActivePage('analyze')}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Analyze Resume</span>
            </button>
            <button
              onClick={() => setActivePage('candidates')}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg shadow-sm transition-all border border-slate-700 hover:border-slate-600 text-sm"
            >
              <Users className="w-4 h-4" />
              <span>View Candidates</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resumes Screened</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800">{totalAnalyzed}</span>
            <span className="text-xs font-semibold text-emerald-600">Active</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Uploaded and indexed database</p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Match Score</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800">{avgScore}%</span>
            <span className="text-xs text-slate-400">Target: 80%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Weighted metric compliance</p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Strong Matches</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800">{strongMatches}</span>
            <span className="text-xs font-semibold text-emerald-600">Score &gt;= 80%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Highly matched candidates</p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Needs Review</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-800">{needsReview}</span>
            <span className="text-xs font-semibold text-amber-600">Score 50-79%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Requiring manually verified claims</p>
        </div>
      </div>

      {/* Core Principle Callout */}
      <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-4xl">
          <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-50" />
            <span>Eliminating AI Hallucinations in Recruitment</span>
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike standard AI screeners that make unchecked assertions, ProofHire extracts a verifiable <strong>Evidence Trail</strong> for every match score. Click on any claim badge to examine the exact verbatim text snippet mapped directly back to the candidate's PDF.
          </p>
        </div>
        <div className="flex-shrink-0 text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 shadow-sm">
          Evidence-First Philosophy
        </div>
      </div>

      {/* Candidates List Summary Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recently Screened Candidates</h3>
            <p className="text-xs text-slate-400 font-medium">Quick dashboard metrics for the last candidate analyses</p>
          </div>
          <button
            onClick={() => setActivePage('candidates')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Manage All Candidates
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3.5">Candidate</th>
                <th className="px-6 py-3.5">Target Job Role</th>
                <th className="px-6 py-3.5">Overall Fit</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {candidates.map((candidate) => {
                const analysis = analyses[candidate.id];
                const score = analysis?.matchResult.overallScore || 0;
                const status = analysis?.matchResult.status || 'Needs Review';
                const jobTitle = analysis?.jobTitle || 'Unassigned';

                const statusColors = {
                  'Strong Match': 'bg-emerald-50 text-emerald-700 border-emerald-100',
                  'Good Match': 'bg-blue-50 text-blue-700 border-blue-100',
                  'Needs Review': 'bg-amber-50 text-amber-700 border-amber-100',
                  'No Match': 'bg-rose-50 text-rose-700 border-rose-100'
                };

                return (
                  <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{candidate.name}</div>
                      <div className="text-xs text-slate-400">{candidate.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{jobTitle}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              score >= 80 ? 'bg-emerald-500' : score >= 70 ? 'bg-blue-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-800 text-xs">{score}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[status] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSelectCandidate(candidate.id)}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg shadow-sm hover:border-slate-300 transition-colors"
                      >
                        Inspect Evidence
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
