import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS, MEDIA_TYPES } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class MediaService {
  async upload(file, { folder }, actor, reqMeta) {
    if (!file) throw new AppError('No file uploaded', 400);

    const resolvedFolder = folder && Object.values(CLOUDINARY_FOLDERS).includes(folder)
      ? folder
      : CLOUDINARY_FOLDERS.CONTENT;
    const mediaType = file.mimetype.startsWith('image/')
      ? MEDIA_TYPES.IMAGE
      : file.mimetype.startsWith('video/')
        ? MEDIA_TYPES.VIDEO
        : MEDIA_TYPES.OTHER;
    const resourceType = mediaType === MEDIA_TYPES.IMAGE || mediaType === MEDIA_TYPES.VIDEO ? mediaType : 'raw';

    const asset = await uploadMedia(file, { folder: resolvedFolder, resourceType });

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'media',
      newData: { fileName: file.originalname, mediaType, url: asset.url },
      ...reqMeta,
    });

    return {
      fileName: file.originalname,
      mediaType,
      mimeType: file.mimetype,
      folder: resolvedFolder,
      asset,
    };
  }

  async remove(publicId, resourceType, actor, reqMeta) {
    if (!publicId) throw new AppError('publicId is required', 400);
    await deleteMedia(publicId, resourceType || 'image');

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'media',
      newData: { publicId, resourceType: resourceType || 'image' },
      ...reqMeta,
    });

    return true;
  }
}

export default new MediaService();
