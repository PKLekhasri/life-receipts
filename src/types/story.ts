import { LifeReceipt } from './receipt';

export interface StoryPhase {
  phaseNumber: number;
  phaseCode: string;
  title: string;
  headline: string;
  description: string;
  highlightReceiptId?: string;
  highlightReceipt?: LifeReceipt;
}

export interface GuidedStoryState {
  currentStepIndex: number;
  isOpen: boolean;
}
