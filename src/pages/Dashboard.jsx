import { useMemo } from 'react';
import {
  Layers, DollarSign, TrendingUp, Award, BarChart3, PieChart as PieChartIcon,
  Gem, Star,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import StatCard from '../components/StatCard';
import { useCollection } from '../context/CollectionContext';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency, generatePortfolioStats } from '../utils/helpers';
import { CARD_CATEGORIES, CATEGORY_COLORS } from '../utils/constants';

export default function Dashboard({ onViewCollection }) {
  const { cards, valueHistory } = useCollection();
  const { isDark } = useTheme();
  const stats = useMemo(() => generatePortfolioStats(cards), [cards]);

  const pieData = useMemo(() => {
    return Object.entries(stats.categoryBreakdown).map(([key, val]) => ({
      name: CARD_CATEGORIES.find(c => c.value === key)?.label || key,
      value: val.value,
      count: val.count,
      color: CATEGORY_COLORS[key],
    }));
  }, [stats.categoryBreakdown]);

  const topCards = useMemo(() => {
    return [...cards].sort((a, b) => (b.currentValue || 0) - (a.currentValue || 0)).slice(0, 5);
  }, [cards]);

  const tooltipStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    borderRadius: '12px',
    padding: '10px 14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary-500/10 flex items-center justify-center">
          <Layers size={36} className="text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Your Collection Awaits</h2>
        <p className="text-surface-500 mb-6 max-w-md mx-auto">
          Start building your card collection by adding your first card. Track values, grades, and watch your portfolio grow.
        </p>
        <button
          onClick={() => onViewCollection()}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all active:scale-95"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-surface-500 mt-0.5">Your collection at a glance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard
          title="Total Cards"
          value={stats.totalCards}
          subtitle={`${stats.graded} graded / ${stats.raw} raw`}
          icon={Layers}
          color="primary"
        />
        <StatCard
          title="Portfolio Value"
          value={formatCurrency(stats.totalValue)}
          subtitle={`Avg ${formatCurrency(stats.avgValue)} per card`}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Total Invested"
          value={formatCurrency(stats.totalCost)}
          icon={BarChart3}
          color="blue"
        />
        <StatCard
          title="Total Profit"
          value={`${stats.totalProfit >= 0 ? '+' : ''}${formatCurrency(stats.totalProfit)}`}
          subtitle={`${stats.roi >= 0 ? '+' : ''}${stats.roi.toFixed(1)}% ROI`}
          icon={TrendingUp}
          color={stats.totalProfit >= 0 ? 'green' : 'red'}
          trend={stats.roi}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Value Over Time */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Portfolio Value Over Time</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={valueHistory}>
                <defs>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 600, marginBottom: 4 }}
                  formatter={(value) => [formatCurrency(value), 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#valueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon size={18} className="text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">By Category</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value, name) => [formatCurrency(value), name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
                  <span className="text-surface-600 dark:text-surface-400">{entry.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-surface-400">{entry.count} cards</span>
                  <span className="font-semibold text-surface-900 dark:text-white">{formatCurrency(entry.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star size={18} className="text-amber-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Most Valuable Cards</h3>
          </div>
          <button
            onClick={onViewCollection}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {topCards.map((card, idx) => (
            <div key={card.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
              <span className="text-lg font-bold text-surface-300 dark:text-surface-600 w-6 text-center">{idx + 1}</span>
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[card.category] }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-surface-900 dark:text-white text-sm truncate">{card.playerName}</p>
                <p className="text-xs text-surface-500 truncate">{card.year} {card.setName} {card.variant}</p>
              </div>
              {card.condition !== 'raw' && card.grade && (
                <span className="text-xs font-bold text-surface-500 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded-md">
                  {card.condition.toUpperCase()} {card.grade}
                </span>
              )}
              <span className="font-bold text-surface-900 dark:text-white">{formatCurrency(card.currentValue)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
