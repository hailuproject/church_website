import mongoose from 'mongoose';
import { EVENT_CATEGORIES, EVENT_STATUSES } from '../constants/index.js';
import { mediaObjectSchema } from './subSchemas.js';

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 250 },
    titleAm: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    descriptionAm: { type: String, trim: true, default: '' },
    date: { type: Date, required: [true, 'Event date is required'], index: true },
    startTime: { type: String, trim: true, default: '' },
    endTime: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, default: '' },
    category: { type: String, enum: EVENT_CATEGORIES, default: 'Liturgy', index: true },
    coverImage: { type: mediaObjectSchema, default: () => ({}) },
    capacity: { type: Number, default: 0, min: 0 },
    registeredCount: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: EVENT_STATUSES, default: 'upcoming', index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

eventSchema.index({ title: 'text', description: 'text', titleAm: 'text', descriptionAm: 'text' });
eventSchema.index({ date: 1, status: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
