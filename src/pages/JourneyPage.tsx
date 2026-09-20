import React from 'react';
import { LifeReceipt } from '../types/receipt';
import { StoryChapter } from '../types/chapter';
import { LifeJourneyTimeline } from '../components/timeline/LifeJourneyTimeline';

interface JourneyPageProps {
  receipts: LifeReceipt[];
  chapters: StoryChapter[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onSelectChapter: (chapterId: string) => void;
}

export const JourneyPage: React.FC<JourneyPageProps> = React.memo(({
  receipts,
  chapters,
  onSelectReceipt,
  onSelectChapter
}) => {
  return (
    <div className="py-4">
      <LifeJourneyTimeline
        receipts={receipts}
        chapters={chapters}
        onSelectReceipt={onSelectReceipt}
        onSelectChapter={onSelectChapter}
      />
    </div>
  );
});
