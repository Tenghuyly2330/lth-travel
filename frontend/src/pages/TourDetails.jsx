import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTourById } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
      MapPin,
      Clock,
      CheckCircle2,
      ArrowLeft,
      Calendar,
      ShieldCheck,
      Sparkles,
      MessageSquare
} from 'lucide-react';

const TourDetails = () => {
      const { id } = useParams();
      const [tour, setTour] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            if (id) {
                  fetchTour();
            }
      }, [id]);

      const fetchTour = async () => {
            try {
                  setLoading(true);
                  setError(null);
                  const data = await getTourById(id);
                  setTour(data);
                  if (data?.title) {
                        document.title = `${data.title} | My Travel`;
                  }
            } catch (err) {
                  console.error('Error fetching tour details:', err);
                  setError('Tour not found or server error. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      if (loading) return <Loading message="Loading tour details..." />;
      if (error || !tour) return <ErrorMessage message={error || 'Tour not found.'} onRetry={fetchTour} />;

      return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

                  <Link
                        to="/tours"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors group"
                  >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Tours</span>
                  </Link>

                  <div className="relative h-[420px] sm:h-[500px] rounded-[3rem] overflow-hidden border border-stone-200/80 shadow-2xl bg-slate-900">
                        <img
                              src={tour.coverImage}
                              alt={tour.title}
                              className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                              <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-md">
                                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                    <span>{tour.location}, {tour.country}</span>
                              </div>

                              {/* <div className="bg-orange-500 text-white font-extrabold px-5 py-2 rounded-full text-base shadow-lg">
                                    ${tour.price} <span className="text-xs font-normal text-orange-100">/ person</span>
                              </div> */}
                        </div>

                        <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 text-white space-y-3">
                              <div className="flex items-center flex-wrap gap-2">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-orange-200">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>{tour.duration}</span>
                                    </div>
                                    {tour.date && (
                                          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/30 backdrop-blur-md text-xs font-semibold text-blue-200">
                                                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                                                <span>{tour.date}</span>
                                          </div>
                                    )}
                              </div>
                              <h1 className="font-serif-heading text-3xl sm:text-5xl font-extrabold leading-tight">
                                    {tour.title}
                              </h1>
                        </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        <div className="lg:col-span-8 space-y-8">
                              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 soft-shadow space-y-6">
                                    <h2 className="font-serif-heading text-2xl font-bold text-slate-900 border-b border-stone-100 pb-4">
                                          Tour Overview
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                                          {tour.description}
                                    </p>
                              </div>

                              {/* <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 soft-shadow space-y-6">
                                    <h2 className="font-serif-heading text-2xl font-bold text-slate-900 border-b border-stone-100 pb-4">
                                          What's Included
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                          {[
                                                'Professional Guided Tour',
                                                'Hotel Pickup & Dropoff',
                                                'All Entry Tickets & Permits',
                                                'Traditional Local Meals',
                                                'Travel Photography Assistance',
                                                'Small Group Comfort',
                                          ].map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                                                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                                                      <span>{item}</span>
                                                </div>
                                          ))}
                                    </div>
                              </div> */}
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                              <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

                                    <h3 className="font-serif-heading text-2xl font-bold border-b border-slate-800 pb-4">
                                          Tour Details
                                    </h3>

                                    <div className="space-y-4 text-sm">
                                          <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                                <span className="text-slate-400">Duration:</span>
                                                <span className="font-semibold text-orange-400">{tour.duration}</span>
                                          </div>
                                          <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                                <span className="text-slate-400">Location:</span>
                                                <span className="font-semibold text-white">{tour.location}</span>
                                          </div>
                                          {/* <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                                <span className="text-slate-400">Total Price:</span>
                                                <span className="font-extrabold text-2xl text-orange-400">${tour.price}</span>
                                          </div> */}
                                    </div>

                                    {/* <button
                                          onClick={() => alert(`Thank you for your interest in "${tour.title}"! Inquiry submitted.`)}
                                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
                                    >
                                          <MessageSquare className="w-5 h-5" />
                                          <span>Inquire & Reserve</span>
                                    </button> */}

                                    <div className="flex items-center gap-2 justify-center text-xs text-slate-400 pt-2">
                                          <ShieldCheck className="w-4 h-4 text-orange-400" />
                                          <span>Direct Personal Guide Booking</span>
                                    </div>
                              </div>
                        </div>

                  </div>

            </div>
      );
};

export default TourDetails;
