import { useState, useMemo } from 'react';
import { X, GitCompareArrows, ChevronDown } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { formatCurrency, getGradeDisplay, calculateROI } from '../utils/helpers';
import { CATEGORY_COLORS, CARD_CATEGORIES } from '../utils/constants';

export default function CompareCards({ onClose }) {
  const { cards } = useCollection();
  const [cardA, setCardA] = useState('');
  const [cardB, setCardB] = useState('');

  const a = useMemo(() => cards.find(c => c.id === cardA), [cards, cardA]);
  const b = useMemo(() => cards.find(c => c.id === cardB), [cards, cardB]);

  const selectClass = "w-full px-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";

  function CompareRow({ label, valA, valB, highlight }) {
    const better = highlight === 'higher'
      ? (parseFloat(valA) || 0) > (parseFloat(valB) || 0) ? 'a' : (parseFloat(valB) || 0) > (parseFloat(valA) || 0) ? 'b' : null
      : null;

    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-surface-100 dark:border-surface-800 last:border-b-0">
        <div className={`text-right font-medium ${better === 'a' ? 'text-emerald-500' : 'text-surface-900 dark:text-white'}`}>
          {valA || '-'}
        </div>
        <div className="text-center text-xs font-semibold text-surface-400 uppercase tracking-wider self-center">
          {label}
        </div>
        <div className={`font-medium ${better === 'b' ? 'text-emerald-500' : 'text-surface-900 dark:text-white'}`}>
          {valB || '-'}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-800 overflow-hidden animate-scale-in flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2">
            <GitCompareArrows size={20} className="text-primary-500" />
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">Compare Cards</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
            <X size={18} />
          </button>
        </div>

        {/* Card Selectors */}
        <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-800">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">Card A</label>
              <select className={selectClass} value={cardA} onChange={e => setCardA(e.target.value)}>
                <option value="">Select a card...</option>
                {cards.map(c => (
                  <option key={c.id} value={c.id}>{c.playerName} - {c.year} {c.setName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5">Card B</label>
              <select className={selectClass} value={cardB} onChange={e => setCardB(e.target.value)}>
                <option value="">Select a card...</option>
                {cards.filter(c => c.id !== cardA).map(c => (
                  <option key={c.id} value={c.id}>{c.playerName} - {c.year} {c.setName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {a && b ? (
            <div>
              {/* Card names header */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-right">
                  <p className="font-bold text-surface-900 dark:text-white text-sm">{a.playerName}</p>
                  <p className="text-xs text-surface-500">{a.year} {a.setName}</p>
                </div>
                <div className="text-center text-xs text-surface-300 dark:text-surface-600 font-bold self-center">VS</div>
                <div>
                  <p className="font-bold text-surface-900 dark:text-white text-sm">{b.playerName}</p>
                  <p className="text-xs text-surface-500">{b.year} {b.setName}</p>
                </div>
              </div>

              <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
                <CompareRow label="Current Value" valA={formatCurrency(a.currentValue)} valB={formatCurrency(b.currentValue)} highlight="higher" />
                <CompareRow label="Purchase Price" valA={formatCurrency(a.purchasePrice)} valB={formatCurrency(b.purchasePrice)} />
                <CompareRow label="Profit" valA={formatCurrency((a.currentValue || 0) - (a.purchasePrice || 0))} valB={formatCurrency((b.currentValue || 0) - (b.purchasePrice || 0))} highlight="higher" />
                <CompareRow label="ROI" valA={`${calculateROI(a.purchasePrice, a.currentValue).toFixed(1)}%`} valB={`${calculateROI(b.purchasePrice, b.currentValue).toFixed(1)}%`} highlight="higher" />
                <CompareRow label="Grade" valA={getGradeDisplay(a.condition, a.grade)} valB={getGradeDisplay(b.condition, b.grade)} highlight="higher" />
                <CompareRow label="Year" valA={a.year} valB={b.year} />
                <CompareRow label="Category" valA={CARD_CATEGORIES.find(c => c.value === a.category)?.label} valB={CARD_CATEGORIES.find(c => c.value === b.category)?.label} />
                <CompareRow label="Serial #" valA={a.serialNumber} valB={b.serialNumber} />
                <CompareRow label="Variant" valA={a.variant} valB={b.variant} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <GitCompareArrows size={32} className="text-surface-300 dark:text-surface-600 mx-auto mb-3" />
              <p className="text-sm text-surface-500">Select two cards to compare them side by side</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
