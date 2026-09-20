import { useMemo } from 'react';
import { LifeReceipt } from '../types/receipt';
import { detectConnections, buildConnectionGraph } from '../engines/connectionEngine';

export function useConnections(receipts: LifeReceipt[]) {
  const connections = useMemo(() => detectConnections(receipts), [receipts]);
  const graphData = useMemo(() => buildConnectionGraph(receipts), [receipts]);

  return {
    connections,
    graphData,
    connectionCount: connections.length
  };
}
