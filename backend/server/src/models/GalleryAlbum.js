import mongoose from 'mongoose';
import { GALLERY_CATEGORIES } from '../constants/index.js';
import { mediaObjectSchema, mediaListSchema } from './subSchemas.js';

const { Schema } = mongoose;

const galleryAlbumSchema = new Schema(
  {
    albumName: { type: String, required: [true, 'Album name is required'], trim: true, maxlength: 200 },
    albumNameAm: { type: String, trim: true, default: '' },
    albumNameTi: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    descriptionAm: { type: String, trim: true, default: '' },
    descriptionTi: { type: String, trim: true, default: '' },
    coverImage: { type: mediaObjectSchema, default: () => ({}) },
    category: { type: String, enum: GALLERY_CATEGORIES, default: 'Liturgy', index: true },
    images: mediaListSchema,
    videos: mediaListSchema,
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

galleryAlbumSchema.index({ albumName: 'text', albumNameAm: 'text', albumNameTi: 'text', description: 'text' });

const GalleryAlbum = mongoose.model('GalleryAlbum', galleryAlbumSchema);

export default GalleryAlbum;
