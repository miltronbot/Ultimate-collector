import { Tag, Calendar, Hash } from 'lucide-react';
import { formatCurrency, getGradeDisplay, getGradeClass, getChangeIndicator } from '../utils/helpers';
import { CATEGORY_COLORS } from '../utils/constants';

export default function CardTile({ card, onClick, viewMode = 'grid' }) {
  const change = getChangeIndicator(card.purchasePrice, card.currentValue);
  const gradeDisplay = getGradeDisplay(card.condition, card.grade);
  const gradeClass = getGradeClass(card.grade);

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onClick(card)}
        className="bg-white dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 p-4 card-hover cursor-pointer flex items-center gap-4"
      >
        {/* Category dot */}
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: CATEGORY_COLORS[card.category] }}
        />

        {/* Card image or placeholder */}
        <div className="w-14 h-20 rounded-lg bg-surface-100 dark:bg-surface-800 shrink-0 flex items-center justify-center overflow-hidden">
          {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.playerName} className="w-full h-full object-cover" />
          ) : (
            <Tag size={16} className="text-surface-400" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-surface-900 dark:text-white truncate">{card.playerName}</h3>
          <p className="text-sm text-surface-500 truncate">
            {card.year} {card.brand} {card.setName}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {card.variant && <span className="text-xs text-surface-400">{card.variant}</span>}
            {card.serialNumber && (
              <span className="text-xs text-primary-500 font-medium">#{card.serialNumber}</span>
            )}
          </div>
        </div>

        {/* Grade */}
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white shrink-0 ${gradeClass}`}>
          {gradeDisplay}
        </div>

        {/* Value */}
        <div className="text-right shrink-0">
          <p className="font-bold text-surface-900 dark:text-white">{formatCurrency(card.currentValue)}</p>
          <p className={`text-xs font-medium ${change.color}`}>
            {card.currentValue - card.purchasePrice >= 0 ? '+' : ''}
            {formatCurrency(card.currentValue - card.purchasePrice)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(card)}
      className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden card-hover cursor-pointer group"
    >
      {/* Card Image Area */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-800 dark:to-surface-850 flex items-center justify-center overflow-hidden">
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.playerName} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-surface-200/50 dark:bg-surface-700/50 flex items-center justify-center">
              <Tag size={24} className="text-surface-400" />
            </div>
            <p className="text-xs text-surface-400 font-medium">{card.year} {card.brand}</p>
            <p className="text-sm text-surface-500 font-semibold mt-0.5">{card.setName}</p>
          </div>
        )}

        {/* Grade Badge */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold text-white shadow-lg ${gradeClass}`}>
          {gradeDisplay}
        </div>

        {/* Category indicator */}
        <div
          className="absolute top-3 left-3 w-3 h-3 rounded-full shadow-lg ring-2 ring-white/50"
          style={{ backgroundColor: CATEGORY_COLORS[card.category] }}
        />

        {/* Serial number */}
        {card.serialNumber && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs font-mono">
            {card.serialNumber}
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-4">
        <h3 className="font-bold text-surface-900 dark:text-white truncate text-sm">
          {card.playerName}
        </h3>
        <p className="text-xs text-surface-500 mt-0.5 truncate">
          {card.year} {card.setName}
        </p>
        {card.variant && (
          <p className="text-xs text-primary-500 dark:text-primary-400 font-medium mt-0.5 truncate">
            {card.variant}
          </p>
        )}

        {/* Tags */}
        {card.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {card.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-500">
                {tag}
              </span>
            ))}
            {card.tags.length > 3 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-400">
                +{card.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Value */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-surface-100 dark:border-surface-800">
          <div>
            <p className="text-lg font-bold text-surface-900 dark:text-white">
              {formatCurrency(card.currentValue)}
            </p>
            <p className="text-[10px] text-surface-400 uppercase tracking-wider font-medium">Current Value</p>
          </div>
          <div className={`text-right px-2 py-1 rounded-lg text-xs font-bold ${change.bgColor} ${change.color}`}>
            {card.currentValue - card.purchasePrice >= 0 ? '+' : ''}
            {formatCurrency(card.currentValue - card.purchasePrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
