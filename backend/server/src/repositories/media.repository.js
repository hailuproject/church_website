import Media from '../models/Media.js';
import BaseRepository from './base.repository.js';

class MediaRepository extends BaseRepository {
  constructor() {
    super(Media, {
      searchableFields: ['originalName', 'fileName'],
      filterWhitelist: ['mediaType', 'folder', 'uploadedBy'],
      defaultSort: { createdAt: -1 },
    });
  }
}

export default new MediaRepository();
