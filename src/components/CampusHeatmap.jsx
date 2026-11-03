import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import {
  MapPin,
  Clock,
  Users,
  Info,
  Maximize2,
  Compass,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

export const CampusHeatmap = () => {
  const { facilities, setSelectedFacility } = useQueue();
  const [activeFacility, setActiveFacility] = useState(null);

  // Status marker badge styling
  const getMarkerColor = (status) => {
    switch (status) {
      case 'Low':
        return {
          bg: 'bg-emerald-500',
          ring: 'ring-emerald-300',
          pulse: 'bg-emerald-400',
          text: 'text-emerald-700',
          badge: 'bg-emerald-50 border-emerald-200'
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-500',
          ring: 'ring-amber-300',
          pulse: 'bg-amber-400',
          text: 'text-amber-700',
          badge: 'bg-amber-50 border-amber-200'
        };
      case 'High':
        return {
          bg: 'bg-rose-500',
          ring: 'ring-rose-300',
          pulse: 'bg-rose-400',
          text: 'text-rose-700',
          badge: 'bg-rose-50 border-rose-200'
        };
      default:
        return {
          bg: 'bg-slate-500',
          ring: 'ring-slate-300',
          pulse: 'bg-slate-400',
          text: 'text-slate-700',
          badge: 'bg-slate-50 border-slate-200'
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Interactive Campus Crowd Heatmap
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Live spatial positioning and congestion density across campus sectors
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Low
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Moderate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            High
          </span>
        </div>
      </div>

      {/* Illustrative Campus Map Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100/90 rounded-3xl border border-slate-200 overflow-hidden shadow-inner select-none">
        {/* Subtle Map Architectural Grid & Sector Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e115_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e115_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Stylized Campus Zones / Pathways */}
        <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-slate-200/50 -rotate-3 blur-[1px]"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 bg-slate-200/50 rotate-6 blur-[1px]"></div>
        <div className="absolute top-12 left-12 w-48 h-32 rounded-3xl bg-emerald-100/30 border border-emerald-200/40 flex items-center justify-center text-[11px] font-bold text-emerald-800/60 uppercase tracking-widest">
          North Quad Garden
        </div>
        <div className="absolute bottom-10 right-10 w-52 h-28 rounded-3xl bg-blue-100/30 border border-blue-200/40 flex items-center justify-center text-[11px] font-bold text-blue-800/60 uppercase tracking-widest">
          Athletics Arena
        </div>

        {/* Facility Markers */}
        {facilities.map((fac) => {
          const style = getMarkerColor(fac.status);
          const isSelected = activeFacility?.id === fac.id;

          return (
            <div
              key={fac.id}
              style={{ left: `${fac.mapCoords.x}%`, top: `${fac.mapCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              {/* Marker Button */}
              <button
                onClick={() => setActiveFacility(isSelected ? null : fac)}
                className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl ${style.bg} text-white shadow-lg transition-transform duration-200 hover:scale-125 focus:outline-none ring-4 ${
                  isSelected ? 'ring-indigo-600 scale-125' : style.ring
                }`}
                title={`${fac.name} (${fac.status})`}
              >
                {/* Ping Animation */}
                <span
                  className={`absolute -inset-1 rounded-2xl ${style.pulse} opacity-40 animate-ping`}
                />
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              </button>

              {/* Marker Label Tooltip (Always Visible or Hover) */}
              <div
                onClick={() => setActiveFacility(fac)}
                className="mt-1 px-2 py-0.5 bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-lg text-[10px] sm:text-[11px] font-bold text-slate-800 shadow-md whitespace-nowrap cursor-pointer hover:text-indigo-600"
              >
                {fac.name}
              </div>

              {/* Popup details card when clicked */}
              {isSelected && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-40 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.badge} ${style.text}`}
                      >
                        {fac.status} Crowd
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{fac.name}</h4>
                    </div>
                    <button
                      onClick={() => setActiveFacility(null)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-slate-50 rounded-xl text-center">
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Est. Wait</div>
                      <div className="text-sm font-black text-slate-900">
                        {fac.waitTimeMinutes} mins
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">In Queue</div>
                      <div className="text-sm font-black text-slate-900">
                        {fac.queueLength} people
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedFacility(fac);
                      setActiveFacility(null);
                    }}
                    className="w-full mt-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    Open Facility Hub <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructional helper */}
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <Info className="w-4 h-4 text-indigo-500 shrink-0" />
        <span>
          Click any pin on the campus radar to inspect queue wait times or view peak recommendations.
        </span>
      </div>
    </div>
  );
};

