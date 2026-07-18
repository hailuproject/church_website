import { motion } from 'framer-motion';

export default function ServiceHours({ schedule }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-sm border border-border"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-2xl font-bold text-text mb-6">Service Schedule</h3>

      <div className="flex flex-col divide-y divide-border">
        {schedule.map((item) => (
          <div key={item.day} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <p className="font-semibold text-text">{item.service}</p>
                <span className="text-sm text-primary font-medium shrink-0">{item.time}</span>
              </div>
              <p className="text-sm text-muted mt-0.5">{item.day}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
