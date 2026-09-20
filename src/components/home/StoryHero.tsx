import React from 'react';
import { Sparkles, Play, Network } from 'lucide-react';
import { APP_META } from '../../constants/configuration';

interface StoryHeroProps {
  onOpenStoryMode: () => void;
  onNavigateConnections: () => void;
}

export const StoryHero: React.FC<StoryHeroProps> = ({ onOpenStoryMode, onNavigateConnections }) => {
  return (
    <div className="text-center max-w-4xl mx-auto space-y-6">
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
          onClick={onNavigateConnections}
          className="flex items-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm rounded-2xl border border-slate-800 transition-colors"
        >
          <Network className="w-4 h-4 text-indigo-400" />
          <span>Explore Connection Graph</span>
        </button>
      </div>
    </div>
  );
};
