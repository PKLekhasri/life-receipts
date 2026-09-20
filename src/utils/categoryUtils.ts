import { ReceiptCategory } from '../types/receipt';

export interface CategoryTheme {
  category: ReceiptCategory;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  iconName: string;
  emoji: string;
}

export const CATEGORY_THEMES: Record<ReceiptCategory, CategoryTheme> = {
  Music: {
    category: 'Music',
    color: '#8b5cf6', // Violet
    bgColor: 'bg-violet-950/40',
    borderColor: 'border-violet-500/30',
    badgeBg: 'bg-violet-500/10',
    badgeText: 'text-violet-400',
    iconName: 'Music',
    emoji: '🎵'
  },
  Movies: {
    category: 'Movies',
    color: '#ec4899', // Pink
    bgColor: 'bg-pink-950/40',
    borderColor: 'border-pink-500/30',
    badgeBg: 'bg-pink-500/10',
    badgeText: 'text-pink-400',
    iconName: 'Film',
    emoji: '🎬'
  },
  Places: {
    category: 'Places',
    color: '#10b981', // Emerald
    bgColor: 'bg-emerald-950/40',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    iconName: 'MapPin',
    emoji: '📍'
  },
  Purchases: {
    category: 'Purchases',
    color: '#f59e0b', // Amber
    bgColor: 'bg-amber-950/40',
    borderColor: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    iconName: 'CreditCard',
    emoji: '💳'
  },
  Photos: {
    category: 'Photos',
    color: '#3b82f6', // Blue
    bgColor: 'bg-blue-950/40',
    borderColor: 'border-blue-500/30',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    iconName: 'Camera',
    emoji: '📷'
  },
  Messages: {
    category: 'Messages',
    color: '#06b6d4', // Cyan
    bgColor: 'bg-cyan-950/40',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    iconName: 'MessageSquare',
    emoji: '💬'
  },
  Searches: {
    category: 'Searches',
    color: '#6366f1', // Indigo
    bgColor: 'bg-indigo-950/40',
    borderColor: 'border-indigo-500/30',
    badgeBg: 'bg-indigo-500/10',
    badgeText: 'text-indigo-400',
    iconName: 'Search',
    emoji: '🔍'
  },
  Events: {
    category: 'Events',
    color: '#f43f5e', // Rose
    bgColor: 'bg-rose-950/40',
    borderColor: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/10',
    badgeText: 'text-rose-400',
    iconName: 'Calendar',
    emoji: '🎟️'
  },
  Notes: {
    category: 'Notes',
    color: '#a855f7', // Purple
    bgColor: 'bg-purple-950/40',
    borderColor: 'border-purple-500/30',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    iconName: 'FileText',
    emoji: '📝'
  }
};

export function getCategoryTheme(category: ReceiptCategory): CategoryTheme {
  return CATEGORY_THEMES[category] || CATEGORY_THEMES.Notes;
}
