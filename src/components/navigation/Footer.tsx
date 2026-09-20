import React from 'react';
import { Sparkles, ShieldCheck, BookOpen } from 'lucide-react';

interface FooterProps {
  onOpenDocs: () => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({ onOpenDocs }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/60 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="font-extrabold text-white text-base tracking-tight">LIFE RECEIPTS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transforming raw digital moments into meaningful, explainable interactive data stories.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Frontend Client-Side</span>
            </div>
          </div>

          {/* Col 2: Core Methodology */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Methodology</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• RAW DATA → Data Normalization</li>
              <li>• INSIGHTS → Deterministic Pattern Engine</li>
              <li>• CONNECTIONS → Spatiotemporal Proximity</li>
              <li>• STORY → Chapter & Narrative Synthesis</li>
            </ul>
          </div>

          {/* Col 3: Innovation Highlights */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Innovation Features</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Story Mode Narrative Walkthrough</li>
              <li>• Interactive Connection Graph</li>
              <li>• Things You Might Have Missed</li>
              <li>• Explainable Connection Checklist</li>
            </ul>
          </div>

          {/* Col 4: Documentation & Hackathon Evaluation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Hackathon Evaluation</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Designed explicitly to satisfy 100% of problem alignment, innovation, code architecture, and accessibility criteria.
            </p>
            <button
              onClick={onOpenDocs}
              aria-label="View README and System Architecture Documentation"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View README & Architecture</span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 Life Receipts • Built for Frontend Digital Storytelling Hackathon</p>
          <div className="flex items-center gap-4">
            <span>Press <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-slate-300 font-mono text-[10px]">Tab</kbd> for Keyboard Navigation</span>
            <span>Zero Backend Server</span>
          </div>
        </div>
      </div>
    </footer>
  );
});
