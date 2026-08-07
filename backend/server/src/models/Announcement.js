import mongoose from 'mongoose';
import { ANNOUNCEMENT_PRIORITIES } from '../constants/index.js';

const { Schema } = mongoose;

const announcementSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
    titleAm: { type: String, trim: true, default: '' },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    descriptionAm: { type: String, trim: true, default: '' },
    priority: { type: String, enum: ANNOUNCEMENT_PRIORITIES, default: 'Normal', index: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    isPublished: { type: Boolean, default: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

announcementSchema.index({ title: 'text', description: 'text', titleAm: 'text', descriptionAm: 'text' });
announcementSchema.index({ startDate: 1, endDate: 1 });

const Announcement = mongoose.model('Announcement', announcementSchema);

export default Announcement;
