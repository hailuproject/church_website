import mongoose from 'mongoose';
import { SERMON_CATEGORIES, SERMON_LANGUAGES } from '../constants/index.js';
import { mediaObjectSchema } from './subSchemas.js';

const { Schema } = mongoose;

const sermonSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 250 },
    titleAm: { type: String, trim: true, default: '' },
    titleTi: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    descriptionAm: { type: String, trim: true, default: '' },
    descriptionTi: { type: String, trim: true, default: '' },
    speaker: { type: String, trim: true, default: '' },
    scripture: { type: String, trim: true, default: '' },
    category: { type: String, enum: SERMON_CATEGORIES, default: 'Sunday Sermon', index: true },
    language: { type: String, enum: SERMON_LANGUAGES, default: 'English', index: true },
    thumbnail: { type: mediaObjectSchema, default: () => ({}) },
    audioUrl: { type: mediaObjectSchema, default: () => ({}) },
    videoUrl: { type: mediaObjectSchema, default: () => ({}) },
    duration: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    downloadCount: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

sermonSchema.index({ title: 'text', description: 'text', titleAm: 'text', descriptionAm: 'text', titleTi: 'text', descriptionTi: 'text', speaker: 'text' });
sermonSchema.index({ publishedAt: -1 });

const Sermon = mongoose.model('Sermon', sermonSchema);

export default Sermon;
