import GalleryAlbum from '../models/GalleryAlbum.js';
import AppError from '../utils/AppError.js';
import { paginateModel } from '../utils/paginateModel.js';

class GalleryService {
  async list(queryString) {
    return paginateModel(GalleryAlbum, queryString, {
      searchableFields: ['albumName', 'albumNameAm', 'description', 'descriptionAm'],
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
}

export default new GalleryService();
