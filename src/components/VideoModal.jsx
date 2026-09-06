import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoTitle, videoUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0B2341]/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-10">
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B2341] border-b border-white/10">
          <h3 className="font-editorial text-lg font-bold text-white">{videoTitle || 'Project Showcase'}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
            title={videoTitle || 'KRITISHA Infrastructure Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
