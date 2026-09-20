import React from 'react';
import { LifeReceipt, ReceiptCategory } from '../../types/receipt';
import { CATEGORY_THEMES } from '../../utils/categoryUtils';
import { CategoryBadge } from '../common/Badge';

interface CategoryDistributionChartProps {
  receipts: LifeReceipt[];
  selectedCategory: ReceiptCategory | 'ALL';
  onSelectCategory: (cat: ReceiptCategory | 'ALL') => void;
}

export const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  receipts,
  selectedCategory,
  onSelectCategory
}) => {
  const counts: Record<ReceiptCategory, number> = {
    Music: 0,
    Movies: 0,
    Places: 0,
    Purchases: 0,
    Photos: 0,
    Messages: 0,
    Searches: 0,
    Events: 0,
    Notes: 0
  };

  receipts.forEach(r => {
    if (counts[r.category] !== undefined) {
      counts[r.category] += 1;
    }
  });

  const total = receipts.length || 1;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-white">Category Breakdown</h3>
        <span className="text-xs font-mono text-slate-400">{total} Total Receipts</span>
      </div>

      <div className="space-y-2.5">
        {(Object.keys(counts) as ReceiptCategory[]).map(cat => {
          const count = counts[cat];
          const pct = Math.round((count / total) * 100);
          const theme = CATEGORY_THEMES[cat];
          const isSelected = selectedCategory === cat;

          return (
            <div
              key={cat}
              onClick={() => onSelectCategory(isSelected ? 'ALL' : cat)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                isSelected ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-800/80 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <CategoryBadge category={cat} size="sm" />
                <span className="font-mono font-bold text-slate-300">
                  {count} ({pct}%)
                </span>
              </div>

              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  style={{ width: `${pct}%`, backgroundColor: theme.color }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
