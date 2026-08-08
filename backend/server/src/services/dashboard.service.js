import Sermon from '../models/Sermon.js';
import Event from '../models/Event.js';
import GalleryAlbum from '../models/GalleryAlbum.js';
import Resource from '../models/Resource.js';
import Donation from '../models/Donation.js';
import ContactMessage from '../models/ContactMessage.js';
import AuditLog from '../models/AuditLog.js';

class DashboardService {
  async overview() {
    const now = new Date();
    const [sermons, publishedSermons, upcomingEvents, completedEvents, resources, unreadMessages, donationCount, gallery] =
      await Promise.all([
        Sermon.countDocuments({}),
        Sermon.countDocuments({ isPublished: true }),
        Event.countDocuments({ date: { $gte: now }, status: { $in: ['upcoming', 'ongoing'] } }),
        Event.countDocuments({ status: 'completed' }),
        Resource.countDocuments({}),
        ContactMessage.countDocuments({ isRead: false }),
        Donation.countDocuments({}),
        GalleryAlbum.aggregate([
          {
            $project: {
              imageCount: { $size: { $ifNull: ['$images', []] } },
              videoCount: { $size: { $ifNull: ['$videos', []] } },
            },
          },
          { $group: { _id: null, images: { $sum: '$imageCount' }, videos: { $sum: '$videoCount' }, albums: { $sum: 1 } } },
        ]),
      ]);

    const downloads = await Resource.aggregate([{ $group: { _id: null, downloads: { $sum: '$downloads' } } }]);

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
      totalSermons: sermons,
      publishedSermons,
      upcomingEvents,
      completedEvents,
      galleryImages: gallery[0]?.images || 0,
      galleryVideos: gallery[0]?.videos || 0,
      galleryAlbums: gallery[0]?.albums || 0,
      totalResources: resources,
      totalDownloads: downloads[0]?.downloads || 0,
      unreadMessages,
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

  async recentSermons(limit = 5) {
    return Sermon.find({}).sort({ publishedAt: -1 }).limit(limit);
  }

  async recentEvents(limit = 5) {
    return Event.find({}).sort({ date: -1 }).limit(limit);
  }

  async recentDonations(limit = 5) {
    return Donation.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async recentMessages(limit = 5) {
    return ContactMessage.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async full() {
    const [overview, recentActivities, recentSermons, recentEvents, recentDonations, recentMessages] =
      await Promise.all([
        this.overview(),
        this.recentActivities(10),
        this.recentSermons(5),
        this.recentEvents(5),
        this.recentDonations(5),
        this.recentMessages(5),
      ]);

    return {
      overview,
      recentActivities,
      recentSermons,
      recentEvents,
      recentDonations,
      recentMessages,
    };
  }
}

export default new DashboardService();
