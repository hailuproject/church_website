import dashboardService from '../services/dashboard.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getOverview = asyncHandler(async (req, res) => {
  const data = await dashboardService.overview();
  sendSuccess(res, { message: 'Dashboard overview retrieved', data });
});

export const getRecentActivities = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const data = await dashboardService.recentActivities(Math.min(limit, 50));
  sendSuccess(res, { message: 'Recent activities retrieved', data });
});

export const getRecentMembers = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const data = await dashboardService.recentMembers(Math.min(limit, 50));
  sendSuccess(res, { message: 'Recent members retrieved', data });
});

export const getRecentSermons = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const data = await dashboardService.recentSermons(Math.min(limit, 50));
  sendSuccess(res, { message: 'Recent sermons retrieved', data });
});

export const getRecentEvents = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const data = await dashboardService.recentEvents(Math.min(limit, 50));
  sendSuccess(res, { message: 'Recent events retrieved', data });
});

export const getCharts = asyncHandler(async (req, res) => {
  const months = Math.min(parseInt(req.query.months, 10) || 6, 24);
  const data = await dashboardService.charts(months);
  sendSuccess(res, { message: 'Chart data retrieved', data });
});

export const getFullDashboard = asyncHandler(async (req, res) => {
  const months = Math.min(parseInt(req.query.months, 10) || 6, 24);
  const data = await dashboardService.full(months);
  sendSuccess(res, { message: 'Dashboard data retrieved', data });
});

export default {
  getOverview,
  getRecentActivities,
  getRecentMembers,
  getRecentSermons,
  getRecentEvents,
  getCharts,
  getFullDashboard,
};
