import React from 'react';
import { Sparkles, Compass, Network, Cpu, BookOpen, Clock, Play, Search, Code, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: 'overview' | 'explorer' | 'connections' | 'patterns' | 'chapters' | 'journey';
  setActiveTab: (tab: 'overview' | 'explorer' | 'connections' | 'patterns' | 'chapters' | 'journey') => void;
  onOpenStoryMode: () => void;
  onOpenSearch: () => void;
  onOpenDocumentationModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenStoryMode,
  onOpenSearch,
  onOpenDocumentationModal
}) => {
  const navItems = [
    { id: 'overview', label: 'Story Overview', icon: Sparkles },
    { id: 'explorer', label: 'Explore Moments', icon: Compass },
    { id: 'connections', label: 'Connections Graph', icon: Network },
    { id: 'patterns', label: 'Patterns & Habits', icon: Cpu },
    { id: 'chapters', label: 'Story Chapters', icon: BookOpen },
    { id: 'journey', label: 'Life Journey', icon: Clock }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white tracking-tight">LIFE RECEIPTS</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  Hackathon Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                One dataset. Hundreds of moments. Infinite stories.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-slate-800/60">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Search, Documentation & Story Mode */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all"
              title="Global Search (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDocumentationModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800 transition-all"
              title="Hackathon Criteria & Architecture Docs"
            >
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span>Docs & Architecture</span>
            </button>

            <button
              onClick={onOpenStoryMode}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Play className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>Story Mode</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-800/60 overflow-x-auto gap-2 no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
