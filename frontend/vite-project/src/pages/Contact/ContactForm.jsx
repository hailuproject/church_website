import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiSend, FiSmile, FiHeart, FiClock, FiUsers } from 'react-icons/fi';
import { useSubmitContact } from '../../hooks/usePublicData';
import { contactCategories, quickHighlights } from '../../data/contactData';

const highlightIcons = {
  smile: FiSmile,
  heart: FiHeart,
  clock: FiClock,
  users: FiUsers,
};

export default function ContactForm() {
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
      toast.error(error.message || 'Failed to send message. Please try again.');
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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text mt-4 leading-tight">
            We&apos;d Love to Hear From You
          </h2>
        </div>

        <p className="text-muted text-base leading-[1.8]">
          Whether you have a question, need prayer, or want to learn more about our church
          community, please don&apos;t hesitate to reach out. Our team is here to help.
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
            <h3 className="text-xl font-bold text-text">Message Sent!</h3>
            <p className="text-muted text-sm">
              Thank you for reaching out. We will get back to you within 24\u201348 hours.
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
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Full name is required' })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                    errors.name ? 'border-red-400' : 'border-border'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-text">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                    errors.email ? 'border-red-400' : 'border-border'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-semibold text-text">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="rounded-xs border border-border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Your phone number"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="text-sm font-semibold text-text">
                  Category <span className="text-primary">*</span>
                </label>
                <select
                  id="category"
                  {...register('category', { required: 'Please select a category' })}
                  className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 cursor-pointer ${
                    errors.category ? 'border-red-400' : 'border-border'
                  }`}
                >
                  <option value="">Select a category</option>
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
                Subject <span className="text-primary">*</span>
              </label>
              <input
                id="subject"
                type="text"
                {...register('subject', { required: 'Subject is required' })}
                className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 ${
                  errors.subject ? 'border-red-400' : 'border-border'
                }`}
                placeholder="How can we help you?"
              />
              {errors.subject && (
                <p className="text-xs text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 mt-5">
              <label htmlFor="message" className="text-sm font-semibold text-text">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: 'Message is required' })}
                className={`rounded-xs border px-4 py-3 text-sm text-text bg-white outline-none transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none ${
                  errors.message ? 'border-red-400' : 'border-border'
                }`}
                placeholder="Write your message here..."
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
                  required: 'You must agree to the privacy policy',
                })}
                className="mt-0.5 w-4 h-4 rounded-xs border-border text-primary focus:ring-primary/20 cursor-pointer accent-primary"
              />
              <label htmlFor="privacy" className="text-xs text-muted cursor-pointer">
                I agree to the church&apos;s privacy practices and consent to being contacted
                regarding my inquiry.
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
              {isSubmitting || submitContact.isPending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
