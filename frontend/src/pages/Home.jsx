import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrips, getPhotos } from '../services/api';
import TripCard from '../components/TripCard';
import PhotoGrid from '../components/PhotoGrid';
import Lightbox from '../components/Lightbox';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
      Sparkles,
      MapPin,
      Calendar,
      Globe,
      Briefcase,
      HeartHandshake,
      ArrowRight,
      Compass,
      Heart,
      Earth,
      TreePalm,
      TentTree,
      Plane,
      Camera,
      Sailboat,
      Flame,
      Motorbike
} from 'lucide-react';

const Home = () => {
      const [trips, setTrips] = useState([]);
      const [photos, setPhotos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      // Lightbox
      const [selectedPhoto, setSelectedPhoto] = useState(null);
      const [lightboxIndex, setLightboxIndex] = useState(0);

      useEffect(() => {
            document.title = 'Travel.';
            fetchData();
      }, []);

      const fetchData = async () => {
            try {
                  setLoading(true);
                  setError(null);
                  const [tripsData, photosData] = await Promise.all([getTrips(), getPhotos()]);
                  setTrips(tripsData);
                  setPhotos(photosData);
            } catch (err) {
                  console.error('Failed to load home page data:', err);
                  setError('Unable to load travel experiences. Please check server connection.');
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

      const featuredTrips = trips.slice(0, 3);
      const previewPhotos = photos.slice(0, 6);
      const latestTrip = trips.length > 0 ? trips[0] : null;

      return (
            <div className="space-y-24 pb-20">

                  {/* Hero Section */}
                  <section className="relative pt-8 pb-8 lg:pt-16 lg:pb-24 overflow-hidden">
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl -z-10" />
                        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl -z-10" />

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                                    <div className="lg:col-span-7 space-y-8">
                                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-[11px] sm:text-sm font-semibold tracking-wide shadow-xs">
                                                <span>The vacation you deserve is closer than you think</span>
                                                <Heart className="w-4 h-4 fill-orange-500" />
                                          </div>

                                          <h1 className="font-serif-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                                                Life is short <br />
                                                and the world <Earth className="md:w-14 md:h-14 w-10 h-10 inline-block hover:rotate-12 transition-transform animate-bounce " /> <br />
                                                is <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">Wide!</span> <TreePalm className="md:w-14 md:h-14 w-10 h-10 inline-block hover:rotate-12 transition-transform animate-bounce text-orange-500" />
                                          </h1>

                                          <p className="text-slate-600 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
                                                Discover unforgettable adventures and unique trip packages crafted just for you.
                                          </p>

                                          {latestTrip ? (
                                                <div className="bg-white p-3.5 sm:p-4 rounded-3xl sm:rounded-full border border-orange-200/90 shadow-lg flex flex-col sm:flex-row items-center gap-3 sm:gap-4 max-w-2xl transition-all hover:border-orange-300">
                                                      <div className="flex-1 w-full flex items-center gap-3.5 px-3 py-1 border-b sm:border-b-0 sm:border-r border-stone-100 overflow-hidden">
                                                            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
                                                                  <Sparkles className="w-5 h-5 text-orange-500" />
                                                            </div>
                                                            <div className="text-left truncate">
                                                                  <div className="flex items-center gap-2">
                                                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                                                                              Latest Trip
                                                                        </span>
                                                                        <span className="text-xs text-slate-500 flex items-center gap-1 truncate">
                                                                              <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                                                                              {latestTrip.location}, {latestTrip.country}
                                                                        </span>
                                                                  </div>
                                                                  <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                                                                        {latestTrip.title}
                                                                  </h4>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-center gap-3 px-3 py-1 border-b sm:border-b-0 sm:border-r border-stone-100 shrink-0">
                                                            <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                                                            <div className="text-left">
                                                                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Date / Duration</label>
                                                                  <span className="text-xs font-semibold text-slate-800">
                                                                        {latestTrip.date || latestTrip.duration}
                                                                  </span>
                                                            </div>
                                                      </div>

                                                      <Link
                                                            to={`/trips/${latestTrip.id}`}
                                                            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0"
                                                      >
                                                            <span>View Latest</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                      </Link>
                                                </div>
                                          ) : (
                                                <div className="bg-white p-4 rounded-3xl sm:rounded-full border border-stone-200 shadow-xs flex items-center justify-between gap-4 max-w-2xl text-xs text-slate-400">
                                                      <span>Loading latest trip experience...</span>
                                                      <Link to="/trips" className="text-orange-600 font-semibold hover:underline">Explore All Trips</Link>
                                                </div>
                                          )}

                                          <div className="flex items-center gap-4 pt-2">
                                                <Link
                                                      to="/trips"
                                                      className="px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-sm"
                                                >
                                                      Explore Our Trips
                                                </Link>
                                                <Link
                                                      to="/photos"
                                                      className="px-6 py-3 rounded-full bg-stone-100 text-slate-800 text-sm font-semibold hover:bg-stone-200 transition-colors"
                                                >
                                                      View Photos
                                                </Link>
                                          </div>
                                    </div>

                                    <div class="lg:col-span-5 relative flex items-center justify-center min-h-[420px]">

                                          <svg class="absolute inset-0 w-full h-full text-slate-300 pointer-events-none" viewBox="0 0 500 500" fill="none">
                                                <path d="M 50,250 Q 200,50 450,150" stroke="currentColor" stroke-width="2" stroke-dasharray="6,6" />
                                          </svg>

                                          <div class="relative group w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] rounded-full border-8 border-white shadow-2xl overflow-hidden z-10">
                                                <img
                                                      src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800"
                                                      alt="Hiker in nature"
                                                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                          </div>

                                          <div class="absolute hover:-rotate-14 transition-transform duration-500 -right-2 sm:right-4 bottom-0 w-36 h-60 sm:w-44 sm:h-72 rounded-full border-8 border-white shadow-xl overflow-hidden z-0 transform rotate-[-8deg]">
                                                <img
                                                      src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600"
                                                      alt="Scenic mountain view"
                                                      class="w-full h-full object-cover"
                                                />
                                          </div>

                                          <div class="absolute group top-4 left-6 sm:left-12 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg z-20 hover:scale-110 transition-transform">
                                                <Motorbike class="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                                          </div>

                                          <div class="absolute group -top-4 left-1/3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform z-20">
                                                <Camera class="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                                          </div>

                                          <div class="absolute group top-10 right-12 sm:right-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:scale-110 transition-transform z-20">
                                                <TentTree class="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                                          </div>

                                          <div class="absolute group bottom-12 left-8 sm:left-16 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg z-20 hover:scale-110 transition-transform">
                                                <Sailboat class="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* What We Serve */}
                  {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
                              <span className="text-orange-500 text-xs font-extrabold uppercase tracking-widest">What We Serve</span>
                              <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-slate-900">
                                    Top Values For You 🔥
                              </h2>
                              <p className="text-slate-600 text-sm">
                                    Try a variety of benefits when traveling and exploring destinations with us.
                              </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 transition-all duration-300 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                                          <Globe className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Authentic Experiences</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Experience destinations beyond the usual tourist locations and immerse in real local culture.
                                    </p>
                              </div>

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 transition-all duration-300 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center">
                                          <Compass className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Beautiful Destinations</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Discover incredible places, hidden gems, and breathtaking landscape vistas around the globe.
                                    </p>
                              </div>

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 transition-all duration-300 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center">
                                          <Briefcase className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Local Knowledge</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Travel with useful insider local information, culinary tips, and safety recommendations.
                                    </p>
                              </div>

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 transition-all duration-300 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center">
                                          <HeartHandshake className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Unforgettable Memories</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Create stories, photographs, and life experiences worth remembering for a lifetime.
                                    </p>
                              </div>

                        </div>
                  </section> */}
                  <section class="max-w-7xl w-full mx-auto py-8 lg:py-16 px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">

                              <div class="space-y-3">
                                    <span class="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                                          WHAT WE SERVE
                                    </span>
                                    <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight ">
                                          Top Values <br class="hidden sm:inline" />For You <Flame className="text-amber-600 md:w-10 md:h-10 w-8 h-8 inline-block hover:rotate-12 transition-transform" />
                                    </h2>
                                    <p class="text-slate-400 text-sm leading-relaxed pr-2">
                                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, voluptate!
                                    </p>
                              </div>

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 hover:border-amber-500 lg:mt-10 transition-all duration-300 space-y-4 ">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center">
                                          <Compass className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Beautiful Destinations</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, autem!
                                    </p>
                              </div>

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 hover:border-amber-500 lg:mt-14 transition-all duration-300 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-orange-500 flex items-center justify-center">
                                          <Briefcase className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Local Knowledge</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, autem!
                                    </p>
                              </div>

                              <div className="bg-white p-8 rounded-3xl border border-stone-200/80 soft-shadow hover:-translate-y-2 hover:border-amber-500 lg:mt-12 transition-all duration-300 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center">
                                          <HeartHandshake className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif-heading text-xl font-bold text-slate-900">Unforgettable Memories</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, autem!
                                    </p>
                              </div>
                        </div>
                  </section>

                  {/* Featured Trips Section */}
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                              <div className="space-y-3 max-w-xl">
                                    <span className="flex items-end gap-2 text-orange-500 text-xs font-extrabold uppercase tracking-widest">Top Destinations <Motorbike className="text-amber-600 w-4 h-4 inline-block hover:rotate-12 transition-transform" /></span>
                                    <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-slate-900">
                                          Discover Featured Trips
                                    </h2>
                              </div>
                              <Link
                                    to="/trips"
                                    className="inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700 transition-colors text-sm"
                              >
                                    <span>Explore All Trips</span>
                                    <ArrowRight className="w-4 h-4" />
                              </Link>
                        </div>

                        {loading ? (
                              <Loading message="Loading featured trips..." />
                        ) : error ? (
                              <ErrorMessage message={error} onRetry={fetchData} />
                        ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {featuredTrips.map((trip) => (
                                          <TripCard key={trip.id} trip={trip} />
                                    ))}
                              </div>
                        )}
                  </section>

                  {/* Photo Section */}
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                              <div className="space-y-3">
                                    <span className="text-orange-500 text-xs font-extrabold uppercase tracking-widest flex items-end gap-2">Travel Gallery <Camera className="w-4 h-4 inline-block hover:rotate-12 transition-transform" /></span>
                                    <h2 className="font-serif-heading text-4xl sm:text-5xl font-bold text-slate-900">
                                          Capturing Timeless Moments
                                    </h2>
                              </div>
                              <Link
                                    to="/photos"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-orange-600 text-white font-semibold text-sm transition-colors shadow-sm"
                              >
                                    <span>View All Photos →</span>
                              </Link>
                        </div>

                        {loading ? (
                              <Loading message="Loading travel photos..." />
                        ) : (
                              <PhotoGrid photos={previewPhotos} onPhotoClick={openLightbox} />
                        )}
                  </section>

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

export default Home;
