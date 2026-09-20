import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIMatchBadgeProps {
  score: number;
}

export const AIMatchBadge: React.FC<AIMatchBadgeProps> = ({ score }) => {
  let badgeColor = 'from-emerald-500 to-teal-600 text-white';
  if (score < 85) {
    badgeColor = 'from-indigo-500 to-purple-600 text-white';
  }

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${badgeColor} shadow-md font-extrabold text-xs tracking-wider uppercase`}>
      <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" style={{ animationDuration: '3s' }} />
      <span>{score}% Match</span>
    </div>
  );
};
