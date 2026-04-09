import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Library, Sun, Moon, Menu, X,
  Download, Upload, Trash2, RotateCcw, Plus,
  Heart, BarChart3, Keyboard,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCollection } from '../context/CollectionContext';
import { exportCollection } from '../utils/helpers';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'collection', label: 'Collection', icon: Library },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Layout({ currentPage, onPageChange, onAddCard, children }) {
  const { isDark, toggleTheme } = useTheme();
  const { cards, importCards, clearCollection, resetToSample } = useCollection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't fire when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) { onAddCard(); }
      else if (e.key === '1') { onPageChange('dashboard'); }
      else if (e.key === '2') { onPageChange('collection'); }
      else if (e.key === '3') { onPageChange('wishlist'); }
      else if (e.key === '4') { onPageChange('analytics'); }
      else if (e.key === 'd' && !e.metaKey && !e.ctrlKey) { toggleTheme(); }
      else if (e.key === '?') { setShowShortcuts(s => !s); }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAddCard, onPageChange, toggleTheme]);

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          const imported = data.cards || data;
          if (Array.isArray(imported)) {
            importCards(imported);
          }
        } catch {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-100 transition-colors duration-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <span className="text-white font-black text-sm">UC</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  Ultimate Collector
                </h1>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onPageChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === id
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onAddCard}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg text-sm font-semibold shadow-lg shadow-primary-500/25 transition-all hover:shadow-primary-500/40 active:scale-95"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Add Card</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  title="Settings"
                >
                  <Menu size={18} />
                </button>

                {showSettings && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-800 rounded-xl shadow-xl border border-surface-200 dark:border-surface-700 py-2 z-50 animate-scale-in">
                      <button onClick={() => { toggleTheme(); setShowSettings(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      <button onClick={() => { exportCollection(cards); setShowSettings(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <Download size={16} />
                        Export Collection
                      </button>
                      <button onClick={() => { handleImport(); setShowSettings(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <Upload size={16} />
                        Import Collection
                      </button>
                      <div className="border-t border-surface-200 dark:border-surface-700 my-1" />
                      <button onClick={() => { resetToSample(); setShowSettings(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <RotateCcw size={16} />
                        Reset to Sample Data
                      </button>
                      <button onClick={() => { if (confirm('Clear your entire collection?')) { clearCollection(); setShowSettings(false); } }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <Trash2 size={16} />
                        Clear All Data
                      </button>
                      <div className="border-t border-surface-200 dark:border-surface-700 my-1" />
                      <button onClick={() => { setShowShortcuts(true); setShowSettings(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                        <Keyboard size={16} />
                        Keyboard Shortcuts
                        <span className="ml-auto text-xs text-surface-400 font-mono">?</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-surface-200 dark:border-surface-800 animate-slide-down">
            <div className="px-4 py-2 space-y-1">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { onPageChange(id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === id
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-surface-500'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/50 animate-fade-in" onClick={() => setShowShortcuts(false)}>
          <div className="w-full max-w-md bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-800 overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <Keyboard size={18} className="text-primary-500" />
                <h2 className="font-bold text-surface-900 dark:text-white">Keyboard Shortcuts</h2>
              </div>
              <button onClick={() => setShowShortcuts(false)} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {[
                ['N', 'Add new card'],
                ['1', 'Go to Dashboard'],
                ['2', 'Go to Collection'],
                ['3', 'Go to Wishlist'],
                ['4', 'Go to Analytics'],
                ['D', 'Toggle dark/light mode'],
                ['?', 'Show/hide shortcuts'],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-surface-600 dark:text-surface-400">{desc}</span>
                  <kbd className="px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-xs font-bold text-surface-600 dark:text-surface-400 border border-surface-200 dark:border-surface-700 min-w-[32px] text-center">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
