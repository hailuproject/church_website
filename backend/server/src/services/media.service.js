import mediaRepository from '../repositories/media.repository.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { MEDIA_TYPES, CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

const mimeToMediaType = (mimeType) => {
  if (mimeType.startsWith('image/')) return MEDIA_TYPES.IMAGE;
  if (mimeType.startsWith('video/')) return MEDIA_TYPES.VIDEO;
  if (mimeType.startsWith('audio/')) return MEDIA_TYPES.AUDIO;
  if (mimeType === 'application/pdf') return MEDIA_TYPES.PDF;
  return MEDIA_TYPES.OTHER;
};

class MediaService {
  async list(queryString) {
    return mediaRepository.paginate(queryString);
  }

  async getById(id) {
    return mediaRepository.findById(id);
  }

  async upload(file, { folder, usage, tags }, actor, reqMeta) {
    if (!file) throw new AppError('No file uploaded', 400);

    const resolvedFolder = folder && Object.values(CLOUDINARY_FOLDERS).includes(folder) ? folder : CLOUDINARY_FOLDERS.MISC;
    const mediaType = mimeToMediaType(file.mimetype);
    const resourceType = mediaType === MEDIA_TYPES.IMAGE || mediaType === MEDIA_TYPES.VIDEO ? mediaType : 'raw';

    const asset = await uploadMedia(file, { folder: resolvedFolder, resourceType });

    const media = await mediaRepository.create({
      originalName: file.originalname,
      fileName: file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_'),
      mediaType,
      mimeType: file.mimetype,
      asset,
      folder: resolvedFolder,
      tags: tags || [],
      uploadedBy: actor._id,
      usage: usage || '',
    });

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'media',
      documentId: media._id,
      newData: { fileName: media.originalName, mediaType, url: asset.url },
      ...reqMeta,
    });

    return media;
  }

  async uploadMultiple(files, { folder, usage }, actor, reqMeta) {
    if (!files || !files.length) throw new AppError('No files uploaded', 400);
    const results = [];
    for (const file of files) {
      results.push(await this.upload(file, { folder, usage }, actor, reqMeta));
    }
    return results;
  }

  async remove(id, actor, reqMeta) {
    const media = await mediaRepository.findByIdOrNull(id);
    if (!media) throw new AppError('Media not found', 404);

    if (media.asset?.publicId) {
      await deleteMedia(media.asset.publicId, media.asset.resourceType);
    }
    await mediaRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'media',
      documentId: id,
      oldData: { fileName: media.originalName },
      ...reqMeta,
    });

    return true;
  }

  async updateMetadata(id, data, actor, reqMeta) {
    const media = await mediaRepository.findByIdOrNull(id);
    if (!media) throw new AppError('Media not found', 404);

    const update = {};
    if (data.tags) update.tags = data.tags;
    if (data.usage) update.usage = data.usage;
    if (data.folder && Object.values(CLOUDINARY_FOLDERS).includes(data.folder)) update.folder = data.folder;

    const updated = await mediaRepository.findByIdAndUpdate(id, update);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'media',
      documentId: id,
      newData: update,
      ...reqMeta,
    });

    return updated;
  }
}

export default new MediaService();
