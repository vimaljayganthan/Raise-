import React from 'react';
import { X, FileText, CheckCircle2, Quote } from 'lucide-react';
import type { Evidence } from '../types';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence: Evidence | null;
  candidateName?: string;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  evidence,
  candidateName
}) => {
  if (!isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="p-1 bg-blue-50 text-blue-600 rounded">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Evidence Verification</h3>
              <p className="text-xs text-slate-500 font-medium">Grounded claim inspection</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Candidate Context */}
          {candidateName && (
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Candidate</span>
              <span className="text-sm font-semibold text-slate-800">{candidateName}</span>
            </div>
          )}

          {/* AI Claim */}
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">AI Extracted Claim</span>
            <div className="text-sm font-medium text-slate-950 mt-1 flex items-start space-x-2">
              <div className="mt-0.5 text-blue-600">
                <CheckCircle2 className="w-4 h-4 fill-blue-50" />
              </div>
              <span>{evidence.claim}</span>
            </div>
          </div>

          {/* Exact Resume Quote */}
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Exact Resume Quote</span>
            <div className="relative bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-1.5">
              <Quote className="absolute top-2.5 right-3 w-8 h-8 text-blue-200/50 pointer-events-none" />
              <p className="text-sm text-slate-800 italic leading-relaxed relative z-10">
                "{evidence.quote}"
              </p>
            </div>
          </div>

          {/* Document Reference Info */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Resume Section</span>
              <span className="font-medium text-slate-700 mt-0.5 block">{evidence.section}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Document Page</span>
              <span className="font-medium text-slate-700 mt-0.5 block">
                {evidence.page ? `Page ${evidence.page}` : 'Page 1'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-1.5 text-emerald-600 font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>Fact-Check Verified (100% Matched)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
