import GalleryAlbum from '../models/GalleryAlbum.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';
import mongoose from 'mongoose';

class GalleryService {
  async list(queryString) {
    return paginateModel(GalleryAlbum, queryString, {
      searchableFields: ['albumName', 'albumNameAm', 'albumNameTi', 'description', 'descriptionAm', 'descriptionTi'],
      filterWhitelist: ['category', 'createdBy'],
      defaultSort: { createdAt: -1 },
    });
  }

  async getById(id) {
    const album = await GalleryAlbum.findById(id);
    if (!album) throw new AppError('Album not found', 404);
    return {
      ...album.toObject(),
      imageCount: album.images.length,
      videoCount: album.videos.length,
    };
  }

  async create(data, coverFile, actor, reqMeta) {
    const coverImage = coverFile
      ? await uploadMedia(coverFile, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES })
      : {};

    const album = await GalleryAlbum.create({
      albumName: data.albumName,
      albumNameAm: data.albumNameAm || '',
      albumNameTi: data.albumNameTi || '',
      description: data.description || '',
      descriptionAm: data.descriptionAm || '',
      descriptionTi: data.descriptionTi || '',
      category: data.category || 'Liturgy',
      coverImage,
      createdBy: actor._id,
    });

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'gallery',
      documentId: album._id,
      newData: { albumName: album.albumName, category: album.category, coverImage: album.coverImage?.url || '' },
      ...reqMeta,
    });

    return this.getById(album._id);
  }

  async update(id, data, coverFile, removeCover, actor, reqMeta) {
    const album = await GalleryAlbum.findById(id);
    if (!album) throw new AppError('Album not found', 404);

    const oldData = { ...album.toObject() };

    if (data.albumName !== undefined) album.albumName = data.albumName;
    if (data.albumNameAm !== undefined) album.albumNameAm = data.albumNameAm;
    if (data.albumNameTi !== undefined) album.albumNameTi = data.albumNameTi;
    if (data.description !== undefined) album.description = data.description;
    if (data.descriptionAm !== undefined) album.descriptionAm = data.descriptionAm;
    if (data.descriptionTi !== undefined) album.descriptionTi = data.descriptionTi;
    if (data.category !== undefined) album.category = data.category;

    if (coverFile) {
      const uploaded = await uploadMedia(coverFile, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES });
      if (album.coverImage?.publicId) await deleteMedia(album.coverImage.publicId);
      album.coverImage = uploaded;
    } else if (removeCover) {
      if (album.coverImage?.publicId) await deleteMedia(album.coverImage.publicId);
      album.coverImage = {};
    }

    await album.save();

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'gallery',
      documentId: id,
      oldData: { albumName: oldData.albumName, category: oldData.category, coverImage: oldData.coverImage?.url || '' },
      newData: { albumName: album.albumName, category: album.category, coverImage: album.coverImage?.url || '' },
      ...reqMeta,
    });

    return this.getById(id);
  }

  async addImages(id, files, actor, reqMeta) {
    const album = await GalleryAlbum.findById(id);
    if (!album) throw new AppError('Album not found', 404);
    if (!files || !files.length) throw new AppError('At least one image is required', 400);

    const uploaded = [];
    for (const file of files) {
      uploaded.push(await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.GALLERY_IMAGES }));
    }
    album.images.push(...uploaded);
    await album.save();

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'gallery',
      documentId: id,
      oldData: { imageCount: album.images.length - uploaded.length },
      newData: { imageCount: album.images.length },
      ...reqMeta,
    });

    return this.getById(id);
  }

  async addVideos(id, files, actor, reqMeta) {
    const album = await GalleryAlbum.findById(id);
    if (!album) throw new AppError('Album not found', 404);
    if (!files || !files.length) throw new AppError('At least one video is required', 400);

    const uploaded = [];
    for (const file of files) {
      uploaded.push(await uploadMedia(file, { folder: CLOUDINARY_FOLDERS.GALLERY_VIDEOS }));
    }
    album.videos.push(...uploaded);
    await album.save();

    await createAuditLog({
      admin: actor,
      action: 'upload',
      module: 'gallery',
      documentId: id,
      oldData: { videoCount: album.videos.length - uploaded.length },
      newData: { videoCount: album.videos.length },
      ...reqMeta,
    });

    return this.getById(id);
  }

  async removeMedia(id, mediaId, actor, reqMeta) {
    if (!mongoose.Types.ObjectId.isValid(mediaId)) throw new AppError('Invalid media id', 400);

    const album = await GalleryAlbum.findById(id);
    if (!album) throw new AppError('Album not found', 404);

    const mediaIndex = album.images.findIndex((m) => m._id.toString() === mediaId);
    const isImage = mediaIndex !== -1;
    const collection = isImage ? album.images : album.videos;
    const index = isImage ? mediaIndex : album.videos.findIndex((m) => m._id.toString() === mediaId);
    if (index === -1) throw new AppError('Media item not found in album', 404);

    const [removed] = collection.splice(index, 1);
    await album.save();

    if (removed?.publicId) {
      await deleteMedia(removed.publicId, removed.resourceType || (isImage ? 'image' : 'video'));
    }
    if (isImage && album.coverImage?.publicId === removed?.publicId) {
      album.coverImage = {};
      await album.save();
    }

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'gallery',
      documentId: id,
      newData: { removedMediaId: mediaId, type: isImage ? 'image' : 'video' },
      ...reqMeta,
    });

    return this.getById(id);
  }

  async remove(id, actor, reqMeta) {
    const album = await GalleryAlbum.findById(id);
    if (!album) throw new AppError('Album not found', 404);

    const oldData = {
      albumName: album.albumName,
      imageCount: album.images.length,
      videoCount: album.videos.length,
    };

    const cleanups = [];
    if (album.coverImage?.publicId) cleanups.push(deleteMedia(album.coverImage.publicId));
    for (const media of [...album.images, ...album.videos]) {
      if (media.publicId) cleanups.push(deleteMedia(media.publicId, media.resourceType));
    }
    await Promise.all(cleanups);
    await GalleryAlbum.findByIdAndDelete(id);

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'gallery',
      documentId: id,
      oldData,
      ...reqMeta,
    });

    return { id };
  }
}

export default new GalleryService();