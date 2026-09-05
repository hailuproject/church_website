import auditService from '../services/audit.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';
import { getRequestMeta } from '../utils/requestMeta.js';


export const listAuditLogs = asyncHandler(async (req, res) => {
  const { data, pagination } = await auditService.list(req.query);
  sendPagination(res, { message: 'Audit logs retrieved', data, pagination });
});

export const getAuditLog = asyncHandler(async (req, res) => {
  const log = await auditService.getById(req.params.id);
  sendSuccess(res, { message: 'Audit log retrieved', data: log });
});

export const getRecentAuditLogs = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const data = await auditService.recent(limit);
  sendSuccess(res, { message: 'Recent audit logs retrieved', data });
});

export const getAuditSummary = asyncHandler(async (req, res) => {
  const data = await auditService.summary();
  sendSuccess(res, { message: 'Audit summary retrieved', data });
});

export const clearOldAuditLogs = asyncHandler(async (req, res) => {
  const days = parseInt(req.query.days, 10) || parseInt(req.body?.days, 10);
  if (!days || days < 1) throw new AppError('days is required and must be at least 1', 400);
  const removed = await auditService.clearOlderThan(days, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: `Audit logs cleared`, data: { removed } });
});

export default { listAuditLogs, getAuditLog, getRecentAuditLogs, getAuditSummary, clearOldAuditLogs };
