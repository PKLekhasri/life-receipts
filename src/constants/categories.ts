import { ReceiptCategory } from '../types/receipt';

export interface CategoryDefinition {
  id: ReceiptCategory;
  label: string;
  emoji: string;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

export const CATEGORY_DEFINITIONS: Record<ReceiptCategory, CategoryDefinition> = {
  Music: {
    id: 'Music',
    label: 'Music',
    emoji: '🎵',
    iconName: 'Music',
    color: '#8b5cf6',
    bgColor: 'bg-violet-950/40',
    borderColor: 'border-violet-500/30',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    description: 'Tracks played, ambient focus sessions, and playlist listens.'
  },
  Movies: {
    id: 'Movies',
    label: 'Movies & Cinema',
    emoji: '🎬',
    iconName: 'Film',
    color: '#ec4899',
    bgColor: 'bg-pink-950/40',
    borderColor: 'border-pink-500/30',
    badgeBg: 'bg-pink-500/10',
    badgeText: 'text-pink-400',
    description: 'Films watched, series binges, and cinema visits.'
  },
  Places: {
    id: 'Places',
    label: 'Places & Travel',
    emoji: '📍',
    iconName: 'MapPin',
    color: '#10b981',
    bgColor: 'bg-emerald-950/40',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    description: 'Coastal visits, sanctuaries, co-located hubs, and roadtrips.'
  },
  Purchases: {
    id: 'Purchases',
    label: 'Purchases',
    emoji: '💳',
    iconName: 'CreditCard',
    color: '#f59e0b',
    bgColor: 'bg-amber-950/40',
    borderColor: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    description: 'Specialty coffee, vinyl records, stationery, and dining.'
  },
  Photos: {
    id: 'Photos',
    label: 'Photos & Captures',
    emoji: '📷',
    iconName: 'Camera',
    color: '#3b82f6',
    bgColor: 'bg-blue-950/40',
    borderColor: 'border-blue-500/30',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    description: 'Sunset snapshots, camera rolls, and visual memories.'
  },
  Messages: {
    id: 'Messages',
    label: 'Messages',
    emoji: '💬',
    iconName: 'MessageSquare',
    color: '#06b6d4',
    bgColor: 'bg-cyan-950/40',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    description: 'Group chat updates, playlist swaps, and personal texts.'
  },
  Searches: {
    id: 'Searches',
    label: 'Searches',
    emoji: '🔍',
    iconName: 'Search',
    color: '#6366f1',
    bgColor: 'bg-indigo-950/40',
    borderColor: 'border-indigo-500/30',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-400',
    description: 'Late-night music discovery and tutorial queries.'
  },
  Events: {
    id: 'Events',
    label: 'Events & Gatherings',
    emoji: '🎟️',
    iconName: 'Calendar',
    color: '#f43f5e',
    bgColor: 'bg-rose-950/40',
    borderColor: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-400',
    description: 'Live acoustic showcases, tech meetups, and workshops.'
  },
  Notes: {
    id: 'Notes',
    label: 'Personal Notes',
    emoji: '📝',
    iconName: 'FileText',
    color: '#a855f7',
    bgColor: 'bg-purple-950/40',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    description: 'Solitary reflections, architecture blueprints, and thoughts.'
  }
};

export const ALL_RECEIPT_CATEGORIES: ReceiptCategory[] = [
  'Music',
  'Movies',
  'Places',
  'Purchases',
  'Photos',
  'Messages',
  'Searches',
  'Events',
  'Notes'
];
