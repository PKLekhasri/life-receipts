import React, { useMemo } from 'react';
import { LifeReceipt } from '../types/receipt';
import { StoryConnection } from '../types/connection';
import { StoryChapter } from '../types/chapter';
import { LifePattern } from '../types/pattern';
import { TraceableInsight } from '../types/insight';
import { StoryHero } from '../components/home/StoryHero';
import { PhasesOverview } from '../components/home/PhasesOverview';
import { KeyInsightsBar } from '../components/home/KeyInsightsBar';
import { ThingsYouMissed } from '../components/insights/ThingsYouMissed';
import { ConnectionGraph } from '../components/connections/ConnectionGraph';
import { LifeRhythmChart } from '../components/charts/LifeRhythmChart';
import { ReceiptGrid } from '../components/receipts/ReceiptGrid';
import { StoryChaptersView } from '../components/chapters/StoryChaptersView';
import { LifeJourneyTimeline } from '../components/timeline/LifeJourneyTimeline';
import { buildConnectionGraph } from '../engines/connectionEngine';

interface HomePageProps {
  receipts: LifeReceipt[];
  connections: StoryConnection[];
  patterns: LifePattern[];
  chapters: StoryChapter[];
  insights: TraceableInsight[];
  stats: {
    totalMoments: number;
    activeDays: number;
    dominantCategory: string;
    mostActivePeriod: string;
    topRecurringTheme: string;
    strongestConnection: StoryConnection | null;
    importantMomentsCount: number;
  };
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onOpenStoryMode: () => void;
  onNavigateTab: (tab: any) => void;
}

export const HomePage: React.FC<HomePageProps> = React.memo(({
  receipts,
  connections,
  patterns,
  chapters,
  insights,
  stats,
  onSelectReceipt,
  onOpenStoryMode,
  onNavigateTab
}) => {
  // MEMOIZE graph calculations to eliminate O(N^2) re-renders
  const previewGraphData = useMemo(() => buildConnectionGraph(receipts), [receipts]);

  // MEMOIZE preview receipts array
  const previewReceipts = useMemo(() => receipts.slice(0, 6), [receipts]);

  return (
    <div className="space-y-16 py-4">
      {/* 1. HERO & EDITORIAL NARRATIVE SUMMARY */}
      <section className="space-y-6">
        <StoryHero
          onOpenStoryMode={onOpenStoryMode}
          onNavigateConnections={() => onNavigateTab('connections')}
        />
        <PhasesOverview />
      </section>

      {/* 2. KEY INSIGHT METRICS CARDS */}
      <KeyInsightsBar stats={stats} connectionCount={connections.length} />

      {/* 3. STORY CHAPTERS SECTION */}
      <section className="space-y-6">
        <StoryChaptersView
          chapters={chapters}
          onExploreChapter={() => onNavigateTab('chapters')}
          onSelectReceipt={onSelectReceipt}
        />
      </section>

      {/* 4. LIFE JOURNEY SECTION */}
      <section>
        <LifeJourneyTimeline
          receipts={receipts}
          chapters={chapters}
          onSelectReceipt={onSelectReceipt}
          onSelectChapter={() => onNavigateTab('chapters')}
        />
      </section>

      {/* 5. THINGS YOU MIGHT HAVE MISSED */}
      <section>
        <ThingsYouMissed
          insights={insights}
          onSelectReceipt={onSelectReceipt}
        />
      </section>

      {/* 6. CONNECTED MOMENTS GRAPH PREVIEW */}
      <section>
        <ConnectionGraph
          nodes={previewGraphData.nodes}
          links={previewGraphData.links}
          onSelectReceipt={onSelectReceipt}
        />
      </section>

      {/* 7. LIFE RHYTHM CHART */}
      <section>
        <LifeRhythmChart
          receipts={receipts}
          onSelectHour={() => onNavigateTab('explorer')}
          onSelectDay={() => onNavigateTab('explorer')}
        />
      </section>

      {/* 8. EXPLORE ALL RECEIPTS PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Recent Moments Preview</h2>
            <p className="text-xs text-slate-400 mt-1">Explore all individual records or filter by category.</p>
          </div>

          <button
            onClick={() => onNavigateTab('explorer')}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
          >
            <span>Open Full Receipt Explorer →</span>
          </button>
        </div>

        <ReceiptGrid
          receipts={previewReceipts}
          onSelectReceipt={onSelectReceipt}
        />
      </section>
    </div>
  );
});
