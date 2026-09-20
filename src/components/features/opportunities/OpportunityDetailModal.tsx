import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, FileText, HelpCircle, Building2, Calendar, Award, Sparkles } from 'lucide-react';
import { Opportunity } from '../../../types';
import { AIMatchBadge } from '../ai/AIMatchBadge';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose
}) => {
  if (!opportunity) return null;

  const handleApplyClick = () => {
    window.open(opportunity.officialWebsite, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="glass-panel rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-700/80 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {opportunity.logoUrl && (
              <img
                src={opportunity.logoUrl}
                alt={opportunity.title}
                className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-700"
              />
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
                  {opportunity.category}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ● {opportunity.status}
                </span>
              </div>
              <h2 className="font-extrabold text-xl text-white leading-snug">
                {opportunity.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {opportunity.score && <AIMatchBadge score={opportunity.score} />}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-200">
          {/* AI Reasoning if present */}
          {opportunity.reason && (
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1">AI Personal Match Reason</h4>
                <p className="text-sm text-indigo-100 leading-relaxed font-medium">{opportunity.reason}</p>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{opportunity.description}</p>
          </div>

          {/* Benefits */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-2">
              <Award className="w-4 h-4" />
              <span>Key Benefits & Subsidies</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{opportunity.benefits}</p>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Eligibility Requirements</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{opportunity.eligibility}</p>
          </div>

          {/* Required Documents */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" />
              <span>Required Documents</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{opportunity.requiredDocuments}</p>
          </div>

          {/* Application Process */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Application Steps</span>
            </h3>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {opportunity.applicationProcess}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          {opportunity.faq && (
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {opportunity.faq}
              </div>
            </div>
          )}

          {/* Metadata Footer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span><strong>Department:</strong> {opportunity.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span><strong>Deadline:</strong> {opportunity.deadline}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Redirects securely to official portal</span>
          </div>

          <button
            onClick={handleApplyClick}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
