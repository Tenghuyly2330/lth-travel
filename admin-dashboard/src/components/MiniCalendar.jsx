import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MiniCalendar() {
      const today = new Date();
      const [year, setYear] = useState(today.getFullYear());
      const [month, setMonth] = useState(today.getMonth());

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevDays = new Date(year, month, 0).getDate();
      const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

      const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
      const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

      // const highlights = [3, 5, 12, 13, 14, 19];

      const cells = [];
      for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, other: true });
      for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
      const remaining = 42 - cells.length;
      for (let i = 1; i <= remaining; i++) cells.push({ day: i, other: true });

      return (
            <div>
                  <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-slate-900">{monthName} {year}</span>
                        <div className="flex gap-1">
                              <button onClick={prev} className="w-6 h-6 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"><ChevronLeft size={12} /></button>
                              <button onClick={next} className="w-6 h-6 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"><ChevronRight size={12} /></button>
                        </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                              <div key={d} className="text-[10px] text-slate-400 font-semibold py-1">{d}</div>
                        ))}
                        {cells.map((c, i) => {
                              const isToday = !c.other && c.day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                              // const isHL = !c.other && highlights.includes(c.day);
                              return (
                                    <div
                                          key={i}
                                          className={`text-[10px] py-2.5 rounded-full font-medium transition-colors cursor-default ${isToday
                                                      ? 'bg-orange-600 text-white font-bold shadow-xs'
                                                      : c.other
                                                            ? 'text-slate-300'
                                                            : 'text-slate-700 hover:bg-slate-100'
                                                }`}
                                    >
                                          {c.day}
                                    </div>
                              );
                        })}
                  </div>
            </div>
      );
}

