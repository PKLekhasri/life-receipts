import React, { useState, useMemo } from 'react';
import { LifeReceipt } from '../../types/receipt';
import { GraphNode, GraphLink } from '../../types/connection';
import { getCategoryTheme } from '../../utils/categoryUtils';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { Network, Sparkles, MapPin, ArrowRight } from 'lucide-react';

interface ConnectionGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onSelectReceipt: (receipt: LifeReceipt) => void;
}

export const ConnectionGraph: React.FC<ConnectionGraphProps> = ({ nodes, links, onSelectReceipt }) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(nodes[0]?.id || null);

  // Compute circular layout for SVG Graph nodes
  const layoutNodes = useMemo(() => {
    const total = nodes.length;
    if (total === 0) return [];
    const width = 600;
    const height = 450;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.38;

    return nodes.map((node, index) => {
      const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { ...node, x, y };
    });
  }, [nodes]);

  const activeNode = layoutNodes.find(n => n.id === (hoveredNodeId || selectedNodeId)) || layoutNodes[0];

  // Connected node IDs for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!activeNode) return new Set<string>();
    const set = new Set<string>([activeNode.id]);
    links.forEach(l => {
      if (l.source === activeNode.id) set.add(l.target);
      if (l.target === activeNode.id) set.add(l.source);
    });
    return set;
  }, [activeNode, links]);

  // Links associated with active node
  const activeLinks = useMemo(() => {
    if (!activeNode) return [];
    return links.filter(l => l.source === activeNode.id || l.target === activeNode.id);
  }, [activeNode, links]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Interactive Connection Graph</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Hover over nodes to illuminate relational connections across time, places, and shared themes.
          </p>
        </div>

        <span className="text-xs px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono rounded-full self-start sm:self-auto">
          {nodes.length} Nodes • {links.length} Active Edges
        </span>
      </div>

      {/* SVG Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* SVG Graph View */}
        <div className="lg:col-span-2 relative bg-slate-950 rounded-3xl border border-slate-800 p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 600 450" className="w-full h-full select-none">
            <defs>
              <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Links */}
            {links.map((link, idx) => {
              const sourceNode = layoutNodes.find(n => n.id === link.source);
              const targetNode = layoutNodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode || !sourceNode.x || !sourceNode.y || !targetNode.x || !targetNode.y) return null;

              const isHighlighted = activeNode && (link.source === activeNode.id || link.target === activeNode.id);

              return (
                <line
                  key={`link-${idx}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? '#818cf8' : '#334155'}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeDasharray={isHighlighted ? undefined : '3 3'}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Nodes */}
            {layoutNodes.map((node) => {
              const isSelected = activeNode?.id === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const theme = getCategoryTheme(node.receipt.category);

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                    onSelectReceipt(node.receipt);
                  }}
                >
                  {/* Outer pulse circle for selected */}
                  {isSelected && (
                    <circle r="18" fill="none" stroke={theme.color} strokeWidth="2" className="animate-ping opacity-75" />
                  )}

                  {/* Circle body */}
                  <circle
                    r={isSelected ? '14' : isConnected ? '11' : '8'}
                    fill={theme.color}
                    opacity={isConnected ? 1 : 0.4}
                    stroke="#090d16"
                    strokeWidth="2"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Category Symbol Label */}
                  <text
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9 font-extrabold"
                    className="pointer-events-none"
                  >
                    {node.receipt.category[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Inspector Sidebar Panel */}
        {activeNode && (
          <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <CategoryBadge category={activeNode.receipt.category} size="md" />
              <span className="text-[11px] font-mono text-slate-400">
                {activeNode.degree} Connections
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-white">{activeNode.receipt.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeNode.receipt.description}</p>
              <p className="text-[11px] text-slate-400 pt-1 font-mono">{formatDateTime(activeNode.receipt.timestamp)}</p>
            </div>

            {/* Why Connected Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-400">
                Connection Signals ({activeLinks.length} Edges)
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                {activeLinks.length > 0 ? (
                  activeLinks.map((link, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 rounded-xl border border-slate-800 space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-slate-200">
                        <span>Score: {link.score}/100</span>
                      </div>
                      <p className="text-[11px] text-indigo-300">✓ {link.reasons.join(' • ')}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No direct connections recorded for this moment.</p>
                )}
              </div>
            </div>

            <button
              onClick={() => onSelectReceipt(activeNode.receipt)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
            >
              <span>Explore Moment Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
