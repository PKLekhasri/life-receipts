import { LifeReceipt, ReceiptCategory } from '../types/receipt';
import { ALL_RECEIPT_CATEGORIES } from '../constants/categories';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates a single LifeReceipt against system schema requirements.
 */
export function validateReceipt(receipt: unknown): ValidationResult {
  const errors: string[] = [];

  if (!receipt || typeof receipt !== 'object') {
    return { isValid: false, errors: ['Receipt must be a non-null object.'] };
  }

  const r = receipt as Record<string, unknown>;

  if (!r.id || typeof r.id !== 'string') {
    errors.push('Missing or invalid id (must be string).');
  }

  if (!r.timestamp || typeof r.timestamp !== 'string' || isNaN(Date.parse(r.timestamp as string))) {
    errors.push('Missing or invalid ISO timestamp.');
  }

  if (!r.category || typeof r.category !== 'string' || !ALL_RECEIPT_CATEGORIES.includes(r.category as ReceiptCategory)) {
    errors.push(`Invalid category: "${r.category}". Must be one of ${ALL_RECEIPT_CATEGORIES.join(', ')}.`);
  }

  if (!r.title || typeof r.title !== 'string') {
    errors.push('Missing or invalid title.');
  }

  if (r.tags && !Array.isArray(r.tags)) {
    errors.push('Tags must be an array of strings.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates an entire dataset of receipts and filters out broken entries.
 */
export function validateDataset(data: unknown[]): { validReceipts: LifeReceipt[]; invalidCount: number } {
  const validReceipts: LifeReceipt[] = [];
  let invalidCount = 0;

  data.forEach((item) => {
    const res = validateReceipt(item);
    if (res.isValid) {
      validReceipts.push(item as LifeReceipt);
    } else {
      invalidCount++;
    }
  });

  return { validReceipts, invalidCount };
}
