import React from 'react';
import { TraceableInsight } from '../../types/insight';
import { LifeReceipt } from '../../types/receipt';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Eye } from 'lucide-react';

interface InsightDetailModalProps {
  insight: TraceableInsight | null;
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const InsightDetailModal: React.FC<InsightDetailModalProps> = ({
  insight,
  onClose,
  onSelectReceipt
}) => {
  if (!insight) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="insight-detail-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-300">
              Traceable Evidence Audit
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Statement */}
        <div className="space-y-2">
          <h3 id="insight-detail-title" className="text-2xl font-extrabold text-white tracking-tight">
            {insight.title}
          </h3>
          <p className="text-base text-indigo-200 font-semibold leading-relaxed">
            "{insight.statement}"
          </p>
        </div>

        {/* Why It Matters */}
        <div className="glass-panel p-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-400">
            Why This Insight Matters
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{insight.whyItMatters}</p>
        </div>

        {/* Evidence Receipts List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Underlying Data Evidence ({insight.evidenceCount} Receipts)</span>
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">100% Traceable</span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {insight.evidenceReceipts.map(receipt => (
              <div
                key={receipt.id}
                onClick={() => {
                  onClose();
                  onSelectReceipt(receipt);
                }}
                className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 cursor-pointer transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <CategoryBadge category={receipt.category} size="sm" />
                  <div>
                    <h5 className="font-bold text-xs text-white truncate">{receipt.title}</h5>
                    <p className="text-[11px] text-slate-400 truncate">{formatDateTime(receipt.timestamp)}</p>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 shrink-0">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
