import Sermon from '../models/Sermon.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

const isAudio = (file) => (file?.mimetype || '').startsWith('audio/');

class SermonService {
  async list(queryString) {
    return paginateModel(Sermon, queryString, {
      searchableFields: ['title', 'titleAm', 'description', 'descriptionAm', 'speaker'],
      filterWhitelist: ['category', 'language', 'isPublished', 'isFeatured', 'speaker'],
      defaultSort: { publishedAt: -1 },
    });
  }

  async listPublished(queryString) {
    const { page, limit, skip } = parsePagination(queryString);
    const filter = { isPublished: true };
    const data = await Sermon.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Sermon.countDocuments(filter);
    return { data, pagination: buildPaginationMeta({ total, page, limit }) };
  }

  async getById(id) {
    const sermon = await Sermon.findById(id);
    if (!sermon) throw new AppError('Sermon not found', 404);
    return sermon;
  }

  async create(data, files = {}, actor, reqMeta) {
    const payload = { ...data, createdBy: actor._id };

    if (files.thumbnail) {
      payload.thumbnail = await uploadMedia(files.thumbnail, {
        folder: CLOUDINARY_FOLDERS.SERMON_THUMBNAILS,
      });
    }
    if (files.audioUrl) {
      payload.audioUrl = await uploadMedia(files.audioUrl, {
        folder: CLOUDINARY_FOLDERS.SERMON_AUDIO,
      });
    }
    if (files.videoUrl) {
      payload.videoUrl = await uploadMedia(files.videoUrl, {
        folder: CLOUDINARY_FOLDERS.SERMON_VIDEO,
      });
    }

    if (payload.duration && isAudio(files.audioUrl)) {
      payload.duration = Number(payload.duration) || 0;
    }

    const sermon = await Sermon.create(payload);

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'sermons',
      documentId: sermon._id,
      newData: { title: sermon.title, category: sermon.category },
      ...reqMeta,
    });

    return sermon;
  }

  async update(id, data, files = {}, actor, reqMeta) {
    const existing = await Sermon.findById(id);
    if (!existing) throw new AppError('Sermon not found', 404);

    const payload = { ...data };

    if (files.thumbnail) {
      const uploaded = await uploadMedia(files.thumbnail, { folder: CLOUDINARY_FOLDERS.SERMON_THUMBNAILS });
      if (existing.thumbnail?.publicId) await deleteMedia(existing.thumbnail.publicId);
      payload.thumbnail = uploaded;
    }
    if (files.audioUrl) {
      const uploaded = await uploadMedia(files.audioUrl, { folder: CLOUDINARY_FOLDERS.SERMON_AUDIO });
      if (existing.audioUrl?.publicId) await deleteMedia(existing.audioUrl.publicId);
      payload.audioUrl = uploaded;
    }
    if (files.videoUrl) {
      const uploaded = await uploadMedia(files.videoUrl, { folder: CLOUDINARY_FOLDERS.SERMON_VIDEO });
      if (existing.videoUrl?.publicId) await deleteMedia(existing.videoUrl.publicId);
      payload.videoUrl = uploaded;
    }

    const updated = await Sermon.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'sermons',
      documentId: id,
      oldData: { title: existing.title },
      newData: { title: updated.title },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await Sermon.findById(id);
    if (!existing) throw new AppError('Sermon not found', 404);

    await Promise.all([
      existing.thumbnail?.publicId ? deleteMedia(existing.thumbnail.publicId) : null,
      existing.audioUrl?.publicId ? deleteMedia(existing.audioUrl.publicId, 'video') : null,
      existing.videoUrl?.publicId ? deleteMedia(existing.videoUrl.publicId, 'video') : null,
    ]);

    await Sermon.findByIdAndDelete(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'sermons',
      documentId: id,
      oldData: { title: existing.title },
      ...reqMeta,
    });

    return true;
  }

  async uploadAudio(id, file, actor, reqMeta) {
    return this.update(id, {}, { audioUrl: file }, actor, reqMeta);
  }

  async uploadVideo(id, file, actor, reqMeta) {
    return this.update(id, {}, { videoUrl: file }, actor, reqMeta);
  }

  async uploadThumbnail(id, file, actor, reqMeta) {
    return this.update(id, {}, { thumbnail: file }, actor, reqMeta);
  }

  async togglePublish(id, isPublished, actor, reqMeta) {
    return this.update(id, { isPublished }, {}, actor, reqMeta);
  }

  async toggleFeatured(id, isFeatured, actor, reqMeta) {
    return this.update(id, { isFeatured }, {}, actor, reqMeta);
  }

  async incrementDownload(id) {
    const sermon = await Sermon.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } }, { returnDocument: 'after' });
    if (!sermon) throw new AppError('Sermon not found', 404);
    return sermon;
  }

  async getFeatured() {
    return Sermon.find({ isPublished: true, isFeatured: true })
      .sort({ publishedAt: -1 })
      .limit(4);
  }

  async getRecent() {
    return Sermon.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(4);
  }

  async getCategories() {
    return Sermon.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }
}

export default new SermonService();
