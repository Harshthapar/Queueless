import React from 'react';
import {
  X,
  Users,
  Clock,
  MapPin,
  TrendingUp,
  Sparkles,
  Info,
  CalendarCheck,
  Zap,
  Lightbulb
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useQueue } from '../context/QueueContext';

export const FacilityModal = () => {
  const { selectedFacility, setSelectedFacility, updateFacilityQueue } = useQueue();

  if (!selectedFacility) return null;

  const f = selectedFacility;

  // Status badge styling
  const statusConfig = {
    Low: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
      label: 'Low Crowd'
    },
    Moderate: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
      label: 'Moderate Crowd'
    },
    High: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
      label: 'High Crowd'
    }
  }[f.status] || {
    bg: 'bg-slate-50 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    label: f.status
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header Bar */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {f.category}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.bg}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`} />
                {statusConfig.label}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5">
              {f.name}
            </h2>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {f.location}
            </p>
          </div>
          <button
            onClick={() => setSelectedFacility(null)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-2xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-indigo-500" />
                Estimated Wait
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {f.waitTimeMinutes} <span className="text-xs font-semibold text-slate-500">mins</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-indigo-500" />
                Queue Length
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {f.queueLength} <span className="text-xs font-semibold text-slate-500">waiting</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-indigo-500" />
                Service Speed
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                ~{Math.round(f.avgServiceTimePerPerson * 60)}{' '}
                <span className="text-xs font-semibold text-slate-500">sec/pax</span>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Best Time
              </div>
              <div className="text-base sm:text-lg font-black text-indigo-900 mt-1 truncate">
                {f.bestTimeToVisit}
              </div>
            </div>
          </div>

          {/* Description & Tips */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <p className="text-sm text-slate-600 leading-relaxed">{f.description}</p>
            {f.tips && (
              <div className="flex items-start gap-2 pt-2 border-t border-slate-200/60 text-xs text-amber-800 bg-amber-50/60 p-2.5 rounded-xl">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Pro Student Tip: </span>
                  {f.tips}
                </div>
              </div>
            )}
          </div>

          {/* Hourly Crowd Trend Chart */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Hourly Queue & Waiting Time Trend
                </h3>
                <p className="text-xs text-slate-400">Based on historical campus surveillance and sensor logs</p>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
                Peak: {f.peakHours}
              </span>
            </div>

            <div className="h-52 w-full bg-slate-50/50 p-2 rounded-2xl border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={f.hourlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="modalWaitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 text-white text-xs p-2.5 rounded-xl shadow-xl space-y-1">
                            <p className="font-bold text-indigo-300">{label}</p>
                            <p>Queue: <span className="font-semibold text-white">{payload[0]?.payload?.queue} people</span></p>
                            <p>Est. Wait: <span className="font-semibold text-emerald-300">{payload[0]?.value} mins</span></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="waitTime"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#modalWaitGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Demo Adjustment Slider */}
          <div className="p-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/60">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800">Simulate Queue Variation</span>
                <p className="text-[11px] text-slate-400">Tweak queue count manually to observe real-time calculations</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {f.queueLength} people
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={f.queueLength}
              onChange={(e) => updateFacilityQueue(f.id, parseInt(e.target.value, 10))}
              className="w-full mt-3 accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Last synced: <strong className="text-slate-600">{f.lastUpdated}</strong>
          </span>
          <button
            onClick={() => setSelectedFacility(null)}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

