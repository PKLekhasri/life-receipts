import React, { useState } from 'react';
import { LifeReceipt } from '../../types/receipt';
import { StoryChapter } from '../../types/chapter';
import { CategoryBadge } from '../common/Badge';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { Sparkles, MapPin, ChevronRight, Calendar, ZoomIn, ZoomOut } from 'lucide-react';

interface LifeJourneyTimelineProps {
  receipts: LifeReceipt[];
  chapters: StoryChapter[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onSelectChapter: (chapterId: string) => void;
}

export const LifeJourneyTimeline: React.FC<LifeJourneyTimelineProps> = ({
  receipts,
  chapters,
  onSelectReceipt,
  onSelectChapter
}) => {
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'detailed'>('normal');
  const [activeReceiptId, setActiveReceiptId] = useState<string | null>(receipts[0]?.id || null);

  const sortedReceipts = [...receipts].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const selectedReceipt = receipts.find(r => r.id === activeReceiptId) || receipts[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Interactive Life Journey</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Drag horizontally to traverse your digital memory timeline. Dense clusters highlight active phases.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'detailed' : 'normal')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors"
          >
            {zoomLevel === 'normal' ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
            <span>{zoomLevel === 'normal' ? 'Detailed View' : 'Compact View'}</span>
          </button>
        </div>
      </div>

      {/* Chapters Band */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {chapters.map((chap) => (
          <div
            key={chap.id}
            onClick={() => onSelectChapter(chap.id)}
            className="p-3 bg-slate-900/60 hover:bg-slate-800/80 rounded-2xl border border-slate-800/80 cursor-pointer transition-all space-y-1 hover:border-indigo-500/40 group"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400">
              <span>CHAPTER 0{chap.chapterNumber}</span>
              <span>{chap.receiptCount} moments</span>
            </div>
            <h4 className="font-extrabold text-xs text-white group-hover:text-indigo-300 truncate">
              {chap.title}
            </h4>
            <p className="text-[10px] text-slate-400 truncate">{chap.startDate} – {chap.endDate}</p>
          </div>
        ))}
      </div>

      {/* Horizontal Interactive Timeline Scroll Area */}
      <div className="relative pt-6 pb-4 overflow-x-auto no-scrollbar border-y border-slate-800/80">
        <div className="min-w-[800px] space-y-6 px-4">
          {/* Axis Line */}
          <div className="relative h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full my-8">
            {/* Timeline Nodes */}
            <div className="absolute -top-3 inset-x-0 flex justify-between items-center px-2">
              {sortedReceipts.map((r, idx) => {
                const isSelected = r.id === activeReceiptId;
                const isKeyMoment = (r.importanceScore || 5) >= 8;

                return (
                  <div
                    key={r.id}
                    onClick={() => {
                      setActiveReceiptId(r.id);
                      onSelectReceipt(r);
                    }}
                    className="relative group cursor-pointer"
                  >
                    {/* Visual Node Pin */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-indigo-500 ring-4 ring-indigo-500/30 scale-125 z-20'
                          : isKeyMoment
                          ? 'bg-amber-400 ring-2 ring-amber-400/30 hover:scale-110'
                          : 'bg-slate-800 hover:bg-slate-600'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-300'}`} />
                    </div>

                    {/* Tooltip Hover Badge */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                      <div className="bg-slate-900 border border-slate-700 text-white text-[10px] py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl font-medium">
                        {r.title} ({formatDate(r.timestamp)})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between text-[11px] font-mono text-slate-400 uppercase tracking-widest pt-2">
            <span>PAST ({formatDate(sortedReceipts[0]?.timestamp || '')})</span>
            <span className="text-indigo-400 font-bold">DIGITAL LIFE TIMELINE</span>
            <span>NOW ({formatDate(sortedReceipts[sortedReceipts.length - 1]?.timestamp || '')})</span>
          </div>
        </div>
      </div>

      {/* Selected Moment Quick Preview Card */}
      {selectedReceipt && (
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CategoryBadge category={selectedReceipt.category} size="sm" />
              <span className="text-xs text-slate-400 font-mono">
                {formatDate(selectedReceipt.timestamp)} at {formatTime(selectedReceipt.timestamp)}
              </span>
            </div>
            <h4 className="font-extrabold text-base text-white">{selectedReceipt.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-1">{selectedReceipt.description}</p>
          </div>

          <button
            onClick={() => onSelectReceipt(selectedReceipt)}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shrink-0"
          >
            <span>Inspect Memory</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
