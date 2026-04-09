import { useState } from 'react';
import { X, Edit3, Tag, Calendar, Hash, Trophy, DollarSign, TrendingUp, TrendingDown, FileText, Search } from 'lucide-react';
import { formatCurrency, formatDate, getGradeDisplay, getGradeClass, calculateROI } from '../utils/helpers';
import { CARD_CATEGORIES, CATEGORY_COLORS } from '../utils/constants';
import CompLookup from './CompLookup';
import { useCollection } from '../context/CollectionContext';
import { useToast } from '../context/ToastContext';

export default function CardDetail({ card, onEdit, onClose }) {
  const { updateCard } = useCollection();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  if (!card) return null;

  const gradeDisplay = getGradeDisplay(card.condition, card.grade);
  const gradeClass = getGradeClass(card.grade);
  const roi = calculateROI(card.purchasePrice, card.currentValue);
  const profit = (card.currentValue || 0) - (card.purchasePrice || 0);
  const categoryLabel = CARD_CATEGORIES.find(c => c.value === card.category)?.label || card.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-800 overflow-hidden animate-scale-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[card.category] }} />
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">{card.playerName}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit(card)} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 transition-colors">
              <Edit3 size={16} />
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-surface-200 dark:border-surface-800">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'details' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'}`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('comps')}
            className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'comps' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'}`}
          >
            <Search size={14} />
            eBay Comps
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'details' ? (
            <>
              {/* Top section with image and key info */}
              <div className="flex gap-6">
                <div className="w-40 h-56 rounded-xl bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-700 flex items-center justify-center overflow-hidden shrink-0">
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.playerName} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="text-center p-3">
                      <Tag size={28} className="text-surface-400 mx-auto mb-2" />
                      <p className="text-xs text-surface-400">{card.year} {card.brand}</p>
                      <p className="text-xs text-surface-500 font-semibold">{card.setName}</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-surface-400">{card.year} {card.brand} {card.setName}</p>
                    {card.variant && <p className="text-sm font-semibold text-primary-500 dark:text-primary-400 mt-0.5">{card.variant}</p>}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${gradeClass}`}>{gradeDisplay}</span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400">{categoryLabel}</span>
                    {card.serialNumber && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400">#{card.serialNumber}</span>
                    )}
                  </div>

                  {card.team && <div className="flex items-center gap-2 text-sm text-surface-500"><Trophy size={14} />{card.team}</div>}
                  {card.cardNumber && <div className="flex items-center gap-2 text-sm text-surface-500"><Hash size={14} />Card #{card.cardNumber}</div>}

                  {card.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {card.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-2 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-500">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Value Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-surface-400 uppercase tracking-wider font-medium mb-1">Purchase</p>
                  <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(card.purchasePrice)}</p>
                </div>
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 text-center">
                  <p className="text-xs text-surface-400 uppercase tracking-wider font-medium mb-1">Current</p>
                  <p className="text-xl font-bold text-surface-900 dark:text-white">{formatCurrency(card.currentValue)}</p>
                </div>
                <div className={`rounded-xl p-4 text-center ${profit >= 0 ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-red-50 dark:bg-red-500/10'}`}>
                  <p className="text-xs text-surface-400 uppercase tracking-wider font-medium mb-1">{profit >= 0 ? 'Profit' : 'Loss'}</p>
                  <p className={`text-xl font-bold ${profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {profit >= 0 ? '+' : ''}{formatCurrency(profit)}
                  </p>
                  <p className={`text-xs font-semibold mt-0.5 ${profit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {roi >= 0 ? '+' : ''}{roi.toFixed(1)}% ROI
                  </p>
                </div>
              </div>

              {/* Grading subgrades */}
              {card.gradeSubgrades && (
                <div>
                  <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-2">Grade Breakdown</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(card.gradeSubgrades).map(([key, val]) => (
                      <div key={key} className="bg-surface-50 dark:bg-surface-800/50 rounded-lg p-2.5 text-center">
                        <p className="text-xs text-surface-400 capitalize">{key}</p>
                        <p className="text-lg font-bold text-surface-900 dark:text-white">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="flex items-center gap-6 text-sm text-surface-500">
                {card.purchaseDate && <div className="flex items-center gap-2"><Calendar size={14} />Purchased {formatDate(card.purchaseDate)}</div>}
                {card.dateAdded && <div className="flex items-center gap-2"><Calendar size={14} />Added {formatDate(card.dateAdded)}</div>}
              </div>

              {/* Notes */}
              {card.notes && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={14} className="text-surface-400" />
                    <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-300">Notes</h3>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">{card.notes}</p>
                </div>
              )}
            </>
          ) : (
            <CompLookup
              card={card}
              onUpdateValue={(newValue) => {
                updateCard(card.id, { currentValue: newValue });
                addToast(`Updated ${card.playerName} to ${formatCurrency(newValue)}`);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
