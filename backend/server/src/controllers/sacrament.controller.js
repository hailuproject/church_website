import sacramentService from '../services/sacrament.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listSacraments = asyncHandler(async (req, res) => {
  const { data, pagination } = await sacramentService.list(req.query);
  sendPagination(res, { message: 'Sacrament requests retrieved', data, pagination });
});

export const getSacrament = asyncHandler(async (req, res) => {
  const request = await sacramentService.getById(req.params.id);
  sendSuccess(res, { message: 'Sacrament request retrieved', data: request });
});

export const createSacrament = asyncHandler(async (req, res) => {
  const request = await sacramentService.create(req.body, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Sacrament request submitted', data: request });
});

export const updateSacrament = asyncHandler(async (req, res) => {
  const request = await sacramentService.update(req.params.id, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sacrament request updated', data: request });
});

export const changeSacramentStatus = asyncHandler(async (req, res) => {
  const request = await sacramentService.changeStatus(req.params.id, req.body.status, req.body.assignedPriest, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sacrament request status updated', data: request });
});

export const assignSacramentPriest = asyncHandler(async (req, res) => {
  if (!req.body.assignedPriest) throw new AppError('assignedPriest is required', 400);
  const request = await sacramentService.assignPriest(req.params.id, req.body.assignedPriest, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Priest assigned', data: request });
});

export const deleteSacrament = asyncHandler(async (req, res) => {
  await sacramentService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Sacrament request deleted' });
});

export default {
  listSacraments,
  getSacrament,
  createSacrament,
  updateSacrament,
  changeSacramentStatus,
  assignSacramentPriest,
  deleteSacrament,
};
