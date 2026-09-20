import React from 'react';
import { StoryChapter } from '../types/chapter';
import { LifeReceipt } from '../types/receipt';
import { StoryChaptersView } from '../components/chapters/StoryChaptersView';

interface ChaptersPageProps {
  chapters: StoryChapter[];
  onExploreChapter: (chapter: StoryChapter) => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ChaptersPage: React.FC<ChaptersPageProps> = React.memo(({
  chapters,
  onExploreChapter,
  onSelectReceipt
}) => {
  return (
    <div className="py-4">
      <StoryChaptersView
        chapters={chapters}
        onExploreChapter={onExploreChapter}
        onSelectReceipt={onSelectReceipt}
      />
    </div>
  );
});
