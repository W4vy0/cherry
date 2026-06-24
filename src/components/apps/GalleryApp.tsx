import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryAppProps {
  onClose: () => void;
}

export function GalleryApp({ onClose }: GalleryAppProps) {
  const images = [
    'https://igx.kr/v/35/w/1',
    'https://igx.kr/v/35/w/2',
    'https://igx.kr/v/35/w/3',
    'https://igx.kr/v/35/w/4',
    'https://igx.kr/v/35/w/6',
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 pb-3 pt-12 shadow-sm">
        <button onClick={onClose} className="p-2 text-gray-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">갤러리</h1>
        <div className="w-10"></div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-1">
        <div className="grid grid-cols-3 gap-1">
          {images.map((src, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedImage(src)}
              className="flex aspect-square items-center justify-center bg-gray-100 overflow-hidden"
            >
              <img src={src} alt={`gallery-${idx}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex flex-col bg-black"
          >
            <div className="flex items-center justify-between px-4 pb-3 pt-12 text-white">
              <button onClick={() => setSelectedImage(null)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <img src={selectedImage} alt="Fullscreen view" className="max-h-full max-w-full object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

