import leadershipService from '../services/leadership.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listLeadership = asyncHandler(async (req, res) => {
  const { data, pagination } = await leadershipService.list(req.query);
  sendPagination(res, { message: 'Leadership members retrieved', data, pagination });
});

export const getActiveLeadership = asyncHandler(async (req, res) => {
  const data = await leadershipService.listActive();
  sendSuccess(res, { message: 'Leadership members retrieved', data });
});

export const getLeader = asyncHandler(async (req, res) => {
  const leader = await leadershipService.getById(req.params.id);
  sendSuccess(res, { message: 'Leadership member retrieved', data: leader });
});

export const createLeader = asyncHandler(async (req, res) => {
  if (!req.body.name) throw new AppError('name is required', 400);
  const leader = await leadershipService.create(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Leadership member created', data: leader });
});

export const updateLeader = asyncHandler(async (req, res) => {
  const leader = await leadershipService.update(req.params.id, req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Leadership member updated', data: leader });
});

export const deleteLeader = asyncHandler(async (req, res) => {
  await leadershipService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Leadership member deleted' });
});

export default { listLeadership, getActiveLeadership, getLeader, createLeader, updateLeader, deleteLeader };
