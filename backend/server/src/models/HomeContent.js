import mongoose from 'mongoose';
import { mediaObjectSchema } from './subSchemas.js';

const { Schema } = mongoose;

const heroSlideSchema = new Schema(
  {
    title: { type: String, trim: true, default: '' },
    titleAm: { type: String, trim: true, default: '' },
    subtitle: { type: String, trim: true, default: '' },
    subtitleAm: { type: String, trim: true, default: '' },
    image: { type: mediaObjectSchema, default: () => ({}) },
    ctaText: { type: String, trim: true, default: '' },
    ctaLink: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { _id: true }
);

const quickLinkSchema = new Schema(
  {
    label: { type: String, trim: true, default: '' },
    labelAm: { type: String, trim: true, default: '' },
    url: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const homeContentSchema = new Schema(
  {
    hero: {
      slides: { type: [heroSlideSchema], default: [] },
      heading: { type: String, trim: true, default: '' },
      headingAm: { type: String, trim: true, default: '' },
    },
    welcome: {
      title: { type: String, trim: true, default: '' },
      titleAm: { type: String, trim: true, default: '' },
      content: { type: String, trim: true, default: '' },
      contentAm: { type: String, trim: true, default: '' },
      image: { type: mediaObjectSchema, default: () => ({}) },
      scripture: { type: String, trim: true, default: '' },
    },
    priestWelcome: {
      title: { type: String, trim: true, default: '' },
      titleAm: { type: String, trim: true, default: '' },
      content: { type: String, trim: true, default: '' },
      contentAm: { type: String, trim: true, default: '' },
      priestName: { type: String, trim: true, default: '' },
      priestTitle: { type: String, trim: true, default: '' },
      priestImage: { type: mediaObjectSchema, default: () => ({}) },
    },
    quickLinks: { type: [quickLinkSchema], default: [] },
    announcementSectionTitle: { type: String, trim: true, default: '' },
    announcementSectionTitleAm: { type: String, trim: true, default: '' },
    showLiveStream: { type: Boolean, default: true },
    showAnnouncements: { type: Boolean, default: true },
    showUpcomingEvents: { type: Boolean, default: true },
    showRecentSermons: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const HomeContent = mongoose.models.HomeContent || mongoose.model('HomeContent', homeContentSchema);

export default HomeContent;
