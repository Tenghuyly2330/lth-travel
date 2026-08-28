import React from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message }) {
      if (!message) return null;
      return (
            <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-bounce">
                  <Check size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium">{message}</span>
            </div>
      );
}
