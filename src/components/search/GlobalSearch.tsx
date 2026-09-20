import React, { useState, useEffect } from 'react';
import { LifeReceipt } from '../../types/receipt';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { Search, X, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  receipts: LifeReceipt[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
  receipts,
  onSelectReceipt
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim() === '' ? [] : receipts.filter(r => {
    const q = query.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.location?.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.people?.some(p => p.toLowerCase().includes(q)) ||
      JSON.stringify(r.metadata || {}).toLowerCase().includes(q)
    );
  }).slice(0, 8);

  const popularTags = ['late-night', 'coastal', 'vinyl', 'coffee', 'meetup', 'hackathon'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Search Bar Input */}
        <div className="relative flex items-center border-b border-slate-800 pb-4">
          <Search className="w-5 h-5 text-indigo-400 absolute left-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search moments, artists, merchants, places, tags, people..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl py-3 pl-11 pr-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Suggestions */}
        {query === '' && (
          <div className="space-y-2 py-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Popular Tag Searches
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 text-xs font-mono transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {results.length > 0 ? (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-400 font-mono">
              Found {results.length} Matching Moments
            </span>
            {results.map(r => (
              <div
                key={r.id}
                onClick={() => {
                  onClose();
                  onSelectReceipt(r);
                }}
                className="p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3">
                  <CategoryBadge category={r.category} size="sm" />
                  <div>
                    <h5 className="font-bold text-xs text-white group-hover:text-indigo-300 truncate">{r.title}</h5>
                    <p className="text-[11px] text-slate-400 truncate">{r.description}</p>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        ) : query.trim() !== '' ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No digital moments match "{query}". Try a different keyword or tag.
          </div>
        ) : null}
      </div>
    </div>
  );
};
