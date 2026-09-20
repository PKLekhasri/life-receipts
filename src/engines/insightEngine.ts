import { LifeReceipt } from '../types/receipt';
import { TraceableInsight } from '../types/insight';
import { formatDate, getHourOfDay } from '../utils/dateUtils';

/**
 * Deterministically scans the dataset to produce explainable "Things You Might Have Missed" cards with traceable evidence.
 */
export function generateInsights(receipts: LifeReceipt[]): TraceableInsight[] {
  const insights: TraceableInsight[] = [];

  if (!receipts || receipts.length === 0) return insights;

  // 1. High Concentration Week Insight
  const dateCounts: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    const dayKey = formatDate(r.timestamp);
    dateCounts[dayKey] = dateCounts[dayKey] || [];
    dateCounts[dayKey].push(r);
  });
  const peakDayEntry = Object.entries(dateCounts).sort((a, b) => b[1].length - a[1].length)[0];
  if (peakDayEntry && peakDayEntry[1].length >= 3) {
    const [dayStr, dayReceipts] = peakDayEntry;
    insights.push({
      id: 'ins-peak-day',
      title: 'Highest Memory Concentration',
      statement: `You recorded ${dayReceipts.length} distinct moments on ${dayStr}.`,
      category: 'Density',
      impactLevel: 'high',
      evidenceCount: dayReceipts.length,
      evidenceSummary: `${dayReceipts.length} receipts spanning ${new Set(dayReceipts.map(r => r.category)).size} categories on ${dayStr}.`,
      evidenceReceiptIds: dayReceipts.map(r => r.id),
      evidenceReceipts: dayReceipts,
      timeframe: dayStr,
      iconName: 'Sparkles',
      whyItMatters: 'Identifying peak days helps pin down landmark events, travel days, or hackathon sprints where your digital record was most active.'
    });
  }

  // 2. Late Night Music Peak
  const musicReceipts = receipts.filter(r => r.category === 'Music');
  const nightMusic = musicReceipts.filter(r => {
    const h = getHourOfDay(r.timestamp);
    return h >= 23 || h <= 3;
  });
  if (musicReceipts.length > 0 && nightMusic.length >= 2) {
    const pct = Math.round((nightMusic.length / musicReceipts.length) * 100);
    insights.push({
      id: 'ins-night-music',
      title: 'Late-Night Audio Peak',
      statement: `${pct}% of your music plays occurred between 11 PM and 3 AM.`,
      category: 'Audio Routine',
      impactLevel: 'high',
      evidenceCount: nightMusic.length,
      evidenceSummary: `${nightMusic.length} out of ${musicReceipts.length} music tracks listened to after 11 PM.`,
      evidenceReceiptIds: nightMusic.map(r => r.id),
      evidenceReceipts: nightMusic,
      timeframe: 'Late Nights',
      iconName: 'Moon',
      whyItMatters: 'Shows how atmospheric sound serves as your primary focus engine or wind-down ritual during late hours.'
    });
  }

  // 3. Multi-Category Rapid Sequence
  const sorted = [...receipts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  for (let i = 0; i < sorted.length - 2; i++) {
    const r1 = sorted[i];
    const r2 = sorted[i + 1];
    const r3 = sorted[i + 2];
    const diffMins = (new Date(r3.timestamp).getTime() - new Date(r1.timestamp).getTime()) / (1000 * 60);
    
    if (diffMins <= 60 && new Set([r1.category, r2.category, r3.category]).size >= 3) {
      const cluster = [r1, r2, r3];
      insights.push({
        id: 'ins-multi-cat-burst',
        title: '3 Categories in 60 Minutes',
        statement: `Three distinct life activities (${r1.category}, ${r2.category}, ${r3.category}) occurred within ${Math.round(diffMins)} minutes on ${formatDate(r1.timestamp)}.`,
        category: 'Multitasking',
        impactLevel: 'medium',
        evidenceCount: 3,
        evidenceSummary: `Recorded ${r1.category} ("${r1.title}"), ${r2.category} ("${r2.title}"), and ${r3.category} ("${r3.title}").`,
        evidenceReceiptIds: cluster.map(r => r.id),
        evidenceReceipts: cluster,
        timeframe: formatDate(r1.timestamp),
        iconName: 'Zap',
        whyItMatters: 'Demonstrates interconnected real-world moments where listening to music, purchasing items, and capturing photos happen simultaneously.'
      });
      break;
    }
  }

  // 4. Repeated Merchant or Sanctuary
  const merchantCounts: Record<string, LifeReceipt[]> = {};
  receipts.forEach(r => {
    if (r.category === 'Purchases' && r.metadata?.merchant) {
      const m = r.metadata.merchant;
      merchantCounts[m] = merchantCounts[m] || [];
      merchantCounts[m].push(r);
    }
  });
  const topMerchant = Object.entries(merchantCounts).sort((a, b) => b[1].length - a[1].length)[0];
  if (topMerchant && topMerchant[1].length >= 2) {
    const [mName, mReceipts] = topMerchant;
    insights.push({
      id: 'ins-repeat-merchant',
      title: 'Anchor Merchant Habit',
      statement: `You made ${mReceipts.length} purchases at "${mName}".`,
      category: 'Spending Habit',
      impactLevel: 'subtle',
      evidenceCount: mReceipts.length,
      evidenceSummary: `Total ₹${mReceipts.reduce((acc, curr) => acc + (curr.amount || 0), 0)} spent across ${mReceipts.length} visits.`,
      evidenceReceiptIds: mReceipts.map(r => r.id),
      evidenceReceipts: mReceipts,
      timeframe: 'Ongoing',
      iconName: 'CreditCard',
      whyItMatters: 'Highlights your trusted everyday spots for coffee, books, or dining.'
    });
  }

  // 5. Notes following Events / Movies
  const noteReceipts = receipts.filter(r => r.category === 'Notes');
  if (noteReceipts.length > 0) {
    insights.push({
      id: 'ins-reflective-notes',
      title: 'Post-Experience Reflections',
      statement: `${noteReceipts.length} personal notes were captured immediately following movies, music releases, or meetups.`,
      category: 'Reflections',
      impactLevel: 'medium',
      evidenceCount: noteReceipts.length,
      evidenceSummary: `Journal notes recorded after creative experiences.`,
      evidenceReceiptIds: noteReceipts.map(r => r.id),
      evidenceReceipts: noteReceipts,
      timeframe: 'Post-Events',
      iconName: 'FileText',
      whyItMatters: 'Shows a habit of turning experiences into written personal insights and ideas.'
    });
  }

  return insights;
}
