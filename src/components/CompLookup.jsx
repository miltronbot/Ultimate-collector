import { useState, useMemo } from 'react';
import { ExternalLink, Plus, X, Trash2, TrendingUp, DollarSign, RefreshCw, History } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function CompLookup({ card, onUpdateValue }) {
  const [comps, setComps] = useState(() => {
    try {
      const stored = localStorage.getItem(`uc-comps-${card.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [newPrice, setNewPrice] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showAddComp, setShowAddComp] = useState(false);

  function saveComps(updated) {
    setComps(updated);
    localStorage.setItem(`uc-comps-${card.id}`, JSON.stringify(updated));
  }

  function addComp(e) {
    e.preventDefault();
    const price = parseFloat(newPrice);
    if (!price || price <= 0) return;
    const comp = {
      id: Date.now(),
      price,
      note: newNote.trim(),
      date: new Date().toISOString(),
      source: 'ebay',
    };
    saveComps([comp, ...comps]);
    setNewPrice('');
    setNewNote('');
    setShowAddComp(false);
  }

  function removeComp(id) {
    saveComps(comps.filter(c => c.id !== id));
  }

  function buildEbayUrl() {
    const parts = [card.playerName];
    if (card.year) parts.push(card.year);
    if (card.setName) parts.push(card.setName);
    if (card.variant) parts.push(card.variant);
    if (card.condition !== 'raw' && card.grade) {
      parts.push(card.condition.toUpperCase(), card.grade);
    }
    if (card.serialNumber) {
      const match = card.serialNumber.match(/\/(\d+)/);
      if (match) parts.push(`/${match[1]}`);
    }
    const query = encodeURIComponent(parts.join(' '));
    return `https://www.ebay.com/sch/i.html?_nkw=${query}&LH_Complete=1&LH_Sold=1&_sop=13`;
  }

  const stats = useMemo(() => {
    if (comps.length === 0) return null;
    const prices = comps.map(c => c.price).sort((a, b) => a - b);
    const sum = prices.reduce((s, p) => s + p, 0);
    const avg = sum / prices.length;
    const median = prices.length % 2 === 0
      ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
      : prices[Math.floor(prices.length / 2)];
    const low = prices[0];
    const high = prices[prices.length - 1];
    return { avg, median, low, high, count: prices.length };
  }, [comps]);

  const valueDiff = stats ? stats.avg - (card.currentValue || 0) : 0;

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";

  return (
    <div className="space-y-4">
      {/* Search eBay Button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={buildEbayUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all active:scale-95"
        >
          <ExternalLink size={16} />
          Search eBay Sold Listings
        </a>
        <button
          onClick={() => setShowAddComp(!showAddComp)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm font-semibold text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-all"
        >
          <Plus size={16} />
          Log a Comp
        </button>
      </div>

      <p className="text-xs text-surface-400">
        Click "Search eBay" to see recent sold prices, then log them here to track market value.
      </p>

      {/* Add Comp Form */}
      {showAddComp && (
        <form onSubmit={addComp} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 space-y-3 animate-slide-down">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Sold Price ($) *</label>
              <input
                className={inputClass}
                type="number"
                step="0.01"
                min="0"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="125.00"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Note</label>
              <input
                className={inputClass}
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Best Offer, auction, etc."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAddComp(false)} className="px-3 py-1.5 text-sm text-surface-500">Cancel</button>
            <button type="submit" className="px-4 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-semibold transition-all active:scale-95">
              Add Comp
            </button>
          </div>
        </form>
      )}

      {/* Market Value Stats */}
      {stats && (
        <div className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-primary-500" />
            <h4 className="text-sm font-semibold text-surface-900 dark:text-white">Market Value ({stats.count} comps)</h4>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <p className="text-xs text-surface-400 uppercase tracking-wider">Average</p>
              <p className="text-lg font-bold text-surface-900 dark:text-white">{formatCurrency(stats.avg)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-400 uppercase tracking-wider">Median</p>
              <p className="text-lg font-bold text-surface-900 dark:text-white">{formatCurrency(stats.median)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-400 uppercase tracking-wider">Low</p>
              <p className="text-lg font-bold text-surface-900 dark:text-white">{formatCurrency(stats.low)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-400 uppercase tracking-wider">High</p>
              <p className="text-lg font-bold text-surface-900 dark:text-white">{formatCurrency(stats.high)}</p>
            </div>
          </div>

          {/* Update Value Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-surface-100 dark:border-surface-800">
            <button
              onClick={() => onUpdateValue(Math.round(stats.avg * 100) / 100)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                valueDiff >= 0
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20'
              }`}
            >
              <RefreshCw size={14} />
              Update to Avg ({formatCurrency(stats.avg)})
              <span className="text-xs opacity-70">
                {valueDiff >= 0 ? '+' : ''}{formatCurrency(valueDiff)}
              </span>
            </button>
            <button
              onClick={() => onUpdateValue(Math.round(stats.median * 100) / 100)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all active:scale-95"
            >
              <RefreshCw size={14} />
              Update to Median ({formatCurrency(stats.median)})
            </button>
          </div>
        </div>
      )}

      {/* Comp History */}
      {comps.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <History size={14} className="text-surface-400" />
            <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider">Comp History</h4>
          </div>
          <div className="space-y-1.5">
            {comps.map(comp => (
              <div key={comp.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-surface-50 dark:bg-surface-800/50 group">
                <DollarSign size={14} className="text-surface-400 shrink-0" />
                <span className="font-bold text-surface-900 dark:text-white text-sm">{formatCurrency(comp.price)}</span>
                {comp.note && <span className="text-xs text-surface-400 truncate">{comp.note}</span>}
                <span className="text-xs text-surface-400 ml-auto shrink-0">{formatDate(comp.date)}</span>
                <button
                  onClick={() => removeComp(comp.id)}
                  className="p-1 rounded text-surface-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
