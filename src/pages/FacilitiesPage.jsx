import React from 'react';
import { useQueue } from '../context/QueueContext';
import { FacilityCard } from '../components/FacilityCard';
import { SlidersHorizontal, Building2, Filter } from 'lucide-react';

export const FacilitiesPage = () => {
  const { facilities, searchQuery, crowdFilter, setCrowdFilter } = useQueue();

  const filtered = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCrowd =
      crowdFilter === 'All' || facility.status.toLowerCase() === crowdFilter.toLowerCase();

    return matchesSearch && matchesCrowd;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Campus Facilities Directory
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Detailed live queues, waiting times, and operational hours for all campus hubs
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
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

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((fac) => (
          <FacilityCard key={fac.id} facility={fac} />
        ))}
      </div>
    </div>
  );
};

