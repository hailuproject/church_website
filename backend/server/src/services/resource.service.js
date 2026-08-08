import Resource from '../models/Resource.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class ResourceService {
  async list(queryString) {
    return paginateModel(Resource, queryString, {
      searchableFields: ['title', 'titleAm', 'description', 'descriptionAm'],
      filterWhitelist: ['category', 'language', 'isPublished', 'createdBy'],
      defaultSort: { createdAt: -1 },
    });
  }

  async getById(id) {
    const resource = await Resource.findById(id);
    if (!resource) throw new AppError('Resource not found', 404);
    return resource;
  }

  async create(data, files = {}, actor, reqMeta) {
    const payload = { ...data, createdBy: actor._id };
    if (files.thumbnail) {
      payload.thumbnail = await uploadMedia(files.thumbnail, { folder: CLOUDINARY_FOLDERS.RESOURCE_THUMBNAILS });
    }
    if (files.file) {
      payload.file = await uploadMedia(files.file, { folder: CLOUDINARY_FOLDERS.RESOURCE_FILES });
    }

    const resource = await Resource.create(payload);

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'resources',
      documentId: resource._id,
      newData: { title: resource.title, category: resource.category },
      ...reqMeta,
    });

    return resource;
  }

  async update(id, data, files = {}, actor, reqMeta) {
    const existing = await Resource.findById(id);
    if (!existing) throw new AppError('Resource not found', 404);

    const payload = { ...data };
    if (files.thumbnail) {
      const uploaded = await uploadMedia(files.thumbnail, { folder: CLOUDINARY_FOLDERS.RESOURCE_THUMBNAILS });
      if (existing.thumbnail?.publicId) await deleteMedia(existing.thumbnail.publicId);
      payload.thumbnail = uploaded;
    }
    if (files.file) {
      const uploaded = await uploadMedia(files.file, { folder: CLOUDINARY_FOLDERS.RESOURCE_FILES });
      if (existing.file?.publicId) await deleteMedia(existing.file.publicId);
      payload.file = uploaded;
    }

    const updated = await Resource.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'resources',
      documentId: id,
      oldData: { title: existing.title },
      newData: { title: updated.title },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await Resource.findById(id);
    if (!existing) throw new AppError('Resource not found', 404);

    await Promise.all([
      existing.thumbnail?.publicId ? deleteMedia(existing.thumbnail.publicId) : null,
      existing.file?.publicId ? deleteMedia(existing.file.publicId, 'raw') : null,
    ]);

    await Resource.findByIdAndDelete(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'resources',
      documentId: id,
      oldData: { title: existing.title },
      ...reqMeta,
    });

    return true;
  }

  async incrementDownload(id) {
    const resource = await Resource.findByIdAndUpdate(id, { $inc: { downloads: 1 } }, { returnDocument: 'after' });
    if (!resource) throw new AppError('Resource not found', 404);
    return resource;
  }

  async getCategories() {
    return Resource.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async uploadPdf(id, file, actor, reqMeta) {
    return this.update(id, {}, { file }, actor, reqMeta);
  }

  async uploadThumbnail(id, file, actor, reqMeta) {
    return this.update(id, {}, { thumbnail: file }, actor, reqMeta);
  }
}

export default new ResourceService();
