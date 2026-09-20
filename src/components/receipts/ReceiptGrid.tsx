import React from 'react';
import { LifeReceipt } from '../../types/receipt';
import { ReceiptCard } from './ReceiptCard';
import { EmptyState } from '../common/EmptyState';

interface ReceiptGridProps {
  receipts: LifeReceipt[];
  connectedReceiptIds?: string[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onResetFilters?: () => void;
}

export const ReceiptGrid: React.FC<ReceiptGridProps> = ({
  receipts,
  connectedReceiptIds = [],
  onSelectReceipt,
  onResetFilters
}) => {
  if (receipts.length === 0) {
    return (
      <EmptyState
        title="No Life Receipts Found"
        description="No digital moments match your current search query or filter preset. Try clearing your search term or choosing a different category."
        actionLabel="Reset Explorer Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {receipts.map(r => (
        <ReceiptCard
          key={r.id}
          receipt={r}
          isConnected={connectedReceiptIds.includes(r.id)}
          onClick={() => onSelectReceipt(r)}
        />
      ))}
    </div>
  );
};
