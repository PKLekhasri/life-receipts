import React from 'react';
import { FilterState, ReceiptCategory, FilterPreset } from '../../types/receipt';
import { ALL_RECEIPT_CATEGORIES } from '../../constants/categories';
import { Search, ArrowUpDown, RefreshCw } from 'lucide-react';

interface ExplorerFiltersProps {
  filters: FilterState;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: ReceiptCategory | 'ALL') => void;
  onPresetChange: (preset: FilterPreset) => void;
  onSortChange: (sortBy: FilterState['sortBy']) => void;
  onResetFilters: () => void;
}

export const ExplorerFilters: React.FC<ExplorerFiltersProps> = ({
  filters,
  onSearchChange,
  onCategoryChange,
  onPresetChange,
  onSortChange,
  onResetFilters
}) => {
  const presets: { id: FilterPreset; label: string }[] = [
    { id: 'all', label: 'All Moments' },
    { id: 'connected', label: 'Connected Moments' },
    { id: 'important', label: 'Important Moments' },
    { id: 'unusual', label: 'Unusual Moments' },
    { id: 'recurring', label: 'Recurring Patterns' }
  ];

  const categories: (ReceiptCategory | 'ALL')[] = ['ALL', ...ALL_RECEIPT_CATEGORIES];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search title, description, artist, merchant, place, tags..."
            aria-label="Search digital moments"
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-slate-900 px-3 py-2 rounded-2xl border border-slate-800 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
              aria-label="Sort receipts"
              className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="timestamp-desc" className="bg-slate-900">Newest First</option>
              <option value="timestamp-asc" className="bg-slate-900">Oldest First</option>
              <option value="importance-desc" className="bg-slate-900">Highest Importance</option>
              <option value="amount-desc" className="bg-slate-900">Highest Amount</option>
            </select>
          </div>

          <button
            onClick={onResetFilters}
            aria-label="Reset all filters"
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-2xl border border-slate-800 transition-colors"
            title="Reset all filters"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
          Presets:
        </span>
        {presets.map(p => (
          <button
            key={p.id}
            onClick={() => onPresetChange(p.id)}
            aria-pressed={filters.preset === p.id}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filters.preset === p.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800/80">
        {categories.map(cat => {
          const isSelected = filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              aria-pressed={isSelected}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
