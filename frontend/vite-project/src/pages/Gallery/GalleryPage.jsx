import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../../components/Container';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import HeroBanner from './HeroBanner';
import FeaturedGallery from './FeaturedGallery';
import GalleryCategoryCard from './GalleryCategoryCard';
import AlbumCard from './AlbumCard';
import MasonryGallery from './MasonryGallery';
import VideoCard from './VideoCard';
import TimelineSection from './TimelineSection';
import SacredMomentCard from './SacredMomentCard';
import CommunityCard from './CommunityCard';
import StatisticsSection from './StatisticsSection';
import ShareSection from './ShareSection';
import CTASection from './CTASection';
import {
  galleryCategories,
  sacredMoments,
  communityHighlights,
} from '../../data/galleryData';
import {
  useAlbums,
  useVideoItems,
} from '../../hooks/useGallerySections';
import { useSeo } from '../../hooks/useSeo';
import { useTranslation } from '../../i18n/LanguageContext';

function GalleryCategories() {
  const { t } = useTranslation();
  const albums = useAlbums();
  if (!albums.length) return null;
  return (
    <Section id="categories" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.gallery.browseByCategory')}
          title={t('pages.gallery.galleryCategories')}
          description={t('pages.gallery.categoriesDescription')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryCategories.map((category, i) => (
            <GalleryCategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FeaturedAlbums() {
  const { t } = useTranslation();
  const albums = useAlbums();
  return (
    <Section id="albums" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.gallery.curatedCollections')}
          title={t('pages.gallery.featuredAlbums')}
          description={t('pages.gallery.albumsDescription')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, i) => (
            <AlbumCard key={album.id} album={album} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function VideoGallery() {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videos = useVideoItems();

  const handlePlay = (video) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  if (!videos.length) return null;

  return (
    <Section id="videos" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.gallery.watchExperience')}
          title={t('pages.gallery.videoGallery')}
          description={t('pages.gallery.videoDescription')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} onPlay={handlePlay} />
          ))}
        </div>

        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Escape') handleClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={t('pages.gallery.playingVideo', { title: selectedVideo.title })}
            tabIndex={-1}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-xs overflow-hidden shadow-2xl">
                <div className="aspect-video bg-stone-900 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">{selectedVideo.title}</p>
                    <p className="text-sm mt-1">{selectedVideo.event}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-text">{selectedVideo.title}</h3>
                    <p className="text-sm text-muted">{selectedVideo.event} &middot; {selectedVideo.date}</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-muted hover:text-text transition-colors duration-300 cursor-pointer"
                    aria-label={t('pages.gallery.closeVideo')}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </Section>
  );
}

function SacredMoments() {
  const { t } = useTranslation();
  return (
    <Section id="sacred-moments" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle={t('pages.gallery.holyTraditions')}
          title={t('pages.home.sacredMoments')}
          description={t('pages.gallery.sacredMomentsDescription')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sacredMoments.map((moment, i) => (
            <SacredMomentCard key={moment.id} moment={moment} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CommunityHighlights() {
  const { t } = useTranslation();
  if (!communityHighlights.length) return null;
  return (
    <Section id="community" className="bg-white">
      <Container>
        <SectionHeader
          subtitle={t('pages.gallery.ourPeople')}
          title={t('pages.gallery.communityHighlights')}
          description={t('pages.gallery.communityDescription')}
        />
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {communityHighlights.map((item, i) => (
            <CommunityCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function GalleryPage() {
  const { t } = useTranslation();
  useSeo({ title: t('pages.gallery.title') });
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <FeaturedGallery />
      <GalleryCategories />
      <FeaturedAlbums />
      <MasonryGallery />
      <VideoGallery />
      <TimelineSection />
      <SacredMoments />
      <CommunityHighlights />
      <StatisticsSection />
      <ShareSection />
      <CTASection />
    </main>
  );
}
