import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const Lightbox = ({ photo, photos, currentIndex, onClose, onPrev, onNext }) => {
      if (!photo) return null;

      useEffect(() => {
            const handleKeyDown = (e) => {
                  if (e.key === 'Escape') onClose();
                  if (e.key === 'ArrowLeft') onPrev();
                  if (e.key === 'ArrowRight') onNext();
            };

            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';

            return () => {
                  window.removeEventListener('keydown', handleKeyDown);
                  document.body.style.overflow = 'unset';
            };
      }, [onClose, onPrev, onNext]);

      return (
            <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">

                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 text-white">
                        <div className="bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700/60 text-xs font-semibold text-orange-400 tracking-wide">
                              {currentIndex + 1} / {photos.length}
                        </div>

                        <button
                              onClick={onClose}
                              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white border border-slate-700/60 transition-all duration-200 focus:outline-none"
                              title="Close (ESC)"
                        >
                              <X className="w-6 h-6" />
                        </button>
                  </div>

                  <button
                        onClick={onPrev}
                        className="absolute left-4 md:left-8 p-3 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white border border-slate-700/60 transition-all duration-200 focus:outline-none z-10 hover:scale-110"
                        title="Previous Image (←)"
                  >
                        <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center relative">
                        <img
                              src={photo.imageUrl}
                              alt={photo.title || 'Travel Photograph'}
                              className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                        />

                        {(photo.title || photo.location || photo.description) && (
                              <div className="mt-4 text-center max-w-xl px-4 space-y-1">
                                    {photo.title && (
                                          <h3 className="text-white font-serif-heading text-xl font-bold">{photo.title}</h3>
                                    )}
                                    {photo.location && (
                                          <p className="text-orange-400 text-xs font-medium flex items-center justify-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {photo.location}
                                                {photo.date && (
                                                      <span className="text-slate-400 ml-2">({photo.date})</span>
                                                )}
                                          </p>
                                    )}
                                    {photo.description && (
                                          <p className="text-slate-400 text-sm leading-relaxed">{photo.description}</p>
                                    )}
                              </div>
                        )}
                  </div>

                  <button
                        onClick={onNext}
                        className="absolute right-4 md:right-8 p-3 rounded-full bg-slate-900/80 hover:bg-orange-500 text-white border border-slate-700/60 transition-all duration-200 focus:outline-none z-10 hover:scale-110"
                        title="Next Image (→)"
                  >
                        <ChevronRight className="w-6 h-6" />
                  </button>
            </div>
      );
};

export default Lightbox;
