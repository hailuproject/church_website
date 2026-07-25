import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  FiLock,
  FiClock,
  FiRepeat,
  FiFileText,
  FiHeart,
  FiSend,
} from 'react-icons/fi';
import { donationTypes, frequencyOptions, trustFeatures } from '../../data/donationData';

const trustIcons = {
  lock: FiLock,
  clock: FiClock,
  repeat: FiRepeat,
  receipt: FiFileText,
  heart: FiHeart,
};

export default function DonationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (_data) => {
    setSubmitted(true);
    reset();
    setCustomAmount('');
    setTimeout(() => setSubmitted(false), 5000);
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
            Secure Giving
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
            Make Your Donation
          </h2>
        </div>

        <p className="text-muted text-base leading-[1.8]">
          Your generous giving supports the worship, ministries, and community outreach of our
          church. Every gift, regardless of size, makes a meaningful impact.
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
            <h3 className="text-xl font-bold text-text">Thank You for Your Gift!</h3>
            <p className="text-muted text-sm">
              Your generous donation has been recorded. A receipt will be sent to your email
              shortly.
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
                <label htmlFor="donationType" className="text-sm font-semibold text-text">
                  Donation Type <span className="text-primary">*</span>
                </label>
                <select
                  id="donationType"
                  {...register('donationType', { required: 'Please select a donation type' })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer ${
                    errors.donationType ? 'border-red-400' : 'border-border'
                  }`}
                >
                  <option value="">Select type</option>
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
                  Frequency <span className="text-primary">*</span>
                </label>
                <select
                  id="frequency"
                  {...register('frequency', { required: 'Please select frequency' })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer ${
                    errors.frequency ? 'border-red-400' : 'border-border'
                  }`}
                >
                  <option value="">Select frequency</option>
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
                Amount <span className="text-primary">*</span>
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
                placeholder="Or enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mt-2 rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                min="1"
              />
            </div>

            <div className="border-t border-border mt-6 pt-6">
              <h4 className="text-sm font-bold text-text uppercase tracking-wider mb-4">
                Personal Information
              </h4>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="donorName" className="text-sm font-semibold text-text">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="donorName"
                    type="text"
                    {...register('donorName', { required: 'Full name is required' })}
                    className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                      errors.donorName ? 'border-red-400' : 'border-border'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.donorName && (
                    <p className="text-xs text-red-500">{errors.donorName.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="donorEmail" className="text-sm font-semibold text-text">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="donorEmail"
                    type="email"
                    {...register('donorEmail', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                      errors.donorEmail ? 'border-red-400' : 'border-border'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.donorEmail && (
                    <p className="text-xs text-red-500">{errors.donorEmail.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="donorPhone" className="text-sm font-semibold text-text">
                    Phone Number
                  </label>
                  <input
                    id="donorPhone"
                    type="tel"
                    {...register('donorPhone')}
                    className="rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-5">
              <label htmlFor="prayerRequest" className="text-sm font-semibold text-text">
                Prayer Request (Optional)
              </label>
              <textarea
                id="prayerRequest"
                rows={3}
                {...register('prayerRequest')}
                className="rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
                placeholder="Share any prayer requests with our pastoral team..."
              />
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('anonymous')}
                  className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted">Make this an anonymous donation</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('emailReceipt')}
                  defaultChecked
                  className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted">Send me an email receipt</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('terms', { required: 'You must agree to the terms' })}
                  className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:text-primary-dark underline">
                    terms and conditions
                  </a>{' '}
                  and consent to my donation being processed.
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500">{errors.terms.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-3.5 rounded-xs font-medium hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              <FiSend className="text-base" />
              {isSubmitting ? 'Processing...' : 'Donate Now'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
