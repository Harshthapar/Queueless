import React from 'react';
import {
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Building,
  Shield,
  Layers,
  HelpCircle,
  TrendingDown,
  RotateCcw
} from 'lucide-react';
import { useQueue } from '../context/QueueContext';

export const AboutPage = () => {
  const { resetToDefault } = useQueue();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
          <Zap className="w-7 h-7 fill-white" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            About QueueLess
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Smart Campus Queue Predictor
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Eliminating wasted student hours spent standing in campus queues at canteens,
            admin counters, juice stalls, and photocopy centers.
          </p>
        </div>
      </div>

      {/* Problem & Solution Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900">The Problem</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            College students regularly lose between <strong>30 to 50 minutes every single day</strong> in
            congested lines during peak lunch breaks, morning printing rushes, and administrative paperwork
            deadlines. Often, students discover a 25-minute wait only after physically walking across campus.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900">The QueueLess Solution</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            QueueLess provides a centralized telemetry dashboard featuring live crowd states (Low, Moderate,
            High), estimated wait times in minutes, interactive campus spatial heatmaps, and algorithmic
            best-time-to-visit windows so students can plan their day with certainty.
          </p>
        </div>
      </div>

      {/* Core Architectural Highlights */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          System Design & Frontend Architecture
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">React + Vite SPA</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Ultra-fast responsive client-side routing, minimal bundle footprint, and fluid transitions.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Tailwind SaaS Design</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Clean off-white canvas, electric indigo accents, semantic crowd alerts, and generous whitespace.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">State Persistence</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Synced with localStorage for favorites, custom simulation values, and student preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Reset Demo State Button */}
      <div className="p-6 bg-slate-100/70 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Reset Demo Environment</h4>
          <p className="text-xs text-slate-500">
            Restore original queue lengths, baseline wait times, and sample data.
          </p>
        </div>
        <button
          onClick={resetToDefault}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> Reset Mock Data
        </button>
      </div>
    </div>
  );
};

