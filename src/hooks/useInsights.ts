import { useMemo } from 'react';
import { LifeReceipt } from '../types/receipt';
import { generateInsights } from '../engines/insightEngine';

export function useInsights(receipts: LifeReceipt[]) {
  const insights = useMemo(() => generateInsights(receipts), [receipts]);

  return {
    insights,
    insightCount: insights.length
  };
}
