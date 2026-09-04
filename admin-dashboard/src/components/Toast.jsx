import React from 'react';
import { Check, XCircle, AlertTriangle } from 'lucide-react';

export default function Toast({ message, type = 'success' }) {
      if (!message) return null;

      const variants = {
            success: {
                  wrapper: 'bg-slate-900 border-slate-700 text-white',
                  icon: <Check size={16} className="text-emerald-400 shrink-0" />,
            },
            error: {
                  wrapper: 'bg-red-950 border-red-800 text-red-100',
                  icon: <XCircle size={16} className="text-red-400 shrink-0" />,
            },
            warning: {
                  wrapper: 'bg-amber-950 border-amber-700 text-amber-100',
                  icon: <AlertTriangle size={16} className="text-amber-400 shrink-0" />,
            },
      };

      const { wrapper, icon } = variants[type] || variants.success;

      return (
            <div className={`fixed top-5 right-5 z-[9999] ${wrapper} px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border animate-in slide-in-from-top-2 fade-in duration-300 max-w-sm`}>
                  {icon}
                  <span className="text-sm font-medium leading-snug">{message}</span>
            </div>
      );
}
