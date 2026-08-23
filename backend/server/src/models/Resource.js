import mongoose from 'mongoose';
import { RESOURCE_CATEGORIES, RESOURCE_LANGUAGES } from '../constants/index.js';
import { mediaObjectSchema } from './subSchemas.js';

const { Schema } = mongoose;

const resourceSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 250 },
    titleAm: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    descriptionAm: { type: String, trim: true, default: '' },
    category: { type: String, enum: RESOURCE_CATEGORIES, default: 'Books', index: true },
    language: { type: String, enum: RESOURCE_LANGUAGES, default: 'English', index: true },
    thumbnail: { type: mediaObjectSchema, default: () => ({}) },
    file: { type: mediaObjectSchema, default: () => ({}) },
    downloads: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

resourceSchema.index(
  { title: 'text', description: 'text', titleAm: 'text', descriptionAm: 'text' },
  { language_override: 'textLanguage' }
);

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
