import galleryRepository from '../repositories/gallery.repository.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class GalleryService {
  async list(queryString) {
    return galleryRepository.paginate(queryString);
  }

  async getById(id) {
    const album = await galleryRepository.findById(id);
    return {
      ...album.toObject(),
      imageCount: album.images.length,
      videoCount: album.videos.length,
    };
  }

  async create(data, files = {}, actor, reqMeta) {
    const payload = { ...data, createdBy: actor._id };
    if (files.coverImage) {
      payload.coverImage = await uploadMedia(files.coverImage, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES });
    }

    const album = await galleryRepository.create(payload);

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'gallery',
      documentId: album._id,
      newData: { albumName: album.albumName, category: album.category },
      ...reqMeta,
    });

    return album;
  }

  async update(id, data, files = {}, actor, reqMeta) {
    const existing = await galleryRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Album not found', 404);

    const payload = { ...data };
    if (files.coverImage) {
      const uploaded = await uploadMedia(files.coverImage, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES });
      if (existing.coverImage?.publicId) await deleteMedia(existing.coverImage.publicId);
      payload.coverImage = uploaded;
    }

    const updated = await galleryRepository.findByIdAndUpdate(id, payload);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'gallery',
      documentId: id,
      oldData: { albumName: existing.albumName },
      newData: { albumName: updated.albumName },
      ...reqMeta,
    });

    return updated;
  }

  async remove(id, actor, reqMeta) {
    const existing = await galleryRepository.findByIdOrNull(id);
    if (!existing) throw new AppError('Album not found', 404);

    const deletions = [];
    if (existing.coverImage?.publicId) deletions.push(deleteMedia(existing.coverImage.publicId));
    existing.images.forEach((img) => img.publicId && deletions.push(deleteMedia(img.publicId)));
    existing.videos.forEach((video) => video.publicId && deletions.push(deleteMedia(video.publicId, 'video')));
    await Promise.all(deletions);

    await galleryRepository.deleteById(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'gallery',
      documentId: id,
      oldData: { albumName: existing.albumName },
      ...reqMeta,
    });

    return true;
  }

  async addImage(albumId, file, actor, reqMeta) {
    const album = await galleryRepository.findByIdOrNull(albumId);
    if (!album) throw new AppError('Album not found', 404);

    const uploaded = await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES });
    await galleryRepository.addImage(albumId, uploaded);

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'gallery',
      documentId: albumId,
      newData: { image: uploaded.url },
      ...reqMeta,
    });

    return galleryRepository.findById(albumId);
  }

  async addVideo(albumId, file, actor, reqMeta) {
    const album = await galleryRepository.findByIdOrNull(albumId);
    if (!album) throw new AppError('Album not found', 404);

    const uploaded = await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.GALLERY_VIDEOS });
    await galleryRepository.addVideo(albumId, uploaded);

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'gallery',
      documentId: albumId,
      newData: { video: uploaded.url },
      ...reqMeta,
    });

    return galleryRepository.findById(albumId);
  }

  async addImages(albumId, files, actor, reqMeta) {
    if (!files || !files.length) throw new AppError('No images uploaded', 400);
    const album = await galleryRepository.findByIdOrNull(albumId);
    if (!album) throw new AppError('Album not found', 404);

    for (const file of files) {
      const uploaded = await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES });
      await galleryRepository.addImage(albumId, uploaded);
    }

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'gallery',
      documentId: albumId,
      newData: { addedImages: files.length },
      ...reqMeta,
    });

    return galleryRepository.findById(albumId);
  }

  async removeImage(albumId, mediaId, actor, reqMeta) {
    const album = await galleryRepository.findByIdOrNull(albumId);
    if (!album) throw new AppError('Album not found', 404);

    const target = album.images.find((img) => img._id.toString() === mediaId);
    if (target?.publicId) await deleteMedia(target.publicId);
    await galleryRepository.removeImage(albumId, mediaId);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'gallery',
      documentId: albumId,
      oldData: { removedImage: mediaId },
      ...reqMeta,
    });

    return galleryRepository.findById(albumId);
  }

  async removeVideo(albumId, mediaId, actor, reqMeta) {
    const album = await galleryRepository.findByIdOrNull(albumId);
    if (!album) throw new AppError('Album not found', 404);

    const target = album.videos.find((video) => video._id.toString() === mediaId);
    if (target?.publicId) await deleteMedia(target.publicId, 'video');
    await galleryRepository.removeVideo(albumId, mediaId);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'gallery',
      documentId: albumId,
      oldData: { removedVideo: mediaId },
      ...reqMeta,
    });

    return galleryRepository.findById(albumId);
  }
}

export default new GalleryService();
