import dashboardService from '../services/dashboard.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';

export const getOverview = asyncHandler(async (req, res) => {
  const data = await dashboardService.full();
  sendSuccess(res, { message: 'Dashboard overview retrieved', data });
});

export const getRecentActivities = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const data = await dashboardService.recentActivities(Math.min(limit, 50));
  sendSuccess(res, { message: 'Recent activities retrieved', data });
});

export default {
  getOverview,
  getRecentActivities,
};
