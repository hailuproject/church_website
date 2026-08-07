import mongoose from 'mongoose';
import { mediaObjectSchema, socialLinksSchema } from './subSchemas.js';

const { Schema } = mongoose;

const timelineEntrySchema = new Schema(
  {
    year: { type: String, trim: true, default: '' },
    title: { type: String, trim: true, default: '' },
    titleAm: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    descriptionAm: { type: String, trim: true, default: '' },
    image: { type: mediaObjectSchema, default: () => ({}) },
  },
  { _id: true }
);

const serviceHoursSchema = new Schema(
  {
    weekday: { type: String, trim: true, default: '' },
    name: { type: String, trim: true, default: '' },
    nameAm: { type: String, trim: true, default: '' },
    hours: { type: String, trim: true, default: '' },
  },
  { _id: true }
);

const aboutContentSchema = new Schema(
  {
    history: {
      title: { type: String, trim: true, default: '' },
      titleAm: { type: String, trim: true, default: '' },
      content: { type: String, trim: true, default: '' },
      contentAm: { type: String, trim: true, default: '' },
      images: { type: [mediaObjectSchema], default: [] },
    },
    faith: {
      title: { type: String, trim: true, default: '' },
      titleAm: { type: String, trim: true, default: '' },
      content: { type: String, trim: true, default: '' },
      contentAm: { type: String, trim: true, default: '' },
      beliefs: { type: [String], default: [] },
      beliefsAm: { type: [String], default: [] },
    },
    timeline: { type: [timelineEntrySchema], default: [] },
    serviceHours: { type: [serviceHoursSchema], default: [] },
    location: {
      title: { type: String, trim: true, default: '' },
      address: { type: String, trim: true, default: '' },
      addressAm: { type: String, trim: true, default: '' },
      mapEmbedUrl: { type: String, trim: true, default: '' },
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },
  },
  { timestamps: true }
);

const AboutContent = mongoose.models.AboutContent || mongoose.model('AboutContent', aboutContentSchema);

export default AboutContent;
