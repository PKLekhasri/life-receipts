import React from 'react';
import { ShieldCheck, ExternalLink, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full glass-panel border-t border-slate-800/80 mt-16 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-lg text-white">Life Passport AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            An AI-powered Opportunity Discovery Platform designed to connect Indian citizens with personalized government schemes, scholarships, loans, and employment programs.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Official Redirection Guaranteed</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Strict Platform Policies</h4>
          <ul className="text-xs text-slate-400 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Never collects government application forms
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Never stores Aadhaar, PAN, or bank credentials
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Never modifies government database records
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Redirects only to verified government websites
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Official Portals Quick Access</h4>
          <div className="flex flex-wrap gap-2">
            <a 
              href="https://scholarships.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>NSP Portal</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a 
              href="https://www.mudra.org.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>PM Mudra</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a 
              href="https://beneficiary.nha.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>Ayushman Bharat</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a 
              href="https://pmaymis.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>PMAY Urban</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a 
              href="https://www.pmkvyofficial.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>PMKVY Skill</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <p>© 2026 Life Passport AI. Powered by Google Gemini AI. Built for Indian Citizen Empowerment.</p>
      </div>
    </footer>
  );
};
