import mongoose from 'mongoose';
import { mediaObjectSchema } from './subSchemas.js';

const { Schema } = mongoose;

const leadershipSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 150 },
    nameAm: { type: String, trim: true, default: '' },
    title: { type: String, trim: true, default: '' },
    titleAm: { type: String, trim: true, default: '' },
    role: {
      type: String,
      enum: ['Priest', 'Head Priest', 'Deacon', 'Evangelist', 'Teacher', 'Elder', 'Secretary', 'Committee'],
      default: 'Priest',
      index: true,
    },
    bio: { type: String, trim: true, default: '' },
    bioAm: { type: String, trim: true, default: '' },
    photo: { type: mediaObjectSchema, default: () => ({}) },
    email: { type: String, lowercase: true, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

leadershipSchema.index({ name: 'text', nameAm: 'text', title: 'text' });

const Leadership = mongoose.model('Leadership', leadershipSchema);

export default Leadership;
