import { LifeReceipt } from './receipt';

export interface TraceableInsight {
  id: string;
  title: string;
  statement: string;
  category: string;
  impactLevel: 'high' | 'medium' | 'subtle';
  evidenceCount: number;
  evidenceSummary: string;
  evidenceReceiptIds: string[];
  evidenceReceipts: LifeReceipt[];
  timeframe: string;
  iconName: string;
  whyItMatters: string;
}
