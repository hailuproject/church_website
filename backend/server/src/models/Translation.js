import mongoose from 'mongoose';

const { Schema } = mongoose;

const translationSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true, index: true },
    english: { type: String, trim: true, default: '' },
    amharic: { type: String, trim: true, default: '' },
    section: { type: String, trim: true, default: 'general', index: true },
    description: { type: String, trim: true, default: '' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
  },
  { timestamps: true }
);

translationSchema.index({ section: 1, key: 1 });

const Translation = mongoose.model('Translation', translationSchema);

export default Translation;
