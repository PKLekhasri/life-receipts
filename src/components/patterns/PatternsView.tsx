import React, { useState } from 'react';
import { LifePattern } from '../../types/pattern';
import { LifeReceipt } from '../../types/receipt';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { Cpu, Sparkles, Moon, Compass, MapPin, Zap, Headphones, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

interface PatternsViewProps {
  patterns: LifePattern[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

const iconMap: Record<string, any> = {
  Moon,
  Compass,
  MapPin,
  Zap,
  Headphones,
  Cpu
};

export const PatternsView: React.FC<PatternsViewProps> = ({ patterns, onSelectReceipt }) => {
  const [activePatternId, setActivePatternId] = useState<string | null>(patterns[0]?.id || null);

  const selectedPattern = patterns.find(p => p.id === activePatternId) || patterns[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Algorithmic Habit Detection</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Discover Patterns</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Our Pattern Engine computes recurring routines, peak activity windows, favorite sanctuaries, and creative bursts from actual data timestamps.
        </p>
      </div>

      {/* Grid of Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map(pat => {
          const IconComp = iconMap[pat.iconName] || Cpu;
          const isSelected = pat.id === selectedPattern?.id;

          return (
            <div
              key={pat.id}
              onClick={() => setActivePatternId(pat.id)}
              className={`glass-panel p-6 rounded-3xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                isSelected
                  ? 'border-purple-500/50 bg-gradient-to-b from-purple-950/20 to-slate-900/60 shadow-xl shadow-purple-500/10'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-extrabold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {pat.confidenceScore}% Confidence
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-white">{pat.title}</h3>
                  <p className="text-xs font-bold text-indigo-300 mt-0.5">{pat.subtitle}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {pat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="font-mono text-purple-300 font-extrabold">
                  {pat.percentageOrMetric}
                </span>
                <span className="flex items-center gap-1 text-slate-300 font-bold">
                  <span>Inspect Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pattern Evidence Inspector */}
      {selectedPattern && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 bg-purple-950/20 space-y-6">
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-extrabold text-white">
                Underlying Pattern Evidence: {selectedPattern.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-300">
              {selectedPattern.evidenceReceipts.length} Matching Receipts
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedPattern.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedPattern.evidenceReceipts.map(r => (
              <div
                key={r.id}
                onClick={() => onSelectReceipt(r)}
                className="p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex items-center justify-between">
                  <CategoryBadge category={r.category} size="sm" />
                  <span className="text-[10px] text-slate-400">{formatDateTime(r.timestamp)}</span>
                </div>
                <h4 className="font-bold text-xs text-white truncate">{r.title}</h4>
                <p className="text-[11px] text-slate-400 truncate">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
