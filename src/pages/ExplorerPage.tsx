import React, { useState } from 'react';
import { LifeReceipt, ViewMode, ReceiptCategory, FilterPreset } from '../types/receipt';
import { StoryConnection } from '../types/connection';
import { useFilters } from '../hooks/useFilters';
import { ReceiptGrid } from '../components/receipts/ReceiptGrid';
import { ReceiptList } from '../components/receipts/ReceiptList';
import { CategoryBadge } from '../components/common/Badge';
import { CategoryDistributionChart } from '../components/charts/CategoryDistributionChart';
import { Search, Grid, List, Sparkles, Filter, RefreshCw, Compass, ArrowUpDown } from 'lucide-react';

interface ExplorerPageProps {
  receipts: LifeReceipt[];
  connections: StoryConnection[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  receipts,
  connections,
  onSelectReceipt
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const {
    filters,
    setCategory,
    setSearchQuery,
    setPreset,
    setFilters,
    resetFilters,
    filteredReceipts
  } = useFilters(receipts, connections);

  const categories: (ReceiptCategory | 'ALL')[] = [
    'ALL',
    'Music',
    'Movies',
    'Places',
    'Purchases',
    'Photos',
    'Messages',
    'Searches',
    'Events',
    'Notes'
  ];

  const presets: { id: FilterPreset; label: string }[] = [
    { id: 'all', label: 'All Moments' },
    { id: 'connected', label: 'Connected Moments' },
    { id: 'important', label: 'Important Moments' },
    { id: 'unusual', label: 'Unusual Moments' },
    { id: 'recurring', label: 'Recurring Patterns' }
  ];

  const connectedReceiptIds = connections.flatMap(c => c.receiptIds);

  return (
    <div className="space-y-8 py-4">
      {/* Editorial Header */}
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
            onClick={() => setViewMode('grid')}
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
            onClick={() => setViewMode('timeline')}
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

      {/* Search Bar & Filter Presets Band */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, description, artist, merchant, place, tags..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-slate-900 px-3 py-2 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="timestamp-desc" className="bg-slate-900">Newest First</option>
                <option value="timestamp-asc" className="bg-slate-900">Oldest First</option>
                <option value="importance-desc" className="bg-slate-900">Highest Importance</option>
                <option value="amount-desc" className="bg-slate-900">Highest Amount</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-2xl border border-slate-800 transition-colors"
              title="Reset all filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
            Presets:
          </span>
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
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

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800/80">
          {categories.map(cat => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
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

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Category Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <CategoryDistributionChart
            receipts={receipts}
            selectedCategory={filters.category}
            onSelectCategory={setCategory}
          />
        </div>

        {/* Right Area: Receipts Grid or List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong className="text-white">{filteredReceipts.length}</strong> of {receipts.length} receipts</span>
            {filters.category !== 'ALL' && <span>Category: {filters.category}</span>}
          </div>

          {viewMode === 'grid' ? (
            <ReceiptGrid
              receipts={filteredReceipts}
              connectedReceiptIds={connectedReceiptIds}
              onSelectReceipt={onSelectReceipt}
              onResetFilters={resetFilters}
            />
          ) : (
            <ReceiptList
              receipts={filteredReceipts}
              onSelectReceipt={onSelectReceipt}
              onResetFilters={resetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};
