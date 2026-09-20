import React, { useMemo } from 'react';
import { StoryConnection } from '../types/connection';
import { LifeReceipt } from '../types/receipt';
import { ConnectionsView } from '../components/connections/ConnectionsView';
import { buildConnectionGraph } from '../engines/connectionEngine';

interface ConnectionsPageProps {
  connections: StoryConnection[];
  receipts: LifeReceipt[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ConnectionsPage: React.FC<ConnectionsPageProps> = React.memo(({
  connections,
  receipts,
  onSelectReceipt
}) => {
  const graphData = useMemo(() => buildConnectionGraph(receipts), [receipts]);

  return (
    <div className="py-4">
      <ConnectionsView
        connections={connections}
        graphData={graphData}
        onSelectReceipt={onSelectReceipt}
      />
    </div>
  );
});
