import { LifeReceipt } from '../types/receipt';
import { LifePattern } from '../types/pattern';
import { getHourOfDay, isWeekend } from '../utils/dateUtils';

/**
 * Deterministically analyzes the dataset to detect recurring habits, routines, and behavioral patterns.
 */
export function detectPatterns(receipts: LifeReceipt[]): LifePattern[] {
  const patterns: LifePattern[] = [];

  if (!receipts || receipts.length === 0) return patterns;

  // 1. Late Night Creator Pattern
  const lateNightReceipts = receipts.filter(r => {
    const hour = getHourOfDay(r.timestamp);
    return hour >= 22 || hour <= 3;
  });
  if (lateNightReceipts.length >= 3) {
    const percentage = Math.round((lateNightReceipts.length / receipts.length) * 100);
    patterns.push({
      id: 'pat-late-night',
      type: 'late_night',
      title: 'LATE NIGHT CREATOR',
      subtitle: `${percentage}% of activity occurs between 10 PM and 3 AM.`,
      description: 'Your digital footprint highlights a distinct late-night workflow, with ambient music, coffee orders, personal notes, and creative searches clustering after midnight.',
      percentageOrMetric: `${percentage}% Night Owl`,
      confidenceScore: Math.min(95, 60 + percentage),
      evidenceReceiptIds: lateNightReceipts.map(r => r.id),
      evidenceReceipts: lateNightReceipts,
      category: 'Routines',
      iconName: 'Moon'
    });
  }

  // 2. Weekend Explorer Pattern
  const weekendReceipts = receipts.filter(r => isWeekend(r.timestamp));
  if (weekendReceipts.length >= 3) {
    const weekendPct = Math.round((weekendReceipts.length / receipts.length) * 100);
    const placeAndEventCount = weekendReceipts.filter(r => r.category === 'Places' || r.category === 'Events' || r.category === 'Photos').length;
    patterns.push({
      id: 'pat-weekend-explorer',
      type: 'weekend_explorer',
      title: 'WEEKEND EXPLORER',
      subtitle: `${placeAndEventCount} outdoor and coastal moments occurred on weekends.`,
      description: 'Weekends consistently feature coastal promenade walks, live music events, photography, and dining out.',
      percentageOrMetric: `${weekendPct}% Weekend Focus`,
      confidenceScore: 88,
      evidenceReceiptIds: weekendReceipts.map(r => r.id),
      evidenceReceipts: weekendReceipts,
      category: 'Lifestyle',
      iconName: 'Compass'
    });
  }

  // 3. Repeated Locations Pattern
  const locationCounts: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    if (r.location) {
      locationCounts[r.location] = locationCounts[r.location] || [];
      locationCounts[r.location].push(r);
    }
  });
  const topLocationEntry = Object.entries(locationCounts).sort((a, b) => b[1].length - a[1].length)[0];
  if (topLocationEntry && topLocationEntry[1].length >= 3) {
    const [locName, locReceipts] = topLocationEntry;
    patterns.push({
      id: 'pat-repeated-location',
      type: 'repeated_location',
      title: 'FAVORITE SANCTUARY',
      subtitle: `Visited "${locName}" ${locReceipts.length} times across this period.`,
      description: `This location serves as a recurring backdrop for work, social meetings, and creative downtime.`,
      percentageOrMetric: `${locReceipts.length} Visits`,
      confidenceScore: 92,
      evidenceReceiptIds: locReceipts.map(r => r.id),
      evidenceReceipts: locReceipts,
      category: 'Places',
      iconName: 'MapPin'
    });
  }

  // 4. Burst Activity Pattern (Multi-category bursts)
  const sorted = [...receipts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  let maxBurstCluster: LifeReceipt[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const burst = [current];
    const categories = new Set([current.category]);
    for (let j = i + 1; j < sorted.length; j++) {
      const diffMins = (new Date(sorted[j].timestamp).getTime() - new Date(current.timestamp).getTime()) / (1000 * 60);
      if (diffMins <= 90) {
        burst.push(sorted[j]);
        categories.add(sorted[j].category);
      } else {
        break;
      }
    }
    if (categories.size >= 3 && burst.length > maxBurstCluster.length) {
      maxBurstCluster = burst;
    }
  }

  if (maxBurstCluster.length >= 3) {
    const burstCatCount = new Set(maxBurstCluster.map(r => r.category)).size;
    patterns.push({
      id: 'pat-burst-activity',
      type: 'burst_activity',
      title: 'CREATIVE SPARK BURST',
      subtitle: `${burstCatCount} distinct data categories recorded within a 90-minute window.`,
      description: 'Intense moments of inspiration where listening to music, writing notes, taking photos, and buying coffee occur in rapid succession.',
      percentageOrMetric: `${maxBurstCluster.length} Moments in 90m`,
      confidenceScore: 94,
      evidenceReceiptIds: maxBurstCluster.map(r => r.id),
      evidenceReceipts: maxBurstCluster,
      category: 'Momentum',
      iconName: 'Zap'
    });
  }

  // 5. Favorite Music Artist
  const artistCounts: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    if (r.category === 'Music' && r.metadata?.artist) {
      const artist = r.metadata.artist;
      artistCounts[artist] = artistCounts[artist] || [];
      artistCounts[artist].push(r);
    }
  });
  const topArtistEntry = Object.entries(artistCounts).sort((a, b) => b[1].length - a[1].length)[0];
  if (topArtistEntry) {
    const [artistName, artistReceipts] = topArtistEntry;
    patterns.push({
      id: 'pat-favorite-artist',
      type: 'favorite_artist',
      title: 'SOUNDTRACK ANCHOR',
      subtitle: `Listened to ${artistName} ${artistReceipts.length} times during late nights and road trips.`,
      description: `Music by ${artistName} formed the soundtrack to key creative and travel chapters.`,
      percentageOrMetric: `${artistReceipts.length} Plays`,
      confidenceScore: 90,
      evidenceReceiptIds: artistReceipts.map(r => r.id),
      evidenceReceipts: artistReceipts,
      category: 'Audio',
      iconName: 'Headphones'
    });
  }

  return patterns;
}
