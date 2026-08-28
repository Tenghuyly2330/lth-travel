import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title, itemName }) {
      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                              <Trash2 size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-base">{title || 'Delete Item'}</h3>
                        <p className="text-xs text-slate-500">
                              Are you sure you want to delete <strong>"{itemName}"</strong>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-2">
                              <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                              >
                                    Cancel
                              </button>
                              <button
                                    onClick={onConfirm}
                                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-md transition-all"
                              >
                                    Confirm Delete
                              </button>
                        </div>
                  </div>
            </div>
      );
}
