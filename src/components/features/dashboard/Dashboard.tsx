import React, { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, ShieldCheck, Compass, AlertCircle } from 'lucide-react';
import { User, Opportunity } from '../../../types';
import { fetchAIRecommendations } from '../../../services/api';
import { RecommendationCard } from '../opportunities/RecommendationCard';

interface DashboardProps {
  user: User;
  onViewDetails: (opp: Opportunity) => void;
  onExploreAll: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onViewDetails, onExploreAll }) => {
  const [recommendations, setRecommendations] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAIRecommendations();
      // Map opportunityId to id for complete component compatibility
      const mapped: Opportunity[] = data.map((item) => ({
        id: item.opportunityId,
        title: item.title,
        category: item.category,
        description: item.description,
        benefits: item.benefits,
        eligibility: item.eligibility,
        requiredDocuments: item.requiredDocuments,
        applicationProcess: item.applicationProcess,
        faq: item.faq,
        department: item.department,
        officialWebsite: item.officialWebsite,
        deadline: item.deadline,
        status: item.status,
        logoUrl: item.logoUrl,
        reason: item.reason,
        score: item.score
      }));
      setRecommendations(mapped);
    } catch (err: any) {
      setError(err.message || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-20 top-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
              <span>Gemini AI Discovery Engine Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome, {user.name} 👋
            </h1>
            <p className="text-lg font-semibold text-indigo-300 mt-2">
              AI found <span className="text-amber-400 font-extrabold text-xl">5 personalized opportunities</span> tailored specifically for your profile.
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Profile Matched: {user.education} • {user.occupation} • {user.annualIncome} • {user.state}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadRecommendations}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
              <span>Re-run AI Analysis</span>
            </button>
            <button
              onClick={onExploreAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All Schemes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strict Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>Top 5 AI Recommendations</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Personalized
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Strictly limited to the top 5 highest matching opportunities based on Gemini AI analysis.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Portal Redirection Only</span>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 animate-pulse space-y-4">
              <div className="h-6 bg-slate-800 rounded-md w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded-md w-full"></div>
              <div className="h-16 bg-slate-900 rounded-xl"></div>
              <div className="h-10 bg-slate-800 rounded-xl"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top 5 Recommendation Cards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.slice(0, 5).map((opp) => (
            <RecommendationCard
              key={opp.id}
              opportunity={opp}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};
