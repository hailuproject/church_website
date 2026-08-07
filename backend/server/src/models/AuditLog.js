import mongoose from 'mongoose';
import { AUDIT_ACTIONS } from '../constants/index.js';

const { Schema } = mongoose;

const auditLogSchema = new Schema(
  {
    admin: { type: Schema.Types.ObjectId, ref: 'Admin', default: null, index: true },
    adminName: { type: String, default: '' },
    adminRole: { type: String, default: '' },
    action: { type: String, enum: AUDIT_ACTIONS, index: true },
    module: { type: String, trim: true, index: true },
    documentId: { type: Schema.Types.Mixed, default: null },
    oldData: { type: Schema.Types.Mixed, default: null },
    newData: { type: Schema.Types.Mixed, default: null },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
  },
  { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ admin: 1, createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
