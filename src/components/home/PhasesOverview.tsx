import React from 'react';

export const PhasesOverview: React.FC = () => {
  return (
    <div className="pt-8 border-t border-slate-800/80">
      <span className="text-xs font-black uppercase tracking-widest text-slate-400">
        3 PHASES EMERGED FROM THIS PERIOD
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
        <div className="p-5 glass-panel rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 font-mono">
            PHASE 01
          </span>
          <h3 className="font-extrabold text-base text-white">Discovery & Focus</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Solitary late-night focus sessions, ambient electronic music, and coffee notes.
          </p>
        </div>

        <div className="p-5 glass-panel rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 font-mono">
            PHASE 02
          </span>
          <h3 className="font-extrabold text-base text-white">Coastal Connection</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Weekend roadtrips, sunset ocean photography, gelato, and group chat updates.
          </p>
        </div>

        <div className="p-5 glass-panel rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono">
            PHASE 03
          </span>
          <h3 className="font-extrabold text-base text-white">Creative Momentum</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vinyl record discoveries, tech meetups, and frontend architecture sprints.
          </p>
        </div>
      </div>
    </div>
  );
};
