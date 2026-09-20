import React from 'react';
import { LifeReceipt } from '../../types/receipt';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { MapPin, Users, Sparkles, ArrowUpRight, DollarSign, Clock } from 'lucide-react';

interface ReceiptCardProps {
  receipt: LifeReceipt;
  onClick: () => void;
  isConnected?: boolean;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ receipt, onClick, isConnected }) => {
  const isHighImportance = (receipt.importanceScore || 5) >= 8;

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative glass-panel rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.02] hover:shadow-xl ${
        isHighImportance
          ? 'border-indigo-500/40 bg-gradient-to-b from-indigo-950/20 to-slate-900/60 shadow-indigo-500/10'
          : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
      }`}
    >
      {/* Top Header: Badge + Timestamp + Importance */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={receipt.category} size="sm" />
          <div className="flex items-center gap-1.5">
            {isHighImportance && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sparkles className="w-3 h-3" />
                Key Moment
              </span>
            )}
            {isConnected && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                Connected
              </span>
            )}
          </div>
        </div>

        {/* Optional Media Image Preview */}
        {receipt.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={receipt.imageUrl}
              alt={receipt.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Title & Description */}
        <div>
          <h3 className="font-extrabold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
            {receipt.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {receipt.description}
          </p>
        </div>
      </div>

      {/* Footer Details: Location, People, Time */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-2 text-[11px] text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {receipt.location && (
              <span className="flex items-center gap-1 text-slate-300 font-medium truncate max-w-[140px]">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{receipt.location}</span>
              </span>
            )}
            {receipt.people && receipt.people.length > 0 && (
              <span className="flex items-center gap-1 text-slate-400">
                <Users className="w-3 h-3 text-purple-400 shrink-0" />
                <span>{receipt.people[0]}</span>
              </span>
            )}
          </div>

          {receipt.amount ? (
            <span className="font-extrabold text-amber-400 font-mono">
              ₹{receipt.amount}
            </span>
          ) : receipt.duration ? (
            <span className="font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {Math.round(receipt.duration / 60)}m
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>{formatDateTime(receipt.timestamp)}</span>
          <span className="flex items-center gap-0.5 text-indigo-400 font-bold group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
