import React, { useState } from 'react';
import { Camera, X, Upload, Link as LinkIcon, Check, Loader2 } from 'lucide-react';
import { uploadImage } from '../../api/api';

export default function PhotoModal({ isOpen, onClose, onSubmit, editingPhoto, photoForm, setPhotoForm, saving }) {
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
                  const res = await uploadImage(file, 'photos');
                  if (res.data && res.data.url) {
                        setPhotoForm(prev => ({ ...prev, imageUrl: res.data.url }));
                  }
            } catch (err) {
                  console.error('File upload error:', err);
                  setUploadError(err.response?.data?.message || 'Failed to upload photo to Cloudinary');
            } finally {
                  setUploading(false);
            }
      };

      return (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6 border border-slate-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                                    <Camera size={20} className="text-orange-500" />
                                    <span>{editingPhoto ? 'Edit Photo' : 'Add New Travel Photo'}</span>
                              </div>
                              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                                    <X size={20} />
                              </button>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                              <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Photo Title</label>
                                    <input
                                          type="text"
                                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                          placeholder="e.g. Sunrise over Angkor Wat"
                                          value={photoForm.title}
                                          onChange={e => setPhotoForm({ ...photoForm, title: e.target.value })}
                                    />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                                          <input
                                                type="text"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="e.g. Siem Reap, Cambodia"
                                                value={photoForm.location}
                                                onChange={e => setPhotoForm({ ...photoForm, location: e.target.value })}
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
                                          <input
                                                type="date"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                value={photoForm.date}
                                                onChange={e => setPhotoForm({ ...photoForm, date: e.target.value })}
                                          />
                                    </div>
                              </div>

                              {/* Image Upload / URL Selector */}
                              <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                          <label className="block text-xs font-semibold text-slate-600">Photo File / URL *</label>
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
                                                      id="photo-file-input"
                                                      accept="image/*"
                                                      onChange={handleFileChange}
                                                      className="hidden"
                                                />
                                                <label htmlFor="photo-file-input" className="cursor-pointer flex flex-col items-center gap-2">
                                                      <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                                                            {uploading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
                                                      </div>
                                                      {uploading ? (
                                                            <span className="text-xs text-orange-600 font-semibold animate-pulse">Uploading to Cloudinary (photos/)...</span>
                                                      ) : photoForm.imageUrl ? (
                                                            <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                                                                  <Check size={14} />
                                                                  <span>Cloudinary Image Ready</span>
                                                            </div>
                                                      ) : (
                                                            <div>
                                                                  <span className="text-xs font-semibold text-slate-700">Click to choose photo file</span>
                                                                  <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 10MB (stored in Cloudinary/photos)</p>
                                                            </div>
                                                      )}
                                                </label>
                                          </div>
                                    ) : (
                                          <input
                                                type="url"
                                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                                placeholder="https://images.unsplash.com/..."
                                                value={photoForm.imageUrl}
                                                onChange={e => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                                                required={uploadMode === 'url'}
                                          />
                                    )}

                                    {uploadError && <p className="text-xs text-red-500 font-medium">{uploadError}</p>}

                                    {/* Live Thumbnail Preview */}
                                    {photoForm.imageUrl && (
                                          <div className="flex items-center gap-3 pt-2">
                                                <img
                                                      src={photoForm.imageUrl}
                                                      alt="Preview"
                                                      className="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                                                />
                                                <div className="text-xs text-slate-500 truncate flex-1">
                                                      <span className="font-semibold text-slate-700 block">Preview Loaded</span>
                                                      <span className="truncate block text-[10px] text-slate-400">{photoForm.imageUrl}</span>
                                                </div>
                                          </div>
                                    )}
                              </div>

                              <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
                                    <textarea
                                          rows={2}
                                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400"
                                          placeholder="Short caption or context..."
                                          value={photoForm.description}
                                          onChange={e => setPhotoForm({ ...photoForm, description: e.target.value })}
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
                                          {saving ? 'Saving...' : editingPhoto ? 'Update Photo' : 'Save Photo'}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
