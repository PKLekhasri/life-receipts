import React from 'react';
import { LifeReceipt } from '../../types/receipt';
import { StoryConnection } from '../../types/connection';
import { CategoryBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/dateUtils';
import { X, MapPin, Users, Tag, Clock, DollarSign, Sparkles, ArrowRight, Share2, Compass, Network } from 'lucide-react';

interface ReceiptDetailModalProps {
  receipt: LifeReceipt | null;
  connections: StoryConnection[];
  allReceipts: LifeReceipt[];
  onClose: () => void;
  onSelectReceipt: (receipt: LifeReceipt) => void;
  onJumpToConnection: (connId: string) => void;
}

export const ReceiptDetailModal: React.FC<ReceiptDetailModalProps> = ({
  receipt,
  connections,
  allReceipts,
  onClose,
  onSelectReceipt,
  onJumpToConnection
}) => {
  if (!receipt) return null;

  // Find related connection
  const relatedConnection = connections.find(c => c.receiptIds.includes(receipt.id));
  const connectedReceipts = relatedConnection
    ? allReceipts.filter(r => relatedConnection.receiptIds.includes(r.id) && r.id !== receipt.id)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="receipt-detail-title"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Top Header Controls */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <CategoryBadge category={receipt.category} size="lg" />
            <span className="text-xs font-semibold text-slate-400 font-mono">
              ID: {receipt.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Title & Description */}
        <div className="space-y-3">
          <h2 id="receipt-detail-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {receipt.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {receipt.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatDateTime(receipt.timestamp)}</span>
            </span>

            {receipt.location && (
              <span className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{receipt.location}</span>
              </span>
            )}

            {receipt.amount && (
              <span className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400 font-extrabold font-mono">
                <DollarSign className="w-4 h-4" />
                <span>₹{receipt.amount}</span>
              </span>
            )}
          </div>
        </div>

        {/* Media Preview if Available */}
        {receipt.imageUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <img src={receipt.imageUrl} alt={receipt.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Category Specific Metadata Breakdown */}
        {receipt.metadata && Object.keys(receipt.metadata).length > 0 && (
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
              {receipt.category} Metadata
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {Object.entries(receipt.metadata).map(([key, val]) => (
                <div key={key} className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">{key}:</span>
                  <p className="font-bold text-slate-200 truncate">{String(val)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags & Source */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            {receipt.tags.map(t => (
              <span key={t} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg font-mono text-[11px]">
                #{t}
              </span>
            ))}
          </div>
          <span className="text-slate-400 italic">Source: {receipt.source}</span>
        </div>

        {/* WHY THIS MATTERS SECTION */}
        <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-extrabold text-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>WHY THIS MATTERS</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {relatedConnection
              ? `This moment forms part of "${relatedConnection.title}", occurring alongside ${connectedReceipts.length} other moments within a ${relatedConnection.timeWindowHours}-hour window.`
              : `This receipt represents a standalone moment recorded during a period of creative focus.`}
          </p>
          {relatedConnection && (
            <button
              onClick={() => {
                onClose();
                onJumpToConnection(relatedConnection.id);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 pt-1"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Explore full story connection details →</span>
            </button>
          )}
        </div>

        {/* CONNECTED MOMENTS LIST */}
        {connectedReceipts.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Connected Moments in this Time Window</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {connectedReceipts.map(cr => (
                <div
                  key={cr.id}
                  onClick={() => onSelectReceipt(cr)}
                  className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <CategoryBadge category={cr.category} size="sm" />
                    <span className="text-[10px] text-slate-400">{formatDateTime(cr.timestamp)}</span>
                  </div>
                  <h5 className="font-bold text-xs text-white truncate">{cr.title}</h5>
                  <p className="text-[11px] text-slate-400 truncate">{cr.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
