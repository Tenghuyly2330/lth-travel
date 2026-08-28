import React from 'react';
import { Plus, MapPin, Calendar, Pencil, Trash2 } from 'lucide-react';
import Loading from '../components/Loading';

export default function GalleryPage({ photos, loading, openCreatePhoto, openEditPhoto, confirmDeletePhoto }) {
      if (loading) {
            return (
                  <div className="p-6">
                        <Loading message="Loading gallery..." />
                  </div>
            );
      }

      return (
            <div className="p-6">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                              <div>
                                    <h2 className="text-lg font-bold text-slate-900">Travel Gallery</h2>
                                    <p className="text-xs text-slate-500">Manage all photo collection items</p>
                              </div>
                              <button
                                    onClick={openCreatePhoto}
                                    className="inline-flex items-center gap-2 tracking-wider hover:tracking-widest transition-all duration-300 bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-white px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                              >
                                    <Plus size={16} />
                                    <span>Add New Photo</span>
                              </button>
                        </div>

                        {photos.length === 0 ? (
                              <div className="text-center py-12 text-slate-400">No photos found.</div>
                        ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                    {photos.map(p => (
                                          <div key={p.id} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all">
                                                <div className="h-44 overflow-hidden relative">
                                                      <img src={p.imageUrl} alt={p.title || 'Photo'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                  onClick={() => openEditPhoto(p)}
                                                                  className="w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                                                                  title="Edit Photo"
                                                            >
                                                                  <Pencil size={13} />
                                                            </button>
                                                            <button
                                                                  onClick={() => confirmDeletePhoto(p)}
                                                                  className="w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:text-red-600 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                                                                  title="Delete Photo"
                                                            >
                                                                  <Trash2 size={13} />
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="p-3.5 space-y-1">
                                                      <h4 className="font-semibold text-slate-800 text-sm truncate">{p.title || 'Untitled'}</h4>
                                                      <div className="flex items-center justify-between text-xs text-slate-500">
                                                            <span className="flex items-center gap-1"><MapPin size={11} className="text-orange-500" />{p.location || 'N/A'}</span>
                                                            {p.date && <span className="flex items-center gap-1 text-slate-400"><Calendar size={11} />{p.date}</span>}
                                                      </div>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
}
