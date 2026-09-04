import React, { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AreaChart({ trips = [], photos = [] }) {
      const [hoveredIdx, setHoveredIdx] = useState(null);

      const daysCount = 7;
      const W = 600, H = 180, pad = { t: 25, r: 25, b: 30, l: 20 };
      const iW = W - pad.l - pad.r;
      const iH = H - pad.t - pad.b;

      const pointsData = Array.from({ length: daysCount }).map((_, i) => {
            const tripItem = trips[i % trips.length] || { title: `Trip #${i + 1}`, date: `2026-08-${15 + i}` };
            const photoItem = photos[i % photos.length] || { title: `Photo #${i + 1}`, date: `2026-08-${16 + i}` };
            const tripVal = Math.max(1, (i * 3 + 2) % 9);
            const photoVal = Math.max(2, (i * 4 + 3) % 12);
            return {
                  day: DAYS[i],
                  tripVal,
                  photoVal,
                  tripTitle: tripItem.title || 'Trip',
                  tripDate: tripItem.date || 'N/A',
                  photoTitle: photoItem.title || 'Photo',
                  photoDate: photoItem.date || 'N/A',
            };
      });

      const allVals = pointsData.flatMap(p => [p.tripVal, p.photoVal]);
      const max = Math.max(...allVals) || 10;
      const min = 0;
      const range = max - min || 1;

      const tripsPts = pointsData.map((p, i) => [
            pad.l + (i / (daysCount - 1)) * iW,
            pad.t + iH - ((p.tripVal - min) / range) * iH,
      ]);

      const photosPts = pointsData.map((p, i) => [
            pad.l + (i / (daysCount - 1)) * iW,
            pad.t + iH - ((p.photoVal - min) / range) * iH,
      ]);

      const lineD1 = tripsPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
      const areaD1 = lineD1 + ` L${tripsPts[tripsPts.length - 1][0]},${(pad.t + iH).toFixed(1)} L${tripsPts[0][0]},${(pad.t + iH).toFixed(1)} Z`;

      const lineD2 = photosPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
      const areaD2 = lineD2 + ` L${photosPts[photosPts.length - 1][0]},${(pad.t + iH).toFixed(1)} L${photosPts[0][0]},${(pad.t + iH).toFixed(1)} Z`;

      const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const normX = (x / rect.width) * W;
            let closestIdx = 0;
            let minDiff = Infinity;
            tripsPts.forEach((p, idx) => {
                  const diff = Math.abs(p[0] - normX);
                  if (diff < minDiff) {
                        minDiff = diff;
                        closestIdx = idx;
                  }
            });
            setHoveredIdx(closestIdx);
      };

      const hoveredData = hoveredIdx !== null ? pointsData[hoveredIdx] : null;
      const hoveredTripPt = hoveredIdx !== null ? tripsPts[hoveredIdx] : null;

      return (
            <div className="relative w-full h-full">
                  <svg
                        viewBox={`0 0 ${W} ${H}`}
                        className="w-full h-full cursor-crosshair overflow-visible"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoveredIdx(null)}
                  >
                        <defs>
                              <linearGradient id="tripsGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                              </linearGradient>
                              <linearGradient id="photosGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                              </linearGradient>
                        </defs>

                        {/* Grid Lines */}
                        {[0, 0.33, 0.66, 1].map((f, i) => (
                              <line key={i} x1={pad.l} y1={pad.t + iH * f} x2={W - pad.r} y2={pad.t + iH * f}
                                    stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                        ))}

                        <path d={areaD2} fill="url(#photosGrad)" />
                        <path d={lineD2} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        {photosPts.map((p, i) => (
                              <circle
                                    key={`p-${i}`}
                                    cx={p[0]}
                                    cy={p[1]}
                                    r={hoveredIdx === i ? 6 : 3.5}
                                    fill={hoveredIdx === i ? '#f97316' : 'white'}
                                    stroke="#f97316"
                                    strokeWidth={hoveredIdx === i ? 3 : 2}
                                    className="transition-all duration-150"
                              />
                        ))}

                        <path d={areaD1} fill="url(#tripsGrad)" />
                        <path d={lineD1} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                        {tripsPts.map((p, i) => (
                              <circle
                                    key={`t-${i}`}
                                    cx={p[0]}
                                    cy={p[1]}
                                    r={hoveredIdx === i ? 6 : 4}
                                    fill="#3b82f6"
                                    stroke="white"
                                    strokeWidth={hoveredIdx === i ? 3 : 1.5}
                                    className="transition-all duration-150"
                              />
                        ))}

                        {hoveredIdx !== null && (
                              <line
                                    x1={tripsPts[hoveredIdx][0]}
                                    y1={pad.t}
                                    x2={tripsPts[hoveredIdx][0]}
                                    y2={pad.t + iH}
                                    stroke="#cbd5e1"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                              />
                        )}

                        {tripsPts.map((p, i) => (
                              <text
                                    key={`lbl-${i}`}
                                    x={p[0]}
                                    y={H - 6}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fontWeight={hoveredIdx === i ? "700" : "500"}
                                    fill={hoveredIdx === i ? "#0f172a" : "#94a3b8"}
                              >
                                    {DAYS[i]}
                              </text>
                        ))}
                  </svg>

                  {hoveredData && (
                        <div
                              className="absolute z-30 pointer-events-none bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-slate-700/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
                              style={{
                                    left: `${Math.min(80, Math.max(10, (hoveredTripPt[0] / W) * 100))}%`,
                                    top: '0px',
                                    transform: 'translate(-50%, -100%)',
                                    minWidth: '220px'
                              }}
                        >
                              <div className="font-bold text-slate-300 border-b border-slate-700/60 pb-1 flex justify-between">
                                    <span>📅 {hoveredData.day} Activity</span>
                              </div>

                              <div className="space-y-1">
                                    <div className="flex items-start gap-1.5 text-blue-300">
                                          <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 flex-shrink-0"></span>
                                          <div>
                                                <div className="font-semibold text-white line-clamp-1">{hoveredData.tripTitle}</div>
                                                <div className="text-[10px] text-blue-200">Created date: {hoveredData.tripDate}</div>
                                          </div>
                                    </div>

                                    <div className="flex items-start gap-1.5 text-orange-300 pt-1 border-t border-slate-800">
                                          <span className="w-2 h-2 rounded-full bg-orange-400 mt-1 flex-shrink-0"></span>
                                          <div>
                                                <div className="font-semibold text-white line-clamp-1">{hoveredData.photoTitle}</div>
                                                <div className="text-[10px] text-orange-200">Created date: {hoveredData.photoDate}</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}
