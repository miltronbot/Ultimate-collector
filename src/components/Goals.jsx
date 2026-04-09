import { useState, useMemo } from 'react';
import { Target, Plus, Trash2, X, Save, Trophy, Gem, Layers, DollarSign, Check } from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useToast } from '../context/ToastContext';

const GOAL_TYPES = [
  { value: 'card_count', label: 'Total Cards', desc: 'Reach a total number of cards' },
  { value: 'total_value', label: 'Portfolio Value', desc: 'Reach a target portfolio value ($)' },
  { value: 'grade_count', label: 'Graded Cards', desc: 'Collect X cards with a specific grade' },
  { value: 'category_count', label: 'Category Cards', desc: 'Collect X cards in a category' },
];

export default function Goals() {
  const { cards, goals, addGoal, deleteGoal } = useCollection();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'card_count', target: '', gradeCompany: 'psa', gradeValue: '10', category: 'football' });

  const goalsWithProgress = useMemo(() => {
    return goals.map(goal => {
      let current = 0;
      switch (goal.type) {
        case 'card_count':
          current = cards.length;
          break;
        case 'total_value':
          current = cards.reduce((s, c) => s + (c.currentValue || 0), 0);
          break;
        case 'grade_count':
          current = cards.filter(c => c.condition === goal.gradeCompany && c.grade === goal.gradeValue).length;
          break;
        case 'category_count':
          current = cards.filter(c => c.category === goal.category).length;
          break;
      }
      const progress = goal.target > 0 ? Math.min((current / goal.target) * 100, 100) : 0;
      const completed = progress >= 100;
      return { ...goal, current, progress, completed };
    });
  }, [goals, cards]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.target) return;
    addGoal({
      ...form,
      target: parseFloat(form.target),
    });
    addToast('Goal created!');
    setForm({ title: '', type: 'card_count', target: '', gradeCompany: 'psa', gradeValue: '10', category: 'football' });
    setShowForm(false);
  }

  const completedCount = goalsWithProgress.filter(g => g.completed).length;

  const inputClass = "w-full px-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";
  const labelClass = "block text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-primary-500" />
          <h3 className="font-semibold text-surface-900 dark:text-white">Collection Goals</h3>
          {completedCount > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              {completedCount}/{goals.length} complete
            </span>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-colors"
        >
          <Plus size={14} />
          Add Goal
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 space-y-3 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Goal Name</label>
              <input className={inputClass} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Reach 25 cards" required />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select className={inputClass} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {GOAL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Target</label>
              <input className={inputClass} type="number" min="1" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} placeholder="10" required />
            </div>
            {form.type === 'grade_count' && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className={labelClass}>Company</label>
                  <select className={inputClass} value={form.gradeCompany} onChange={e => setForm(f => ({ ...f, gradeCompany: e.target.value }))}>
                    <option value="psa">PSA</option>
                    <option value="bgs">BGS</option>
                    <option value="cgc">CGC</option>
                    <option value="sgc">SGC</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className={labelClass}>Grade</label>
                  <input className={inputClass} value={form.gradeValue} onChange={e => setForm(f => ({ ...f, gradeValue: e.target.value }))} placeholder="10" />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm text-surface-500">Cancel</button>
            <button type="submit" className="flex items-center gap-1 px-4 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-semibold transition-all active:scale-95">
              <Save size={14} /> Create
            </button>
          </div>
        </form>
      )}

      {goalsWithProgress.length === 0 ? (
        <p className="text-sm text-surface-400 text-center py-6">Set goals to track your collection milestones</p>
      ) : (
        <div className="space-y-3">
          {goalsWithProgress.map(goal => (
            <div key={goal.id} className={`rounded-xl p-4 border transition-all ${
              goal.completed
                ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20'
                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {goal.completed ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                      <Target size={12} className="text-surface-500" />
                    </div>
                  )}
                  <span className={`text-sm font-semibold ${goal.completed ? 'text-emerald-700 dark:text-emerald-400' : 'text-surface-900 dark:text-white'}`}>
                    {goal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-surface-500">
                    {goal.type === 'total_value' ? `$${Math.round(goal.current)}` : goal.current} / {goal.type === 'total_value' ? `$${goal.target}` : goal.target}
                  </span>
                  <button onClick={() => { deleteGoal(goal.id); addToast('Goal removed'); }} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 text-surface-300 hover:text-red-500 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${goal.completed ? 'bg-emerald-500' : 'bg-primary-500'}`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
