import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  FiLock,
  FiClock,
  FiRepeat,
  FiFileText,
  FiHeart,
  FiSend,
  FiCreditCard,
  FiChevronLeft,
} from 'react-icons/fi';
import { donationTypes, frequencyOptions, trustFeatures } from '../../data/donationData';
import { publicService } from '../../services/publicService';
import { getErrorMessage } from '../../lib/apiHelpers';
import { useTranslation } from '../../i18n/LanguageContext';

const trustIcons = {
  lock: FiLock,
  clock: FiClock,
  repeat: FiRepeat,
  receipt: FiFileText,
  heart: FiHeart,
};

const cardElementOptions = {
  style: {
    base: {
      fontSize: '15px',
      color: '#1f2937',
      fontFamily: 'inherit',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444' },
  },
};

function StripeCardForm({ clientSecret, donorData, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();
  const [processing, setProcessing] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: donorData.donorName || undefined,
          email: donorData.donorEmail || undefined,
          phone: donorData.donorPhone || undefined,
        },
      },
    });
    if (result.error) {
      setProcessing(false);
      onError(result.error.message || t('pages.donate.submitError'));
    } else {
      onSuccess();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-text">
          {t('pages.donate.cardInformation')} <span className="text-primary">*</span>
        </label>
        <div className="rounded-xs border border-border px-4 py-3 bg-white outline-none focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-colors duration-300">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={handlePay}
        disabled={!stripe || processing}
        className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-3.5 rounded-xs font-medium hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FiCreditCard className="text-base" />
        {processing ? t('pages.donate.processing') : t('pages.donate.payNow')}
      </motion.button>
    </>
  );
}

export default function DonationForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [payment, setPayment] = useState(null);
  const [donorData, setDonorData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitError('');
    if (!customAmount || Number(customAmount) <= 0) {
      setSubmitError(t('pages.donate.amountError'));
      return;
    }
    try {
      const intent = await publicService.createDonationPaymentIntent({
        donorName: data.donorName,
        email: data.donorEmail,
        phone: data.donorPhone || undefined,
        amount: Number(customAmount),
        currency: 'USD',
        campaign:
          data.frequency === 'One Time'
            ? data.donationType
            : `${data.donationType} - ${data.frequency}`,
        isAnonymous: data.anonymous,
      });
      setPayment(intent);
      setDonorData({
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        donorPhone: data.donorPhone,
      });
    } catch (error) {
      setSubmitError(getErrorMessage(error, t('pages.donate.submitError')));
    }
  };

  const handleSuccess = () => {
    setPayment(null);
    setDonorData(null);
    setSubmitted(true);
    reset();
    setCustomAmount('');
    setTimeout(() => setSubmitted(false), 10000);
  };

  const handlePaymentError = (message) => {
    setSubmitError(message);
  };

  const goBack = () => {
    setSubmitError('');
    setPayment(null);
    setDonorData(null);
  };

  const stripePromise = payment?.publishableKey ? loadStripe(payment.publishableKey) : null;

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
            {t('pages.donate.secureGiving')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
            {t('pages.donate.makeDonation')}
          </h2>
        </div>

        <p className="text-muted text-base leading-[1.8]">
          {t('pages.donate.formDescription')}
        </p>

        <div className="flex flex-col gap-3 mt-2">
          {trustFeatures.map((feature) => {
            const FeatureIcon = trustIcons[feature.icon] || FiLock;
            return (
              <div
                key={feature.title}
                className="flex items-start gap-4 bg-surface rounded-xs p-4 border border-border"
              >
                <div className="w-10 h-10 rounded-xs bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FeatureIcon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text">{feature.title}</h4>
                  <p className="text-xs text-muted leading-relaxed mt-0.5">
                    {feature.description}
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
              <FiHeart className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-text">{t('pages.donate.thankYou')}</h3>
            <p className="text-muted text-sm">
              {t('pages.donate.thankYouDescription')}
            </p>
          </motion.div>
        ) : payment ? (
          <motion.div
            className="bg-white rounded-xs p-8 border border-border shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-text uppercase tracking-wider">
                {t('pages.donate.personalInfo')}
              </h4>
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                <FiChevronLeft className="text-sm" />
                {t('pages.donate.goBack')}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-2 rounded-xs bg-surface border border-border px-3 py-1.5 text-sm text-muted">
                <FiHeart className="w-3.5 h-3.5 text-primary" />
                ${Number(customAmount).toFixed(2)}
              </span>
            </div>

            {submitError && (
              <p className="text-sm text-red-500 mb-4">{submitError}</p>
            )}

            <Elements stripe={stripePromise}>
              <StripeCardForm
                clientSecret={payment.clientSecret}
                donorData={donorData}
                onSuccess={handleSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xs p-8 border border-border shadow-sm"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="donationType" className="text-sm font-semibold text-text">
                  {t('pages.donate.donationType')} <span className="text-primary">*</span>
                </label>
                <select
                  id="donationType"
                  {...register('donationType', { required: t('pages.donate.donationTypeRequired') })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer ${
                    errors.donationType ? 'border-red-400' : 'border-border'
                  }`}
                >
                  <option value="">{t('pages.donate.selectType')}</option>
                  {donationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.donationType && (
                  <p className="text-xs text-red-500">{errors.donationType.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="frequency" className="text-sm font-semibold text-text">
                  {t('pages.donate.frequency')} <span className="text-primary">*</span>
                </label>
                <select
                  id="frequency"
                  {...register('frequency', { required: t('pages.donate.frequencyRequired') })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer ${
                    errors.frequency ? 'border-red-400' : 'border-border'
                  }`}
                >
                  <option value="">{t('pages.donate.selectFrequency')}</option>
                  {frequencyOptions.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
                {errors.frequency && (
                  <p className="text-xs text-red-500">{errors.frequency.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-5">
              <label className="text-sm font-semibold text-text">
                {t('pages.donate.amount')} <span className="text-primary">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[25, 50, 100, 250].map((amt) => (
                  <label
                    key={amt}
                    className={`flex items-center justify-center rounded-xs border px-3 py-3 text-sm font-semibold cursor-pointer transition-all duration-300 ${
                      customAmount === String(amt)
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-surface text-muted hover:border-primary/30 hover:text-primary'
                    }`}
                  >
                    <input
                      type="radio"
                      value={amt}
                      className="sr-only"
                      onChange={() => setCustomAmount(String(amt))}
                      checked={customAmount === String(amt)}
                    />
                    ${amt}
                  </label>
                ))}
              </div>
              <input
                type="number"
                placeholder={t('pages.donate.customAmountPlaceholder')}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mt-2 rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                min="1"
              />
            </div>

            <div className="border-t border-border mt-6 pt-6">
              <h4 className="text-sm font-bold text-text uppercase tracking-wider mb-4">
                {t('pages.donate.personalInfo')}
              </h4>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="donorName" className="text-sm font-semibold text-text">
                    {t('forms.fullName')} <span className="text-primary">*</span>
                  </label>
                  <input
                    id="donorName"
                    type="text"
                    {...register('donorName', { required: t('forms.fullNameRequired') })}
                    className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                      errors.donorName ? 'border-red-400' : 'border-border'
                    }`}
                    placeholder={t('forms.fullNamePlaceholder')}
                  />
                  {errors.donorName && (
                    <p className="text-xs text-red-500">{errors.donorName.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="donorEmail" className="text-sm font-semibold text-text">
                    {t('forms.email')} <span className="text-primary">*</span>
                  </label>
                  <input
                    id="donorEmail"
                    type="email"
                    {...register('donorEmail', {
                      required: t('forms.emailRequired'),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t('forms.invalidEmail'),
                      },
                    })}
                    className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                      errors.donorEmail ? 'border-red-400' : 'border-border'
                    }`}
                    placeholder={t('forms.emailPlaceholder')}
                  />
                  {errors.donorEmail && (
                    <p className="text-xs text-red-500">{errors.donorEmail.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="donorPhone" className="text-sm font-semibold text-text">
                    {t('forms.phone')}
                  </label>
                  <input
                    id="donorPhone"
                    type="tel"
                    {...register('donorPhone')}
                    className="rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                    placeholder={t('forms.phonePlaceholder')}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-5">
              <label htmlFor="prayerRequest" className="text-sm font-semibold text-text">
                {t('pages.donate.prayerRequest')}
              </label>
              <textarea
                id="prayerRequest"
                rows={3}
                {...register('prayerRequest')}
                className="rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                placeholder={t('pages.donate.prayerRequestPlaceholder')}
              />
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('anonymous')}
                  className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted">{t('pages.donate.anonymousDonation')}</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('emailReceipt')}
                  defaultChecked
                  className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted">{t('pages.donate.emailReceipt')}</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('terms', { required: t('pages.donate.termsRequired') })}
                  className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted">
                  {t('pages.donate.termsText')}
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500">{errors.terms.message}</p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-500 mt-4">{submitError}</p>
            )}

            <motion.button
              type="submit"
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-3.5 rounded-xs font-medium hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <FiSend className="text-base" />
              {isSubmitting ? t('pages.donate.processing') : t('pages.donate.donateNow')}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
