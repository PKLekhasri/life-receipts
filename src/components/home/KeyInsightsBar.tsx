import React from 'react';
import { StoryConnection } from '../../types/connection';

interface KeyInsightsBarProps {
  stats: {
    totalMoments: number;
    activeDays: number;
    dominantCategory: string;
    mostActivePeriod: string;
    topRecurringTheme: string;
    strongestConnection: StoryConnection | null;
    importantMomentsCount: number;
  };
  connectionCount: number;
}

export const KeyInsightsBar: React.FC<KeyInsightsBarProps> = ({ stats, connectionCount }) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">
        KEY DATA METRICS AT A GLANCE
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-2xl font-black text-white font-mono">{stats.totalMoments}</span>
          <p className="text-[11px] text-slate-400 font-medium">Total Moments</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-2xl font-black text-indigo-400 font-mono">{stats.activeDays}</span>
          <p className="text-[11px] text-slate-400 font-medium">Active Days</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-xl font-black text-purple-400 truncate block">{stats.dominantCategory}</span>
          <p className="text-[11px] text-slate-400 font-medium">Dominant Driver</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-xs font-bold text-emerald-400 truncate block mt-1">{stats.mostActivePeriod}</span>
          <p className="text-[11px] text-slate-400 font-medium">Peak Activity</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-2xl font-black text-amber-400 font-mono">{connectionCount}</span>
          <p className="text-[11px] text-slate-400 font-medium">Connected Clusters</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-2xl font-black text-pink-400 font-mono">{stats.importantMomentsCount}</span>
          <p className="text-[11px] text-slate-400 font-medium">Key Moments</p>
        </div>
      </div>
    </section>
  );
};
