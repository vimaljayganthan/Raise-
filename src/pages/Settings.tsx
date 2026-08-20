import React, { useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, User, Sparkles, Check } from 'lucide-react';

interface SettingsProps {
  recruiter: {
    name: string;
    email: string;
    company: string;
  };
  setRecruiter: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    company: string;
  }>>;
}

export const Settings: React.FC<SettingsProps> = ({ recruiter, setRecruiter }) => {
  const [name, setName] = useState(recruiter.name);
  const [email, setEmail] = useState(recruiter.email);
  const [company, setCompany] = useState(recruiter.company);
  
  // AI Settings States
  const [strictness, setStrictness] = useState<'strict' | 'balanced' | 'relaxed'>('strict');
  const [requireEvidence, setRequireEvidence] = useState(true);
  const [semanticMatching, setSemanticMatching] = useState(true);
  const [weights, setWeights] = useState({
    technical: 40,
    experience: 30,
    education: 15,
    projects: 15
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setRecruiter({ name, email, company });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleWeightChange = (category: keyof typeof weights, value: number) => {
    setWeights(prev => {
      const updated = { ...prev, [category]: value };
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <SettingsIcon className="w-6 h-6 text-slate-700" />
          <span>Application Settings</span>
        </h1>
        <p className="text-xs text-slate-400 font-medium">Configure AI screening strictness thresholds and profile credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Recruiter Details Panel (5 cols) */}
        <form onSubmit={handleSave} className="md:col-span-5 bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-5">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2.5 flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-500" />
            <span>Recruiter Profile</span>
          </h3>

          <div className="space-y-4 text-xs font-semibold text-slate-600">
            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="recruiter-name" className="block text-slate-500 uppercase tracking-wide">Recruiter Name</label>
              <input
                id="recruiter-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="recruiter-email" className="block text-slate-500 uppercase tracking-wide">Work Email</label>
              <input
                id="recruiter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label htmlFor="recruiter-company" className="block text-slate-500 uppercase tracking-wide">Company Name</label>
              <input
                id="recruiter-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all text-xs shadow-sm"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Profile Updated</span>
              </>
            ) : (
              <span>Save Profile Changes</span>
            )}
          </button>
        </form>

        {/* AI Screening Controls Panel (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-xl shadow-sm border border-slate-200/80 p-6 space-y-6">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2.5 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AI Evidence & Strictness Options</span>
          </h3>

          {/* Strictness Toggles */}
          <div className="space-y-5 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-slate-500 uppercase tracking-wide block">Verification Strictness Mode</span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'strict', label: 'Strict Fact-Check', desc: 'No Hallucinations' },
                  { id: 'balanced', label: 'Balanced', desc: 'Allow Context' },
                  { id: 'relaxed', label: 'Generative Assist', desc: 'Direct Search' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setStrictness(mode.id as any)}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      strictness === mode.id
                        ? 'bg-blue-50/50 border-blue-500 text-blue-700 shadow-sm ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-slate-800 text-[11px]">{mode.label}</span>
                    <span className="text-[9px] text-slate-400 font-semibold mt-1 leading-none">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox settings */}
            <div className="space-y-3.5 pt-2 border-t border-slate-100 font-semibold text-slate-700">
              {/* Option 1 */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireEvidence}
                  onChange={(e) => setRequireEvidence(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="block text-slate-800 text-xs">Require evidence for candidate claims</span>
                  <span className="block text-[10px] text-slate-400 font-medium">Claims lacking direct verbatim verification return a "Not Found" status.</span>
                </div>
              </label>

              {/* Option 2 */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={semanticMatching}
                  onChange={(e) => setSemanticMatching(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="block text-slate-800 text-xs">Activate Semantic Keyword Expansion</span>
                  <span className="block text-[10px] text-slate-400 font-medium">Identify synonyms (e.g. mapping "ScyllaDB" experience to general "NoSQL" requirement).</span>
                </div>
              </label>
            </div>

            {/* Scoring Weights sliders */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-500 uppercase tracking-wide">Match Scoring Weight Coefficients</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold border border-slate-200">
                  Total: {weights.technical + weights.experience + weights.education + weights.projects}%
                </span>
              </div>

              <div className="space-y-3 font-semibold text-xs text-slate-600">
                {/* Technical slider */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Technical Skills Weight</span>
                    <span className="font-bold">{weights.technical}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={weights.technical}
                    onChange={(e) => handleWeightChange('technical', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Experience slider */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Tenure & Job History Weight</span>
                    <span className="font-bold">{weights.experience}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={weights.experience}
                    onChange={(e) => handleWeightChange('experience', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Education slider */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Education Background Weight</span>
                    <span className="font-bold">{weights.education}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={weights.education}
                    onChange={(e) => handleWeightChange('education', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Projects slider */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Projects & Achievements Weight</span>
                    <span className="font-bold">{weights.projects}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={weights.projects}
                    onChange={(e) => handleWeightChange('projects', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200/50 p-3 rounded-lg flex items-start space-x-2 text-[10px] text-blue-700 leading-normal font-medium">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5 animate-pulse" />
                <span>Modifying weight coefficients adjusts the weighted averages displayed in the circular Match Score indicators and candidates ranking tables instantly.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
