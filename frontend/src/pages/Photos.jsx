import { useEffect, useState } from 'react';
import { getPhotos } from '../services/api';
import PhotoGrid from '../components/PhotoGrid';
import Lightbox from '../components/Lightbox';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Camera } from 'lucide-react';

const Photos = () => {
      const [photos, setPhotos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      // Lightbox modal state
      const [selectedPhoto, setSelectedPhoto] = useState(null);
      const [lightboxIndex, setLightboxIndex] = useState(0);

      useEffect(() => {
            document.title = 'Travel Photography | My Travel';
            fetchPhotosData();
      }, []);

      const fetchPhotosData = async () => {
            try {
                  setLoading(true);
                  setError(null);
                  const data = await getPhotos();
                  setPhotos(data);
            } catch (err) {
                  console.error('Failed to load photos:', err);
                  setError('Unable to load photo gallery. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      const openLightbox = (photo, index) => {
            setSelectedPhoto(photo);
            setLightboxIndex(index);
      };

      const closeLightbox = () => {
            setSelectedPhoto(null);
      };

      const nextPhoto = () => {
            const nextIdx = (lightboxIndex + 1) % photos.length;
            setLightboxIndex(nextIdx);
            setSelectedPhoto(photos[nextIdx]);
      };

      const prevPhoto = () => {
            const prevIdx = (lightboxIndex - 1 + photos.length) % photos.length;
            setLightboxIndex(prevIdx);
            setSelectedPhoto(photos[prevIdx]);
      };

      return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                  <div className="text-center max-w-2xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold uppercase tracking-wider border border-orange-200">
                              <Camera className="w-4 h-4" />
                              <span>Photo Collection</span>
                        </div>
                        <h1 className="font-serif-heading text-4xl sm:text-5xl font-extrabold text-slate-900">
                              Photo Gallery
                        </h1>
                        <p className="text-slate-600 text-base leading-relaxed">
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum, nam!
                        </p>
                  </div>

                  {loading ? (
                        <Loading message="Loading travel photography..." />
                  ) : error ? (
                        <ErrorMessage message={error} onRetry={fetchPhotosData} />
                  ) : photos.length === 0 ? (
                        <div className="text-center py-16 text-slate-500">No photos available.</div>
                  ) : (
                        <PhotoGrid photos={photos} onPhotoClick={openLightbox} />
                  )}

                  {selectedPhoto && (
                        <Lightbox
                              photo={selectedPhoto}
                              photos={photos}
                              currentIndex={lightboxIndex}
                              onClose={closeLightbox}
                              onPrev={prevPhoto}
                              onNext={nextPhoto}
                        />
                  )}

            </div>
      );
};

export default Photos;
