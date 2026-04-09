import { useState, useCallback } from 'react';
import Layout from './components/Layout';
import CardModal from './components/CardModal';
import CardDetail from './components/CardDetail';
import CompareCards from './components/CompareCards';
import Dashboard from './pages/Dashboard';
import Collection from './pages/Collection';
import Wishlist from './pages/Wishlist';
import Analytics from './pages/Analytics';
import { useCollection } from './context/CollectionContext';
import { useToast } from './context/ToastContext';
import { VIEW_MODES } from './utils/constants';

export default function App() {
  const { addCard, updateCard, deleteCard } = useCollection();
  const { addToast } = useToast();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);

  // Modal states
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

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
      addToast('Card updated');
    } else {
      addCard(cardData);
      addToast('Card added to collection');
    }
    setShowCardModal(false);
    setEditingCard(null);
  }, [editingCard, addCard, updateCard, addToast]);

  const handleDeleteCard = useCallback((id) => {
    if (confirm('Delete this card from your collection?')) {
      deleteCard(id);
      setShowCardModal(false);
      setSelectedCard(null);
      setEditingCard(null);
      addToast('Card deleted');
    }
  }, [deleteCard, addToast]);

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
          onCompare={() => setShowCompare(true)}
        />
      )}
      {currentPage === 'wishlist' && (
        <Wishlist />
      )}
      {currentPage === 'analytics' && (
        <Analytics />
      )}

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardDetail
          card={selectedCard}
          onEdit={handleEditCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {/* Add/Edit Card Modal */}
      {showCardModal && (
        <CardModal
          card={editingCard}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
          onClose={() => { setShowCardModal(false); setEditingCard(null); }}
        />
      )}

      {/* Compare Cards Modal */}
      {showCompare && (
        <CompareCards onClose={() => setShowCompare(false)} />
      )}
    </Layout>
  );
}
