import eventService from '../services/event.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess, sendPagination } from '../utils/response.js';
import AppError from '../utils/AppError.js';

const getRequestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: req.get('user-agent') || '',
});

export const listEvents = asyncHandler(async (req, res) => {
  const { data, pagination } = await eventService.list(req.query);
  sendPagination(res, { message: 'Events retrieved', data, pagination });
});

export const getEvent = asyncHandler(async (req, res) => {
  const event = await eventService.getById(req.params.id);
  sendSuccess(res, { message: 'Event retrieved', data: event });
});

export const createEvent = asyncHandler(async (req, res) => {
  const event = await eventService.create(req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { statusCode: 201, message: 'Event created', data: event });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await eventService.update(req.params.id, req.body, req.files || {}, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Event updated', data: event });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  await eventService.remove(req.params.id, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Event deleted' });
});

export const getUpcomingEvents = asyncHandler(async (req, res) => {
  const { data, pagination } = await eventService.upcoming(req.query);
  sendPagination(res, { message: 'Upcoming events retrieved', data, pagination });
});

export const getPastEvents = asyncHandler(async (req, res) => {
  const { data, pagination } = await eventService.past(req.query);
  sendPagination(res, { message: 'Past events retrieved', data, pagination });
});

export const getFeaturedEvents = asyncHandler(async (req, res) => {
  const data = await eventService.featured();
  sendSuccess(res, { message: 'Featured events retrieved', data });
});

export const getEventCalendar = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const month = parseInt(req.query.month, 10) || new Date().getMonth() + 1;
  if (month < 1 || month > 12) throw new AppError('month must be between 1 and 12', 400);
  const data = await eventService.calendar(year, month);
  sendSuccess(res, { message: 'Calendar events retrieved', data });
});

export const getLiturgicalCalendar = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year, 10) || new Date().getFullYear();
  const data = await eventService.liturgicalCalendar(year);
  sendSuccess(res, { message: 'Liturgical calendar retrieved', data });
});

export const toggleEventFeatured = asyncHandler(async (req, res) => {
  if (typeof req.body.isFeatured !== 'boolean') throw new AppError('isFeatured must be a boolean', 400);
  const event = await eventService.toggleFeatured(req.params.id, req.body.isFeatured, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Event featured status updated', data: event });
});

export const changeEventStatus = asyncHandler(async (req, res) => {
  const event = await eventService.changeStatus(req.params.id, req.body.status, req.admin, getRequestMeta(req));
  sendSuccess(res, { message: 'Event status updated', data: event });
});

export default {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUpcomingEvents,
  getPastEvents,
  getFeaturedEvents,
  getEventCalendar,
  getLiturgicalCalendar,
  toggleEventFeatured,
  changeEventStatus,
};
