import { motion } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';

export default function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      className="group bg-white rounded-xs p-8 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-lg relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <FiMessageSquare className="w-8 h-8 text-secondary/30 absolute top-6 right-6" />

      <div className="flex items-center gap-4 mb-5">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-border"
          loading="lazy"
        />
        <div>
          <h4 className="text-base font-bold text-text">{testimonial.name}</h4>
          <p className="text-xs text-secondary font-semibold">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-sm text-muted leading-[1.8] italic">
        &ldquo;{testimonial.testimony}&rdquo;
      </p>
    </motion.div>
  );
}
