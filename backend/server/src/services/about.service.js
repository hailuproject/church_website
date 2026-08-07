import aboutRepository from '../repositories/about.repository.js';
import leadershipRepository from '../repositories/leadership.repository.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class AboutService {
  async getPublic() {
    const [about, leadership] = await Promise.all([
      aboutRepository.getSingleton(),
      leadershipRepository.find({ isActive: true }),
    ]);
    return {
      history: about.history,
      faith: about.faith,
      timeline: about.timeline,
      serviceHours: about.serviceHours,
      location: about.location,
      leadership,
    };
  }

  async getAdmin() {
    return aboutRepository.getSingleton();
  }

  async update(data, files = {}, actor, reqMeta) {
    const current = await aboutRepository.getSingleton();
    const payload = { ...data };

    if (files.historyImage) {
      const uploaded = await uploadMedia(files.historyImage, { folder: CLOUDINARY_FOLDERS.ABOUT });
      const images = current.history?.images ? [...current.history.images] : [];
      images.push(uploaded);
      payload.history = { ...current.history?.toObject?.(), images };
    }

    const updated = await aboutRepository.updateSingleton(payload);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'about',
      documentId: updated._id,
      newData: { event: 'about_content_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateHistory(data, files = {}, actor, reqMeta) {
    const current = await aboutRepository.getSingleton();
    const history = current.history?.toObject ? current.history.toObject() : {};
    const images = [...(history.images || [])];

    if (files.image) {
      const uploaded = await uploadMedia(files.image, { folder: CLOUDINARY_FOLDERS.ABOUT });
      images.push(uploaded);
    }

    const updated = await aboutRepository.updateSingleton({
      history: {
        title: data.title ?? history.title,
        titleAm: data.titleAm ?? history.titleAm,
        content: data.content ?? history.content,
        contentAm: data.contentAm ?? history.contentAm,
        images,
      },
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'about',
      documentId: updated._id,
      newData: { event: 'history_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async addTimelineEntry(data, actor, reqMeta) {
    const current = await aboutRepository.getSingleton();
    const timeline = current.timeline ? [...current.timeline] : [];
    timeline.push({
      year: data.year || '',
      title: data.title || '',
      titleAm: data.titleAm || '',
      description: data.description || '',
      descriptionAm: data.descriptionAm || '',
    });
    const updated = await aboutRepository.updateSingleton({ timeline });

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'about',
      documentId: updated._id,
      newData: { event: 'timeline_entry_added', year: data.year },
      ...reqMeta,
    });

    return updated;
  }

  async removeTimelineEntry(index, actor, reqMeta) {
    const current = await aboutRepository.getSingleton();
    const timeline = [...(current.timeline || [])];
    if (index < 0 || index >= timeline.length) throw new AppError('Invalid timeline index', 400);
    if (timeline[index]?.image?.publicId) await deleteMedia(timeline[index].image.publicId);
    timeline.splice(index, 1);
    const updated = await aboutRepository.updateSingleton({ timeline });

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'about',
      documentId: updated._id,
      oldData: { event: 'timeline_entry_removed', index },
      ...reqMeta,
    });

    return updated;
  }
}

export default new AboutService();
