import homeRepository from '../repositories/home.repository.js';
import announcementRepository from '../repositories/announcement.repository.js';
import eventRepository from '../repositories/event.repository.js';
import sermonRepository from '../repositories/sermon.repository.js';
import settingRepository from '../repositories/setting.repository.js';
import AppError from '../utils/AppError.js';
import { uploadMedia, deleteMedia } from '../utils/media.js';
import { CLOUDINARY_FOLDERS } from '../constants/index.js';
import { createAuditLog } from '../helpers/auditLogger.js';

class HomeService {
  async getPublic() {
    const [home, announcements, events, sermons, church] = await Promise.all([
      homeRepository.getSingleton(),
      announcementRepository.findActive(),
      eventRepository.featured(4),
      sermonRepository.recent(4),
      settingRepository.getChurch(),
    ]);

    return {
      hero: home.hero,
      welcome: home.welcome,
      priestWelcome: home.priestWelcome,
      quickLinks: home.quickLinks,
      announcementSectionTitle: home.announcementSectionTitle,
      announcementSectionTitleAm: home.announcementSectionTitleAm,
      showLiveStream: home.showLiveStream,
      showAnnouncements: home.showAnnouncements,
      showUpcomingEvents: home.showUpcomingEvents,
      showRecentSermons: home.showRecentSermons,
      liveStreamURL: church.liveStreamURL,
      announcements,
      upcomingEvents: events,
      recentSermons: sermons,
      church: {
        name: church.churchName,
        nameAm: church.churchNameAm,
        tagline: church.tagline,
        taglineAm: church.taglineAm,
        address: church.address,
        phone: church.phone,
        email: church.email,
        socialLinks: church.socialLinks,
        logo: church.logo,
      },
    };
  }

  async getAdmin() {
    return homeRepository.getSingleton();
  }

  async update(data, files = {}, actor, reqMeta) {
    const current = await homeRepository.getSingleton();
    const payload = { ...data };
    const toObject = (value) => (value?.toObject ? value.toObject() : value);

    if (files.heroImage) {
      const uploaded = await uploadMedia(files.heroImage, { folder: CLOUDINARY_FOLDERS.HOME });
      const hero = toObject(current.hero) || { slides: [] };
      const slides = [...(hero.slides || [])];
      if (slides[0]?.image?.publicId) await deleteMedia(slides[0].image.publicId);
      const first = slides[0] || {};
      slides[0] = { ...first, image: uploaded };
      payload.hero = { ...hero, slides };
    }

    if (files.welcomeImage) {
      const uploaded = await uploadMedia(files.welcomeImage, { folder: CLOUDINARY_FOLDERS.HOME });
      const welcome = toObject(current.welcome) || {};
      if (welcome.image?.publicId) await deleteMedia(welcome.image.publicId);
      payload.welcome = { ...(payload.welcome || {}), image: uploaded };
    }

    if (files.priestImage) {
      const uploaded = await uploadMedia(files.priestImage, { folder: CLOUDINARY_FOLDERS.HOME });
      const priest = toObject(current.priestWelcome) || {};
      if (priest.priestImage?.publicId) await deleteMedia(priest.priestImage.publicId);
      payload.priestWelcome = { ...(payload.priestWelcome || {}), priestImage: uploaded };
    }

    const updated = await homeRepository.updateSingleton(payload);

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'home',
      documentId: updated._id,
      newData: { event: 'home_content_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async updateHero(data, files = {}, actor, reqMeta) {
    const current = await homeRepository.getSingleton();
    const hero = current.hero?.toObject ? current.hero.toObject() : { slides: [] };
    const slides = [...(hero.slides || [])];

    const index = data.index === undefined || data.index === null || data.index === '' ? -1 : parseInt(data.index, 10);

    if (files.image) {
      const uploaded = await uploadMedia(files.image, { folder: CLOUDINARY_FOLDERS.HOME });
      if (index >= 0 && slides[index]?.image?.publicId) {
        await deleteMedia(slides[index].image.publicId);
      }
      const slide = {
        title: data.title || slides[index]?.title || '',
        titleAm: data.titleAm || slides[index]?.titleAm || '',
        subtitle: data.subtitle || slides[index]?.subtitle || '',
        subtitleAm: data.subtitleAm || slides[index]?.subtitleAm || '',
        ctaText: data.ctaText || slides[index]?.ctaText || '',
        ctaLink: data.ctaLink || slides[index]?.ctaLink || '',
        image: uploaded,
        isActive: true,
      };
      if (index >= 0) slides[index] = slide;
      else slides.push(slide);
    } else if (index >= 0) {
      Object.assign(slides[index], {
        title: data.title ?? slides[index].title,
        titleAm: data.titleAm ?? slides[index].titleAm,
        subtitle: data.subtitle ?? slides[index].subtitle,
        subtitleAm: data.subtitleAm ?? slides[index].subtitleAm,
        ctaText: data.ctaText ?? slides[index].ctaText,
        ctaLink: data.ctaLink ?? slides[index].ctaLink,
        isActive: data.isActive ?? slides[index].isActive,
      });
    }

    const updated = await homeRepository.updateSingleton({ hero: { ...hero, slides } });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'home',
      documentId: updated._id,
      newData: { event: 'hero_updated' },
      ...reqMeta,
    });

    return updated;
  }

  async deleteHeroSlide(index, actor, reqMeta) {
    const current = await homeRepository.getSingleton();
    const hero = current.hero?.toObject ? current.hero.toObject() : { slides: [] };
    const slides = [...(hero.slides || [])];
    if (index < 0 || index >= slides.length) throw new AppError('Invalid slide index', 400);

    if (slides[index]?.image?.publicId) await deleteMedia(slides[index].image.publicId);
    slides.splice(index, 1);

    const updated = await homeRepository.updateSingleton({ hero: { ...hero, slides } });

    await createAuditLog({
      admin: actor,
      action: 'update',
      module: 'home',
      documentId: updated._id,
      oldData: { event: 'hero_slide_removed', index },
      ...reqMeta,
    });

    return updated;
  }

  async addQuickLink(data, actor, reqMeta) {
    const current = await homeRepository.getSingleton();
    const quickLinks = current.quickLinks ? [...current.quickLinks] : [];
    quickLinks.push({
      label: data.label,
      labelAm: data.labelAm || '',
      url: data.url,
      icon: data.icon || '',
      order: data.order || quickLinks.length,
    });
    const updated = await homeRepository.updateSingleton({ quickLinks });

    await createAuditLog({
      admin: actor,
      action: 'create',
      module: 'home',
      documentId: updated._id,
      newData: { event: 'quick_link_added', label: data.label },
      ...reqMeta,
    });

    return updated;
  }

  async removeQuickLink(index, actor, reqMeta) {
    const current = await homeRepository.getSingleton();
    const quickLinks = [...(current.quickLinks || [])];
    if (index < 0 || index >= quickLinks.length) throw new AppError('Invalid quick link index', 400);
    quickLinks.splice(index, 1);
    const updated = await homeRepository.updateSingleton({ quickLinks });

    await createAuditLog({
      admin: actor,
      action: 'delete',
      module: 'home',
      documentId: updated._id,
      oldData: { event: 'quick_link_removed', index },
      ...reqMeta,
    });

    return updated;
  }
}

export default new HomeService();
