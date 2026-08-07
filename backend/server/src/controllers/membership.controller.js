import membershipService from '../services/membership.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
  actorId: req.admin?._id || null,
});

export const listMembers = asyncHandler(async (req, res) => {
  const { data, pagination } = await membershipService.list(req.query);
  sendPagination(res, { message: 'Members retrieved', data, pagination });
});

export const getMember = asyncHandler(async (req, res) => {
  const member = await membershipService.getById(req.params.id);
  sendSuccess(res, { message: 'Member retrieved', data: member });
});

export const registerMember = asyncHandler(async (req, res) => {
  const member = await membershipService.create(req.body, req.files || {}, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Membership application submitted', data: member });
});

export const updateMember = asyncHandler(async (req, res) => {
  const member = await membershipService.update(req.params.id, req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Member updated', data: member });
});

export const approveMember = asyncHandler(async (req, res) => {
  const member = await membershipService.changeStatus(req.params.id, 'approved', req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Membership approved', data: member });
});

export const rejectMember = asyncHandler(async (req, res) => {
  const member = await membershipService.changeStatus(req.params.id, 'rejected', req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Membership rejected', data: member });
});

export const changeMemberStatus = asyncHandler(async (req, res) => {
  if (!req.body.status) throw new AppError('status is required', 400);
  const member = await membershipService.changeStatus(req.params.id, req.body.status, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Membership status updated', data: member });
});

export const deleteMember = asyncHandler(async (req, res) => {
  await membershipService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Member deleted' });
});

export default {
  listMembers,
  getMember,
  registerMember,
  updateMember,
  approveMember,
  rejectMember,
  changeMemberStatus,
  deleteMember,
};
