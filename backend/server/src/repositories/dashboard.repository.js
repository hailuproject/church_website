import Admin from '../models/Admin.js';
import Announcement from '../models/Announcement.js';
import Sermon from '../models/Sermon.js';
import Event from '../models/Event.js';
import GalleryAlbum from '../models/GalleryAlbum.js';
import Resource from '../models/Resource.js';
import Membership from '../models/Membership.js';
import SacramentRequest from '../models/SacramentRequest.js';
import Donation from '../models/Donation.js';
import ContactMessage from '../models/ContactMessage.js';
import PrayerRequest from '../models/PrayerRequest.js';
import AuditLog from '../models/AuditLog.js';

class DashboardRepository {
  async overview() {
    const now = new Date();
    const [members, approvedMembers, sermons, publishedSermons, upcomingEvents, completedEvents, gallery, resources, downloads, unreadMessages, prayerRequests, sacramentRequests, pendingSacraments, donationCount] = await Promise.all([
      Membership.countDocuments({}),
      Membership.countDocuments({ status: 'approved' }),
      Sermon.countDocuments({}),
      Sermon.countDocuments({ isPublished: true }),
      Event.countDocuments({ date: { $gte: now }, status: { $in: ['upcoming', 'ongoing'] } }),
      Event.countDocuments({ status: 'completed' }),
      GalleryAlbum.aggregate([
        {
          $project: {
            imageCount: { $size: { $ifNull: ['$images', []] } },
          },
        },
        { $group: { _id: null, images: { $sum: '$imageCount' }, albums: { $sum: 1 } } },
      ]),
      Resource.countDocuments({}),
      Resource.aggregate([{ $group: { _id: null, downloads: { $sum: '$downloads' } } }]),
      ContactMessage.countDocuments({ isRead: false }),
      PrayerRequest.countDocuments({}),
      SacramentRequest.countDocuments({}),
      SacramentRequest.countDocuments({ status: 'pending' }),
      Donation.countDocuments({}),
    ]);

    const donationSummary = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const [monthlyDonations, annualDonations] = await Promise.all([
      Donation.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Donation.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: yearStart } } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ]);

    return {
      totalMembers: members,
      activeMembers: approvedMembers,
      totalSermons: sermons,
      publishedSermons,
      upcomingEvents,
      completedEvents,
      galleryImages: gallery[0]?.images || 0,
      galleryAlbums: gallery[0]?.albums || 0,
      totalResources: resources,
      totalDownloads: resources ? (downloads[0]?.downloads || 0) : 0,
      unreadMessages,
      prayerRequests,
      sacramentRequests,
      pendingRequests: pendingSacraments,
      donationCount,
      completedDonations: donationSummary[0]?.count || 0,
      totalDonations: donationSummary[0]?.total || 0,
      monthlyDonations: monthlyDonations[0]?.total || 0,
      annualDonations: annualDonations[0]?.total || 0,
    };
  }

  async recentActivities(limit = 10) {
    return AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('admin', 'name email role');
  }

  async recentMembers(limit = 5) {
    return Membership.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async recentSermons(limit = 5) {
    return Sermon.find({}).sort({ publishedAt: -1 }).limit(limit);
  }

  async recentEvents(limit = 5) {
    return Event.find({}).sort({ date: -1 }).limit(limit);
  }

  async recentAnnouncements(limit = 5) {
    return Announcement.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async recentDonations(limit = 5) {
    return Donation.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async recentMessages(limit = 5) {
    return ContactMessage.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async memberStatsByMonth(months = 6) {
    const start = new Date();
    start.setMonth(start.getMonth() - (months - 1));
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return Membership.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async sermonStatsByMonth(months = 6) {
    const start = new Date();
    start.setMonth(start.getMonth() - (months - 1));
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    return Sermon.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async donationMonthlySeries(year) {
    return Donation.aggregate([
      {
        $match: {
          status: 'completed',
          createdAt: { $gte: new Date(year, 0, 1), $lt: new Date(year + 1, 0, 1) },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async usersByRole() {
    return Admin.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async eventsByCategory() {
    return Event.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async sermonsByCategory() {
    return Sermon.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }
}

export default new DashboardRepository();
