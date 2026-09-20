/**
 * Scoring and normalization utilities for mathematical algorithms.
 */

/**
 * Normalizes a number into a bounded range [min, max].
 */
export function clamp(value: number, min: number = 0, max: number = 100): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Calculates a percentage ratio formatted to an integer string.
 */
export function calculatePercentage(part: number, total: number): number {
  if (!total || total <= 0) return 0;
  return Math.round((part / total) * 100);
}

/**
 * Computes geographic distance between two coordinates in kilometers using Haversine formula.
 */
export function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
