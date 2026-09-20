import React from 'react';
import { X, ShieldCheck, Code, BookOpen, CheckCircle2, Sparkles, Cpu, Network } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Life Receipts — Architecture & Hackathon Audit Docs
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guaranteed Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Frontend Only</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              No backend servers, no Express APIs, no MongoDB/databases. Runs completely static in browser memory.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-400 font-extrabold">
              <Cpu className="w-4 h-4" />
              <span>Explainable AI-Free</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Deterministic engines (Pattern & Connection Engine) calculate explainable relationship scores without fake AI claims.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-400 font-extrabold">
              <Sparkles className="w-4 h-4" />
              <span>Original Storytelling</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Transforms raw receipts into story chapters, guided story mode tours, and traceable insight evidence.
            </p>
          </div>
        </div>

        {/* Data Architecture Pipeline Flow */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Network className="w-4 h-4" />
            <span>Data Processing Architecture Flow</span>
          </h3>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
            <p className="text-indigo-300 font-bold">RAW DATA (9 Categories)</p>
            <p className="text-slate-400">↓ (Data Normalization Layer via normalizeRawData)</p>
            <p className="text-purple-300 font-bold">UNIFIED LIFE RECEIPT MODEL</p>
            <p className="text-slate-400">↓ (Spatiotemporal Proximity & Tag Scoring)</p>
            <p className="text-emerald-300 font-bold">PATTERN ENGINE & CONNECTION ENGINE</p>
            <p className="text-slate-400">↓ (Traceable Evidence Audit & Chapter Clustering)</p>
            <p className="text-amber-300 font-bold">INSIGHT ENGINE & STORY CHAPTER ENGINE</p>
            <p className="text-slate-400">↓ (Cinematic Data Storytelling Interface)</p>
            <p className="text-white font-extrabold">USER STORY EXPERIENCE</p>
          </div>
        </div>

        {/* Hackathon Requirement Mapping Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">
            Challenge Requirement Mapping Checklist
          </h3>

          <div className="space-y-2 text-xs">
            {[
              { req: 'Requirement 1: Explore Life Receipts', impl: 'Receipt Explorer, Global Search, Filter Presets, Timeline List' },
              { req: 'Requirement 2: Discover Relationships', impl: 'Deterministic Connection Engine, Connection Graph, Why Connected checklist' },
              { req: 'Requirement 3: Discover Patterns', impl: 'Pattern Engine detecting Late Night Creator, Weekend Explorer, Burst Activity' },
              { req: 'Requirement 4: Story Chapters', impl: 'Chapter Engine clustering activity phases into editorial chapters' },
              { req: 'Requirement 5: Guided Storytelling', impl: 'Story Mode interactive narrative presentation tour' },
              { req: 'Requirement 6: Non-obvious Insights', impl: 'Things You Might Have Missed with 100% traceable evidence audit' },
              { req: 'Requirement 7: Life Rhythm & Map', impl: '24-hour activity heat matrix and co-located sanctuary view' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">{item.req}</h4>
                  <p className="text-slate-400 font-mono text-[11px]">{item.impl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
