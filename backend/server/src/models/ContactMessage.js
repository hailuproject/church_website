import mongoose from 'mongoose';
import { CONTACT_CATEGORIES, CONTACT_STATUSES } from '../constants/index.js';

const { Schema } = mongoose;

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 150 },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    phone: { type: String, trim: true, default: '' },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: [true, 'Message is required'], trim: true },
    category: { type: String, enum: CONTACT_CATEGORIES, default: 'General', index: true },
    status: { type: String, enum: CONTACT_STATUSES, default: 'new', index: true },
    isRead: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
    reply: { type: String, trim: true, default: '' },
    repliedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

contactMessageSchema.index({ name: 'text', email: 'text', subject: 'text', message: 'text' });

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
