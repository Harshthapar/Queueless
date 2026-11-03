import React from 'react';
import {
  Building2,
  Clock,
  Users,
  Flame,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Compass,
  Zap,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { FacilityCard } from '../components/FacilityCard';
import { CampusHeatmap } from '../components/CampusHeatmap';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { BestTimeToVisit } from '../components/BestTimeToVisit';
import { QueueIntelligence } from '../components/QueueIntelligence';
import { Link } from 'react-router-dom';

export const DashboardOverview = () => {
  const {
    facilities,
    searchQuery,
    crowdFilter,
    setCrowdFilter,
    favorites
  } = useQueue();

  // Metrics computation
  const totalFacilities = facilities.length;
  const currentlyBusy = facilities.filter((f) => f.status === 'High').length;
  const avgWait = Math.round(
    facilities.reduce((acc, curr) => acc + curr.waitTimeMinutes, 0) / (totalFacilities || 1)
  );
  // Time saved estimate today based on active visits
  const timeSavedToday = 34; // realistic mock stat for Harsh

  // Filter facilities based on search and crowd level filter
  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrowd =
      crowdFilter === 'All' || facility.status.toLowerCase() === crowdFilter.toLowerCase();

    return matchesSearch && matchesCrowd;
  });

  // Pinned favorite facilities
  const pinnedFacilities = facilities.filter((f) => favorites.includes(f.id));

  return (
    <div className="space-y-8 pb-12">
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Campus Facilities */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Monitored
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {totalFacilities} <span className="text-sm font-semibold text-slate-400">Hotspots</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 100% telemetry online
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Currently Busy Facilities */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Currently Congested
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {currentlyBusy} <span className="text-sm font-semibold text-slate-400">Facilities</span>
            </div>
            <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1 mt-1">
              <Flame className="w-3.5 h-3.5" /> High crowd levels
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Average Waiting Time */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Avg Campus Wait
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {avgWait} <span className="text-sm font-semibold text-slate-400">minutes</span>
            </div>
            <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
              Across all queues
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Time Saved Today */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Your Time Saved
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              +{timeSavedToday} <span className="text-sm font-semibold text-slate-400">mins</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <TrendingDown className="w-3.5 h-3.5" /> 3 queues bypassed
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Pinned Quick Access (if any) */}
      {pinnedFacilities.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              Your Pinned Quick Access ({pinnedFacilities.length})
            </h3>
            <span className="text-xs text-slate-400">Quick status check</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedFacilities.map((fac) => (
              <FacilityCard key={`fav-${fac.id}`} facility={fac} />
            ))}
          </div>
        </div>
      )}

      {/* Live Campus Queue Status Section */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Live Campus Facilities Queue Status
              </h2>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live estimated wait times, line lengths, and crowd levels updated in real time.
            </p>
          </div>

          {/* Crowd Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 self-start md:self-auto overflow-x-auto max-w-full">
            {['All', 'Low', 'Moderate', 'High'].map((filter) => {
              const isActive = crowdFilter.toLowerCase() === filter.toLowerCase();
              return (
                <button
                  key={filter}
                  onClick={() => setCrowdFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {filter === 'All' ? 'All Facilities' : `${filter} Crowd`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Facility Cards Grid */}
        {filteredFacilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredFacilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
            <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No Facilities Match Filter</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any campus facilities matching "{searchQuery}" with "{crowdFilter}" crowd level.
            </p>
            <button
              onClick={() => {
                setCrowdFilter('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Campus Radar / Heatmap Section */}
      <section>
        <CampusHeatmap />
      </section>

      {/* Signature Queue Intelligence Section */}
      <section>
        <QueueIntelligence />
      </section>

      {/* Queue Analytics Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Queue Analytics & Peak Trends
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Historical crowd flow datasets and cross-facility comparative delays
            </p>
          </div>
          <Link
            to="/analytics"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Full Analytics <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <AnalyticsDashboard />
      </section>

      {/* Best Time to Visit Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Best Time to Visit Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Data-backed visiting time slots to cut your wait by up to 16 minutes
            </p>
          </div>
          <Link
            to="/best-time"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            All Recommendations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <BestTimeToVisit />
      </section>
    </div>
  );
};

