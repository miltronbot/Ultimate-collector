import { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { CARD_CATEGORIES, CARD_CONDITIONS, GRADE_OPTIONS, CARD_TAGS } from '../utils/constants';

const emptyCard = {
  playerName: '',
  year: new Date().getFullYear().toString(),
  brand: '',
  setName: '',
  cardNumber: '',
  variant: '',
  category: 'football',
  team: '',
  condition: 'raw',
  grade: null,
  tags: [],
  purchasePrice: '',
  currentValue: '',
  purchaseDate: new Date().toISOString().slice(0, 10),
  notes: '',
  serialNumber: '',
  imageUrl: '',
};

export default function CardModal({ card, onSave, onDelete, onClose }) {
  const isEditing = !!card?.id;
  const [form, setForm] = useState(emptyCard);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (card) {
      setForm({
        ...emptyCard,
        ...card,
        purchasePrice: card.purchasePrice ?? '',
        currentValue: card.currentValue ?? '',
      });
    }
  }, [card]);

  function handleChange(field, value) {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'condition' && value === 'raw') {
        updated.grade = null;
      }
      return updated;
    });
  }

  function toggleTag(tag) {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...form,
      purchasePrice: parseFloat(form.purchasePrice) || 0,
      currentValue: parseFloat(form.currentValue) || 0,
    });
  }

  const tabs = [
    { id: 'details', label: 'Card Details' },
    { id: 'grading', label: 'Grading' },
    { id: 'value', label: 'Value & Notes' },
  ];

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all";
  const labelClass = "block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[90vh] bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-800 overflow-hidden animate-scale-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800">
          <h2 className="text-lg font-bold text-surface-900 dark:text-white">
            {isEditing ? 'Edit Card' : 'Add New Card'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-surface-200 dark:border-surface-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {activeTab === 'details' && (
              <>
                <div>
                  <label className={labelClass}>Player / Card Name *</label>
                  <input className={inputClass} value={form.playerName} onChange={e => handleChange('playerName', e.target.value)} placeholder="e.g. Patrick Mahomes" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Year</label>
                    <input className={inputClass} value={form.year} onChange={e => handleChange('year', e.target.value)} placeholder="2024" />
                  </div>
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <input className={inputClass} value={form.cardNumber} onChange={e => handleChange('cardNumber', e.target.value)} placeholder="#152" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Brand</label>
                    <input className={inputClass} value={form.brand} onChange={e => handleChange('brand', e.target.value)} placeholder="Panini" />
                  </div>
                  <div>
                    <label className={labelClass}>Set Name</label>
                    <input className={inputClass} value={form.setName} onChange={e => handleChange('setName', e.target.value)} placeholder="Donruss Optic" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Variant / Parallel</label>
                  <input className={inputClass} value={form.variant} onChange={e => handleChange('variant', e.target.value)} placeholder="Orange Scope, Holo, Silver..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Category</label>
                    <select className={inputClass} value={form.category} onChange={e => handleChange('category', e.target.value)}>
                      {CARD_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Team</label>
                    <input className={inputClass} value={form.team} onChange={e => handleChange('team', e.target.value)} placeholder="New York Giants" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Serial Number</label>
                  <input className={inputClass} value={form.serialNumber} onChange={e => handleChange('serialNumber', e.target.value)} placeholder="68/99" />
                </div>
                <div>
                  <label className={labelClass}>Tags</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CARD_TAGS.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          form.tags.includes(tag)
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'grading' && (
              <>
                <div>
                  <label className={labelClass}>Grading Company</label>
                  <div className="grid grid-cols-5 gap-2">
                    {CARD_CONDITIONS.map(c => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => handleChange('condition', c.value)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                          form.condition === c.value
                            ? 'bg-primary-500 text-white shadow-lg'
                            : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                        }`}
                      >
                        {c.value === 'raw' ? 'Raw' : c.value.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                {form.condition !== 'raw' && (
                  <div>
                    <label className={labelClass}>Grade</label>
                    <div className="grid grid-cols-5 gap-2">
                      {(GRADE_OPTIONS[form.condition] || []).reverse().map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleChange('grade', g)}
                          className={`py-2 rounded-xl text-sm font-bold transition-all ${
                            form.grade === g
                              ? 'bg-primary-500 text-white shadow-lg'
                              : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'value' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Purchase Price ($)</label>
                    <input className={inputClass} type="number" step="0.01" min="0" value={form.purchasePrice} onChange={e => handleChange('purchasePrice', e.target.value)} placeholder="0.00" />
                  </div>
                  <div>
                    <label className={labelClass}>Current Value ($)</label>
                    <input className={inputClass} type="number" step="0.01" min="0" value={form.currentValue} onChange={e => handleChange('currentValue', e.target.value)} placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Purchase Date</label>
                  <input className={inputClass} type="date" value={form.purchaseDate} onChange={e => handleChange('purchaseDate', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Card Image</label>
                  <ImageUpload value={form.imageUrl} onChange={(val) => handleChange('imageUrl', val)} />
                  <p className="text-xs text-surface-400 mt-1.5">Or paste a URL:</p>
                  <input className={`${inputClass} mt-1`} value={form.imageUrl?.startsWith('data:') ? '' : form.imageUrl} onChange={e => handleChange('imageUrl', e.target.value)} placeholder="https://..." />
                </div>
                <div>
                  <label className={labelClass}>Notes</label>
                  <textarea className={`${inputClass} min-h-[100px] resize-none`} value={form.notes} onChange={e => handleChange('notes', e.target.value)} placeholder="Any additional details about this card..." />
                </div>
              </>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/50">
          {isEditing ? (
            <button
              type="button"
              onClick={() => onDelete(card.id)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Delete
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary-500/25 transition-all active:scale-95"
            >
              <Save size={16} />
              {isEditing ? 'Save Changes' : 'Add Card'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
