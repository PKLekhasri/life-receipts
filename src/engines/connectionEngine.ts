import { LifeReceipt } from '../types/receipt';
import { StoryConnection, ConnectionExplanation, GraphNode, GraphLink } from '../types/connection';
import { getDifferenceInHours, formatTime } from '../utils/dateUtils';
import { getCategoryTheme } from '../utils/categoryUtils';

/**
 * Calculates relationship score between two receipts based on:
 * 1. Temporal Proximity (up to 40 pts)
 * 2. Location Proximity / Similarity (up to 30 pts)
 * 3. Shared Tags & Keywords (up to 20 pts)
 * 4. Entity / People Overlap (up to 10 pts)
 */
export function calculatePairScore(r1: LifeReceipt, r2: LifeReceipt): { score: number; reasons: ConnectionExplanation[] } {
  let score = 0;
  const reasons: ConnectionExplanation[] = [];

  // 1. Temporal Proximity
  const hoursDiff = getDifferenceInHours(r1.timestamp, r2.timestamp);
  if (hoursDiff <= 0.5) {
    score += 40;
    reasons.push({
      type: 'temporal',
      label: 'Immediate Sequence',
      description: `Occurred within 30 minutes (${Math.round(hoursDiff * 60)} mins apart)`,
      scoreContribution: 40
    });
  } else if (hoursDiff <= 2) {
    score += 30;
    reasons.push({
      type: 'temporal',
      label: 'Same Window',
      description: `Occurred within 2 hours (${hoursDiff.toFixed(1)}h apart)`,
      scoreContribution: 30
    });
  } else if (hoursDiff <= 6) {
    score += 20;
    reasons.push({
      type: 'temporal',
      label: 'Same Evening/Morning',
      description: `Occurred within 6 hours on same day`,
      scoreContribution: 20
    });
  } else if (hoursDiff <= 24) {
    score += 10;
    reasons.push({
      type: 'temporal',
      label: 'Same 24-Hour Cycle',
      description: `Occurred on the same date`,
      scoreContribution: 10
    });
  }

  // 2. Spatial / Location Similarity
  if (r1.location && r2.location) {
    const loc1 = r1.location.toLowerCase();
    const loc2 = r2.location.toLowerCase();
    if (loc1 === loc2) {
      score += 30;
      reasons.push({
        type: 'spatial',
        label: 'Identical Location',
        description: `Shared place: "${r1.location}"`,
        scoreContribution: 30
      });
    } else if (loc1.includes(loc2) || loc2.includes(loc1) || (r1.latitude && r2.latitude && Math.abs(r1.latitude - r2.latitude) < 0.05)) {
      score += 20;
      reasons.push({
        type: 'spatial',
        label: 'Nearby Location',
        description: `Co-located in same neighborhood or hub`,
        scoreContribution: 20
      });
    }
  }

  // 3. Shared Tags & Keywords
  const tags1 = new Set(r1.tags.map(t => t.toLowerCase()));
  const sharedTags = r2.tags.filter(t => tags1.has(t.toLowerCase()));
  if (sharedTags.length > 0) {
    const tagScore = Math.min(20, sharedTags.length * 10);
    score += tagScore;
    reasons.push({
      type: 'tag',
      label: 'Shared Themes',
      description: `Shared tags: #${sharedTags.join(', #')}`,
      scoreContribution: tagScore
    });
  }

  // 4. People / Entity Overlap
  if (r1.people && r2.people) {
    const p1 = new Set(r1.people.map(p => p.toLowerCase()));
    const sharedPeople = r2.people.filter(p => p1.has(p.toLowerCase()));
    if (sharedPeople.length > 0) {
      score += 10;
      reasons.push({
        type: 'entity',
        label: 'Shared People',
        description: `Together with ${sharedPeople.join(', ')}`,
        scoreContribution: 10
      });
    }
  }

  return { score, reasons };
}

/**
 * Deterministically groups receipts into meaningful Story Connections.
 */
export function detectConnections(receipts: LifeReceipt[]): StoryConnection[] {
  const connections: StoryConnection[] = [];
  const visited = new Set<string>();

  // Sort chronologically
  const sorted = [...receipts].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  for (let i = 0; i < sorted.length; i++) {
    const root = sorted[i];
    if (visited.has(root.id)) continue;

    const cluster: LifeReceipt[] = [root];
    const clusterReasons: ConnectionExplanation[] = [];
    let totalScore = 0;

    for (let j = i + 1; j < sorted.length; j++) {
      const candidate = sorted[j];
      const hoursDiff = getDifferenceInHours(root.timestamp, candidate.timestamp);
      
      // Stop checking if more than 8 hours apart to form coherent tight clusters
      if (hoursDiff > 8) break;

      const { score, reasons } = calculatePairScore(root, candidate);
      if (score >= 35) { // Significant relationship threshold
        cluster.push(candidate);
        totalScore += score;
        reasons.forEach(r => {
          if (!clusterReasons.some(existing => existing.label === r.label)) {
            clusterReasons.push(r);
          }
        });
      }
    }

    if (cluster.length >= 2) {
      cluster.forEach(r => visited.add(r.id));
      const primaryLoc = cluster.find(r => r.location)?.location || 'Various Locations';
      
      // Calculate shared tags across cluster
      const tagCounts: Record<string, number> = {};
      cluster.forEach(r => r.tags.forEach(t => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      }));
      const sharedTags = Object.entries(tagCounts)
        .filter(([_, count]) => count >= 2)
        .map(([tag]) => tag);

      // Category breakdown
      const catCounts: Record<string, number> = {};
      cluster.forEach(r => catCounts[r.category] = (catCounts[r.category] || 0) + 1);
      const dominantCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0][0];

      // Time window
      const timeStart = formatTime(cluster[0].timestamp);
      const timeEnd = formatTime(cluster[cluster.length - 1].timestamp);

      // Generate suggested explainable title
      let title = `Connected Moments around ${primaryLoc}`;
      let suggestedNarrative = `These ${cluster.length} moments occurred close together around ${timeStart} to ${timeEnd}.`;
      
      if (cluster.some(r => r.tags.includes('late-night'))) {
        title = `Late-Night Journey at ${primaryLoc}`;
        suggestedNarrative = `A late-night session connecting music, coffee, photos, and personal reflections.`;
      } else if (cluster.some(r => r.tags.includes('coastal') || r.tags.includes('beach'))) {
        title = `Coastal Exploration & Outing`;
        suggestedNarrative = `A weekend gathering along the ocean, involving scenic walks, photos, and shared playlists.`;
      } else if (cluster.some(r => r.category === 'Events')) {
        title = `Cultural Event & Discovery Gathering`;
        suggestedNarrative = `Attended a live event, followed by vinyl discoveries, notes, and local dining.`;
      }

      const avgScore = Math.min(100, Math.round(totalScore / (cluster.length - 1)));

      connections.push({
        id: `conn-${connections.length + 1}`,
        title,
        summary: `${cluster.length} connected moments across ${Object.keys(catCounts).length} categories.`,
        suggestedNarrative,
        receiptIds: cluster.map(r => r.id),
        receipts: cluster,
        connectionScore: avgScore,
        timeWindowHours: Math.ceil(getDifferenceInHours(cluster[0].timestamp, cluster[cluster.length - 1].timestamp) || 1),
        primaryLocation: primaryLoc,
        sharedTags,
        reasons: clusterReasons,
        dominantCategory
      });
    }
  }

  return connections;
}

/**
 * Builds nodes and links for the Connection Graph visualization.
 */
export function buildConnectionGraph(receipts: LifeReceipt[]): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = receipts.map(r => ({
    id: r.id,
    receipt: r,
    degree: 0
  }));

  const links: GraphLink[] = [];
  const nodeDegreeMap: Record<string, number> = {};

  for (let i = 0; i < receipts.length; i++) {
    for (let j = i + 1; j < receipts.length; j++) {
      const r1 = receipts[i];
      const r2 = receipts[j];
      const { score, reasons } = calculatePairScore(r1, r2);

      if (score >= 35) {
        links.push({
          source: r1.id,
          target: r2.id,
          score,
          reasons: reasons.map(r => r.label)
        });
        nodeDegreeMap[r1.id] = (nodeDegreeMap[r1.id] || 0) + 1;
        nodeDegreeMap[r2.id] = (nodeDegreeMap[r2.id] || 0) + 1;
      }
    }
  }

  nodes.forEach(n => {
    n.degree = nodeDegreeMap[n.id] || 0;
  });

  return { nodes, links };
}
