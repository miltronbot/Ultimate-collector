import { useState, useCallback } from 'react';
import Layout from './components/Layout';
import CardModal from './components/CardModal';
import CardDetail from './components/CardDetail';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import { useCollection } from './context/CollectionContext';
import { VIEW_MODES } from './utils/constants';

export default function App() {
  const { addCard, updateCard, deleteCard } = useCollection();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);

  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddCard = useCallback(() => {
    setEditingCard(null);
    setShowCardModal(true);
  }, []);

  const handleEditCard = useCallback((card) => {
    setSelectedCard(null);
    setEditingCard(card);
    setShowCardModal(true);
  }, []);

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleSaveCard = useCallback((cardData) => {
    if (editingCard?.id) {
      updateCard(editingCard.id, cardData);
    } else {
      addCard(cardData);
    }
    setShowCardModal(false);
    setEditingCard(null);
  }, [editingCard, addCard, updateCard]);

  const handleDeleteCard = useCallback((id) => {
    if (confirm('Delete this card from your collection?')) {
      deleteCard(id);
      setShowCardModal(false);
      setSelectedCard(null);
      setEditingCard(null);
    }
  }, [deleteCard]);

  const navigateToCollection = useCallback(() => {
    setCurrentPage('collection');
  }, []);

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onAddCard={handleAddCard}
    >
      {currentPage === 'dashboard' && (
        <Dashboard onViewCollection={navigateToCollection} />
      )}
      {currentPage === 'collection' && (
        <Collection
          onCardClick={handleCardClick}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}

      {selectedCard && (
        <CardDetail
          card={selectedCard}
          onEdit={handleEditCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {showCardModal && (
        <CardModal
          card={editingCard}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
          onClose={() => { setShowCardModal(false); setEditingCard(null); }}
        />
      )}
    </Layout>
  );
}
