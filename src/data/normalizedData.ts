import { LifeReceipt, ReceiptCategory } from '../types/receipt';
import { RAW_MOCK_RECEIPTS } from './raw/mockReceipts';
import { ALL_RECEIPT_CATEGORIES } from '../constants/categories';

/**
 * Normalizes raw receipt objects into a strictly typed, valid LifeReceipt model.
 * Handles missing fields, invalid dates, missing categories, and guarantees clean defaults.
 */
export function normalizeReceipt(raw: any, index: number): LifeReceipt {
  const id = raw.id ? String(raw.id) : `rcpt-norm-${index + 1}`;
  
  // Parse and validate date
  let timestamp = new Date().toISOString();
  if (raw.timestamp || raw.playedAt || raw.date || raw.createdAt) {
    const rawDateStr = raw.timestamp || raw.playedAt || raw.date || raw.createdAt;
    const parsed = new Date(rawDateStr);
    if (!isNaN(parsed.getTime())) {
      timestamp = parsed.toISOString();
    }
  }

  // Category normalization
  let category: ReceiptCategory = 'Notes';
  if (raw.category && ALL_RECEIPT_CATEGORIES.includes(raw.category as ReceiptCategory)) {
    category = raw.category as ReceiptCategory;
  } else if (raw.category) {
    const catLower = String(raw.category).toLowerCase();
    if (catLower.includes('music') || catLower.includes('song') || catLower.includes('track')) category = 'Music';
    else if (catLower.includes('movie') || catLower.includes('film') || catLower.includes('cinema') || catLower.includes('entertainment')) category = 'Movies';
    else if (catLower.includes('place') || catLower.includes('location') || catLower.includes('trip') || catLower.includes('travel')) category = 'Places';
    else if (catLower.includes('purchase') || catLower.includes('buy') || catLower.includes('payment') || catLower.includes('shopping')) category = 'Purchases';
    else if (catLower.includes('photo') || catLower.includes('picture') || catLower.includes('image')) category = 'Photos';
    else if (catLower.includes('message') || catLower.includes('chat') || catLower.includes('text')) category = 'Messages';
    else if (catLower.includes('search') || catLower.includes('query')) category = 'Searches';
    else if (catLower.includes('event') || catLower.includes('concert') || catLower.includes('meetup')) category = 'Events';
    else category = 'Notes';
  }

  const title = raw.title || raw.name || raw.movieTitle || raw.eventName || raw.merchant || raw.songTitle || 'Untitled Moment';
  const description = raw.description || raw.caption || raw.content || raw.summary || `${category} moment recorded.`;
  const location = raw.location || raw.venue || raw.city || undefined;
  const latitude = typeof raw.latitude === 'number' ? raw.latitude : undefined;
  const longitude = typeof raw.longitude === 'number' ? raw.longitude : undefined;
  const people = Array.isArray(raw.people) ? raw.people.map(String) : raw.participants ? [String(raw.participants)] : undefined;
  
  const tags: string[] = Array.isArray(raw.tags)
    ? raw.tags.map((t: any) => String(t).toLowerCase().replace(/^#/, ''))
    : [category.toLowerCase()];

  const source = raw.source || raw.platform || raw.app || 'Digital Record';
  const amount = typeof raw.amount === 'number' ? raw.amount : typeof raw.price === 'number' ? raw.price : undefined;
  const duration = typeof raw.duration === 'number' ? raw.duration : undefined;
  const imageUrl = raw.imageUrl || raw.mediaUrl || raw.photoUrl || undefined;
  const importanceScore = typeof raw.importanceScore === 'number' ? Math.min(10, Math.max(1, raw.importanceScore)) : 5;

  return {
    id,
    timestamp,
    category,
    title,
    description,
    location,
    latitude,
    longitude,
    people,
    tags,
    source,
    amount,
    duration,
    imageUrl,
    importanceScore,
    metadata: raw.metadata || {},
    relatedReceiptIds: Array.isArray(raw.relatedReceiptIds) ? raw.relatedReceiptIds.map(String) : []
  };
}

/**
 * Normalizes an array of raw receipts and returns them chronologically sorted.
 */
export function getNormalizedDataset(rawList: any[] = RAW_MOCK_RECEIPTS): LifeReceipt[] {
  const normalized = rawList.map((item, idx) => normalizeReceipt(item, idx));
  return normalized.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}
