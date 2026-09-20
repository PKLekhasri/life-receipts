import React, { useEffect, useState } from 'react';
import { Search, Filter, Compass, AlertCircle } from 'lucide-react';
import { Opportunity } from '../../../types';
import { fetchAllOpportunities } from '../../../services/api';
import { RecommendationCard } from './RecommendationCard';

interface AllOpportunitiesViewProps {
  onViewDetails: (opp: Opportunity) => void;
}

export const AllOpportunitiesView: React.FC<AllOpportunitiesViewProps> = ({ onViewDetails }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'Scholarship', 'Government Schemes', 'Loan', 'Healthcare', 'Job'];

  const loadAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllOpportunities({
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        search: search || undefined
      });
      setOpportunities(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadAll();
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Directory • 50+ Verified Indian Schemes</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Explore All Indian Government Opportunities
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Search across scholarships, central and state schemes, loans, healthcare programs, and employment initiatives.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search NSP, Mudra, PMAY..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Category Filters Pill Row */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Category Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-slate-800 animate-pulse space-y-4">
              <div className="h-6 bg-slate-800 rounded-md w-3/4"></div>
              <div className="h-4 bg-slate-800 rounded-md w-full"></div>
              <div className="h-16 bg-slate-900 rounded-xl"></div>
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

      {/* Results Count & Grid */}
      {!loading && !error && (
        <>
          <div className="text-xs font-semibold text-slate-400">
            Showing <span className="text-white font-bold">{opportunities.length}</span> verified opportunities
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => (
              <RecommendationCard
                key={opp.id}
                opportunity={opp}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
