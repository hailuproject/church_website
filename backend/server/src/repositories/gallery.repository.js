import GalleryAlbum from '../models/GalleryAlbum.js';
import BaseRepository from './base.repository.js';

class GalleryRepository extends BaseRepository {
  constructor() {
    super(GalleryAlbum, {
      searchableFields: ['albumName', 'albumNameAm', 'description', 'descriptionAm'],
      filterWhitelist: ['category', 'createdBy'],
      defaultSort: { createdAt: -1 },
    });
  }

  async addImage(albumId, mediaObject) {
    return GalleryAlbum.findByIdAndUpdate(
      albumId,
      { $push: { images: mediaObject } },
      { returnDocument: 'after', runValidators: true }
    );
  }

  async addVideo(albumId, mediaObject) {
    return GalleryAlbum.findByIdAndUpdate(
      albumId,
      { $push: { videos: mediaObject } },
      { returnDocument: 'after', runValidators: true }
    );
  }

  async removeImage(albumId, mediaId) {
    return GalleryAlbum.findByIdAndUpdate(
      albumId,
      { $pull: { images: { _id: mediaId } } },
      { returnDocument: 'after' }
    );
  }

  async removeVideo(albumId, mediaId) {
    return GalleryAlbum.findByIdAndUpdate(
      albumId,
      { $pull: { videos: { _id: mediaId } } },
      { returnDocument: 'after' }
    );
  }

  async summaryCounts() {
    const albums = await GalleryAlbum.countDocuments({});
    const aggregates = await GalleryAlbum.aggregate([
      {
        $project: {
          imageCount: { $size: { $ifNull: ['$images', []] } },
          videoCount: { $size: { $ifNull: ['$videos', []] } },
        },
      },
      { $group: { _id: null, images: { $sum: '$imageCount' }, videos: { $sum: '$videoCount' } } },
    ]);
    const totals = aggregates[0] || { images: 0, videos: 0 };
    return { albums, images: totals.images, videos: totals.videos };
  }
}

export default new GalleryRepository();
