import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sampleCards, sampleValueHistory } from '../utils/sampleData';

const CollectionContext = createContext();
const STORAGE_KEY = 'uc-collection';
const HISTORY_KEY = 'uc-value-history';

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function CollectionProvider({ children }) {
  const [cards, setCards] = useState(() => loadFromStorage(STORAGE_KEY, sampleCards));
  const [valueHistory, setValueHistory] = useState(() => loadFromStorage(HISTORY_KEY, sampleValueHistory));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(valueHistory));
  }, [valueHistory]);

  const addCard = useCallback((cardData) => {
    const newCard = {
      ...cardData,
      id: uuidv4(),
      dateAdded: new Date().toISOString(),
    };
    setCards(prev => [newCard, ...prev]);
    return newCard;
  }, []);

  const updateCard = useCallback((id, updates) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCard = useCallback((id) => {
    setCards(prev => prev.filter(c => c.id !== id));
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

  const clearCollection = useCallback(() => {
    setCards([]);
    setValueHistory([]);
  }, []);

  const resetToSample = useCallback(() => {
    setCards(sampleCards);
    setValueHistory(sampleValueHistory);
  }, []);

  return (
    <CollectionContext.Provider value={{
      cards, valueHistory,
      addCard, updateCard, deleteCard,
      importCards, clearCollection, resetToSample,
    }}>
      {children}
    </CollectionContext.Provider>
  );
}

export const useCollection = () => useContext(CollectionContext);
