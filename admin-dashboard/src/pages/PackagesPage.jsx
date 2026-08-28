import React from 'react';
import { Plus, Clock, Calendar, Pencil, Trash2 } from 'lucide-react';
import Loading from '../components/Loading';

export default function PackagesPage({ tours, loading, openCreateTour, openEditTour, confirmDeleteTour }) {
      if (loading) {
            return (
                  <div className="p-6">
                        <Loading message="Loading packages..." />
                  </div>
            );
      }

      return (
            <div className="p-6">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                              <div>
                                    <h2 className="text-lg font-bold text-slate-900">Travel Packages</h2>
                                    <p className="text-xs text-slate-500">Create, update, and manage all tour packages</p>
                              </div>
                              <button
                                    onClick={openCreateTour}
                                    className="inline-flex items-center gap-2 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                              >
                                    <Plus size={16} />
                                    <span>Add New Tour</span>
                              </button>
                        </div>

                        {tours.length === 0 ? (
                              <div className="text-center py-12 text-slate-400">No tours found.</div>
                        ) : (
                              <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                          <thead>
                                                <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                                      <th className="py-3 px-4">Tour</th>
                                                      <th className="py-3 px-4">Location</th>
                                                      <th className="py-3 px-4">Duration</th>
                                                      <th className="py-3 px-4">Date</th>
                                                      <th className="py-3 px-4 text-right">Actions</th>
                                                </tr>
                                          </thead>
                                          <tbody className="divide-y divide-slate-100 text-sm">
                                                {tours.map(t => (
                                                      <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                                                            <td className="py-3 px-4">
                                                                  <div className="flex items-center gap-3">
                                                                        <img src={t.coverImage} alt={t.title} className="w-12 h-10 rounded-xl object-cover border border-slate-200" />
                                                                        <div>
                                                                              <div className="font-semibold text-slate-800 line-clamp-1">{t.title}</div>
                                                                              <div className="text-xs text-slate-400">{t.slug}</div>
                                                                        </div>
                                                                  </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-slate-600">
                                                                  <div className="font-medium">{t.location}</div>
                                                                  <div className="text-xs text-slate-400">{t.country}</div>
                                                            </td>
                                                            <td className="py-3 px-4 text-slate-600 font-medium">
                                                                  <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full text-xs">
                                                                        <Clock size={11} className="text-orange-500" />
                                                                        {t.duration}
                                                                  </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-slate-600 font-medium">
                                                                  {t.date ? (
                                                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs">
                                                                              <Calendar size={11} />
                                                                              {t.date}
                                                                        </span>
                                                                  ) : <span className="text-slate-300">-</span>}
                                                            </td>
                                                            <td className="py-3 px-4 text-right">
                                                                  <div className="inline-flex items-center gap-2">
                                                                        <button
                                                                              onClick={() => openEditTour(t)}
                                                                              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                                              title="Edit Tour"
                                                                        >
                                                                              <Pencil size={15} />
                                                                        </button>
                                                                        <button
                                                                              onClick={() => confirmDeleteTour(t)}
                                                                              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                                              title="Delete Tour"
                                                                        >
                                                                              <Trash2 size={15} />
                                                                        </button>
                                                                  </div>
                                                            </td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        )}
                  </div>
            </div>
      );
}
