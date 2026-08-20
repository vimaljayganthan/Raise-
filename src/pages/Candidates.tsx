import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, UserX, AlertCircle } from 'lucide-react';
import type { Candidate, CandidateAnalysis } from '../types';

interface CandidatesProps {
  candidates: Candidate[];
  analyses: Record<string, CandidateAnalysis>;
  setActivePage: (page: string) => void;
  setSelectedCandidateId: (id: string) => void;
}

type ScoreFilter = 'all' | 'strong' | 'good' | 'review' | 'nomatch';
type ExperienceFilter = 'all' | 'senior' | 'mid' | 'junior';

export const Candidates: React.FC<CandidatesProps> = ({
  candidates,
  analyses,
  setActivePage,
  setSelectedCandidateId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>('all');
  const [expFilter, setExpFilter] = useState<ExperienceFilter>('all');
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidateId(id);
    setActivePage('candidate-detail');
  };

  // Filter & Sort Logic
  const filteredAndSortedCandidates = useMemo(() => {
    return candidates
      .filter(c => {
        const analysis = analyses[c.id];
        const score = analysis?.matchResult.overallScore || 0;
        
        // Search Filter
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          (analysis?.jobTitle || '').toLowerCase().includes(query) ||
          c.skills.some(cat => cat.items.some(s => s.toLowerCase().includes(query)));

        if (!matchesQuery) return false;

        // Score Filter
        if (scoreFilter === 'strong' && score < 80) return false;
        if (scoreFilter === 'good' && (score < 70 || score >= 80)) return false;
        if (scoreFilter === 'review' && (score < 50 || score >= 70)) return false;
        if (scoreFilter === 'nomatch' && score >= 50) return false;

        // Experience Filter
        const primaryExp = c.experience[0]?.title.toLowerCase() || '';
        const isSeniorTitle = primaryExp.includes('senior') || primaryExp.includes('lead') || primaryExp.includes('manager');
        const isMidTitle = !isSeniorTitle && (primaryExp.includes('engineer') || primaryExp.includes('developer') || primaryExp.includes('ii'));
        
        if (expFilter === 'senior' && !isSeniorTitle) return false;
        if (expFilter === 'mid' && !isMidTitle) return false;
        if (expFilter === 'junior' && (isSeniorTitle || isMidTitle)) return false;

        return true;
      })
      .sort((a, b) => {
        const analysisA = analyses[a.id];
        const analysisB = analyses[b.id];
        const scoreA = analysisA?.matchResult.overallScore || 0;
        const scoreB = analysisB?.matchResult.overallScore || 0;

        if (sortBy === 'score') {
          return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
        } else {
          return sortOrder === 'desc' 
            ? b.name.localeCompare(a.name) 
            : a.name.localeCompare(b.name);
        }
      });
  }, [candidates, analyses, searchQuery, scoreFilter, expFilter, sortBy, sortOrder]);

  const toggleSort = (type: 'score' | 'name') => {
    if (sortBy === type) {
      setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(type);
      setSortOrder('desc');
    }
  };

  const statusColors = {
    'Strong Match': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Good Match': 'bg-blue-50 text-blue-700 border-blue-100',
    'Needs Review': 'bg-amber-50 text-amber-700 border-amber-100',
    'No Match': 'bg-rose-50 text-rose-700 border-rose-100'
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>Candidate Screening Ledger</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-bold border border-slate-200">
              {filteredAndSortedCandidates.length} Active
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Rank, analyze, and filter candidate resume profiles by evidence compatibility</p>
        </div>
        <button
          onClick={() => setActivePage('analyze')}
          className="self-start sm:self-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-sm hover:shadow transition-colors"
        >
          Screen New Resume
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates, skills, position..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filters dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Score filter */}
          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value as ScoreFilter)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none"
          >
            <option value="all">Score: All</option>
            <option value="strong">Strong Match (80+)</option>
            <option value="good">Good Match (70-79)</option>
            <option value="review">Needs Review (50-69)</option>
            <option value="nomatch">No Match (&lt;50)</option>
          </select>

          {/* Experience level filter */}
          <select
            value={expFilter}
            onChange={(e) => setExpFilter(e.target.value as ExperienceFilter)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none"
          >
            <option value="all">Exp: All</option>
            <option value="senior">Senior / Mgr</option>
            <option value="mid">Mid-Level</option>
            <option value="junior">Junior</option>
          </select>

          {/* Sort By Toggle button */}
          <button
            onClick={() => toggleSort('score')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              sortBy === 'score' 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <span>Score</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Datatable */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
        {filteredAndSortedCandidates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider select-none">
                  <th className="px-6 py-4 text-center w-16">Rank</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-800" onClick={() => toggleSort('name')}>
                    <span className="flex items-center space-x-1">
                      <span>Candidate</span>
                      {sortBy === 'name' && <span className="text-[10px]">{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </span>
                  </th>
                  <th className="px-6 py-4">Position Screened</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-800" onClick={() => toggleSort('score')}>
                    <span className="flex items-center space-x-1">
                      <span>Match Score</span>
                      {sortBy === 'score' && <span className="text-[10px]">{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                    </span>
                  </th>
                  <th className="px-6 py-4">Tenure Level</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAndSortedCandidates.map((candidate, index) => {
                  const analysis = analyses[candidate.id];
                  const score = analysis?.matchResult.overallScore || 0;
                  const status = analysis?.matchResult.status || 'Needs Review';
                  const jobTitle = analysis?.jobTitle || 'Unassigned';
                  
                  // Extract primary experience duration/title
                  const primaryExpTitle = candidate.experience[0]?.title || 'Not Listed';
                  const primaryCompany = candidate.experience[0]?.company || '';

                  return (
                    <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-400 text-center">
                        #{index + 1}
                      </td>
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
                          <span className="font-bold text-slate-800 text-xs">{score}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700 font-medium truncate max-w-[180px]">{primaryExpTitle}</div>
                        <div className="text-xs text-slate-400">{primaryCompany}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[status] || 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleSelectCandidate(candidate.id)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white rounded-lg transition-colors shadow-sm"
                        >
                          <span>Verify Fit</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-4">
            <div className="inline-flex p-4 bg-slate-100 text-slate-400 rounded-full">
              <UserX className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-700 text-sm">No candidates match active filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We couldn't find any candidate matching your search queries. Try clearing some metrics tags or search query keywords.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setScoreFilter('all');
                setExpFilter('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Footer warning */}
      <div className="flex items-center justify-center space-x-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
        <span>Grounded recruitment verification: Claims check database values against uploaded pdf segments only.</span>
      </div>
    </div>
  );
};
