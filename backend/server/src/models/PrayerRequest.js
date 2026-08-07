import mongoose from 'mongoose';
import { CONTACT_CATEGORIES } from '../constants/index.js';

const { Schema } = mongoose;

const prayerRequestSchema = new Schema(
  {
    name: { type: String, trim: true, default: '' },
    email: { type: String, lowercase: true, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    prayerType: { type: String, enum: CONTACT_CATEGORIES, default: 'Prayer Request' },
    request: { type: String, required: [true, 'Prayer request is required'], trim: true, maxlength: 2000 },
    isConfidential: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    status: { type: String, enum: ['new', 'prayed', 'answered', 'closed'], default: 'new', index: true },
  },
  { timestamps: true }
);

prayerRequestSchema.index({ status: 1, createdAt: -1 });

const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

export default PrayerRequest;
