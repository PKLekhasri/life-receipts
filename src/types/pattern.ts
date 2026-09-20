import { LifeReceipt } from './receipt';

export type PatternType =
  | 'late_night'
  | 'weekend_explorer'
  | 'repeated_location'
  | 'favorite_artist'
  | 'frequent_merchant'
  | 'burst_activity'
  | 'category_sequence'
  | 'changing_interest';

export interface LifePattern {
  id: string;
  type: PatternType;
  title: string;
  subtitle: string;
  description: string;
  percentageOrMetric: string;
  confidenceScore: number; // 0-100
  evidenceReceiptIds: string[];
  evidenceReceipts: LifeReceipt[];
  category: string;
  iconName: string;
}
