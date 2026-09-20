import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useReceipts } from '../hooks/useReceipts';
import { HomePage } from '../pages/HomePage';
import { ExplorerPage } from '../pages/ExplorerPage';
import { ConnectionsView } from '../components/connections/ConnectionsView';
import { PatternsView } from '../components/patterns/PatternsView';
import { StoryChaptersView } from '../components/chapters/StoryChaptersView';
import { LifeJourneyTimeline } from '../components/timeline/LifeJourneyTimeline';
import { ReceiptDetailModal } from '../components/receipts/ReceiptDetailModal';
import { StoryModeModal } from '../components/story/StoryModeModal';
import { GlobalSearch } from '../components/search/GlobalSearch';
import { DocumentationModal } from '../components/common/DocumentationModal';
import { LifeReceipt } from '../types/receipt';
import { StoryConnection } from '../types/connection';
import { buildConnectionGraph } from '../engines/connectionEngine';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'explorer' | 'connections' | 'patterns' | 'chapters' | 'journey'>('overview');
  const [selectedReceipt, setSelectedReceipt] = useState<LifeReceipt | null>(null);
  const [isStoryModeOpen, setIsStoryModeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const {
    receipts,
    connections,
    patterns,
    chapters,
    insights,
    stats
  } = useReceipts();

  // Compute graph data for SVG connection map
  const graphData = useMemo(() => buildConnectionGraph(receipts), [receipts]);

  // Global hotkey Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStoryMode={() => setIsStoryModeOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDocumentationModal={() => setIsDocsOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {activeTab === 'overview' && (
          <HomePage
            receipts={receipts}
            connections={connections}
            patterns={patterns}
            chapters={chapters}
            insights={insights}
            stats={stats}
            onSelectReceipt={(r) => setSelectedReceipt(r)}
            onOpenStoryMode={() => setIsStoryModeOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'explorer' && (
          <ExplorerPage
            receipts={receipts}
            connections={connections}
            onSelectReceipt={(r) => setSelectedReceipt(r)}
          />
        )}

        {activeTab === 'connections' && (
          <ConnectionsView
            connections={connections}
            graphData={graphData}
            onSelectReceipt={(r) => setSelectedReceipt(r)}
          />
        )}

        {activeTab === 'patterns' && (
          <PatternsView
            patterns={patterns}
            onSelectReceipt={(r) => setSelectedReceipt(r)}
          />
        )}

        {activeTab === 'chapters' && (
          <StoryChaptersView
            chapters={chapters}
            onExploreChapter={() => setActiveTab('journey')}
            onSelectReceipt={(r) => setSelectedReceipt(r)}
          />
        )}

        {activeTab === 'journey' && (
          <div className="py-4 space-y-6">
            <LifeJourneyTimeline
              receipts={receipts}
              chapters={chapters}
              onSelectReceipt={(r) => setSelectedReceipt(r)}
              onSelectChapter={() => setActiveTab('chapters')}
            />
          </div>
        )}
      </main>

      {/* Receipt Memory Detail Modal */}
      <ReceiptDetailModal
        receipt={selectedReceipt}
        connections={connections}
        allReceipts={receipts}
        onClose={() => setSelectedReceipt(null)}
        onSelectReceipt={(r) => setSelectedReceipt(r)}
        onJumpToConnection={() => setActiveTab('connections')}
      />

      {/* Story Mode Interactive Narrative Tour */}
      <StoryModeModal
        isOpen={isStoryModeOpen}
        onClose={() => setIsStoryModeOpen(false)}
        receipts={receipts}
        chapters={chapters}
        onInspectReceipt={(r) => setSelectedReceipt(r)}
      />

      {/* Global Search Modal */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        receipts={receipts}
        onSelectReceipt={(r) => setSelectedReceipt(r)}
      />

      {/* Hackathon Evaluator & Architecture Modal */}
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenDocs={() => setIsDocsOpen(true)} />
    </div>
  );
};
