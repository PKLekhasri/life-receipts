import React from 'react';
import { StoryConnection, GraphNode, GraphLink } from '../../types/connection';
import { LifeReceipt } from '../../types/receipt';
import { ConnectionGraph } from './ConnectionGraph';
import { CategoryBadge } from '../common/Badge';
import { formatTime, formatDate } from '../../utils/dateUtils';
import { Network, Sparkles, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

interface ConnectionsViewProps {
  connections: StoryConnection[];
  graphData: { nodes: GraphNode[]; links: GraphLink[] };
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({
  connections,
  graphData,
  onSelectReceipt
}) => {
  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <Network className="w-3.5 h-3.5" />
          <span>Core Hackathon Innovation</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Discover Connections</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Moments rarely happen in isolation. When songs, places, photos, purchases, and notes overlap in time or theme, our Pattern Engine synthesizes them into explainable story connections.
        </p>
      </div>

      {/* Interactive Graph Component */}
      <ConnectionGraph
        nodes={graphData.nodes}
        links={graphData.links}
        onSelectReceipt={onSelectReceipt}
      />

      {/* Story Connection Clusters List */}
      <div className="space-y-6">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Story Connection Clusters ({connections.length})</span>
        </h3>

        <div className="space-y-6">
          {connections.map(conn => (
            <div
              key={conn.id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 bg-slate-900/40 hover:border-indigo-500/40 transition-all"
            >
              {/* Header: Title + Connection Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-400 font-mono">
                      STORY CONNECTION
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono">
                      {conn.connectionScore}/100 Match Score
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white">{conn.title}</h4>
                  <p className="text-xs text-slate-400">{conn.summary}</p>
                </div>

                {conn.primaryLocation && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{conn.primaryLocation}</span>
                  </div>
                )}
              </div>

              {/* Narrative Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 italic">
                "{conn.suggestedNarrative}"
              </p>

              {/* WHY CONNECTED CHECKLIST */}
              <div className="space-y-2">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>WHY ARE THESE CONNECTED?</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {conn.reasons.map((r, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300">
                      <span className="text-emerald-400 font-extrabold">✓</span>
                      <div>
                        <span className="font-bold text-slate-200">{r.label}:</span>{' '}
                        <span className="text-slate-400">{r.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sequence of Moments in Cluster */}
              <div className="space-y-3">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Moment Chain ({conn.receipts.length} Connected Items)
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {conn.receipts.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => onSelectReceipt(r)}
                      className="p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <CategoryBadge category={r.category} size="sm" />
                        <span className="text-[10px] text-slate-400 font-mono">{formatTime(r.timestamp)}</span>
                      </div>

                      <div>
                        <h6 className="font-bold text-xs text-white group-hover:text-indigo-300 truncate">
                          {r.title}
                        </h6>
                        <p className="text-[11px] text-slate-400 truncate">{r.description}</p>
                      </div>

                      <div className="flex items-center justify-end text-[10px] font-bold text-indigo-400 pt-1">
                        <span>Inspect →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
