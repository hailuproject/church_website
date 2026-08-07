import settingRepository from '../repositories/setting.repository.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class SettingService {
  async getPublic() {
    return settingRepository.getPublic();
  }

  async getAdmin() {
    return settingRepository.getSingleton();
  }

  async update(data, files = {}, actor, reqMeta) {
    const current = await settingRepository.getSingleton();
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

    const updated = await settingRepository.updateSingleton(payload);

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
    const current = await settingRepository.getSingleton();
    const socialLinks = { ...current.socialLinks?.toObject?.(), ...data };
    const updated = await settingRepository.updateSingleton({ socialLinks, updatedBy: actor._id });

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

  async updateHomepageSettings(data, actor, reqMeta) {
    const current = await settingRepository.getSingleton();
    const updated = await settingRepository.updateSingleton({
      heroImage: data.heroImage !== undefined ? data.heroImage : current.heroImage,
      liveStreamURL: data.liveStreamURL !== undefined ? data.liveStreamURL : current.liveStreamURL,
      languageSettings: data.languageSettings !== undefined ? data.languageSettings : current.languageSettings,
      updatedBy: actor._id,
    });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'homepage_settings_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateFooter(data, actor, reqMeta) {
    const updated = await settingRepository.updateSingleton({
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

  async updateLanguageSettings(data, actor, reqMeta) {
    const current = await settingRepository.getSingleton();
    const languageSettings = { ...current.languageSettings?.toObject?.(), ...data };
    const updated = await settingRepository.updateSingleton({ languageSettings, updatedBy: actor._id });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'language_settings_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateLiveStream(data, actor, reqMeta) {
    const updated = await settingRepository.updateSingleton({
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

  async updateTheme(data, actor, reqMeta) {
    const current = await settingRepository.getSingleton();
    const theme = { ...current.theme?.toObject?.(), ...data };
    const updated = await settingRepository.updateSingleton({ theme, updatedBy: actor._id });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'settings',
      documentId: updated._id,
      newData: { event: 'theme_updated' },
      ...reqMeta,
    });

    return updated;
  }
}

export default new SettingService();
