import adminService from '../services/admin.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listAdmins = asyncHandler(async (req, res) => {
  const { data, pagination } = await adminService.list(req.query);
  sendPagination(res, { message: 'Users retrieved', data, pagination });
});

export const getAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.getById(req.params.id);
  sendSuccess(res, { message: 'User retrieved', data: admin });
});

export const createAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.create(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'User created', data: admin });
});

export const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.update(req.params.id, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'User updated', data: admin });
});

export const deleteAdmin = asyncHandler(async (req, res) => {
  await adminService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'User deleted' });
});

export const changeRole = asyncHandler(async (req, res) => {
  const admin = await adminService.changeRole(req.params.id, req.body.role, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Role updated', data: admin });
});

export const toggleStatus = asyncHandler(async (req, res) => {
  if (typeof req.body.isActive !== 'boolean') throw new AppError('isActive must be a boolean', 400);
  const admin = await adminService.toggleStatus(req.params.id, req.body.isActive, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: req.body.isActive ? 'User activated' : 'User deactivated', data: admin });
});

export const uploadAdminAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('Please upload an image file', 400);
  const admin = await adminService.uploadAvatar(req.params.id, req.file, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Avatar uploaded', data: admin });
});

export default {
  listAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  changeRole,
  toggleStatus,
  uploadAdminAvatar,
};
