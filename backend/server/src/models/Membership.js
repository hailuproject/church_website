import mongoose from 'mongoose';
import { MEMBERSHIP_STATUSES } from '../constants/index.js';
import { mediaListSchema } from './subSchemas.js';

const { Schema } = mongoose;

const familyMemberSchema = new Schema(
  {
    fullName: { type: String, trim: true, default: '' },
    relationship: { type: String, trim: true, default: '' },
    age: { type: Number, default: null },
  },
  { _id: false }
);

const membershipSchema = new Schema(
  {
    fullName: { type: String, required: [true, 'Full name is required'], trim: true, maxlength: 150 },
    amharicName: { type: String, trim: true, default: '' },
    baptismName: { type: String, trim: true, default: '' },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    phone: { type: String, required: [true, 'Phone is required'], trim: true },
    address: {
      street: { type: String, trim: true, default: '' },
      city: { type: String, trim: true, default: '' },
      subcity: { type: String, trim: true, default: '' },
      woreda: { type: String, trim: true, default: '' },
      country: { type: String, trim: true, default: '' },
    },
    family: { type: [familyMemberSchema], default: [] },
    documents: mediaListSchema,
    status: { type: String, enum: MEMBERSHIP_STATUSES, default: 'pending', index: true },
    notes: { type: String, trim: true, default: '' },
    registeredBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

membershipSchema.index({ fullName: 'text', amharicName: 'text', baptismName: 'text', email: 'text', phone: 'text' });
membershipSchema.index({ status: 1, createdAt: -1 });

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;
