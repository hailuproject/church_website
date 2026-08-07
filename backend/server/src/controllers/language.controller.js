import languageService from '../services/language.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listTranslations = asyncHandler(async (req, res) => {
  const { data, pagination } = await languageService.list(req.query);
  sendPagination(res, { message: 'Translations retrieved', data, pagination });
});

export const getTranslation = asyncHandler(async (req, res) => {
  const translation = await languageService.getById(req.params.id);
  sendSuccess(res, { message: 'Translation retrieved', data: translation });
});

export const getTranslationByKey = asyncHandler(async (req, res) => {
  const translation = await languageService.getByKey(req.params.key);
  sendSuccess(res, { message: 'Translation retrieved', data: translation });
});

export const upsertTranslation = asyncHandler(async (req, res) => {
  const translation = await languageService.upsert(req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Translation saved', data: translation });
});

export const bulkUpsertTranslations = asyncHandler(async (req, res) => {
  const result = await languageService.bulkUpsert(req.body.items, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Translations saved', data: result });
});

export const deleteTranslation = asyncHandler(async (req, res) => {
  await languageService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Translation deleted' });
});

export const getPublicTranslations = asyncHandler(async (req, res) => {
  const language = req.query.language === 'amharic' ? 'amharic' : 'english';
  const data = await languageService.publicTranslations(language);
  sendSuccess(res, { message: 'Translations retrieved', data });
});

export const getSections = asyncHandler(async (req, res) => {
  const data = await languageService.sections();
  sendSuccess(res, { message: 'Translation sections retrieved', data });
});

export default {
  listTranslations,
  getTranslation,
  getTranslationByKey,
  upsertTranslation,
  bulkUpsertTranslations,
  deleteTranslation,
  getPublicTranslations,
  getSections,
};
