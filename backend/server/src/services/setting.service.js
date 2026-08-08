import Setting from '../models/Setting.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

const getSingleton = async () => {
  let setting = await Setting.findOne().sort({ createdAt: -1 });
  if (!setting) {
    setting = await Setting.create({});
  }
  return setting;
};

const updateSingleton = async (data) => {
  let setting = await Setting.findOne().sort({ createdAt: -1 });
  if (!setting) {
    setting = await Setting.create(data);
  } else {
    setting.set(data);
    await setting.save();
  }
  return setting;
};

class SettingService {
  async getPublic() {
    const setting = await getSingleton();
    const obj = setting.toObject();
    delete obj.createdBy;
    delete obj.updatedBy;
    delete obj.__v;
    return obj;
  }

  async getAdmin() {
    return getSingleton();
  }

  async update(data, files = {}, actor, reqMeta) {
    const current = await getSingleton();
    const payload = { ...data };

    if (files.logo) {
      const uploaded = await uploadMedia(files.logo, { folder: CLOUDINARY_FOLDERS.LOGOS });
      if (current.logo?.publicId) await deleteMedia(current.logo.publicId);
      payload.logo = uploaded;
    }
    if (files.heroImage) {
      const uploaded = await uploadMedia(files.heroImage, { folder: CLOUDINARY_FOLDERS.HEROES });
      if (current.heroImage?.publicId) await deleteMedia(current.heroImage.publicId);
      payload.heroImage = uploaded;
    }
    if (files.favicon) {
      const uploaded = await uploadMedia(files.favicon, { folder: CLOUDINARY_FOLDERS.LOGOS });
      if (current.favicon?.publicId) await deleteMedia(current.favicon.publicId);
      payload.favicon = uploaded;
    }

    payload.updatedBy = actor._id;

    const updated = await updateSingleton(payload);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'settings_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateSocialLinks(data, actor, reqMeta) {
    const current = await getSingleton();
    const socialLinks = { ...current.socialLinks?.toObject?.(), ...data };
    const updated = await updateSingleton({ socialLinks, updatedBy: actor._id });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'social_links_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateFooter(data, actor, reqMeta) {
    const updated = await updateSingleton({
      footerText: data.footerText,
      footerTextAm: data.footerTextAm,
      updatedBy: actor._id,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'footer_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateLiveStream(data, actor, reqMeta) {
    const updated = await updateSingleton({
      liveStreamURL: data.liveStreamURL,
      updatedBy: actor._id,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'live_stream_updated' },
      ...reqMeta,
    });

    return updated;
  }
}

export default new SettingService();
