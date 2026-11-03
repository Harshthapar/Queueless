import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  Clock,
  Sparkles,
  MapPin,
  Info,
  X,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useQueue } from '../context/QueueContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { demoMode } = useQueue();

  const navItems = [
    { name: 'Overview', to: '/', icon: LayoutDashboard },
    { name: 'Campus Facilities', to: '/facilities', icon: Building2 },
    { name: 'Crowd Heatmap', to: '/heatmap', icon: MapPin },
    { name: 'Queue Analytics', to: '/analytics', icon: BarChart3 },
    { name: 'Best Time to Visit', to: '/best-time', icon: Clock },
    { name: 'Queue Intelligence', to: '/intelligence', icon: Sparkles },
    { name: 'About QueueLess', to: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <NavLink to="/" onClick={onClose} className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Queue<span className="text-indigo-600">Less</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                  Campus Radar
                </span>
              </div>
            </NavLink>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Campus Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs border border-indigo-100/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Status & Demo badge */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          {/* Demo Mode Badge */}
          <div className="p-3 bg-gradient-to-br from-indigo-50/80 to-slate-50 rounded-xl border border-indigo-100/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Demo Simulation Mode
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Simulated campus crowd sensors with realistic student queue trends.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-medium">
            <span>v1.2.0 • Production</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Online
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

