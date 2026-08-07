import mongoose from 'mongoose';

const { Schema } = mongoose;

export const mediaObjectSchema = new Schema(
  {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
    resourceType: { type: String, enum: ['image', 'video', 'raw'], default: 'image' },
    format: { type: String, default: '' },
    size: { type: Number, default: 0 },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
  },
  { _id: true }
);

export const mediaListSchema = {
  type: [mediaObjectSchema],
  default: [],
};

export const socialLinksSchema = new Schema(
  {
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    telegram: { type: String, default: '' },
    tiktok: { type: String, default: '' },
  },
  { _id: false }
);

export const addressSchema = new Schema(
  {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    region: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
  },
  { _id: false }
);

export const localizedSchema = (englishOptions = {}, amharicOptions = {}) => ({
  title: { type: String, required: true, trim: true, ...englishOptions },
  titleAm: { type: String, trim: true, default: '', ...amharicOptions },
});

export default { mediaObjectSchema, mediaListSchema, socialLinksSchema, addressSchema, localizedSchema };
