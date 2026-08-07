import mongoose from 'mongoose';
import { mediaObjectSchema, socialLinksSchema, addressSchema } from './subSchemas.js';

const { Schema } = mongoose;

const settingSchema = new Schema(
  {
    churchName: { type: String, default: 'Ethiopian Orthodox Tewahedo Church', trim: true },
    churchNameAm: { type: String, default: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን', trim: true },
    tagline: { type: String, default: '' },
    taglineAm: { type: String, default: '' },
    address: { type: addressSchema, default: () => ({}) },
    addressAm: { type: addressSchema, default: () => ({}) },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    socialLinks: { type: socialLinksSchema, default: () => ({}) },
    liveStreamURL: { type: String, default: '' },
    heroImage: { type: mediaObjectSchema, default: () => ({}) },
    logo: { type: mediaObjectSchema, default: () => ({}) },
    favicon: { type: mediaObjectSchema, default: () => ({}) },
    footerText: { type: String, default: '' },
    footerTextAm: { type: String, default: '' },
    languageSettings: {
      defaultLanguage: { type: String, enum: ['english', 'amharic'], default: 'english' },
      supportedLanguages: { type: [String], enum: ['english', 'amharic'], default: ['english', 'amharic'] },
      allowLanguageSwitch: { type: Boolean, default: true },
    },
    theme: {
      primaryColor: { type: String, default: '#8B6F47' },
      secondaryColor: { type: String, default: '#2c3e50' },
      fontFamily: { type: String, default: 'Georgia' },
      darkMode: { type: Boolean, default: false },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

export default Setting;
