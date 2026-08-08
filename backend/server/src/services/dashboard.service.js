import Sermon from '../models/Sermon.js';
import Event from '../models/Event.js';
import Resource from '../models/Resource.js';
import Donation from '../models/Donation.js';
import ContactMessage from '../models/ContactMessage.js';
import AuditLog from '../models/AuditLog.js';

class DashboardService {
  async overview() {
    const now = new Date();
    const [totalSermons, upcomingEvents, totalResources, unreadMessages, donationCount] =
      await Promise.all([
        Sermon.countDocuments({}),
        Event.countDocuments({ date: { $gte: now }, status: { $in: ['upcoming', 'ongoing'] } }),
        Resource.countDocuments({}),
        ContactMessage.countDocuments({ isRead: false }),
        Donation.countDocuments({}),
      ]);

    return {
      totalSermons,
      upcomingEvents,
      totalResources,
      unreadMessages,
      donationCount,
    };
  }

  async recentActivities(limit = 10) {
    return AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('admin', 'name email role');
  }

  async full() {
    const [overview, recentActivities] = await Promise.all([
      this.overview(),
      this.recentActivities(10),
    ]);

    return { overview, recentActivities };
  }
}

export default new DashboardService();
