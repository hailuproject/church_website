import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Container from '../../components/Container';
import Section from '../../components/Section';
import {
  monthlyDonationData,
  donationCategoryData,
  statistics,
} from '../../data/donationData';
import { FiDollarSign, FiUsers, FiCalendar, FiTrendingUp } from 'react-icons/fi';

const statIcons = {
  dollar: FiDollarSign,
  users: FiUsers,
  calendar: FiCalendar,
  chart: FiTrendingUp,
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xs border border-border shadow-lg p-3">
        <p className="text-xs font-bold text-text">{label}</p>
        <p className="text-xs text-primary">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function StatisticsSection() {
  return (
    <Section id="statistics" className="bg-surface">
      <Container>
        <motion.div
          className="flex flex-col gap-4 max-w-3xl text-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            Giving Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight">
            Donation Statistics
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl text-muted">
            Transparency in giving. View how our community\u0027s generosity supports the
            church\u0027s mission and ministries.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statistics.map((stat, i) => {
            const StatIcon = statIcons[stat.icon] || FiDollarSign;
            return (
              <motion.div
                key={stat.label}
                className="bg-white rounded-xs p-6 border border-border text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <StatIcon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-text">{stat.value}</p>
                <p className="text-xs text-muted mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-xs p-6 border border-border"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-base font-bold text-text mb-4">Monthly Donations</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyDonationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="donations" fill="#8B0000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xs p-6 border border-border"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-base font-bold text-text mb-4">Donation by Category</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donationCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {donationCategoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-xs text-muted">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
