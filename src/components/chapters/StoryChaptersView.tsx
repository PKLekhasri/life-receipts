import React from 'react';
import { StoryChapter } from '../../types/chapter';
import { LifeReceipt } from '../../types/receipt';
import { ChapterCard } from './ChapterCard';
import { BookOpen, Sparkles } from 'lucide-react';

interface StoryChaptersViewProps {
  chapters: StoryChapter[];
  onExploreChapter: (chapter: StoryChapter) => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const StoryChaptersView: React.FC<StoryChaptersViewProps> = ({
  chapters,
  onExploreChapter,
  onSelectReceipt
}) => {
  return (
    <div className="space-y-8">
      {/* Header Description */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Algorithmic Chapter Segmentation</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Story Chapters</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Instead of arbitrary calendar months, your digital receipts are grouped into meaningful life chapters derived from activity density, location clusters, and shifting themes.
        </p>
      </div>

      {/* Chapters Stack */}
      <div className="space-y-6">
        {chapters.map(chap => (
          <ChapterCard
            key={chap.id}
            chapter={chap}
            onExploreChapter={onExploreChapter}
            onSelectReceipt={onSelectReceipt}
          />
        ))}
      </div>
    </div>
  );
};
