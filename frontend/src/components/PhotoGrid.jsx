import { MapPin, Calendar, Maximize2 } from 'lucide-react';

const PhotoGrid = ({ photos, onPhotoClick }) => {
      return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo, index) => (
                        <div
                              key={photo.id || index}
                              onClick={() => onPhotoClick(photo, index)}
                              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-stone-200"
                        >
                              <img
                                    src={photo.imageUrl}
                                    alt={photo.title || 'Travel gallery image'}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    loading="lazy"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

                              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:text-white shadow-md">
                                    <Maximize2 className="w-4 h-4" />
                              </div>

                              <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-1">
                                    {photo.title && (
                                          <h4 className="font-serif-heading text-lg font-bold leading-tight">{photo.title}</h4>
                                    )}
                                    <div className="flex items-center flex-wrap gap-2 text-xs font-medium text-orange-300">
                                          {photo.location && (
                                                <p className="flex items-center gap-1">
                                                      <MapPin className="w-3.5 h-3.5" />
                                                      <span>{photo.location}</span>
                                                </p>
                                          )}
                                          {photo.date && (
                                                <p className="flex items-center gap-1 text-slate-300">
                                                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                                                      <span>{photo.date}</span>
                                                </p>
                                          )}
                                    </div>
                              </div>
                        </div>
                  ))}
            </div>
      );
};

export default PhotoGrid;
