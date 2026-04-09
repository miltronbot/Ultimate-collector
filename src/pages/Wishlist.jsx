import { useState } from 'react';
import { Plus, Heart, X, ShoppingCart, Trash2, Edit3, Save, ExternalLink } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useToast } from '../context/ToastContext';
import { CARD_CATEGORIES, CATEGORY_COLORS } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';

const emptyItem = {
  playerName: '',
  year: '',
  brand: '',
  setName: '',
  variant: '',
  category: 'football',
  team: '',
  targetPrice: '',
  maxPrice: '',
  priority: 'medium',
  notes: '',
  imageUrl: '',
};

export default function Wishlist() {
  const { wishlist, addToWishlist, updateWishlistItem, removeFromWishlist, moveWishlistToCollection } = useCollection();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyItem);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.playerName.trim()) return;
    const data = {
      ...form,
      targetPrice: parseFloat(form.targetPrice) || 0,
      maxPrice: parseFloat(form.maxPrice) || 0,
    };
    if (editingId) {
      updateWishlistItem(editingId, data);
      addToast('Wishlist item updated');
      setEditingId(null);
    } else {
      addToWishlist(data);
      addToast('Added to wishlist');
    }
    setForm(emptyItem);
    setShowForm(false);
  }

  function handleEdit(item) {
    setForm({ ...emptyItem, ...item, targetPrice: item.targetPrice || '', maxPrice: item.maxPrice || '' });
    setEditingId(item.id);
    setShowForm(true);
  }

  function handleAcquire(item) {
    moveWishlistToCollection(item);
    addToast(`${item.playerName} moved to collection!`);
  }

  function handleDelete(id) {
    removeFromWishlist(id);
    addToast('Removed from wishlist');
  }

  const totalTarget = wishlist.reduce((sum, w) => sum + (w.targetPrice || 0), 0);
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...wishlist].sort((a, b) => (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1));

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";
  const labelClass = "block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Wishlist</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            {wishlist.length} {wishlist.length === 1 ? 'card' : 'cards'} wanted &middot; {formatCurrency(totalTarget)} target spend
          </p>
        </div>
        <button
          onClick={() => { setForm(emptyItem); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg text-sm font-semibold shadow-lg shadow-pink-500/25 transition-all active:scale-95"
        >
          <Plus size={16} />
          Add to Wishlist
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-5 animate-slide-down">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-900 dark:text-white">
              {editingId ? 'Edit Wishlist Item' : 'Add to Wishlist'}
            </h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Player / Card Name *</label>
                <input className={inputClass} value={form.playerName} onChange={e => setForm(f => ({ ...f, playerName: e.target.value }))} placeholder="Patrick Mahomes" required />
              </div>
              <div>
                <label className={labelClass}>Year</label>
                <input className={inputClass} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="2024" />
              </div>
              <div>
                <label className={labelClass}>Set Name</label>
                <input className={inputClass} value={form.setName} onChange={e => setForm(f => ({ ...f, setName: e.target.value }))} placeholder="National Treasures" />
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <input className={inputClass} value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="Panini" />
              </div>
              <div>
                <label className={labelClass}>Variant</label>
                <input className={inputClass} value={form.variant} onChange={e => setForm(f => ({ ...f, variant: e.target.value }))} placeholder="Holo, Silver..." />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select className={inputClass} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CARD_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Target Price ($)</label>
                <input className={inputClass} type="number" step="0.01" min="0" value={form.targetPrice} onChange={e => setForm(f => ({ ...f, targetPrice: e.target.value }))} placeholder="0.00" />
              </div>
              <div>
                <label className={labelClass}>Max Price ($)</label>
                <input className={inputClass} type="number" step="0.01" min="0" value={form.maxPrice} onChange={e => setForm(f => ({ ...f, maxPrice: e.target.value }))} placeholder="0.00" />
              </div>
              <div>
                <label className={labelClass}>Priority</label>
                <select className={inputClass} value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Notes</label>
              <input className={inputClass} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="eBay links, seller info, etc." />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 text-sm text-surface-500 hover:text-surface-700 font-medium">Cancel</button>
              <button type="submit" className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-sm font-semibold shadow-lg transition-all active:scale-95">
                <Save size={16} />
                {editingId ? 'Save Changes' : 'Add to Wishlist'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Wishlist Items */}
      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-500/10 flex items-center justify-center">
            <Heart size={24} className="text-pink-500" />
          </div>
          <h3 className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-1">No wishlist items yet</h3>
          <p className="text-sm text-surface-500">Track cards you're looking to pick up</p>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {sorted.map(item => (
            <div key={item.id} className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 p-4 card-hover flex items-center gap-4">
              {/* Priority indicator */}
              <div className={`w-2 h-10 rounded-full shrink-0 ${
                item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-amber-500' : 'bg-surface-300'
              }`} />

              {/* Category dot */}
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[item.category] }} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-surface-900 dark:text-white truncate">{item.playerName}</h3>
                <p className="text-sm text-surface-500 truncate">
                  {[item.year, item.brand, item.setName, item.variant].filter(Boolean).join(' ')}
                </p>
                {item.notes && <p className="text-xs text-surface-400 mt-0.5 truncate">{item.notes}</p>}
              </div>

              {/* Price info */}
              <div className="text-right shrink-0">
                {item.targetPrice > 0 && <p className="font-bold text-surface-900 dark:text-white">{formatCurrency(item.targetPrice)}</p>}
                {item.maxPrice > 0 && <p className="text-xs text-surface-400">Max: {formatCurrency(item.maxPrice)}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => handleAcquire(item)} className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-500 transition-colors" title="Move to collection">
                  <ShoppingCart size={16} />
                </button>
                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400 transition-colors" title="Edit">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-400 transition-colors" title="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
