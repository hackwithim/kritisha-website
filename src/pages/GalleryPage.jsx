import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Filter, X } from 'lucide-react';
import { getGallery, useCmsLiveStore } from '../lib/cmsStore';
import SEO from '../components/SEO';

export default function GalleryPage() {
  const gallery = useCmsLiveStore(getGallery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', ...new Set(gallery.map(item => item.category).filter(Boolean))];

  const filteredGallery = useMemo(() => {
    if (activeCategory === 'All') return gallery;
    return gallery.filter(item => item.category === activeCategory);
  }, [gallery, activeCategory]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24">
      <SEO 
        title="Project Gallery"
        description="Visual journey of Kritisha Infrastructure's national projects, highway management operations, and dedicated team."
      />
      {/* Hero Section */}
      <section className="px-4 sm:px-12 lg:px-16 max-w-[1920px] mx-auto mb-16">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5963D]/10 text-[#C5963D] text-sm font-sans-ui font-medium tracking-wide mb-6">
            <Camera className="w-4 h-4" />
            Media Gallery
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#0B2341] tracking-tight mb-6">
            Our <span className="italic text-[#C5963D]">Footprint</span> in Focus
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 font-sans-ui leading-relaxed max-w-2xl">
            Explore moments from our milestone projects, ground operations, and the team that drives our vision forward.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-12 lg:px-16 max-w-[1920px] mx-auto mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full no-scrollbar">
            <Filter className="w-5 h-5 text-slate-400 shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-sans-ui transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === category
                    ? 'bg-[#0B2341] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-slate-500 font-sans-ui text-sm shrink-0 hidden sm:block">
            Showing {filteredGallery.length} {filteredGallery.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 sm:px-12 lg:px-16 max-w-[1920px] mx-auto">
        {filteredGallery.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-2xl border border-slate-100">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#0B2341] mb-2">No images found</h3>
            <p className="text-slate-500 font-sans-ui">Check back later for updates in this category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredGallery.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="break-inside-avoid relative group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="rounded-2xl overflow-hidden bg-slate-200 shadow-sm border border-slate-200/50">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341]/90 via-[#0B2341]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-2xl">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.category && (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-[#C5963D] text-white text-[10px] font-sans-ui font-bold uppercase tracking-wider mb-2">
                            {item.category}
                          </span>
                        )}
                        <h3 className="text-white text-lg font-medium leading-tight">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-6xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-auto h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-center">
                {selectedImage.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C5963D] text-white text-xs font-sans-ui font-bold uppercase tracking-wider mb-3">
                    {selectedImage.category}
                  </span>
                )}
                <h3 className="text-white text-2xl font-medium">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
