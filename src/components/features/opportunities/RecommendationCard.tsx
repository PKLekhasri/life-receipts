import React from 'react';
import { ExternalLink, Info, Building2, Calendar, Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Opportunity } from '../../../types';
import { AIMatchBadge } from '../ai/AIMatchBadge';

interface RecommendationCardProps {
  opportunity: Opportunity;
  onViewDetails: (opp: Opportunity) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  opportunity,
  onViewDetails
}) => {
  // Category Pill Styling
  const getCategoryClass = (cat: string) => {
    switch (cat) {
      case 'Scholarship':
        return 'badge-scholarship';
      case 'Government Schemes':
      case 'Scheme':
        return 'badge-scheme';
      case 'Loan':
        return 'badge-loan';
      case 'Healthcare':
        return 'badge-healthcare';
      case 'Job':
        return 'badge-job';
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  // Status Pill Styling
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Open':
        return 'status-open';
      case 'Closing Soon':
        return 'status-closing';
      case 'Closed':
        return 'status-closed';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(opportunity.officialWebsite, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 relative flex flex-col justify-between group">
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {opportunity.logoUrl ? (
              <img
                src={opportunity.logoUrl}
                alt={opportunity.title}
                className="w-12 h-12 rounded-xl object-contain bg-white/90 p-1.5 border border-slate-700/60 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : null}
            <div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getCategoryClass(opportunity.category)}`}>
                {opportunity.category}
              </span>
              <h3 className="font-extrabold text-lg text-white mt-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
                {opportunity.title}
              </h3>
            </div>
          </div>

          {opportunity.score && (
            <AIMatchBadge score={opportunity.score} />
          )}
        </div>

        {/* AI Match Reason Banner if present */}
        {opportunity.reason && (
          <div className="mb-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-200 leading-relaxed font-medium">
              <strong className="text-indigo-300">Why You Qualify: </strong>
              {opportunity.reason}
            </p>
          </div>
        )}

        {/* Short Description */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {opportunity.description}
        </p>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 mb-4 bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate"><strong>Benefits:</strong> {opportunity.benefits}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate"><strong>Eligibility:</strong> {opportunity.eligibility}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate"><strong>Dept:</strong> {opportunity.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="truncate"><strong>Deadline:</strong> {opportunity.deadline}</span>
          </div>
        </div>

        {/* Status and Portal Badges */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${getStatusClass(opportunity.status)}`}>
            ● {opportunity.status}
          </span>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Official Portal Verified
          </span>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
        <button
          onClick={() => onViewDetails(opportunity)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all hover:text-white"
        >
          <Info className="w-4 h-4" />
          <span>View Details</span>
        </button>

        <button
          onClick={handleApplyClick}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <span>Apply on Official Portal</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
