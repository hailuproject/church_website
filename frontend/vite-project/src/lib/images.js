export const SITE_IMAGES = {
  hero: '/images/hero.webp',
  heroJpg: '/images/hero.jpg',
};

export const HERO_IMAGE = SITE_IMAGES.hero;
export const HERO_IMAGE_FALLBACK = SITE_IMAGES.heroJpg;
export const IMAGE_FALLBACK = SITE_IMAGES.heroJpg;
export const withFallback = (src) => (src && typeof src === 'string' && src.trim() ? src : IMAGE_FALLBACK);
