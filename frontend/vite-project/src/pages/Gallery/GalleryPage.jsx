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
  albums,
  videos,
  sacredMoments,
  communityHighlights,
} from '../../data/galleryData';

function GalleryCategories() {
  return (
    <Section id="categories" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Browse By Category"
          title="Gallery Categories"
          description="Explore our photographs organized by theme, event, and ministry."
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
  return (
    <Section id="albums" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Curated Collections"
          title="Featured Albums"
          description="Explore our curated photo albums from the most significant events and celebrations."
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
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlay = (video) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  return (
    <Section id="videos" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Watch & Experience"
          title="Video Gallery"
          description="Watch highlights from our worship services, feast celebrations, and community events."
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
            aria-label={`Playing ${selectedVideo.title}`}
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
                    <p className="text-xs mt-2 text-white/40">
                      Video player placeholder — embed your YouTube/Vimeo URL here
                    </p>
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
                    aria-label="Close video"
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
  return (
    <Section id="sacred-moments" className="bg-surface">
      <Container>
        <SectionHeader
          subtitle="Holy Traditions"
          title="Sacred Moments"
          description="The blessed sacraments and sacred moments that define the spiritual life of our church."
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
  return (
    <Section id="community" className="bg-white">
      <Container>
        <SectionHeader
          subtitle="Our People"
          title="Community Highlights"
          description="The ministries, programs, and service initiatives that make our church community thrive."
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
