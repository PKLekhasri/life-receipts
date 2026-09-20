import React, { useState } from 'react';
import { LifeReceipt } from '../../types/receipt';
import { StoryChapter } from '../../types/chapter';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { X, Play, ChevronLeft, ChevronRight, Sparkles, Compass, ArrowRight } from 'lucide-react';

interface StoryModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipts: LifeReceipt[];
  chapters: StoryChapter[];
  onInspectReceipt: (receipt: LifeReceipt) => void;
}

export const StoryModeModal: React.FC<StoryModeModalProps> = ({
  isOpen,
  onClose,
  receipts,
  chapters,
  onInspectReceipt
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen || receipts.length === 0) return null;

  // Key story moments across phases
  const storySteps = [
    {
      phase: 'PHASE 01: DISCOVERY & EARLY SPARKS',
      headline: 'A period of solitary exploration begins after midnight.',
      body: 'Your digital records begin late at night in Chennai. Listening to ambient tracks by M83 while making coffee notes and searching for focus playlists.',
      highlightReceipt: receipts.find(r => r.tags.includes('late-night') && r.category === 'Music') || receipts[0]
    },
    {
      phase: 'PHASE 02: COASTAL OUTINGS & FRIENDS',
      headline: 'The narrative moves outdoors to coastal promenades and beach sunsets.',
      body: 'Weekend activity surges with visits to Besant Nagar Beach, golden hour photography, and sharing roadtrip memories with close friends.',
      highlightReceipt: receipts.find(r => r.category === 'Places' || r.category === 'Photos') || receipts[1]
    },
    {
      phase: 'PHASE 03: CULTURAL ARTIFACTS & VINYL',
      headline: 'A surge in live music events and vintage analog discoveries.',
      body: 'Attended the Chennai Indie Showcase concert, discovered rare Daft Punk vinyl pressings, and searched for vintage LP preservation guides.',
      highlightReceipt: receipts.find(r => r.category === 'Events' || r.tags.includes('vinyl')) || receipts[2]
    },
    {
      phase: 'PHASE 04: DEEP SPRINT & ARCHITECTURE',
      headline: 'Intense creative momentum culminates in a hackathon sprint.',
      body: 'Dual monitor setups, late-night diner tacos, and architecture blueprints for interactive digital storytelling. The pattern engine detects rapid multi-category bursts.',
      highlightReceipt: receipts.find(r => r.tags.includes('hackathon') || r.importanceScore === 10) || receipts[3]
    }
  ];

  const currentStep = storySteps[currentStepIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-mode-title"
      >
        {/* Ambient Gradient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header Controls */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 font-mono">
              GUIDED NARRATIVE STORY MODE
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>STEP {currentStepIndex + 1} OF {storySteps.length}</span>
            <span>{currentStep.phase}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${((currentStepIndex + 1) / storySteps.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Story Step Narrative */}
        <div className="space-y-4 py-2">
          <h2 id="story-mode-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {currentStep.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {currentStep.body}
          </p>
        </div>

        {/* Highlighted Real Data Receipt Preview Card */}
        {currentStep.highlightReceipt && (
          <div className="p-5 bg-slate-950/80 rounded-2xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <CategoryBadge category={currentStep.highlightReceipt.category} size="sm" />
              <span className="text-xs font-mono text-slate-400">
                {formatDateTime(currentStep.highlightReceipt.timestamp)}
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-white">{currentStep.highlightReceipt.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{currentStep.highlightReceipt.description}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  onClose();
                  onInspectReceipt(currentStep.highlightReceipt);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
              >
                <span>Explore memory details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => {
              if (currentStepIndex < storySteps.length - 1) {
                setCurrentStepIndex(prev => prev + 1);
              } else {
                onClose();
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <span>{currentStepIndex < storySteps.length - 1 ? 'Continue Story' : 'Finish Narrative Tour'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
