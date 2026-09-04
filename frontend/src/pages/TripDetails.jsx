import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTripById } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {
      MapPin,
      Clock,
      Users,
      ArrowLeft,
      Calendar,
      ShieldCheck,
} from 'lucide-react';

const TripDetails = () => {
      const { id } = useParams();
      const [trip, setTrip] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            if (id) {
                  fetchTrip();
            }
      }, [id]);

      const fetchTrip = async () => {
            if (id === 'upcoming-trips') {
                  setTrip({
                        id: 'upcoming-trips',
                        slug: 'upcoming-trips',
                        title: 'Upcoming Trips',
                        location: 'Worldwide',
                        country: 'Global',
                        duration: 'Coming Soon',
                        members: 'Join Waitlist',
                        date: '2026',
                        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Stay tuned for exciting new travel experiences and curated adventure packages coming very soon across amazing destinations around the globe.',
                  });
                  document.title = 'Upcoming Trips | Travel';
                  setLoading(false);
                  return;
            }

            try {
                  setLoading(true);
                  setError(null);
                  const data = await getTripById(id);
                  setTrip(data);
                  if (data?.title) {
                        document.title = `${data.title} | Travel`;
                  }
            } catch (err) {
                  console.error('Error fetching trip details:', err);
                  setError('Trip not found or server error. Please try again.');
            } finally {
                  setLoading(false);
            }
      };

      if (loading) return <Loading message="Loading trip details..." />;
      if (error || !trip) return <ErrorMessage message={error || 'Trip not found.'} onRetry={fetchTrip} />;

      return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                  <Link
                        to="/trips"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors group"
                  >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Trips</span>
                  </Link>

                  <div className="relative h-[420px] sm:h-[500px] rounded-[3rem] overflow-hidden border border-stone-200/80 shadow-2xl bg-slate-900">
                        <img
                              src={trip.coverImage}
                              alt={trip.title}
                              className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                              <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-md">
                                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                    <span>{trip.location}, {trip.country}</span>
                              </div>
                        </div>

                        <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 text-white space-y-3">
                              <div className="flex items-center flex-wrap gap-2">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-orange-200">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>{trip.duration}</span>
                                    </div>
                                    {/* {trip.members && (
                                          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md text-xs font-semibold text-emerald-200">
                                                <Users className="w-3.5 h-3.5 text-emerald-300" />
                                                <span>{trip.members}</span>
                                          </div>
                                    )} */}
                                    {trip.date && (
                                          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/30 backdrop-blur-md text-xs font-semibold text-blue-200">
                                                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                                                <span>{trip.date}</span>
                                          </div>
                                    )}
                              </div>
                              <h1 className="font-serif-heading text-3xl sm:text-5xl font-extrabold leading-tight">
                                    {trip.title}
                              </h1>
                        </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-8">
                              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 soft-shadow space-y-6">
                                    <h2 className="font-serif-heading text-2xl font-bold text-slate-900 border-b border-stone-100 pb-4">
                                          Trip Overview
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                                          {trip.description}
                                    </p>
                              </div>
                              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 soft-shadow space-y-6">
                                    <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                                          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                                <Users className="w-5 h-5" />
                                          </div>
                                          <div>
                                                <h2 className="font-serif-heading text-2xl font-bold text-slate-900">
                                                      Trip Members
                                                </h2>
                                                <p className="text-xs text-slate-400">Travelers joined in this Trip</p>
                                          </div>
                                    </div>

                                    {(() => {
                                          const memberList = (trip.members || '')
                                                .split(/[,\n]+/)
                                                .map(m => m.trim())
                                                .filter(Boolean);

                                          if (memberList.length === 0) {
                                                return (
                                                      <div className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 text-center">
                                                            No members joined.
                                                      </div>
                                                );
                                          }

                                          return (
                                                <div className="flex flex-wrap gap-3">
                                                      {memberList.map((name, idx) => (
                                                            <div key={idx} className="flex items-center gap-1 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-amber-400 text-slate-800 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all shadow-xs">
                                                                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                                                                        {name.charAt(0).toUpperCase()}
                                                                  </div>
                                                                  <span>{name}</span>
                                                            </div>
                                                      ))}
                                                </div>
                                          );
                                    })()}
                              </div>
                        </div>

                        <div className="lg:col-span-4 space-y-6">
                              <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />

                                    <h3 className="font-serif-heading text-2xl font-bold border-b border-slate-800 pb-4">
                                          Trip Details
                                    </h3>

                                    <div className="space-y-4 text-sm">
                                          <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                                <span className="text-slate-400">Duration:</span>
                                                <span className="font-semibold text-orange-400">{trip.duration}</span>
                                          </div>
                                          {/* {trip.members && (
                                                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                                      <span className="text-slate-400">Members:</span>
                                                      <span className="font-semibold text-emerald-400 font-mono text-xs">{trip.members}</span>
                                                </div>
                                          )} */}
                                          <div className="flex justify-between items-center py-2 border-b border-slate-800">
                                                <span className="text-slate-400">Location:</span>
                                                <span className="font-semibold text-white">{trip.location}</span>
                                          </div>
                                    </div>

                                    <div className="flex items-center gap-2 justify-center text-xs text-slate-400 pt-2">
                                          <ShieldCheck className="w-4 h-4 text-orange-400" />
                                          <span>Direct Personal Guide</span>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default TripDetails;
