import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, LineChart, Line,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Award, BarChart3, Target, Gem, Layers,
  DollarSign, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useTheme } from '../context/ThemeContext';
import { formatCurrency, generatePortfolioStats } from '../utils/helpers';
import { CARD_CATEGORIES, CATEGORY_COLORS, CARD_CONDITIONS } from '../utils/constants';

export default function Analytics() {
  const { cards, valueHistory } = useCollection();
  const { isDark } = useTheme();
  const stats = useMemo(() => generatePortfolioStats(cards), [cards]);

  const tooltipStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    borderRadius: '12px',
    padding: '10px 14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  // ROI by category
  const roiByCategory = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      if (!map[c.category]) map[c.category] = { cost: 0, value: 0 };
      map[c.category].cost += c.purchasePrice || 0;
      map[c.category].value += c.currentValue || 0;
    });
    return Object.entries(map)
      .map(([key, { cost, value }]) => ({
        name: CARD_CATEGORIES.find(c => c.value === key)?.label || key,
        roi: cost > 0 ? ((value - cost) / cost) * 100 : 0,
        profit: value - cost,
        cost,
        value,
        color: CATEGORY_COLORS[key],
      }))
      .sort((a, b) => b.roi - a.roi);
  }, [cards]);

  // Grade distribution
  const gradeDistribution = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      const key = c.condition === 'raw' ? 'Raw' : `${c.condition.toUpperCase()} ${c.grade || '?'}`;
      if (!map[key]) map[key] = { count: 0, value: 0 };
      map[key].count++;
      map[key].value += c.currentValue || 0;
    });
    return Object.entries(map)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.value - a.value);
  }, [cards]);

  // Best performers (biggest gain)
  const bestPerformers = useMemo(() => {
    return [...cards]
      .map(c => ({
        ...c,
        profit: (c.currentValue || 0) - (c.purchasePrice || 0),
        roi: c.purchasePrice > 0 ? ((c.currentValue - c.purchasePrice) / c.purchasePrice) * 100 : 0,
      }))
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5);
  }, [cards]);

  // Worst performers
  const worstPerformers = useMemo(() => {
    return [...cards]
      .map(c => ({
        ...c,
        profit: (c.currentValue || 0) - (c.purchasePrice || 0),
        roi: c.purchasePrice > 0 ? ((c.currentValue - c.purchasePrice) / c.purchasePrice) * 100 : 0,
      }))
      .sort((a, b) => a.profit - b.profit)
      .slice(0, 5);
  }, [cards]);

  // Category value pie
  const categoryPie = useMemo(() => {
    return Object.entries(stats.categoryBreakdown).map(([key, val]) => ({
      name: CARD_CATEGORIES.find(c => c.value === key)?.label || key,
      value: val.count,
      color: CATEGORY_COLORS[key],
    }));
  }, [stats.categoryBreakdown]);

  // Grading company breakdown
  const gradingBreakdown = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      const key = c.condition === 'raw' ? 'Raw' : c.condition.toUpperCase();
      if (!map[key]) map[key] = 0;
      map[key]++;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [cards]);

  // Year distribution
  const yearDistribution = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      const year = c.year || 'Unknown';
      if (!map[year]) map[year] = { count: 0, value: 0 };
      map[year].count++;
      map[year].value += c.currentValue || 0;
    });
    return Object.entries(map)
      .map(([year, data]) => ({ year, ...data }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [cards]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#3b82f6', '#f97316'];

  if (cards.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary-500/10 flex items-center justify-center">
          <BarChart3 size={36} className="text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">No Data Yet</h2>
        <p className="text-surface-500">Add cards to your collection to see analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-surface-500 mt-0.5">Deep dive into your collection performance</p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-4 border border-surface-200 dark:border-surface-800">
          <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">Avg Card Value</p>
          <p className="text-xl font-bold text-surface-900 dark:text-white mt-1">{formatCurrency(stats.avgValue)}</p>
        </div>
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-4 border border-surface-200 dark:border-surface-800">
          <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">Total ROI</p>
          <p className={`text-xl font-bold mt-1 ${stats.roi >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {stats.roi >= 0 ? '+' : ''}{stats.roi.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-4 border border-surface-200 dark:border-surface-800">
          <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">Graded Rate</p>
          <p className="text-xl font-bold text-surface-900 dark:text-white mt-1">
            {cards.length > 0 ? ((stats.graded / cards.length) * 100).toFixed(0) : 0}%
          </p>
        </div>
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-4 border border-surface-200 dark:border-surface-800">
          <p className="text-xs text-surface-400 uppercase tracking-wider font-medium">Categories</p>
          <p className="text-xl font-bold text-surface-900 dark:text-white mt-1">
            {Object.keys(stats.categoryBreakdown).length}
          </p>
        </div>
      </div>

      {/* ROI by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">ROI by Category</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} width={80} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v.toFixed(1)}%`, 'ROI']} />
                <Bar dataKey="roi" radius={[0, 6, 6, 0]}>
                  {roiByCategory.map((entry, idx) => (
                    <Cell key={idx} fill={entry.roi >= 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <Gem size={18} className="text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Grade Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [name === 'value' ? formatCurrency(v) : v, name === 'value' ? 'Value' : 'Cards']} />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Value Over Time + Category Count Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Portfolio Trend</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={valueHistory}>
                <defs>
                  <linearGradient id="analyticsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatCurrency(v), 'Value']} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#analyticsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={18} className="text-primary-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Grading Companies</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={gradingBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                  {gradingBreakdown.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {gradingBreakdown.map((entry, idx) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[idx % COLORS.length] }} />
                  <span className="text-surface-600 dark:text-surface-400">{entry.name}</span>
                </div>
                <span className="font-semibold text-surface-900 dark:text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Year Distribution */}
      <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={18} className="text-primary-500" />
          <h3 className="font-semibold text-surface-900 dark:text-white">Cards by Year</h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v, name) => [name === 'value' ? formatCurrency(v) : v, name === 'value' ? 'Value' : 'Cards']} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best & Worst Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best */}
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <ArrowUpRight size={18} className="text-emerald-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Biggest Gainers</h3>
          </div>
          <div className="space-y-3">
            {bestPerformers.map((card, idx) => (
              <div key={card.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-surface-300 dark:text-surface-600 w-5">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{card.playerName}</p>
                  <p className="text-xs text-surface-500 truncate">{card.year} {card.setName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-500">+{formatCurrency(card.profit)}</p>
                  <p className="text-xs text-surface-400">{card.roi >= 0 ? '+' : ''}{card.roi.toFixed(0)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Worst */}
        <div className="bg-white dark:bg-surface-900 rounded-2xl p-5 border border-surface-200 dark:border-surface-800">
          <div className="flex items-center gap-2 mb-4">
            <ArrowDownRight size={18} className="text-red-500" />
            <h3 className="font-semibold text-surface-900 dark:text-white">Biggest Losers</h3>
          </div>
          <div className="space-y-3">
            {worstPerformers.map((card, idx) => (
              <div key={card.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-surface-300 dark:text-surface-600 w-5">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{card.playerName}</p>
                  <p className="text-xs text-surface-500 truncate">{card.year} {card.setName}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${card.profit < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {card.profit >= 0 ? '+' : ''}{formatCurrency(card.profit)}
                  </p>
                  <p className="text-xs text-surface-400">{card.roi >= 0 ? '+' : ''}{card.roi.toFixed(0)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
