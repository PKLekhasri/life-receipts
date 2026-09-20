import React, { useState } from 'react';
import { TraceableInsight } from '../../types/insight';
import { LifeReceipt } from '../../types/receipt';
import { InsightDetailModal } from './InsightDetailModal';
import { Sparkles, Eye, ShieldCheck, Moon, Zap, CreditCard, FileText } from 'lucide-react';

interface ThingsYouMissedProps {
  insights: TraceableInsight[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Moon,
  Zap,
  CreditCard,
  FileText
};

export const ThingsYouMissed: React.FC<ThingsYouMissedProps> = ({ insights, onSelectReceipt }) => {
  const [selectedInsight, setSelectedInsight] = useState<TraceableInsight | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Things You Might Have Missed</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic insights surfaced from non-obvious patterns in your dataset. Every statement has traceable evidence.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono self-start sm:self-auto">
          {insights.length} Data Insights Detected
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map(ins => {
          const IconComp = iconMap[ins.iconName] || Sparkles;

          return (
            <div
              key={ins.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all flex flex-col justify-between bg-slate-900/40"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    {ins.category}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-white">{ins.title}</h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    "{ins.statement}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {ins.evidenceCount} receipts
                </span>

                <button
                  onClick={() => setSelectedInsight(ins)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-bold text-xs rounded-xl transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Evidence</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight Evidence Modal */}
      <InsightDetailModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
        onSelectReceipt={onSelectReceipt}
      />
    </div>
  );
};
