import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../../components/Button';

export default function CommunityCard({ item, index }) {
  return (
    <motion.div
      className="group bg-white rounded-xs overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{item.description}</p>
        <Button href="#" variant="outline-dark" size="sm" className="self-start">
          Learn More
          <FiArrowRight className="text-sm" />
        </Button>
      </div>
    </motion.div>
  );
}
