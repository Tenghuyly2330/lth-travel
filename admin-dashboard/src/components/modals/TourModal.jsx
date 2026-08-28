import React, { useState } from 'react';
import { Package, X, Upload, Link as LinkIcon, Check, Loader2 } from 'lucide-react';
import { uploadImage } from '../../api/api';

export default function TourModal({ isOpen, onClose, onSubmit, editingTour, tourForm, setTourForm, saving }) {
      const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'url'
      const [uploading, setUploading] = useState(false);
      const [uploadError, setUploadError] = useState('');

      if (!isOpen) return null;

      const handleFileChange = async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            setUploadError('');
            try {
                  const res = await uploadImage(file, 'tours');
                  if (res.data && res.data.url) {
                        setTourForm(prev => ({ ...prev, coverImage: res.data.url }));
                  }
            } catch (err) {
                  console.error('File upload error:', err);
                  setUploadError(err.response?.data?.message || 'Failed to upload image to Cloudinary');
            } finally {
                  setUploading(false);
            }
      };

      return (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                                    <Package size={20} className="text-orange-500" />
                                    <span>{editingTour ? 'Edit Tour Package' : 'Create New Tour Package'}</span>
                              </div>
                              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                                    <X size={20} />
                              </button>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
                                          <input
                                                type="text"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="e.g. Angkor Wat Adventure"
                                                value={tourForm.title}
                                                onChange={e => setTourForm({ ...tourForm, title: e.target.value })}
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Country *</label>
                                          <input
                                                type="text"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="e.g. Cambodia"
                                                value={tourForm.country}
                                                onChange={e => setTourForm({ ...tourForm, country: e.target.value })}
                                                required
                                          />
                                    </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Location *</label>
                                          <input
                                                type="text"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="e.g. Siem Reap"
                                                value={tourForm.location}
                                                onChange={e => setTourForm({ ...tourForm, location: e.target.value })}
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Duration *</label>
                                          <input
                                                type="text"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="e.g. 3 Days / 2 Nights"
                                                value={tourForm.duration}
                                                onChange={e => setTourForm({ ...tourForm, duration: e.target.value })}
                                                required
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                                          <input
                                                type="date"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                value={tourForm.date}
                                                onChange={e => setTourForm({ ...tourForm, date: e.target.value })}
                                          />
                                    </div>
                              </div>

                              {/* Cover Image Upload / URL Selector */}
                              <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                          <label className="block text-xs font-semibold text-slate-600">Cover Image *</label>
                                          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
                                                <button
                                                      type="button"
                                                      onClick={() => setUploadMode('file')}
                                                      className={`px-2.5 py-1 rounded-lg transition-all ${uploadMode === 'file' ? 'bg-white text-orange-600 shadow-xs font-bold' : 'text-slate-500'}`}
                                                >
                                                      Upload File
                                                </button>
                                                <button
                                                      type="button"
                                                      onClick={() => setUploadMode('url')}
                                                      className={`px-2.5 py-1 rounded-lg transition-all ${uploadMode === 'url' ? 'bg-white text-orange-600 shadow-xs font-bold' : 'text-slate-500'}`}
                                                >
                                                      Image URL
                                                </button>
                                          </div>
                                    </div>

                                    {uploadMode === 'file' ? (
                                          <div className="border-2 border-dashed border-slate-200 hover:border-orange-400 rounded-2xl p-4 text-center transition-all bg-slate-50/50">
                                                <input
                                                      type="file"
                                                      id="tour-file-input"
                                                      accept="image/*"
                                                      onChange={handleFileChange}
                                                      className="hidden"
                                                />
                                                <label htmlFor="tour-file-input" className="cursor-pointer flex flex-col items-center gap-2">
                                                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                                                            {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                                                      </div>
                                                      {uploading ? (
                                                            <span className="text-xs text-orange-600 font-semibold animate-pulse">Uploading to Cloudinary (tours/)...</span>
                                                      ) : tourForm.coverImage ? (
                                                            <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                                                                  <Check size={14} />
                                                                  <span>Cloudinary Image Ready</span>
                                                            </div>
                                                      ) : (
                                                            <div>
                                                                  <span className="text-xs font-semibold text-slate-700">Click to choose image file</span>
                                                                  <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB (stored in Cloudinary/tours)</p>
                                                            </div>
                                                      )}
                                                </label>
                                          </div>
                                    ) : (
                                          <input
                                                type="url"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="https://images.unsplash.com/..."
                                                value={tourForm.coverImage}
                                                onChange={e => setTourForm({ ...tourForm, coverImage: e.target.value })}
                                                required={uploadMode === 'url'}
                                          />
                                    )}

                                    {uploadError && <p className="text-xs text-red-500 font-medium">{uploadError}</p>}

                                    {/* Live Thumbnail Preview */}
                                    {tourForm.coverImage && (
                                          <div className="flex items-center gap-3 pt-2">
                                                <img
                                                      src={tourForm.coverImage}
                                                      alt="Preview"
                                                      className="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                                                />
                                                <div className="text-xs text-slate-500 truncate flex-1">
                                                      <span className="font-semibold text-slate-700 block">Preview Loaded</span>
                                                      <span className="truncate block text-[10px] text-slate-400">{tourForm.coverImage}</span>
                                                </div>
                                          </div>
                                    )}
                              </div>

                              <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Description *</label>
                                    <textarea
                                          rows={3}
                                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                          placeholder="Provide tour itinerary and details..."
                                          value={tourForm.description}
                                          onChange={e => setTourForm({ ...tourForm, description: e.target.value })}
                                          required
                                    />
                              </div>

                              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          disabled={saving || uploading}
                                          className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md transition-all disabled:opacity-50"
                                    >
                                          {saving ? 'Saving...' : editingTour ? 'Update Tour' : 'Create Tour'}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
