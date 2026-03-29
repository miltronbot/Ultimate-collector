export const CARD_CATEGORIES = [
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'baseball', label: 'Baseball' },
  { value: 'hockey', label: 'Hockey' },
  { value: 'soccer', label: 'Soccer' },
  { value: 'pokemon', label: 'Pokemon' },
  { value: 'mtg', label: 'Magic: The Gathering' },
  { value: 'yugioh', label: 'Yu-Gi-Oh!' },
  { value: 'other', label: 'Other' },
];

export const CARD_CONDITIONS = [
  { value: 'raw', label: 'Raw (Ungraded)' },
  { value: 'psa', label: 'PSA' },
  { value: 'bgs', label: 'BGS (Beckett)' },
  { value: 'cgc', label: 'CGC' },
  { value: 'sgc', label: 'SGC' },
];

export const GRADE_OPTIONS = {
  psa: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10'],
  bgs: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
  cgc: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
  sgc: ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
  raw: [],
};

export const GRADE_LABELS = {
  '10': 'Gem Mint',
  '9.5': 'Gem Mint',
  '9': 'Mint',
  '8.5': 'NM-MT+',
  '8': 'NM-MT',
  '7.5': 'NM+',
  '7': 'NM',
  '6.5': 'EX-MT+',
  '6': 'EX-MT',
};

export const CARD_TAGS = [
  'Rookie', 'Auto', 'Patch', 'Numbered', 'SSP', 'SP', 'Refractor',
  'Prizm', 'Holo', 'Insert', 'Parallel', 'Base', 'Vintage',
  'RPA', 'Kaboom', 'Downtown', '1/1', 'Mosaic', 'Optic',
];

export const SORT_OPTIONS = [
  { value: 'dateAdded-desc', label: 'Newest First' },
  { value: 'dateAdded-asc', label: 'Oldest First' },
  { value: 'currentValue-desc', label: 'Highest Value' },
  { value: 'currentValue-asc', label: 'Lowest Value' },
  { value: 'playerName-asc', label: 'Player A-Z' },
  { value: 'playerName-desc', label: 'Player Z-A' },
  { value: 'grade-desc', label: 'Highest Grade' },
  { value: 'year-desc', label: 'Newest Year' },
  { value: 'year-asc', label: 'Oldest Year' },
];

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

export const CATEGORY_COLORS = {
  football: '#10b981',
  basketball: '#f97316',
  baseball: '#ef4444',
  hockey: '#3b82f6',
  soccer: '#8b5cf6',
  pokemon: '#eab308',
  mtg: '#6366f1',
  yugioh: '#ec4899',
  other: '#64748b',
};

export const CATEGORY_ICONS = {
  football: 'trophy',
  basketball: 'circle-dot',
  baseball: 'target',
  hockey: 'snowflake',
  soccer: 'globe',
  pokemon: 'zap',
  mtg: 'wand',
  yugioh: 'star',
  other: 'layers',
};
