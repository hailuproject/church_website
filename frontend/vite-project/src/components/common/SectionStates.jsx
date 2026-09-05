import { motion } from 'framer-motion';
import { FiInbox, FiAlertTriangle } from 'react-icons/fi';
import { useTranslation } from '../../i18n/LanguageContext';

export function CardSkeleton({ count = 3, gridClassName = 'sm:grid-cols-2 lg:grid-cols-3 gap-8', className = '' }) {
  return (
    <div className={`grid ${gridClassName} ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xs border border-border overflow-hidden animate-pulse">
          <div className="h-52 bg-surface" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-surface rounded-xs w-3/4" />
            <div className="h-3 bg-surface rounded-xs w-full" />
            <div className="h-3 bg-surface rounded-xs w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title, description, className = '' }) {
  const { t } = useTranslation();
  return (
    <div className={`bg-white rounded-xs border border-dashed border-border text-center py-16 px-6 ${className}`}>
      <FiInbox className="mx-auto text-secondary/60 text-4xl mb-3" aria-hidden="true" />
      <h3 className="text-lg font-bold text-text mb-1">{title || t('common.noContent')}</h3>
      {description && <p className="text-sm text-muted max-w-md mx-auto">{description}</p>}
    </div>
  );
}

export function ErrorState({ message, onRetry, className = '' }) {
  const { t } = useTranslation();
  return (
    <div className={`bg-white rounded-xs border border-red-200 text-center py-14 px-6 ${className}`} role="alert">
      <FiAlertTriangle className="mx-auto text-red-400 text-3xl mb-3" aria-hidden="true" />
      <h3 className="text-lg font-bold text-text mb-1">{t('common.error')}</h3>
      {message && <p className="text-sm text-muted max-w-md mx-auto mb-4">{message}</p>}
      {onRetry && (
        <motion.button
          type="button"
          onClick={onRetry}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-xs text-sm font-medium hover:bg-primary-dark transition-colors duration-300 cursor-pointer"
        >
          {t('common.retry')}
        </motion.button>
      )}
    </div>
  );
}