export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getGradeClass(grade) {
  if (!grade) return 'grade-raw';
  const num = parseFloat(grade);
  if (num >= 10) return 'grade-gem-mt';
  if (num >= 9) return 'grade-mint';
  if (num >= 8) return 'grade-nm-mt';
  if (num >= 7) return 'grade-nm';
  return 'grade-low';
}

export function getGradeDisplay(condition, grade) {
  if (condition === 'raw' || !grade) return 'Raw';
  return `${condition.toUpperCase()} ${grade}`;
}

export function calculateROI(purchasePrice, currentValue) {
  if (!purchasePrice || purchasePrice === 0) return 0;
  return ((currentValue - purchasePrice) / purchasePrice) * 100;
}

export function getChangeIndicator(purchasePrice, currentValue) {
  const diff = currentValue - purchasePrice;
  if (diff > 0) return { direction: 'up', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' };
  if (diff < 0) return { direction: 'down', color: 'text-red-500', bgColor: 'bg-red-500/10' };
  return { direction: 'neutral', color: 'text-surface-400', bgColor: 'bg-surface-400/10' };
}

export function sortCards(cards, sortBy) {
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  return [...cards].sort((a, b) => {
    let aVal, bVal;
    switch (field) {
      case 'dateAdded':
        aVal = new Date(a.dateAdded).getTime();
        bVal = new Date(b.dateAdded).getTime();
        break;
      case 'currentValue':
        aVal = a.currentValue || 0;
        bVal = b.currentValue || 0;
        break;
      case 'playerName':
        aVal = a.playerName.toLowerCase();
        bVal = b.playerName.toLowerCase();
        return aVal < bVal ? -1 * modifier : aVal > bVal ? 1 * modifier : 0;
      case 'grade':
        aVal = parseFloat(a.grade) || 0;
        bVal = parseFloat(b.grade) || 0;
        break;
      case 'year':
        aVal = parseInt(a.year) || 0;
        bVal = parseInt(b.year) || 0;
        break;
      default:
        return 0;
    }
    return (aVal - bVal) * modifier;
  });
}

export function filterCards(cards, filters) {
  return cards.filter(card => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const searchable = [
        card.playerName, card.team, card.setName, card.brand,
        card.variant, card.year, card.notes,
      ].filter(Boolean).join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (filters.category && card.category !== filters.category) return false;
    if (filters.condition && card.condition !== filters.condition) return false;
    if (filters.tag && !card.tags?.includes(filters.tag)) return false;
    return true;
  });
}

export function exportCollection(cards) {
  const data = JSON.stringify({ version: 1, exportDate: new Date().toISOString(), cards }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ultimate-collector-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generatePortfolioStats(cards) {
  const totalValue = cards.reduce((sum, c) => sum + (c.currentValue || 0), 0);
  const totalCost = cards.reduce((sum, c) => sum + (c.purchasePrice || 0), 0);
  const totalProfit = totalValue - totalCost;
  const avgValue = cards.length ? totalValue / cards.length : 0;
  const graded = cards.filter(c => c.condition !== 'raw').length;
  const raw = cards.filter(c => c.condition === 'raw').length;
  const highestCard = cards.length ? cards.reduce((max, c) => (c.currentValue || 0) > (max.currentValue || 0) ? c : max) : null;

  const categoryBreakdown = {};
  cards.forEach(c => {
    if (!categoryBreakdown[c.category]) {
      categoryBreakdown[c.category] = { count: 0, value: 0 };
    }
    categoryBreakdown[c.category].count++;
    categoryBreakdown[c.category].value += c.currentValue || 0;
  });

  return {
    totalCards: cards.length,
    totalValue,
    totalCost,
    totalProfit,
    avgValue,
    graded,
    raw,
    highestCard,
    categoryBreakdown,
    roi: totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0,
  };
}
