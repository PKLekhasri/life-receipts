import { useMemo, useState } from 'react';
import { LifeReceipt } from '../types/receipt';
import { getNormalizedDataset } from '../data/normalizedData';
import { detectConnections } from '../engines/connectionEngine';
import { detectPatterns } from '../engines/patternEngine';
import { generateChapters } from '../engines/chapterEngine';
import { generateInsights } from '../engines/insightEngine';

export function useReceipts(initialData?: LifeReceipt[]) {
  const [receipts, setReceipts] = useState<LifeReceipt[]>(() => 
    initialData ? initialData : getNormalizedDataset()
  );

  // Compute all engines in single memoized pipeline
  const processed = useMemo(() => {
    const connections = detectConnections(receipts);
    const patterns = detectPatterns(receipts);
    const chapters = generateChapters(receipts, connections);
    const insights = generateInsights(receipts);

    // Dynamic Editorial Overview metrics
    const totalMoments = receipts.length;
    const activeDays = new Set(receipts.map(r => r.timestamp.split('T')[0])).size;
    
    // Category distribution
    const catCounts: Record<string, number> = {};
    receipts.forEach(r => catCounts[r.category] = (catCounts[r.category] || 0) + 1);
    const dominantCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Music';

    // Most active period (Hour window)
    const hourCounts: Record<number, number> = {};
    receipts.forEach(r => {
      const h = new Date(r.timestamp).getHours();
      hourCounts[h] = (hourCounts[h] || 0) + 1;
    });
    const peakHour = Number(Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 23);
    const mostActivePeriod = peakHour >= 22 || peakHour <= 3 ? 'Late Night (11 PM - 3 AM)' : peakHour >= 12 && peakHour <= 17 ? 'Afternoon Focus (12 PM - 5 PM)' : 'Evening (6 PM - 10 PM)';

    // Strongest Connection
    const strongestConnection = connections.sort((a, b) => b.connectionScore - a.connectionScore)[0] || null;

    // Important moments
    const importantMoments = receipts.filter(r => (r.importanceScore || 5) >= 8);

    return {
      receipts,
      connections,
      patterns,
      chapters,
      insights,
      stats: {
        totalMoments,
        activeDays,
        dominantCategory,
        mostActivePeriod,
        topRecurringTheme: patterns[0]?.title || 'Late Night Focus',
        strongestConnection,
        importantMomentsCount: importantMoments.length
      }
    };
  }, [receipts]);

  const addReceipt = (newReceipt: LifeReceipt) => {
    setReceipts(prev => [...prev, newReceipt]);
  };

  const importCustomData = (rawArray: any[]) => {
    const normalized = getNormalizedDataset(rawArray);
    setReceipts(normalized);
  };

  return {
    ...processed,
    addReceipt,
    importCustomData
  };
}
