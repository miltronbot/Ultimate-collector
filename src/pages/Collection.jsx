import { useState, useMemo } from 'react';
import {
  Search, SlidersHorizontal, Grid3x3, List, X, CheckSquare, Square,
  Trash2, Tag, GitCompareArrows,
} from 'lucide-react';
import CardTile from '../components/CardTile';
import { useCollection } from '../context/CollectionContext';
import { useToast } from '../context/ToastContext';
import { sortCards, filterCards, formatCurrency } from '../utils/helpers';
import { CARD_CATEGORIES, CARD_CONDITIONS, CARD_TAGS, SORT_OPTIONS, VIEW_MODES } from '../utils/constants';

export default function Collection({ onCardClick, viewMode, setViewMode, onCompare }) {
  const { cards, deleteCards, bulkUpdateCards } = useCollection();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ category: '', condition: '', tag: '' });

  // Bulk selection
  const [bulkMode, setBulkMode] = useState(false);
  const [selected, setSelected] = useState(new Set());

  const filteredCards = useMemo(() => {
    const filtered = filterCards(cards, { ...filters, search });
    return sortCards(filtered, sortBy);
  }, [cards, filters, search, sortBy]);

  const totalFilteredValue = useMemo(() => {
    return filteredCards.reduce((sum, c) => sum + (c.currentValue || 0), 0);
  }, [filteredCards]);

  const activeFilterCount = [filters.category, filters.condition, filters.tag].filter(Boolean).length;

  function clearFilters() {
    setFilters({ category: '', condition: '', tag: '' });
    setSearch('');
  }

  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    if (selected.size === filteredCards.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredCards.map(c => c.id)));
    }
  }

  function handleBulkDelete() {
    if (!confirm(`Delete ${selected.size} cards from your collection?`)) return;
    deleteCards([...selected]);
    addToast(`Deleted ${selected.size} cards`);
    setSelected(new Set());
    setBulkMode(false);
  }

  function exitBulkMode() {
    setBulkMode(false);
    setSelected(new Set());
  }

  function handleCardAction(card) {
    if (bulkMode) {
      toggleSelect(card.id);
    } else {
      onCardClick(card);
    }
  }

  const selectedValue = useMemo(() => {
    return cards.filter(c => selected.has(c.id)).reduce((sum, c) => sum + (c.currentValue || 0), 0);
  }, [cards, selected]);

  const selectClass = "px-3 py-2 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer";

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Collection</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            {filteredCards.length} {filteredCards.length === 1 ? 'card' : 'cards'}
            {filteredCards.length !== cards.length && ` of ${cards.length}`}
            {' '}&middot; {formatCurrency(totalFilteredValue)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {cards.length >= 2 && (
            <button
              onClick={onCompare}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
            >
              <GitCompareArrows size={16} />
              <span className="hidden sm:inline">Compare</span>
            </button>
          )}
          <button
            onClick={() => bulkMode ? exitBulkMode() : setBulkMode(true)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              bulkMode
                ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
            }`}
          >
            <CheckSquare size={16} />
            <span className="hidden sm:inline">{bulkMode ? 'Cancel' : 'Select'}</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {bulkMode && (
        <div className="bg-primary-50 dark:bg-primary-500/10 rounded-xl p-3 flex items-center justify-between animate-slide-down border border-primary-200 dark:border-primary-500/20">
          <div className="flex items-center gap-3">
            <button onClick={selectAll} className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700">
              {selected.size === filteredCards.length ? <CheckSquare size={16} /> : <Square size={16} />}
              {selected.size === filteredCards.length ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-sm text-primary-500 font-semibold">
              {selected.size} selected {selected.size > 0 && `(${formatCurrency(selectedValue)})`}
            </span>
          </div>
          {selected.size > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors active:scale-95"
              >
                <Trash2 size={14} />
                Delete ({selected.size})
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search & Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search players, teams, sets..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters || activeFilterCount > 0
                ? 'bg-primary-500/10 border-primary-500/30 text-primary-600 dark:text-primary-400'
                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectClass}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="flex bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-700 p-0.5">
            <button
              onClick={() => setViewMode(VIEW_MODES.GRID)}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === VIEW_MODES.GRID ? 'bg-primary-500/10 text-primary-500' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'
              }`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode(VIEW_MODES.LIST)}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === VIEW_MODES.LIST ? 'bg-primary-500/10 text-primary-500' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-4 animate-slide-down">
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Category</label>
              <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} className={selectClass}>
                <option value="">All Categories</option>
                {CARD_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Condition</label>
              <select value={filters.condition} onChange={e => setFilters(f => ({ ...f, condition: e.target.value }))} className={selectClass}>
                <option value="">All Conditions</option>
                {CARD_CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Tag</label>
              <select value={filters.tag} onChange={e => setFilters(f => ({ ...f, tag: e.target.value }))} className={selectClass}>
                <option value="">All Tags</option>
                {CARD_TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {activeFilterCount > 0 && (
              <div className="flex items-end">
                <button onClick={clearFilters} className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg font-medium transition-colors">
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cards */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
            <Search size={24} className="text-surface-400" />
          </div>
          <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">No cards found</h3>
          <p className="text-sm text-surface-500">
            {search || activeFilterCount > 0 ? 'Try adjusting your search or filters' : 'Add your first card to get started'}
          </p>
          {(search || activeFilterCount > 0) && (
            <button onClick={clearFilters} className="mt-4 px-4 py-2 text-sm text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg font-medium transition-colors">
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === VIEW_MODES.GRID ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 stagger-children">
          {filteredCards.map(card => (
            <div key={card.id} className="relative">
              {bulkMode && (
                <div className="absolute top-3 left-3 z-10">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                    selected.has(card.id)
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-white/70 bg-black/30 text-transparent hover:border-primary-400'
                  }`} onClick={(e) => { e.stopPropagation(); toggleSelect(card.id); }}>
                    {selected.has(card.id) && <span className="text-xs font-bold">✓</span>}
                  </div>
                </div>
              )}
              <CardTile card={card} onClick={handleCardAction} viewMode="grid" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 stagger-children">
          {filteredCards.map(card => (
            <div key={card.id} className="flex items-center gap-2">
              {bulkMode && (
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all shrink-0 ${
                    selected.has(card.id)
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-surface-300 dark:border-surface-600 text-transparent hover:border-primary-400'
                  }`}
                  onClick={() => toggleSelect(card.id)}
                >
                  {selected.has(card.id) && <span className="text-xs font-bold">✓</span>}
                </div>
              )}
              <div className="flex-1">
                <CardTile card={card} onClick={handleCardAction} viewMode="list" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
