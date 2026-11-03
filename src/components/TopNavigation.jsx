import React, { useState } from 'react';
import { Search, Bell, Sparkles, RefreshCw, SlidersHorizontal, CheckCircle2, Clock } from 'lucide-react';
import { useQueue } from '../context/QueueContext';

export const TopNavigation = () => {
  const { searchQuery, setSearchQuery, simulateLiveUpdate, demoMode, addToast } = useQueue();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Lunch Rush Alert', desc: 'Main Canteen wait time peaked at 18 mins.', time: '5m ago', unread: true },
    { id: 2, title: 'Best Time Window', desc: 'Photocopy Shop crowd dropped to Low.', time: '12m ago', unread: true },
    { id: 3, title: 'Daily Saved Estimate', desc: 'You avoided 32 minutes of queues this week!', time: '1h ago', unread: false }
  ];

  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Personalized Greeting & Date */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Good afternoon, Harsh! 👋
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sensor Sync
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {currentDate}
            </span>
            <span className="text-slate-300">•</span>
            <span>Campus Term Session 2026-27</span>
          </div>
        </div>

        {/* Right Action Tools: Search, Demo Simulator, Notifications, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Universal Search Input */}
          <div className="relative flex-1 md:w-64 lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search canteen, print, admin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-slate-900 placeholder:text-slate-400 border border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600 bg-slate-200/70 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>

          {/* Simulate Real-time Data Button */}
          <button
            onClick={simulateLiveUpdate}
            title="Simulate live crowd fluctuations"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 active:scale-95 border border-indigo-200/80 rounded-xl transition-all shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulate Shift</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/60"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs sm:text-sm text-slate-800">Campus Alerts</span>
                    <span className="px-1.5 py-0.2 text-[10px] bg-indigo-100 text-indigo-700 font-bold rounded-full">2 new</span>
                  </div>
                  <button
                    onClick={() => {
                      addToast('All campus notifications marked as read', 'info');
                      setShowNotifications(false);
                    }}
                    className="text-[11px] text-indigo-600 hover:underline font-medium"
                  >
                    Mark read
                  </button>
                </div>
                <div className="divide-y divide-slate-100 mt-1 max-h-60 overflow-y-auto">
                  {notifications.map((item) => (
                    <div key={item.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-sm ring-2 ring-indigo-100">
              HS
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-900 leading-tight">Harsh S.</div>
              <div className="text-[11px] text-slate-400 leading-tight">CS Dept, 3rd Yr</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

