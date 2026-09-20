import { useState, useMemo, useEffect } from 'react';
import { LifeReceipt, FilterState, ReceiptCategory } from '../types/receipt';
import { StoryConnection } from '../types/connection';

const initialFilterState: FilterState = {
  searchQuery: '',
  category: 'ALL',
  preset: 'all',
  selectedMonth: 'ALL',
  selectedTag: 'ALL',
  selectedLocation: 'ALL',
  sortBy: 'timestamp-desc'
};

export function useFilters(receipts: LifeReceipt[], connections: StoryConnection[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query by 200ms
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.searchQuery), 200);
    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  const filteredReceipts = useMemo(() => {
    return receipts.filter(receipt => {
      // 1. Search Query
      if (debouncedSearch.trim() !== '') {
        const query = debouncedSearch.toLowerCase();
        const titleMatch = receipt.title.toLowerCase().includes(query);
        const descMatch = receipt.description.toLowerCase().includes(query);
        const catMatch = receipt.category.toLowerCase().includes(query);
        const locMatch = receipt.location?.toLowerCase().includes(query) || false;
        const tagMatch = receipt.tags.some(t => t.toLowerCase().includes(query));
        const peopleMatch = receipt.people?.some(p => p.toLowerCase().includes(query)) || false;
        const metadataMatch = JSON.stringify(receipt.metadata || {}).toLowerCase().includes(query);

        if (!titleMatch && !descMatch && !catMatch && !locMatch && !tagMatch && !peopleMatch && !metadataMatch) {
          return false;
        }
      }

      // 2. Category Filter
      if (filters.category !== 'ALL' && receipt.category !== filters.category) {
        return false;
      }

      // 3. Preset Filters
      if (filters.preset === 'connected') {
        const isConnected = connections.some(c => c.receiptIds.includes(receipt.id));
        if (!isConnected) return false;
      } else if (filters.preset === 'important') {
        if ((receipt.importanceScore || 5) < 8) return false;
      } else if (filters.preset === 'unusual') {
        // High amount, rare category, or late night
        const isUnusual = (receipt.amount && receipt.amount >= 1000) || receipt.tags.includes('rare') || receipt.category === 'Events';
        if (!isUnusual) return false;
      } else if (filters.preset === 'recurring') {
        const isRecurring = receipt.tags.includes('routine') || receipt.tags.includes('late-night') || receipt.tags.includes('coastal');
        if (!isRecurring) return false;
      }

      // 4. Tag Filter
      if (filters.selectedTag !== 'ALL' && !receipt.tags.includes(filters.selectedTag)) {
        return false;
      }

      // 5. Location Filter
      if (filters.selectedLocation !== 'ALL' && receipt.location !== filters.selectedLocation) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'timestamp-desc') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (filters.sortBy === 'timestamp-asc') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (filters.sortBy === 'importance-desc') {
        return (b.importanceScore || 5) - (a.importanceScore || 5);
      } else if (filters.sortBy === 'amount-desc') {
        return (b.amount || 0) - (a.amount || 0);
      }
      return 0;
    });
  }, [receipts, connections, filters, debouncedSearch]);

  const setCategory = (category: ReceiptCategory | 'ALL') => {
    setFilters(prev => ({ ...prev, category }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const setPreset = (preset: FilterState['preset']) => {
    setFilters(prev => ({ ...prev, preset }));
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  return {
    filters,
    setFilters,
    setCategory,
    setSearchQuery,
    setPreset,
    resetFilters,
    filteredReceipts
  };
}
