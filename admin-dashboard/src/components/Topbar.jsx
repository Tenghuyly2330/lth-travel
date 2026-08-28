import React from 'react';
import { Search } from 'lucide-react';

export default function Topbar({ title, searchQuery, setSearchQuery }) {
      return (
            <header className="bg-white border-b border-slate-200 h-15 flex items-center px-6 gap-4 sticky top-0 z-30">
                  <h1 className="text-xl font-bold text-slate-900 flex-1">{title}</h1>
                  <div className="flex items-center gap-2 bg-[#FAFAF9] border border-slate-200 rounded-xl px-3.5 py-1.5 w-56 md:w-64 focus-within:ring-2 focus-within:ring-orange-400/30 focus-within:border-orange-400 transition-all" id="search-box">
                        <Search size={14} className="text-slate-400 shrink-0" />
                        <input
                              className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder:text-slate-400 w-full"
                              placeholder="Search tours or photos..."
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                        />
                  </div>
            </header>
      );
}

