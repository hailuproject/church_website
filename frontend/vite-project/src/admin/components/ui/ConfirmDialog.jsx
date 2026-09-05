import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, TriangleAlert } from 'lucide-react';
import Button from './Button';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  loading = false,
}) => {
  const [confirming, setConfirming] = useState(false);
  const panelRef = useRef(null);
  const cancelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useFocusTrap(panelRef, { active: open, initialFocusRef: cancelRef });

  useEffect(() => {
    if (open) setConfirming(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await onConfirm?.();
      onClose?.();
    } finally {
      setConfirming(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
                <TriangleAlert className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0">
                <h3 id={titleId} className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
                {description && (
                  <p id={descriptionId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button ref={cancelRef} variant="secondary" onClick={onClose} disabled={confirming || loading}>
                {cancelLabel}
              </Button>
              <Button
                variant={tone === 'danger' ? 'danger' : 'primary'}
                onClick={handleConfirm}
                loading={confirming || loading}
              >
                {confirmLabel}
              </Button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmDialog;
