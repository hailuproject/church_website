import Event from '../models/Event.js';
import EventRsvp from '../models/EventRsvp.js';
import BaseRepository from './base.repository.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';

class EventRepository extends BaseRepository {
  constructor() {
    super(Event, {
      searchableFields: ['title', 'titleAm', 'description', 'descriptionAm', 'location'],
      filterWhitelist: ['category', 'status', 'isFeatured', 'createdBy'],
      defaultSort: { date: 1 },
    });
  }

  async upcoming(queryString = {}) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { date: { $gte: new Date() }, status: { $in: ['upcoming', 'ongoing'] } };
    const data = await Event.find(filter).sort({ date: 1 }).skip(skip).limit(limit);
    const total = await Event.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async past(queryString = {}) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { $or: [{ date: { $lt: new Date() } }, { status: 'completed' }] };
    const data = await Event.find(filter).sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Event.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async featured(limit = 4) {
    return Event.find({ isFeatured: true, date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(limit);
  }

  async calendar(year, month) {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));
    return Event.find({ date: { $gte: start, $lt: end } }).sort({ date: 1 });
  }

  async liturgicalCalendar(year) {
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    return Event.find({ date: { $gte: start, $lte: end } })
      .sort({ date: 1 })
      .select('title titleAm date category status startTime endTime location isFeatured');
  }

  async summaryCounts() {
    const now = new Date();
    const [upcoming, completed] = await Promise.all([
      Event.countDocuments({ date: { $gte: now }, status: { $in: ['upcoming', 'ongoing'] } }),
      Event.countDocuments({ status: 'completed' }),
    ]);
    return { upcoming, completed };
  }

  async createRsvp(data) {
    return EventRsvp.create(data);
  }

  async findRsvp(filter) {
    return EventRsvp.findOne(filter);
  }

  async countRsvps(eventId) {
    return EventRsvp.countDocuments({ event: eventId, status: { $ne: 'cancelled' } });
  }

  async countRsvpsForEvents(ids) {
    const rows = await EventRsvp.aggregate([
      { $match: { event: { $in: ids }, status: { $ne: 'cancelled' } } },
      { $group: { _id: '$event', count: { $sum: 1 } } },
    ]);
    return new Map(rows.map((row) => [String(row._id), row.count]));
  }

  async findRsvps(filter, skip = 0, limit = 50) {
    return EventRsvp.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
  }
}

export default new EventRepository();
