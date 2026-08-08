import contactService from '../services/contact.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listMessages = asyncHandler(async (req, res) => {
  const { data, pagination } = await contactService.listMessages(req.query);
  sendPagination(res, { message: 'Messages retrieved', data, pagination });
});

export const getMessage = asyncHandler(async (req, res) => {
  const message = await contactService.getMessage(req.params.id);
  sendSuccess(res, { message: 'Message retrieved', data: message });
});

export const submitContactForm = asyncHandler(async (req, res) => {
  const message = await contactService.submitContact(req.body, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Message sent successfully', data: message });
});

export const markMessageRead = asyncHandler(async (req, res) => {
  const message = await contactService.markRead(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Message marked as read', data: message });
});

export const markAllMessagesRead = asyncHandler(async (req, res) => {
  const result = await contactService.markAllRead(req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'All messages marked as read', data: result });
});

export const replyMessage = asyncHandler(async (req, res) => {
  if (!req.body.reply) throw new AppError('reply is required', 400);
  const message = await contactService.reply(req.params.id, req.body, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Reply sent', data: message });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await contactService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Message deleted' });
});

export default {
  listMessages,
  getMessage,
  submitContactForm,
  markMessageRead,
  markAllMessagesRead,
  replyMessage,
  deleteMessage,
};
