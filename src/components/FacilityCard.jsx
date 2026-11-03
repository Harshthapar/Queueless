import React from 'react';
import { Users, Clock, ArrowRight, Bookmark, Sparkles, MapPin } from 'lucide-react';
import { useQueue } from '../context/QueueContext';

export const FacilityCard = ({ facility }) => {
  const { setSelectedFacility, favorites, toggleFavorite } = useQueue();
  const isPinned = favorites.includes(facility.id);

  // Status configuration
  const statusMeta = {
    Low: {
      color: 'emerald',
      bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotColor: 'bg-emerald-500',
      indicatorBg: 'bg-emerald-500',
      widthPercentage: '28%',
      labelText: 'Low Crowd'
    },
    Moderate: {
      color: 'amber',
      bgBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      dotColor: 'bg-amber-500',
      indicatorBg: 'bg-amber-500',
      widthPercentage: '60%',
      labelText: 'Moderate Crowd'
    },
    High: {
      color: 'rose',
      bgBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      dotColor: 'bg-rose-500',
      indicatorBg: 'bg-rose-500',
      widthPercentage: '92%',
      labelText: 'High Crowd'
    }
  }[facility.status] || {
    bgBadge: 'bg-slate-100 text-slate-700 border-slate-200',
    dotColor: 'bg-slate-500',
    indicatorBg: 'bg-slate-400',
    widthPercentage: '40%',
    labelText: facility.status
  };

  return (
    <div className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200/70 transition-all duration-300 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {facility.category}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusMeta.bgBadge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dotColor} animate-pulse`} />
                {statusMeta.labelText}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {facility.name}
            </h3>
            <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 line-clamp-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              {facility.location}
            </p>
          </div>

          <button
            onClick={() => toggleFavorite(facility.id)}
            title={isPinned ? 'Remove from favorites' : 'Pin to favorites'}
            className={`p-2 rounded-xl transition-all ${
              isPinned
                ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                : 'text-slate-300 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isPinned ? 'fill-indigo-600' : ''}`} />
          </button>
        </div>

        {/* Live Wait Time & Queue Stats */}
        <div className="grid grid-cols-2 gap-3 my-5 p-3.5 bg-slate-50/70 border border-slate-100 rounded-2xl">
          <div>
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Est. Waiting
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {facility.waitTimeMinutes} <span className="text-xs font-semibold text-slate-500">mins</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" /> Queue Count
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {facility.queueLength} <span className="text-xs font-semibold text-slate-500">people</span>
            </div>
          </div>
        </div>

        {/* Visual Crowd Density Indicator Bar */}
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Crowd Density</span>
            <span className="font-semibold text-slate-700">{statusMeta.labelText}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${statusMeta.indicatorBg}`}
              style={{ width: statusMeta.widthPercentage }}
            />
          </div>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Updated {facility.lastUpdated}
        </span>

        <button
          onClick={() => setSelectedFacility(facility)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 group-hover:translate-x-0.5 transition-all"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

