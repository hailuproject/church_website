import Setting from '../models/Setting.js';
import BaseRepository from './base.repository.js';
import AppError from '../utils/AppError.js';

class SettingRepository extends BaseRepository {
  constructor() {
    super(Setting, {
      searchableFields: [],
      filterWhitelist: [],
      defaultSort: { createdAt: -1 },
    });
  }

  async getSingleton() {
    let setting = await Setting.findOne().sort({ createdAt: -1 });
    if (!setting) {
      setting = await Setting.create({});
    }
    return setting;
  }

  async updateSingleton(data) {
    let setting = await Setting.findOne().sort({ createdAt: -1 });
    if (!setting) {
      setting = await Setting.create(data);
    } else {
      setting.set(data);
      await setting.save();
    }
    return setting;
  }

  async getPublic() {
    const setting = await this.getSingleton();
    const obj = setting.toObject();
    delete obj.createdBy;
    delete obj.updatedBy;
    delete obj.__v;
    return obj;
  }

  async getChurch() {
    const setting = await this.getSingleton();
    return {
      churchName: setting.churchName,
      churchNameAm: setting.churchNameAm,
      tagline: setting.tagline,
      taglineAm: setting.taglineAm,
      address: setting.address,
      addressAm: setting.addressAm,
      phone: setting.phone,
      email: setting.email,
      socialLinks: setting.socialLinks,
      liveStreamURL: setting.liveStreamURL,
      heroImage: setting.heroImage,
      logo: setting.logo,
      footerText: setting.footerText,
      footerTextAm: setting.footerTextAm,
      languageSettings: setting.languageSettings,
      theme: setting.theme,
    };
  }
}

export default new SettingRepository();
