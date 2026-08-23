import mongoose from 'mongoose';
import { DONATION_STATUSES, DONATION_PAYMENT_METHODS } from '../constants/index.js';

const { Schema } = mongoose;

const donationSchema = new Schema(
  {
    donorName: { type: String, trim: true, default: '' },
    email: { type: String, lowercase: true, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    amount: { type: Number, required: [true, 'Amount is required'], min: [1, 'Amount must be greater than 0'] },
    currency: { type: String, uppercase: true, default: 'USD' },
    campaign: { type: String, trim: true, default: '' },
    paymentMethod: { type: String, enum: DONATION_PAYMENT_METHODS, default: 'cash', index: true },
    transactionId: { type: String, trim: true, default: '' },
    receiptNumber: { type: String, trim: true, default: '' },
    receiptSent: { type: Boolean, default: false },
    status: { type: String, enum: DONATION_STATUSES, default: 'pending', index: true },
    isAnonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ paymentMethod: 1, createdAt: -1 });

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
