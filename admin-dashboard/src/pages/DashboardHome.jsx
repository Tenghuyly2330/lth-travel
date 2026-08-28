import { Link } from 'react-router-dom';
import { Package, Camera, MapPin, Plus, ArrowRight } from 'lucide-react';
import AreaChart from '../components/AreaChart';
import MiniCalendar from '../components/MiniCalendar';
import Loading from '../components/Loading';

const fmtN = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;

export default function DashboardHome({ tours, photos, loading, openCreateTour, openEditTour }) {
      if (loading) {
            return <Loading message="Loading dashboard..." />;
      }

      return (
            <div className="p-6 flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto items-start">
                  <div className="flex-1 w-full space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="space-y-2">
                                          <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Tours</h1>
                                          <div className="text-3xl font-extrabold text-slate-900">{fmtN(tours.length)}</div>
                                          <p className="text-xs text-slate-400 font-medium">Active tour packages</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-amber-600 flex items-center justify-center shadow-sm">
                                          <Package size={26} />
                                    </div>
                              </div>

                              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
                                    <div className="space-y-2">
                                          <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Photos</h1>
                                          <div className="text-3xl font-extrabold text-slate-900">{fmtN(photos.length)}</div>
                                          <p className="text-xs text-slate-400 font-medium">Gallery collection</p>
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
                                          <Camera size={26} />
                                    </div>
                              </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm w-full">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-4">
                                    <div>
                                          <h1 className="text-xl font-extrabold text-slate-900">Overview</h1>
                                          <p className="text-xs text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, molestias.</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-semibold">
                                          <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-3.5 py-1.5 rounded-full border border-amber-100">
                                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                                                <h1>Tours Created ({tours.length})</h1>
                                          </div>
                                          <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3.5 py-1.5 rounded-full border border-orange-100">
                                                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                                                <h1>Photos Created ({photos.length})</h1>
                                          </div>
                                    </div>
                              </div>

                              <div className="h-60 w-full relative pt-2">
                                    <AreaChart tours={tours} photos={photos} />
                              </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm w-full space-y-5">
                              <div className="flex items-center justify-between pb-2">
                                    <div>
                                          <h1 className="text-lg font-bold text-slate-900">Travel Packages</h1>
                                          <p className="text-xs text-slate-500">Lorem ipsum dolor sit.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                          <button
                                                onClick={openCreateTour}
                                                className="inline-flex items-center gap-1.5 text-xs tracking-wider hover:tracking-widest transition-all duration-300 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-2xl shadow-sm transition-all"
                                          >
                                                <Plus size={14} /> Add Package
                                          </button>
                                          <Link
                                                to="/packages"
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-all tracking-wider hover:tracking-widest duration-300"
                                          >
                                                <span>View All</span>
                                                <ArrowRight size={13} />
                                          </Link>
                                    </div>
                              </div>

                              {tours.length === 0 ? (
                                    <div className="text-slate-400 text-sm text-center py-8">No tours available.</div>
                              ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                          {tours.slice(0, 3).map(t => (
                                                <div
                                                      key={t.id}
                                                      onClick={() => openEditTour(t)}
                                                      className="group relative h-44 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all border border-slate-200 bg-slate-900"
                                                >
                                                      <img
                                                            src={t.coverImage}
                                                            alt={t.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                            {t.country}
                                                      </span>
                                                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                                                            <h4 className="font-bold text-base leading-tight truncate group-hover:text-orange-200 transition-colors">
                                                                  {t.title}
                                                            </h4>
                                                            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                                                                  <MapPin size={12} className="text-orange-400" />
                                                                  <span>{t.location}</span>
                                                                  {t.date && <span className="text-slate-400">· {t.date}</span>}
                                                            </div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              )}
                        </div>
                  </div>

                  <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm sticky top-6">
                              <MiniCalendar />
                        </div>
                  </div>
            </div>
      );
}
