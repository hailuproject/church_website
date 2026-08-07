import mongoose from 'mongoose';
import { MEDIA_TYPES, CLOUDINARY_FOLDERS } from '../constants/index.js';
import { mediaObjectSchema } from './subSchemas.js';

const { Schema } = mongoose;

const mediaSchema = new Schema(
  {
    originalName: { type: String, trim: true, default: '' },
    fileName: { type: String, trim: true, default: '' },
    mediaType: { type: String, enum: Object.values(MEDIA_TYPES), index: true },
    mimeType: { type: String, default: '' },
    asset: { type: mediaObjectSchema, default: () => ({}) },
    folder: { type: String, enum: Object.values(CLOUDINARY_FOLDERS), default: CLOUDINARY_FOLDERS.MISC },
    tags: { type: [String], default: [] },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    usage: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

mediaSchema.index({ originalName: 'text', fileName: 'text' });
mediaSchema.index({ mediaType: 1, createdAt: -1 });

const Media = mongoose.model('Media', mediaSchema);

export default Media;
