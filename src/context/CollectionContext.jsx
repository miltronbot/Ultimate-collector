import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sampleCards, sampleValueHistory } from '../utils/sampleData';

const CollectionContext = createContext();
const STORAGE_KEY = 'uc-collection';
const HISTORY_KEY = 'uc-value-history';
const WISHLIST_KEY = 'uc-wishlist';
const GOALS_KEY = 'uc-goals';
const PRICE_HISTORY_KEY = 'uc-price-history';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

const sampleGoals = [
  { id: uuidv4(), title: 'Reach 10 cards', type: 'card_count', target: 10, icon: 'layers', createdAt: new Date().toISOString() },
  { id: uuidv4(), title: '$2,000 portfolio value', type: 'total_value', target: 2000, icon: 'dollar-sign', createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Get 5 PSA 10s', type: 'grade_count', target: 5, gradeCompany: 'psa', gradeValue: '10', icon: 'gem', createdAt: new Date().toISOString() },
];

export function CollectionProvider({ children }) {
  const [cards, setCards] = useState(() => loadFromStorage(STORAGE_KEY, sampleCards));
  const [valueHistory, setValueHistory] = useState(() => loadFromStorage(HISTORY_KEY, sampleValueHistory));
  const [wishlist, setWishlist] = useState(() => loadFromStorage(WISHLIST_KEY, []));
  const [goals, setGoals] = useState(() => loadFromStorage(GOALS_KEY, sampleGoals));
  const [priceHistory, setPriceHistory] = useState(() => loadFromStorage(PRICE_HISTORY_KEY, {}));

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(cards)); }, [cards]);
  useEffect(() => { localStorage.setItem(HISTORY_KEY, JSON.stringify(valueHistory)); }, [valueHistory]);
  useEffect(() => { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem(PRICE_HISTORY_KEY, JSON.stringify(priceHistory)); }, [priceHistory]);

  // --- Cards ---
  const addCard = useCallback((cardData) => {
    const newCard = {
      ...cardData,
      id: uuidv4(),
      dateAdded: new Date().toISOString(),
    };
    setCards(prev => [newCard, ...prev]);
    // Record initial price
    if (newCard.currentValue) {
      setPriceHistory(prev => ({
        ...prev,
        [newCard.id]: [{ date: new Date().toISOString(), value: newCard.currentValue }],
      }));
    }
    return newCard;
  }, []);

  const updateCard = useCallback((id, updates) => {
    setCards(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing && updates.currentValue !== undefined && updates.currentValue !== existing.currentValue) {
        setPriceHistory(ph => ({
          ...ph,
          [id]: [...(ph[id] || []), { date: new Date().toISOString(), value: updates.currentValue }],
        }));
      }
      return prev.map(c => c.id === id ? { ...c, ...updates } : c);
    });
  }, []);

  const deleteCard = useCallback((id) => {
    setCards(prev => prev.filter(c => c.id !== id));
    setPriceHistory(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const deleteCards = useCallback((ids) => {
    const idSet = new Set(ids);
    setCards(prev => prev.filter(c => !idSet.has(c.id)));
    setPriceHistory(prev => {
      const next = { ...prev };
      ids.forEach(id => delete next[id]);
      return next;
    });
  }, []);

  const bulkUpdateCards = useCallback((ids, updates) => {
    const idSet = new Set(ids);
    setCards(prev => prev.map(c => idSet.has(c.id) ? { ...c, ...updates } : c));
  }, []);

  const importCards = useCallback((importedCards) => {
    setCards(prev => {
      const existingIds = new Set(prev.map(c => c.id));
      const newCards = importedCards
        .filter(c => !existingIds.has(c.id))
        .map(c => ({ ...c, id: c.id || uuidv4(), dateAdded: c.dateAdded || new Date().toISOString() }));
      return [...newCards, ...prev];
    });
  }, []);

  // --- Wishlist ---
  const addToWishlist = useCallback((item) => {
    const newItem = { ...item, id: uuidv4(), dateAdded: new Date().toISOString() };
    setWishlist(prev => [newItem, ...prev]);
    return newItem;
  }, []);

  const updateWishlistItem = useCallback((id, updates) => {
    setWishlist(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist(prev => prev.filter(w => w.id !== id));
  }, []);

  const moveWishlistToCollection = useCallback((wishlistItem) => {
    const card = addCard({
      playerName: wishlistItem.playerName,
      year: wishlistItem.year || '',
      brand: wishlistItem.brand || '',
      setName: wishlistItem.setName || '',
      cardNumber: '',
      variant: wishlistItem.variant || '',
      category: wishlistItem.category || 'football',
      team: wishlistItem.team || '',
      condition: 'raw',
      grade: null,
      tags: [],
      purchasePrice: wishlistItem.targetPrice || 0,
      currentValue: wishlistItem.targetPrice || 0,
      purchaseDate: new Date().toISOString().slice(0, 10),
      notes: `Acquired from wishlist. ${wishlistItem.notes || ''}`.trim(),
      serialNumber: '',
      imageUrl: wishlistItem.imageUrl || '',
    });
    removeFromWishlist(wishlistItem.id);
    return card;
  }, [addCard, removeFromWishlist]);

  // --- Goals ---
  const addGoal = useCallback((goalData) => {
    const newGoal = { ...goalData, id: uuidv4(), createdAt: new Date().toISOString() };
    setGoals(prev => [...prev, newGoal]);
    return newGoal;
  }, []);

  const updateGoal = useCallback((id, updates) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  }, []);

  // --- Misc ---
  const clearCollection = useCallback(() => {
    setCards([]);
    setValueHistory([]);
    setWishlist([]);
    setGoals([]);
    setPriceHistory({});
  }, []);

  const resetToSample = useCallback(() => {
    setCards(sampleCards);
    setValueHistory(sampleValueHistory);
    setGoals(sampleGoals);
    setWishlist([]);
    setPriceHistory({});
  }, []);

  return (
    <CollectionContext.Provider value={{
      cards, valueHistory, wishlist, goals, priceHistory,
      addCard, updateCard, deleteCard, deleteCards, bulkUpdateCards,
      importCards, clearCollection, resetToSample,
      addToWishlist, updateWishlistItem, removeFromWishlist, moveWishlistToCollection,
      addGoal, updateGoal, deleteGoal,
    }}>
      {children}
    </CollectionContext.Provider>
  );
}

export const useCollection = () => useContext(CollectionContext);
