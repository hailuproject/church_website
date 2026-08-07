import mongoose from 'mongoose';

const { Schema } = mongoose;

const rsvpSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 150 },
    email: { type: String, lowercase: true, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    guests: { type: Number, default: 0, min: 0, max: 10 },
    status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'confirmed', index: true },
  },
  { timestamps: true }
);

rsvpSchema.index({ event: 1, email: 1 }, { unique: true });

const EventRsvp = mongoose.model('EventRsvp', rsvpSchema);

export default EventRsvp;
