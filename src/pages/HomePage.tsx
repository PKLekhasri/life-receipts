import React from 'react';
import { LifeReceipt } from '../types/receipt';
import { StoryConnection } from '../types/connection';
import { StoryChapter } from '../types/chapter';
import { LifePattern } from '../types/pattern';
import { TraceableInsight } from '../types/insight';
import { CategoryBadge } from '../components/common/Badge';
import { ThingsYouMissed } from '../components/insights/ThingsYouMissed';
import { ConnectionGraph } from '../components/connections/ConnectionGraph';
import { LifeRhythmChart } from '../components/charts/LifeRhythmChart';
import { ReceiptGrid } from '../components/receipts/ReceiptGrid';
import { StoryChaptersView } from '../components/chapters/StoryChaptersView';
import { LifeJourneyTimeline } from '../components/timeline/LifeJourneyTimeline';
import { Sparkles, Compass, Network, Cpu, BookOpen, Clock, Play, ArrowRight, Activity, Award, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  receipts: LifeReceipt[];
  connections: StoryConnection[];
  patterns: LifePattern[];
  chapters: StoryChapter[];
  insights: TraceableInsight[];
  stats: {
    totalMoments: number;
    activeDays: number;
    dominantCategory: string;
    mostActivePeriod: string;
    topRecurringTheme: string;
    strongestConnection: StoryConnection | null;
    importantMomentsCount: number;
  };
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onOpenStoryMode: () => void;
  onNavigateTab: (tab: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  receipts,
  connections,
  patterns,
  chapters,
  insights,
  stats,
  onSelectReceipt,
  onOpenStoryMode,
  onNavigateTab
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* 1. HERO & EDITORIAL NARRATIVE SUMMARY */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Interactive Digital-Life Storytelling</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none">
          Your Life <span className="gradient-text">In Receipts</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          From late-night ambient music sessions to weekend coastal journeys and hackathon sprints, this dataset tells a story of creative exploration, changing routines, and meaningful connections.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenStoryMode}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current animate-pulse" />
            <span>Launch Story Mode Tour</span>
          </button>

          <button
            onClick={() => onNavigateTab('connections')}
            className="flex items-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-2xl border border-slate-800 transition-colors"
          >
            <Network className="w-4 h-4 text-indigo-400" />
            <span>Explore Connection Graph</span>
          </button>
        </div>

        {/* Story Phases Generated from Dataset */}
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
      </section>

      {/* 2. KEY INSIGHT METRICS CARDS */}
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
            <span className="text-2xl font-black text-amber-400 font-mono">{connections.length}</span>
            <p className="text-[11px] text-slate-400 font-medium">Connected Clusters</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1 bg-slate-900/40">
            <span className="text-2xl font-black text-pink-400 font-mono">{stats.importantMomentsCount}</span>
            <p className="text-[11px] text-slate-400 font-medium">Key Moments</p>
          </div>
        </div>
      </section>

      {/* 3. STORY CHAPTERS SECTION */}
      <section className="space-y-6">
        <StoryChaptersView
          chapters={chapters}
          onExploreChapter={() => onNavigateTab('chapters')}
          onSelectReceipt={onSelectReceipt}
        />
      </section>

      {/* 4. LIFE JOURNEY SECTION */}
      <section>
        <LifeJourneyTimeline
          receipts={receipts}
          chapters={chapters}
          onSelectReceipt={onSelectReceipt}
          onSelectChapter={() => onNavigateTab('chapters')}
        />
      </section>

      {/* 5. THINGS YOU MIGHT HAVE MISSED */}
      <section>
        <ThingsYouMissed
          insights={insights}
          onSelectReceipt={onSelectReceipt}
        />
      </section>

      {/* 6. CONNECTED MOMENTS GRAPH PREVIEW */}
      <section>
        <ConnectionGraph
          nodes={connections.length > 0 ? connections.flatMap(c => c.receipts).slice(0, 10).map((r, idx) => ({ id: r.id, receipt: r, degree: 2 })) : []}
          links={[]}
          onSelectReceipt={onSelectReceipt}
        />
      </section>

      {/* 7. LIFE RHYTHM CHART */}
      <section>
        <LifeRhythmChart
          receipts={receipts}
          onSelectHour={() => onNavigateTab('explorer')}
          onSelectDay={() => onNavigateTab('explorer')}
        />
      </section>

      {/* 8. EXPLORE ALL RECEIPTS PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Recent Moments Preview</h2>
            <p className="text-xs text-slate-400 mt-1">Explore all individual records or filter by category.</p>
          </div>

          <button
            onClick={() => onNavigateTab('explorer')}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
          >
            <span>Open Full Receipt Explorer →</span>
          </button>
        </div>

        <ReceiptGrid
          receipts={receipts.slice(0, 6)}
          onSelectReceipt={onSelectReceipt}
        />
      </section>
    </div>
  );
};
