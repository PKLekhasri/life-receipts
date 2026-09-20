import React, { useState } from 'react';
import { LifeReceipt, ViewMode } from '../types/receipt';
import { StoryConnection } from '../types/connection';
import { useFilters } from '../hooks/useFilters';
import { ExplorerHeader } from '../components/explorer/ExplorerHeader';
import { ExplorerFilters } from '../components/explorer/ExplorerFilters';
import { ReceiptGrid } from '../components/receipts/ReceiptGrid';
import { ReceiptList } from '../components/receipts/ReceiptList';
import { CategoryDistributionChart } from '../components/charts/CategoryDistributionChart';

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

  const connectedReceiptIds = connections.flatMap(c => c.receiptIds);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <ExplorerHeader viewMode={viewMode} onSetViewMode={setViewMode} />

      {/* Filter Controls Band */}
      <ExplorerFilters
        filters={filters}
        onSearchChange={setSearchQuery}
        onCategoryChange={setCategory}
        onPresetChange={setPreset}
        onSortChange={(sortBy) => setFilters(prev => ({ ...prev, sortBy }))}
        onResetFilters={resetFilters}
      />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Category Distribution */}
        <div className="lg:col-span-1 space-y-6">
          <CategoryDistributionChart
            receipts={receipts}
            selectedCategory={filters.category}
            onSelectCategory={setCategory}
          />
        </div>

        {/* Right Area: Receipts Grid or Timeline List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong className="text-white">{filteredReceipts.length}</strong> of {receipts.length} receipts</span>
            {filters.category !== 'ALL' && <span>Category Filter: <strong className="text-indigo-400">{filters.category}</strong></span>}
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
