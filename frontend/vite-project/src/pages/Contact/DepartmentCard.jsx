import { motion } from 'framer-motion';
import { FiPhone, FiMail } from 'react-icons/fi';
import {
  FiGrid,
  FiUser,
  FiStar,
  FiBookOpen,
  FiMusic,
  FiHeart,
  FiUsers,
  FiGift,
} from 'react-icons/fi';

const deptIcons = {
  office: FiGrid,
  priest: FiUser,
  youth: FiStar,
  school: FiBookOpen,
  choir: FiMusic,
  women: FiHeart,
  men: FiUsers,
  charity: FiGift,
};

export default function DepartmentCard({ department, index }) {
  const DeptIcon = deptIcons[department.icon] || FiGrid;

  return (
    <motion.div
      className="group bg-white rounded-xs p-6 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xs bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
          <DeptIcon className="w-5.5 h-5.5 text-primary group-hover:text-white transition-colors duration-500" />
        </div>
      </div>

      <h3 className="text-base font-bold text-text mb-1 group-hover:text-primary transition-colors duration-300">
        {department.name}
      </h3>
      <p className="text-xs font-semibold text-secondary mb-3">{department.contact}</p>
      <p className="text-sm text-muted leading-relaxed mb-4">{department.description}</p>

      <div className="flex flex-col gap-2 pt-3 border-t border-border">
        <a
          href={`tel:${department.phone.replace(/\D/g, '')}`}
          className="flex items-center gap-2 text-xs text-muted hover:text-primary transition-colors duration-300"
        >
          <FiPhone className="w-3.5 h-3.5 flex-shrink-0" />
          {department.phone}
        </a>
        <a
          href={`mailto:${department.email}`}
          className="flex items-center gap-2 text-xs text-muted hover:text-primary transition-colors duration-300"
        >
          <FiMail className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{department.email}</span>
        </a>
      </div>
    </motion.div>
  );
}
