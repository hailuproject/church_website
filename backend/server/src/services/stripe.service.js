import Stripe from 'stripe';
import config from '../config/index.js';
import AppError from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

let stripeInstance = null;

export const getStripe = () => {
  if (!config.stripe.secretKey) {
    throw new AppError('Stripe is not configured. Set STRIPE_SECRET_KEY.', 503);
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(config.stripe.secretKey, { apiVersion: '2025-06-04.basil' });
  }
  return stripeInstance;
};

export const createPaymentIntent = async ({ amount, currency = 'usd', receiptEmail = '', metadata = {} }) => {
  const stripe = getStripe();
  if (Number(amount) <= 0) throw new AppError('amount must be greater than 0', 400);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt_email: receiptEmail || undefined,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
    return paymentIntent;
  } catch (error) {
    logger.error(`Stripe payment intent creation failed: ${error.message}`);
    throw new AppError(error.message || 'Unable to initialize payment', 400);
  }
};

export const constructWebhookEvent = (payload, signature) => {
  const stripe = getStripe();
  if (!config.stripe.webhookSecret) {
    throw new AppError('Stripe webhook secret is not configured. Set STRIPE_WEBHOOK_SECRET.', 503);
  }
  if (!signature) throw new AppError('Missing Stripe signature', 400);
  try {
    return stripe.webhooks.constructEvent(payload, signature, config.stripe.webhookSecret);
  } catch (error) {
    logger.error(`Stripe webhook signature verification failed: ${error.message}`);
    throw new AppError(`Webhook signature verification failed: ${error.message}`, 400);
  }
};

export default {
  getStripe,
  createPaymentIntent,
  constructWebhookEvent,
};
