import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, ChevronRight, AlertCircle, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { Candidate } from '../types';

interface AnalyzeProps {
  onAnalysisComplete: (candidateId: string) => void;
  mockCandidates: Candidate[];
}

interface LoadingStep {
  id: number;
  text: string;
  status: 'pending' | 'loading' | 'complete';
}

const JOB_TEMPLATES = [
  {
    id: 'fs',
    title: 'Senior Full-Stack React/Node.js Developer',
    description: 'Seeking a Senior Full-Stack Engineer with 5+ years of professional software engineering experience. Expertise in React, Node.js, and TypeScript is required. Must have experience leading teams, building microservices, and collaborating in a cloud environment (AWS preferred). Candidates should hold a BS in Computer Science or a related technical discipline from a top-tier university.',
    mockId: 'sarah-jenkins'
  },
  {
    id: 'ml',
    title: 'Machine Learning / NLP Engineer',
    description: 'Seeking an ML Engineer with deep expertise in Natural Language Processing, Transformer architectures, and Large Language Models (LLMs). Requires experience in model fine-tuning, training infrastructures (PyTorch/DeepSpeed), and vector databases. An MS or PhD in Computer Science or AI specialization from a top institution is highly preferred.',
    mockId: 'david-chen'
  },
  {
    id: 'do',
    title: 'DevOps / Infrastructure Engineer',
    description: 'Looking for a DevOps Engineer with 4+ years of experience. Required skills include Kubernetes orchestration, Terraform (IaC), AWS cloud deployments, and CI/CD pipelines. Certifications like CKA or AWS Solutions Architect are highly desired.',
    mockId: 'aisha-patel'
  }
];

export const Analyze: React.FC<AnalyzeProps> = ({ onAnalysisComplete, mockCandidates }) => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  
  // Validation errors
  const [error, setError] = useState<string | null>(null);
  
  // Processing Pipeline States
  const [isProcessing, setIsProcessing] = useState(false);

  const [progressPercent, setProgressPercent] = useState(0);
  
  const [steps, setSteps] = useState<LoadingStep[]>([
    { id: 1, text: 'Reading resume structure...', status: 'pending' },
    { id: 2, text: 'Extracting candidate text segments...', status: 'pending' },
    { id: 3, text: 'Identifying profile claims & skills...', status: 'pending' },
    { id: 4, text: 'Cross-referencing job requirements...', status: 'pending' },
    { id: 5, text: 'Generating evidence-backed explanation...', status: 'pending' },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-fill template job description
  const handleSelectTemplate = (templateId: string, desc: string) => {
    setSelectedTemplateId(templateId);
    setJobDescription(desc);
    setError(null);
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/msword' // doc
    ];
    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(selectedFile.type) && !['pdf', 'docx', 'doc'].includes(extension || '')) {
      setError('Unsupported file type. Please upload a PDF or Word document (.docx/.doc).');
      setFile(null);
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File is too large. Maximum size allowed is 10MB.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Start analysis simulation
  const handleAnalyze = () => {
    if (!file) {
      setError('Please upload a candidate resume to begin.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste a job description or select a template to compare against.');
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProgressPercent(0);
    
    // Reset steps to pending
    setSteps(prev => prev.map(s => ({ ...s, status: s.id === 1 ? 'loading' : 'pending' })));
  };

  // Simulate pipeline execution
  useEffect(() => {
    if (!isProcessing) return;

    const stepDurations = [1200, 1500, 1600, 1800, 1400]; // Duration for each step in ms
    let timer: any;

    const runStep = (index: number) => {
      if (index >= steps.length) {
        // Complete! Route to candidate detail
        // Determine which candidate data to load
        let targetCandidateId = 'sarah-jenkins'; // default fallback
        
        if (selectedTemplateId) {
          const matchTemplate = JOB_TEMPLATES.find(t => t.id === selectedTemplateId);
          if (matchTemplate) {
            targetCandidateId = matchTemplate.mockId;
          }
        } else {
          // If custom text is typed, try semantic match or random selection
          const lowercaseJD = jobDescription.toLowerCase();
          if (lowercaseJD.includes('machine') || lowercaseJD.includes('learning') || lowercaseJD.includes('ai') || lowercaseJD.includes('nlp')) {
            targetCandidateId = 'david-chen';
          } else if (lowercaseJD.includes('devops') || lowercaseJD.includes('infrastructure') || lowercaseJD.includes('cloud')) {
            targetCandidateId = 'aisha-patel';
          } else if (lowercaseJD.includes('product') || lowercaseJD.includes('manager') || lowercaseJD.includes('pm')) {
            targetCandidateId = 'elena-rostova';
          } else if (lowercaseJD.includes('frontend') || lowercaseJD.includes('ui') || lowercaseJD.includes('css')) {
            targetCandidateId = 'marcus-thompson';
          } else {
            // Random choice
            const ids = mockCandidates.map(c => c.id);
            targetCandidateId = ids[Math.floor(Math.random() * ids.length)];
          }
        }

        setIsProcessing(false);
        onAnalysisComplete(targetCandidateId);
        return;
      }

      // Progress bar increment
      const stepPercentStart = (index / steps.length) * 100;
      const stepPercentEnd = ((index + 1) / steps.length) * 100;
      const stepDuration = stepDurations[index];
      
      const startTime = Date.now();
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(elapsed / stepDuration, 1);
        setProgressPercent(Math.round(stepPercentStart + ratio * (stepPercentEnd - stepPercentStart)));
        
        if (ratio >= 1) {
          clearInterval(interval);
        }
      }, 50);

      timer = setTimeout(() => {
        setSteps(prev => prev.map((s, idx) => {
          if (idx === index) return { ...s, status: 'complete' };
          if (idx === index + 1) return { ...s, status: 'loading' };
          return s;
        }));
        

        runStep(index + 1);
      }, stepDuration);
    };

    runStep(0);

    return () => {
      clearTimeout(timer);
    };
  }, [isProcessing, selectedTemplateId, jobDescription]);

  if (isProcessing) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 animate-fade-in">
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-full animate-pulse-scale">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Processing Candidate Analysis</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Extracting raw document text and executing evidence-grounded validation against requirements.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Overall Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 divide-y divide-slate-100">
            {steps.map((step) => {
              const isLoading = step.status === 'loading';
              const isComplete = step.status === 'complete';
              const isPending = step.status === 'pending';

              return (
                <div 
                  key={step.id} 
                  className={`flex items-center justify-between py-3.5 first:pt-0 last:pb-0 transition-opacity ${
                    isPending ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                    ) : isLoading ? (
                      <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-slate-300 rounded-full"></div>
                    )}
                    <span className={`text-sm font-medium ${
                      isLoading ? 'text-blue-600 font-bold' : isComplete ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {step.text}
                    </span>
                  </div>
                  {isComplete && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-semibold border border-emerald-100">
                      Verified
                    </span>
                  )}
                  {isLoading && (
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-semibold border border-blue-100 animate-pulse">
                      Running
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Grounded AI Analysis Panel</h1>
        <p className="text-xs text-slate-400 font-medium">Verify resume claims against job description requirements using 100% auditable evidence logs</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-lg flex items-start space-x-3 text-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Verification Error:</span> {error}
          </div>
        </div>
      )}

      {/* Main Form Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Drag and Drop Upload */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Candidate Resume</label>
          
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[300px] ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/40 shadow-inner'
                : file 
                  ? 'border-emerald-500 bg-emerald-50/10'
                  : 'border-slate-300 hover:border-slate-400 bg-white hover:shadow-sm'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.docx,.doc,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
            />

            {file ? (
              <div className="space-y-4 w-full max-w-sm">
                <div className="mx-auto w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm truncate">{file.name}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 rounded-lg transition-colors border border-slate-200/80"
                >
                  Change Document
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">Drag & drop candidate resume here</h4>
                  <p className="text-xs text-slate-400">or click to browse local files</p>
                </div>
                <div className="inline-flex space-x-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  <span>PDF</span>
                  <span>•</span>
                  <span>DOCX</span>
                  <span>•</span>
                  <span>Scanned PDF</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Job Description and Templates */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Job Description</label>
            <span className="text-[10px] text-slate-400 font-medium">Auto-fill templates below</span>
          </div>

          {/* Job Template Selector Quick Pill Badges */}
          <div className="flex flex-wrap gap-2.5">
            {JOB_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tmpl.id, tmpl.description)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  selectedTemplateId === tmpl.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 shadow-sm'
                }`}
              >
                {tmpl.title.split(' ')[0]} - {tmpl.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Job Description TextArea */}
          <div className="flex-grow">
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setSelectedTemplateId(null); // Deselect template since user is editing
              }}
              rows={8}
              placeholder="Paste the target job description requirements here..."
              className="w-full h-full min-h-[220px] bg-white border border-slate-300 rounded-2xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm font-sans resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col items-center justify-center pt-6 space-y-3.5 border-t border-slate-200">
        <button
          onClick={handleAnalyze}
          className="flex items-center space-x-2.5 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow hover:shadow-md transition-all text-sm group"
        >
          <span>Run Fact-Checked Analysis</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        
        {/* Safety Callout */}
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <span>Strict AI Mode active: Missing resume elements are reported as "Not Found" and never inferred.</span>
        </div>
      </div>
    </div>
  );
};
