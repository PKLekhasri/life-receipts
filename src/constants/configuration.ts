/**
 * System-wide Constants & Algorithm Threshold Configuration
 */

// Connection Engine Thresholds & Weights
export const CONNECTION_CONFIG = {
  IMMEDIATE_SEQUENCE_HOURS: 0.5, // 30 minutes
  SAME_WINDOW_HOURS: 2.0,        // 2 hours
  SAME_EVENING_HOURS: 6.0,       // 6 hours
  SAME_DAY_HOURS: 24.0,          // 24 hours

  IMMEDIATE_SEQUENCE_SCORE: 40,
  SAME_WINDOW_SCORE: 30,
  SAME_EVENING_SCORE: 20,
  SAME_DAY_SCORE: 10,

  IDENTICAL_LOCATION_SCORE: 30,
  NEARBY_LOCATION_SCORE: 20,

  MAX_TAG_SCORE: 20,
  TAG_SCORE_PER_MATCH: 10,

  PEOPLE_OVERLAP_SCORE: 10,

  SIGNIFICANT_CONNECTION_THRESHOLD: 35, // Score needed to form link
  MAX_CLUSTER_TIME_WINDOW_HOURS: 8      // Max time spread for clusters
};

// Pattern Engine Thresholds
export const PATTERN_CONFIG = {
  MIN_LATE_NIGHT_HOURS: 22, // 10 PM
  MAX_LATE_NIGHT_HOURS: 3,  // 3 AM
  MIN_LATE_NIGHT_RECEIPTS: 3,

  MIN_WEEKEND_RECEIPTS: 3,

  MIN_LOCATION_VISITS: 3,

  BURST_WINDOW_MINUTES: 90,
  MIN_BURST_CATEGORIES: 3,

  MIN_ARTIST_PLAYS: 2
};

// Search & Filter Configuration
export const FILTER_CONFIG = {
  DEBOUNCE_DELAY_MS: 200,
  IMPORTANT_IMPORTANCE_SCORE: 8,
  UNUSUAL_AMOUNT_THRESHOLD: 1000
};

// Application Meta
export const APP_META = {
  TITLE: 'LIFE RECEIPTS',
  TAGLINE: 'One dataset. Hundreds of moments. Infinite stories.',
  VERSION: '2.0.0-hackathon',
  AUTHOR: 'Lead Frontend Engineer & UX Architect'
};
