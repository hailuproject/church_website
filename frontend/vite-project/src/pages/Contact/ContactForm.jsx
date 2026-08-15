import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSend, FiSmile, FiHeart, FiClock, FiUsers } from 'react-icons/fi';
import { useSubmitContact } from '../../hooks/usePublicData';
import { contactCategories, quickHighlights } from '../../data/contactData';
import { useTranslation } from '../../i18n/LanguageContext';

const highlightIcons = {
  smile: FiSmile,
  heart: FiHeart,
  clock: FiClock,
  users: FiUsers,
};

export default function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitContact.mutateAsync({
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        subject: data.subject,
        message: data.message,
        category: data.category,
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      toast.error(error.message || t('pages.contact.error'));
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
      <motion.div
        className="lg:col-span-2 flex flex-col gap-6"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
            {t('pages.contact.getInTouch')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
            {t('pages.contact.formTitle')}
          </h2>
        </div>

        <p className="text-muted text-base leading-[1.8]">
          {t('pages.contact.formDescription')}
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {quickHighlights.map((item) => {
            const ItemIcon = highlightIcons[item.icon] || FiSmile;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-surface rounded-xs p-4 border border-border"
              >
                <div className="w-10 h-10 rounded-xs bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ItemIcon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">{item.title}</h4>
                  <p className="text-xs text-muted leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="lg:col-span-3"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {submitted ? (
          <motion.div
            className="bg-white rounded-xs p-12 border border-border text-center flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <FiSend className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-text">{t('pages.contact.sentTitle')}</h3>
            <p className="text-muted text-sm">
              {t('pages.contact.sentDescription')}
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xs p-8 border border-border shadow-sm"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-text">
                  {t('forms.fullName')} <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: t('forms.fullNameRequired') })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                    errors.name ? 'border-red-400' : 'border-border'
                  }`}
                  placeholder={t('forms.fullNamePlaceholder')}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-text">
                  {t('forms.email')} <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: t('forms.emailRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('forms.invalidEmail'),
                    },
                  })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                    errors.email ? 'border-red-400' : 'border-border'
                  }`}
                  placeholder={t('forms.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-semibold text-text">
                  {t('forms.phone')}
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder={t('forms.phonePlaceholder')}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-sm font-semibold text-text">
                  {t('forms.category')} <span className="text-primary">*</span>
                </label>
                <select
                  id="category"
                  {...register('category', { required: t('forms.categoryRequired') })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer ${
                    errors.category ? 'border-red-400' : 'border-border'
                  }`}
                >
                  <option value="">{t('forms.selectCategory')}</option>
                  {contactCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-5">
              <label htmlFor="subject" className="text-sm font-semibold text-text">
                {t('forms.subject')} <span className="text-primary">*</span>
              </label>
              <input
                id="subject"
                type="text"
                {...register('subject', { required: t('forms.subjectRequired') })}
                className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                  errors.subject ? 'border-red-400' : 'border-border'
                }`}
                placeholder={t('forms.subjectPlaceholder')}
              />
              {errors.subject && (
                <p className="text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mt-5">
              <label htmlFor="message" className="text-sm font-semibold text-text">
                {t('forms.message')} <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: t('forms.messageRequired') })}
                className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none ${
                  errors.message ? 'border-red-400' : 'border-border'
                }`}
                placeholder={t('forms.messagePlaceholder')}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 mt-5">
              <input
                id="privacy"
                type="checkbox"
                {...register('privacy', {
                  required: t('forms.privacyRequired'),
                })}
                className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 cursor-pointer accent-primary"
              />
              <label htmlFor="privacy" className="text-xs text-muted cursor-pointer">
                {t('forms.privacyText')}
              </label>
            </div>
            {errors.privacy && (
              <p className="text-xs text-red-500 mt-1">{errors.privacy.message}</p>
            )}

            <motion.button
              type="submit"
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-3.5 rounded-xs font-medium hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting || submitContact.isPending}
            >
              <FiSend className="text-base" />
              {isSubmitting || submitContact.isPending ? t('pages.contact.sending') : t('pages.contact.sendMessage')}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
