import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  Award,
  Zap,
  BarChart2,
  Calendar,
  Layers
} from 'lucide-react';
import { useQueue } from '../context/QueueContext';
import { HOURLY_CAMPUS_OVERALL_DATA } from '../data/mockData';

export const AnalyticsDashboard = () => {
  const { facilities } = useQueue();

  // Compute key insights dynamically
  const sortedByWait = [...facilities].sort((a, b) => b.waitTimeMinutes - a.waitTimeMinutes);
  const busiest = sortedByWait[0];
  const leastCrowded = sortedByWait[sortedByWait.length - 1];

  // Bar chart dataset comparing facilities
  const facilityComparisonData = facilities.map((f) => ({
    name: f.name.replace(' & Print Hub', '').replace(' & Shake Corner', ''),
    wait: f.waitTimeMinutes,
    queue: f.queueLength,
    status: f.status
  }));

  const getBarColor = (status) => {
    if (status === 'High') return '#ef4444';
    if (status === 'Moderate') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div className="space-y-6">
      {/* Highlights / KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Peak Hours Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-rose-50 text-rose-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Campus Peak Hour
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">12:30 PM - 1:45 PM</div>
            <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High lunch congestion across food hubs
            </p>
          </div>
        </div>

        {/* Busiest Facility Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Busiest Campus Facility
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{busiest?.name}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Wait time: <strong className="text-slate-800">{busiest?.waitTimeMinutes} mins</strong> ({busiest?.queueLength} in line)
            </p>
          </div>
        </div>

        {/* Least Crowded Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Least Crowded Facility
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">{leastCrowded?.name}</div>
            <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Immediate walk-in (~{leastCrowded?.waitTimeMinutes}m wait)
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Hourly Aggregate Crowd Trend */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Hourly Campus Queue Dynamics
              </h3>
              <p className="text-xs text-slate-400">Total waiting minutes across all 6 facilities</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
              Live Aggregate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HOURLY_CAMPUS_OVERALL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs p-3 rounded-2xl shadow-xl space-y-1">
                          <p className="font-bold text-indigo-300">{label}</p>
                          <p>Cumulative Wait: <span className="font-bold text-emerald-400">{payload[0]?.value} mins</span></p>
                          <p>Students in Lines: <span className="font-bold text-white">{payload[0]?.payload?.activeQueues} students</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="totalWait"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#6366f1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Comparative Waiting Times Across Facilities */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                Wait Times Comparison
              </h3>
              <p className="text-xs text-slate-400">Current estimated delay per facility (mins)</p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> &lt;5m
              <span className="w-2 h-2 rounded-full bg-amber-500 ml-1" /> 5-12m
              <span className="w-2 h-2 rounded-full bg-rose-500 ml-1" /> &gt;12m
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white text-xs p-3 rounded-2xl shadow-xl space-y-1">
                          <p className="font-bold text-indigo-300">{label}</p>
                          <p>Current Wait: <span className="font-bold text-emerald-400">{payload[0]?.value} mins</span></p>
                          <p>Crowd Level: <span className="font-bold text-amber-300">{payload[0]?.payload?.status}</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="wait" radius={[8, 8, 0, 0]}>
                  {facilityComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

