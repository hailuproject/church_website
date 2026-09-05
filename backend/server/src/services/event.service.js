import Event from '../models/Event.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';
import { pickFields } from '../utils/pickFields.js';

const EVENT_FIELDS = [
  'title',
  'titleAm',
  'titleTi',
  'description',
  'descriptionAm',
  'descriptionTi',
  'date',
  'startTime',
  'endTime',
  'location',
  'category',
  'capacity',
  'isFeatured',
  'status',
];

class EventService {
  async list(queryString) {
    return paginateModel(Event, queryString, {
      searchableFields: ['title', 'titleAm', 'titleTi', 'description', 'descriptionAm', 'descriptionTi', 'location'],
      filterWhitelist: ['category', 'status', 'isFeatured', 'createdBy'],
      defaultSort: { date: 1 },
    });
  }

  async listPublic(queryString) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { status: { $ne: 'cancelled' } };
    const data = await Event.find(filter).sort({ date: 1 }).skip(skip).limit(limit);
    const total = await Event.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async getById(id) {
    const event = await Event.findById(id);
    if (!event) throw new AppError('Event not found', 404);
    return event;
  }

  async create(data, files = {}, actor, reqMeta) {
    const payload = { ...pickFields(data, EVENT_FIELDS), createdBy: actor._id };
    if (files.coverImage) {
      payload.coverImage = await uploadMedia(files.coverImage, {
        folder: CLOUDINARY_FOLDERS.EVENT_COVERS,
      });
    }

    const event = await Event.create(payload);

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'events',
      documentId: event._id,
      newData: { title: event.title, date: event.date, category: event.category },
      ...reqMeta,
    });

    return event;
  }

  async update(id, data, files = {}, actor, reqMeta) {
    const existing = await Event.findById(id);
    if (!existing) throw new AppError('Event not found', 404);

    const payload = pickFields(data, EVENT_FIELDS);
    if (files.coverImage) {
      const uploaded = await uploadMedia(files.coverImage, { folder: CLOUDINARY_FOLDERS.EVENT_COVERS });
      if (existing.coverImage?.publicId) await deleteMedia(existing.coverImage.publicId);
      payload.coverImage = uploaded;
    }

    const updated = await Event.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'events',
      documentId: id,
      oldData: { title: existing.title },
      newData: { title: updated.title },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await Event.findById(id);
    if (!existing) throw new AppError('Event not found', 404);

    if (existing.coverImage?.publicId) await deleteMedia(existing.coverImage.publicId);
    await Event.findByIdAndDelete(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'events',
      documentId: id,
      oldData: { title: existing.title },
      ...reqMeta,
    });

    return true;
  }

  async upcoming(queryString) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { date: { $gte: new Date() }, status: { $in: ['upcoming', 'ongoing'] } };
    const data = await Event.find(filter).sort({ date: 1 }).skip(skip).limit(limit);
    const total = await Event.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async past(queryString) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = {
      $or: [{ date: { $lt: new Date() } }, { status: 'completed' }],
      status: { $ne: 'cancelled' },
    };
    const data = await Event.find(filter).sort({ date: -1 }).skip(skip).limit(limit);
    const total = await Event.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async featured(limit = 4) {
    return Event.find({ isFeatured: true, date: { $gte: new Date() }, status: { $ne: 'cancelled' } })
      .sort({ date: 1 })
      .limit(limit);
  }

  async calendar(year, month) {
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = new Date(Date.UTC(year, month, 1));
    return Event.find({ date: { $gte: start, $lt: end }, status: { $ne: 'cancelled' } }).sort({ date: 1 });
  }

  async liturgicalCalendar(year) {
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    return Event.find({
      date: { $gte: start, $lte: end },
      status: { $ne: 'cancelled' },
    })
      .sort({ date: 1 })
      .select('title titleAm date category status startTime endTime location isFeatured');
  }

  async toggleFeatured(id, isFeatured, actor, reqMeta) {
    return this.update(id, { isFeatured }, {}, actor, reqMeta);
  }

  async changeStatus(id, status, actor, reqMeta) {
    return this.update(id, { status }, {}, actor, reqMeta);
  }
}

export default new EventService();
