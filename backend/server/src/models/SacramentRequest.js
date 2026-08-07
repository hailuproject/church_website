import mongoose from 'mongoose';
import { SACRAMENT_TYPES, SACRAMENT_STATUSES } from '../constants/index.js';

const { Schema } = mongoose;

const sacramentRequestSchema = new Schema(
  {
    type: { type: String, enum: SACRAMENT_TYPES, required: [true, 'Sacrament type is required'], index: true },
    member: { type: Schema.Types.ObjectId, ref: 'Membership', default: null },
    memberName: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    email: { type: String, lowercase: true, trim: true, default: '' },
    preferredDate: { type: Date, default: null },
    assignedPriest: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    status: { type: String, enum: SACRAMENT_STATUSES, default: 'pending', index: true },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

sacramentRequestSchema.index({ status: 1, type: 1, preferredDate: 1 });

const SacramentRequest = mongoose.model('SacramentRequest', sacramentRequestSchema);

export default SacramentRequest;
