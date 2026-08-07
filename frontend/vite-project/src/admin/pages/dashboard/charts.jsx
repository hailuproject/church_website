import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { formatCurrency, formatMonthKey, monthLabel } from '../../utils/format';

export const ChartTooltip = ({ active, payload, label, format }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-gray-600 dark:bg-gray-800">
      <p className="font-medium text-gray-500 dark:text-gray-400">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="mt-0.5 font-semibold text-gray-900 dark:text-gray-100">
          {entry.name}: {format ? format(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
};

const PIE_COLORS = ['#8b6f47', '#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316', '#64748b'];

export const DonationAreaChart = ({ data }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const tickColor = isDark ? '#9ca3af' : '#6b7280';

  const chartData = (data || []).map((item) => ({
    month: monthLabel(item._id),
    total: item.total || 0,
    count: item.count || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="donationGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b6f47" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#8b6f47" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} width={60} />
        <Tooltip content={<ChartTooltip format={(v) => formatCurrency(v)} />} />
        <Area
          type="monotone"
          dataKey="total"
          name="Donations"
          stroke="#8b6f47"
          strokeWidth={2}
          fill="url(#donationGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const GrowthAreaChart = ({ data, label = 'Members', color = '#8b6f47' }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const tickColor = isDark ? '#9ca3af' : '#6b7280';

  const chartData = (data || []).map((item) => ({
    month: formatMonthKey(item._id),
    count: item.count || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="month" stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} width={40} />
        <Tooltip content={<ChartTooltip />} />
        <Area type="monotone" dataKey="count" name={label} stroke={color} strokeWidth={2} fill="url(#growthGradient)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const CategoryPieChart = ({ data, name }) => {
  const { isDark } = useTheme();
  const chartData = (data || []).map((item) => ({ name: item._id || 'Other', value: item.count || 0 }));
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          nameKey="name"
        >
          {chartData.map((entry, index) => (
            <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span style={{ color: isDark ? '#d1d5db' : '#374151', fontSize: 12 }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const CategoryBarChart = ({ data, name }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const tickColor = isDark ? '#9ca3af' : '#6b7280';
  const chartData = (data || []).map((item) => ({ name: item._id || 'Other', count: item.count || 0 }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey="name" stroke={tickColor} fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-12} textAnchor="end" height={50} />
        <YAxis stroke={tickColor} fontSize={12} tickLine={false} axisLine={false} width={40} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
        <Bar dataKey="count" name={name} fill="#8b6f47" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default { DonationAreaChart, GrowthAreaChart, CategoryPieChart, CategoryBarChart };
