import React from 'react';
import { useQueue } from '../context/QueueContext';
import {
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  CalendarCheck
} from 'lucide-react';

export const BestTimeToVisit = () => {
  const { facilities, setSelectedFacility } = useQueue();

  return (
    <div className="space-y-6">
      {/* Overview Intro */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold border border-indigo-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Rule-Based Campus Visiting Windows
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Beat the Rush: Optimal Visiting Schedules
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            By shifting your campus visits away from standard lecture changeovers, you can avoid up to
            80% of queue wait times. Calculated using facility throughput metrics.
          </p>
        </div>
      </div>

      {/* Grid of Facility Visiting Windows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {facilities.map((fac) => {
          const isImmediate = fac.bestTimeToVisit.toLowerCase().includes('right now');

          return (
            <div
              key={fac.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      {fac.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{fac.name}</h3>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      fac.status === 'High'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : fac.status === 'Moderate'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    Current: {fac.waitTimeMinutes}m wait
                  </span>
                </div>

                {/* Best Time Highlight Block */}
                <div className="mt-5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Recommended Window
                  </div>
                  <div className="text-xl font-black text-indigo-950 mt-1 flex items-center gap-2">
                    {fac.bestTimeToVisit}
                    {isImmediate && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                        FASTEST
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-indigo-100/60 text-indigo-800">
                    <span>Expected Crowd:</span>
                    <span className="font-bold text-emerald-700">{fac.expectedBestCrowd}</span>
                  </div>
                </div>

                {/* Savings Metric */}
                <div className="mt-4 flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span>Potential Time Saved:</span>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-600">
                    ~{fac.potentialTimeSaved} mins
                  </span>
                </div>
              </div>

              {/* Action trigger */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Algorithm estimate</span>
                <button
                  onClick={() => setSelectedFacility(fac)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                >
                  View Hourly Breakdown <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Methodology Disclaimer */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3 text-xs text-slate-500">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Disclaimer:</strong> Recommendations are calculated using rule-based throughput models,
          historical student class bell intervals, and current line counts. Always allow for small campus variations during special college events.
        </p>
      </div>
    </div>
  );
};

