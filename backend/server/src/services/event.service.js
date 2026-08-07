import eventRepository from '../repositories/event.repository.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class EventService {
  async list(queryString) {
    const result = await eventRepository.paginate(queryString);
    const ids = result.data.map((event) => event._id);
    const counts = await eventRepository.countRsvpsForEvents(ids);
    return {
      ...result,
      data: result.data.map((event) => ({
        ...(event.toObject ? event.toObject() : event),
        rsvpCount: counts.get(String(event._id)) || 0,
      })),
    };
  }

  async getById(id) {
    const event = await eventRepository.findById(id);
    const rsvpCount = await eventRepository.countRsvps(id);
    return { ...event.toObject(), registeredCount: rsvpCount };
  }

  async create(data, files = {}, actor, reqMeta) {
    const payload = { ...data, createdBy: actor._id };
    if (files.coverImage) {
      payload.coverImage = await uploadMedia(files.coverImage, {
        folder: CLOUDINARY_FOLDERS.EVENT_COVERS,
      });
    }

    const event = await eventRepository.create(payload);

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
    const existing = await eventRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Event not found', 404);

    const payload = { ...data };
    if (files.coverImage) {
      const uploaded = await uploadMedia(files.coverImage, { folder: CLOUDINARY_FOLDERS.EVENT_COVERS });
      if (existing.coverImage?.publicId) await deleteMedia(existing.coverImage.publicId);
      payload.coverImage = uploaded;
    }

    const updated = await eventRepository.findByIdAndUpdate(id, payload);

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
    const existing = await eventRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Event not found', 404);

    if (existing.coverImage?.publicId) await deleteMedia(existing.coverImage.publicId);
    await eventRepository.deleteById(id);

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

  async rsvp(eventId, data) {
    const event = await eventRepository.findByIdOrNull(eventId);
    if (!event) throw new AppError('Event not found', 404);

    if (event.capacity > 0) {
      const current = await eventRepository.countRsvps(eventId);
      if (current + 1 > event.capacity) throw new AppError('Event is fully booked', 400);
    }

    let rsvp = await eventRepository.findRsvp({ event: eventId, email: (data.email || '').toLowerCase() });
    if (rsvp) {
      rsvp.status = data.status || 'confirmed';
      rsvp.guests = data.guests || 0;
      await rsvp.save();
    } else {
      rsvp = await eventRepository.createRsvp({ event: eventId, ...data, email: (data.email || '').toLowerCase() });
    }

    return rsvp;
  }

  async getRsvps(eventId, queryString) {
    const page = Math.max(parseInt(queryString.page, 10) || 1, 1);
    const limit = Math.min(parseInt(queryString.limit, 10) || 50, 100);
    const skip = (page - 1) * limit;
    const filter = { event: eventId };
    if (queryString.status) filter.status = queryString.status;
    const [data, total] = await Promise.all([
      eventRepository.findRsvps(filter, skip, limit),
      eventRepository.countRsvps(eventId),
    ]);
    const totalPages = Math.ceil(total / limit) || 1;
    return {
      data,
      pagination: { page, limit, total, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 },
    };
  }

  async upcoming(queryString) {
    return eventRepository.upcoming(queryString);
  }

  async past(queryString) {
    return eventRepository.past(queryString);
  }

  async featured() {
    return eventRepository.featured();
  }

  async calendar(year, month) {
    return eventRepository.calendar(year, month);
  }

  async liturgicalCalendar(year) {
    return eventRepository.liturgicalCalendar(year);
  }

  async toggleFeatured(id, isFeatured, actor, reqMeta) {
    return this.update(id, { isFeatured }, {}, actor, reqMeta);
  }

  async changeStatus(id, status, actor, reqMeta) {
    return this.update(id, { status }, {}, actor, reqMeta);
  }
}

export default new EventService();
