import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LanguageToggle } from '../../components/ui/FormSection';

const quickLinkSchema = z.object({
  label: z.string().min(1, 'Label is required').max(80, 'Label too long'),
  labelAm: z.string().optional().or(z.literal('')),
  url: z.string().min(1, 'URL is required').max(200, 'URL too long'),
  icon: z.string().optional().or(z.literal('')),
  order: z.string().optional().or(z.literal('')),
});

export const QuickLinkModal = ({ open, onClose, link, index, onSubmit, submitting }) => {
  const isEdit = index !== null && index !== undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quickLinkSchema),
    defaultValues: { label: '', labelAm: '', url: '', icon: '', order: '' },
  });

  useEffect(() => {
    if (open) {
      reset({
        label: link?.label || '',
        labelAm: link?.labelAm || '',
        url: link?.url || '',
        icon: link?.icon || '',
        order: link?.order !== undefined ? String(link.order) : '',
      });
    }
  }, [open, link, reset]);

  const onFormSubmit = (values) => {
    onSubmit({
      label: values.label.trim(),
      labelAm: values.labelAm.trim() || undefined,
      url: values.url.trim(),
      icon: values.icon.trim() || undefined,
      order: values.order ? Number(values.order) : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit Quick Link' : 'Add Quick Link'}
      subtitle="Quick links appear as shortcuts on the homepage"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" form="quick-link-form" loading={submitting}>
            {isEdit ? 'Save changes' : 'Add link'}
          </Button>
        </>
      }
    >
      <form id="quick-link-form" onSubmit={handleSubmit(onFormSubmit)} className="space-y-5" noValidate>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Content languages</span>
          <LanguageToggle activeLang="English" onToggle={() => {}} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Label (English)" placeholder="Live Stream" required error={errors.label?.message} {...register('label')} />
          <Input label="Label (አማርኛ)" placeholder="የቀጥታ ስርጭት" error={errors.labelAm?.message} {...register('labelAm')} />
        </div>
        <Input label="URL" placeholder="/sermons" required error={errors.url?.message} {...register('url')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Icon name" placeholder="youtube" hint="lucide icon name" error={errors.icon?.message} {...register('icon')} />
          <Input label="Order" type="number" placeholder="0" error={errors.order?.message} {...register('order')} />
        </div>
      </form>
    </Modal>
  );
};

export default QuickLinkModal;
