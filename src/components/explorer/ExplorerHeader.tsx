import React from 'react';
import { ViewMode } from '../../types/receipt';
import { Compass, Grid, List } from 'lucide-react';

interface ExplorerHeaderProps {
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
}

export const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({ viewMode, onSetViewMode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
      <div>
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <h1 className="text-3xl font-black text-white tracking-tight">Explore Life Receipts</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Search and filter your digital memories across 9 rich data categories.
        </p>
      </div>

      {/* View Switcher: Grid vs Timeline List */}
      <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
        <button
          onClick={() => onSetViewMode('grid')}
          aria-label="Switch to visual grid view"
          aria-pressed={viewMode === 'grid'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
            viewMode === 'grid'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Visual Grid</span>
        </button>
        <button
          onClick={() => onSetViewMode('timeline')}
          aria-label="Switch to timeline list view"
          aria-pressed={viewMode === 'timeline'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
            viewMode === 'timeline'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>Timeline List</span>
        </button>
      </div>
    </div>
  );
};
