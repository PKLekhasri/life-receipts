import { LifeReceipt } from './receipt';
import { StoryConnection } from './connection';

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  startDate: string;
  endDate: string;
  dominantCategory: string;
  receiptCount: number;
  keyReceipts: LifeReceipt[];
  keyConnections: StoryConnection[];
  themes: string[];
  locationHighlight?: string;
}
