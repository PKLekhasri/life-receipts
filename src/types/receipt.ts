export type ReceiptCategory =
  | 'Music'
  | 'Movies'
  | 'Places'
  | 'Purchases'
  | 'Photos'
  | 'Messages'
  | 'Searches'
  | 'Events'
  | 'Notes';

export interface LifeReceipt {
  id: string;
  timestamp: string; // ISO String
  category: ReceiptCategory;
  title: string;
  description: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  people?: string[];
  tags: string[];
  source: string;
  amount?: number;
  duration?: number; // e.g. in seconds or minutes
  imageUrl?: string;
  importanceScore?: number; // 1-10
  metadata?: {
    artist?: string;
    album?: string;
    movieTitle?: string;
    platform?: string;
    merchant?: string;
    sender?: string;
    recipient?: string;
    searchQuery?: string;
    eventName?: string;
    noteContent?: string;
    mood?: string;
    [key: string]: any;
  };
  relatedReceiptIds?: string[];
}

export type ViewMode = 'grid' | 'timeline' | 'table';

export type FilterPreset = 'all' | 'connected' | 'important' | 'unusual' | 'recurring';

export interface FilterState {
  searchQuery: string;
  category: ReceiptCategory | 'ALL';
  preset: FilterPreset;
  selectedMonth: string | 'ALL';
  selectedTag: string | 'ALL';
  selectedLocation: string | 'ALL';
  startDate?: string;
  endDate?: string;
  sortBy: 'timestamp-desc' | 'timestamp-asc' | 'importance-desc' | 'amount-desc';
}
