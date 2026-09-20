import React from 'react';
import { LifePattern } from '../types/pattern';
import { LifeReceipt } from '../types/receipt';
import { PatternsView } from '../components/patterns/PatternsView';

interface PatternsPageProps {
  patterns: LifePattern[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const PatternsPage: React.FC<PatternsPageProps> = React.memo(({ patterns, onSelectReceipt }) => {
  return (
    <div className="py-4">
      <PatternsView patterns={patterns} onSelectReceipt={onSelectReceipt} />
    </div>
  );
});
