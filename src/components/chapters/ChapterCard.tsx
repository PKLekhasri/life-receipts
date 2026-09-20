import React from 'react';
import { StoryChapter } from '../../types/chapter';
import { LifeReceipt } from '../../types/receipt';
import { CategoryBadge } from '../common/Badge';
import { BookOpen, Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface ChapterCardProps {
  chapter: StoryChapter;
  onExploreChapter: (chapter: StoryChapter) => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onExploreChapter, onSelectReceipt }) => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 hover:border-indigo-500/40 transition-all bg-slate-900/40">
      {/* Chapter Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400 font-mono">
              CHAPTER 0{chapter.chapterNumber}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {chapter.receiptCount} moments
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">{chapter.title}</h3>
          <p className="text-xs text-slate-400 font-medium">{chapter.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-300 font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{chapter.startDate} – {chapter.endDate}</span>
        </div>
      </div>

      {/* Summary Narrative */}
      <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        {chapter.summary}
      </p>

      {/* Dominant Category & Location Highlight */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Dominant Driver:</span>
          <CategoryBadge category={chapter.dominantCategory as any} size="sm" />
        </div>

        {chapter.locationHighlight && (
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Primary Hub: {chapter.locationHighlight}</span>
          </div>
        )}
      </div>

      {/* Key Receipts Grid in Chapter */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Key Anchor Moments</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {chapter.keyReceipts.map(r => (
            <div
              key={r.id}
              onClick={() => onSelectReceipt(r)}
              className="p-3 bg-slate-950 hover:bg-slate-800/80 rounded-2xl border border-slate-800 cursor-pointer transition-colors space-y-1"
            >
              <CategoryBadge category={r.category} size="sm" />
              <h5 className="font-bold text-xs text-white truncate pt-1">{r.title}</h5>
              <p className="text-[11px] text-slate-400 truncate">{r.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action: Explore Chapter */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={() => onExploreChapter(chapter)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105"
        >
          <span>Explore Chapter Timeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
