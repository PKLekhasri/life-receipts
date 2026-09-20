import { LifeReceipt } from './receipt';

export interface ConnectionExplanation {
  type: 'temporal' | 'spatial' | 'entity' | 'tag' | 'category';
  label: string;
  description: string;
  scoreContribution: number;
}

export interface StoryConnection {
  id: string;
  title: string;
  summary: string;
  suggestedNarrative: string;
  receiptIds: string[];
  receipts: LifeReceipt[];
  connectionScore: number; // 0-100
  timeWindowHours: number;
  primaryLocation?: string;
  sharedTags: string[];
  reasons: ConnectionExplanation[];
  dominantCategory: string;
}

export interface GraphNode {
  id: string;
  receipt: LifeReceipt;
  x?: number;
  y?: number;
  degree: number;
}

export interface GraphLink {
  source: string;
  target: string;
  score: number;
  reasons: string[];
}
