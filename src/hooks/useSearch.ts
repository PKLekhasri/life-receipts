import { useState, useMemo, useEffect } from 'react';
import { LifeReceipt } from '../types/receipt';
import { FILTER_CONFIG } from '../constants/configuration';

export function useSearch(receipts: LifeReceipt[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, FILTER_CONFIG.DEBOUNCE_DELAY_MS);

    return () => clearTimeout(handler);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return receipts;
    const q = debouncedQuery.toLowerCase();

    return receipts.filter(r => (
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.location?.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.people?.some(p => p.toLowerCase().includes(q)) ||
      JSON.stringify(r.metadata || {}).toLowerCase().includes(q)
    ));
  }, [receipts, debouncedQuery]);

  return {
    query,
    setQuery,
    searchResults,
    isSearching: debouncedQuery.trim().length > 0
  };
}
