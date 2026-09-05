import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiHeart, FiSend } from 'react-icons/fi';
import Container from '../Container';
import { useSubmitContact } from '../../hooks/usePublicData';
import { useTranslation } from '../../i18n/LanguageContext';

export default function PrayerRequestSection() {
  const { t } = useTranslation();
  const submitPrayer = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const canSubmit = message.trim().length > 0 && name.trim().length > 0;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit || submitPrayer.isPending) return;
    try {
      await submitPrayer.mutateAsync({
        name: name.trim(),
        email: email.trim() || undefined,
        subject: t('pages.home.prayerTitle'),
        category: 'Prayer Request',
        message: message.trim(),
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error(error.message || t('pages.home.prayerError'));
    }
  };

  return (
    <section className="py-24 md:py-32 bg-white" aria-label={t('pages.home.prayerTitle')}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
              <FiHeart className="text-secondary" />
              {t('pages.home.prayerEyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
              {t('pages.home.prayerTitle')}
            </h2>
            <p className="text-muted text-base leading-[1.8] mt-5">
              {t('pages.home.prayerDescription')}
            </p>

            <blockquote className="mt-8 border-l-4 border-secondary pl-5">
              <p className="text-lg text-text italic leading-relaxed">
                {t('pages.home.prayerVerse')}
              </p>
              <cite className="text-sm text-muted not-italic mt-2 block">
                — {t('pages.home.prayerVerseCitation')}
              </cite>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="bg-surface rounded-xs p-12 border border-border text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center">
                  <FiHeart className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-text">{t('pages.home.prayerSentTitle')}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t('pages.home.prayerSentDescription')}
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="bg-surface rounded-xs p-8 border border-border shadow-sm flex flex-col gap-5"
                noValidate
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="prayer-name" className="text-sm font-medium text-text">
                      {t('pages.home.prayerName')}
                    </label>
                    <input
                      id="prayer-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="rounded-xs border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                      placeholder="Abebe Kebede"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="prayer-email" className="text-sm font-medium text-text">
                      {t('pages.home.prayerEmail')}
                    </label>
                    <input
                      id="prayer-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="rounded-xs border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prayer-message" className="text-sm font-medium text-text">
                    {t('pages.home.prayerRequest')}
                  </label>
                  <textarea
                    id="prayer-message"
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    className="rounded-xs border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
                    placeholder={t('pages.home.prayerRequestPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || submitPrayer.isPending}
                  className="inline-flex items-center justify-center gap-2 rounded-xs bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitPrayer.isPending ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <FiSend className="text-base" />
                  )}
                  {t('pages.home.prayerSubmit')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}