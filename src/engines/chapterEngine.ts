import { LifeReceipt } from '../types/receipt';
import { StoryChapter } from '../types/chapter';
import { StoryConnection } from '../types/connection';
import { formatDate } from '../utils/dateUtils';

/**
 * Derives meaningful story chapters from activity clusters, time windows, and dominant themes.
 */
export function generateChapters(receipts: LifeReceipt[], connections: StoryConnection[]): StoryChapter[] {
  if (!receipts || receipts.length === 0) return [];

  // Sort receipts chronologically
  const sorted = [...receipts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Segment timeline into ~4 coherent time periods
  const totalCount = sorted.length;
  const segmentSize = Math.max(2, Math.ceil(totalCount / 4));
  
  const rawSegments: LifeReceipt[][] = [];
  for (let i = 0; i < sorted.length; i += segmentSize) {
    rawSegments.push(sorted.slice(i, i + segmentSize));
  }

  const chapterMetaTemplates = [
    {
      title: 'Midnight Harmonies & Early Sparks',
      subtitle: 'A quiet phase of solitary focus, atmospheric music, and midnight coffee notes.',
      themes: ['Creative Focus', 'Late-Night Ambient', 'Coffee Solitude']
    },
    {
      title: 'Coastal Expeditions & Sunset Promenade',
      subtitle: 'Stepping outside into weekend beach walks, golden hour photography, and friends.',
      themes: ['Coastal Outing', 'Sunset Photography', 'Social Reconnections']
    },
    {
      title: 'Cultural Discoveries & Vinyl Artifacts',
      subtitle: 'Immersing in live music showcases, vintage vinyl hunting, and design gatherings.',
      themes: ['Live Concerts', 'Analog Vinyl', 'Cultural Outings']
    },
    {
      title: 'Deep Focus & Frontend Innovation',
      subtitle: 'An intense sprint of architecture design, coding flow, and problem solving.',
      themes: ['Hackathon Sprint', 'Data Visualization', 'UI Architecture']
    }
  ];

  return rawSegments.map((segment, idx) => {
    const template = chapterMetaTemplates[idx % chapterMetaTemplates.length];
    const startDate = formatDate(segment[0].timestamp);
    const endDate = formatDate(segment[segment.length - 1].timestamp);

    // Dominant Category
    const catCounts: Record<string, number> = {};
    segment.forEach(r => catCounts[r.category] = (catCounts[r.category] || 0) + 1);
    const dominantCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0][0];

    // Key Receipts (Highest importance score)
    const keyReceipts = [...segment]
      .sort((a, b) => (b.importanceScore || 5) - (a.importanceScore || 5))
      .slice(0, 3);

    // Location highlight
    const locWithCount: Record<string, number> = {};
    segment.forEach(r => {
      if (r.location) locWithCount[r.location] = (locWithCount[r.location] || 0) + 1;
    });
    const locationHighlight = Object.entries(locWithCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Chennai Hub';

    // Find connections inside this chapter's date window
    const chapterConnections = connections.filter(conn => {
      return conn.receipts.some(r => segment.some(s => s.id === r.id));
    });

    return {
      id: `chap-${idx + 1}`,
      chapterNumber: idx + 1,
      title: template.title,
      subtitle: template.subtitle,
      summary: `During ${startDate} – ${endDate}, ${segment.length} moments unfolded centered around ${locationHighlight}. ${dominantCategory} was the primary activity driver.`,
      startDate,
      endDate,
      dominantCategory,
      receiptCount: segment.length,
      keyReceipts,
      keyConnections: chapterConnections.slice(0, 2),
      themes: template.themes,
      locationHighlight
    };
  });
}
