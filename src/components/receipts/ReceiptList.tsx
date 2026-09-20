import React from 'react';
import { LifeReceipt } from '../../types/receipt';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime, formatDate, formatTime } from '../../utils/dateUtils';
import { MapPin, ArrowRight, Clock, DollarSign, Sparkles } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

interface ReceiptListProps {
  receipts: LifeReceipt[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onResetFilters?: () => void;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({ receipts, onSelectReceipt, onResetFilters }) => {
  if (receipts.length === 0) {
    return (
      <EmptyState
        title="No Life Receipts Found"
        description="No digital moments match your current search query or filter preset."
        actionLabel="Reset Explorer Filters"
        onAction={onResetFilters}
      />
    );
  }

  // Group receipts by Date
  const groupedByDate: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    const d = formatDate(r.timestamp);
    groupedByDate[d] = groupedByDate[d] || [];
    groupedByDate[d].push(r);
  });

  return (
    <div className="space-y-8">
      {Object.entries(groupedByDate).map(([dateStr, items]) => (
        <div key={dateStr} className="space-y-4">
          {/* Date Group Header */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/50" />
            <h3 className="text-sm font-extrabold text-indigo-300 font-mono tracking-wider uppercase">
              {dateStr}
            </h3>
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-xs font-semibold text-slate-400 font-mono">
              {items.length} moments
            </span>
          </div>

          {/* Editorial Vertical Timeline Nodes */}
          <div className="pl-5 border-l-2 border-slate-800 space-y-4">
            {items.map(receipt => {
              const isImportant = (receipt.importanceScore || 5) >= 8;
              return (
                <div
                  key={receipt.id}
                  onClick={() => onSelectReceipt(receipt)}
                  className={`group relative glass-panel p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-500/40 hover:bg-slate-900/80 ${
                    isImportant ? 'border-indigo-500/30 bg-indigo-950/20' : 'border-slate-800/80 bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="pt-0.5">
                      <CategoryBadge category={receipt.category} size="sm" />
                    </div>
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-white group-hover:text-indigo-300 transition-colors">
                          {receipt.title}
                        </h4>
                        {isImportant && (
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{receipt.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span>{formatTime(receipt.timestamp)}</span>
                        </span>
                        {receipt.location && (
                          <span className="flex items-center gap-1 text-slate-300">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span>{receipt.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                    {receipt.amount && (
                      <span className="font-extrabold text-amber-400 font-mono">
                        ₹{receipt.amount}
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
