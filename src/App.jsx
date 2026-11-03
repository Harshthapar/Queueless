import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNavigation } from './components/TopNavigation';
import { ToastContainer } from './components/ToastContainer';
import { FacilityModal } from './components/FacilityModal';
import { DashboardOverview } from './pages/DashboardOverview';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { CampusHeatmap } from './components/CampusHeatmap';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BestTimeToVisit } from './components/BestTimeToVisit';
import { QueueIntelligence } from './components/QueueIntelligence';
import { AboutPage } from './pages/AboutPage';
import { Menu } from 'lucide-react';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification Mount */}
      <ToastContainer />

      {/* Facility Inspection Modal */}
      <FacilityModal />

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0 transition-all">
        {/* Mobile Top Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-slate-900 tracking-tight text-base">
            Queue<span className="text-indigo-600">Less</span>
          </span>
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
            HS
          </div>
        </div>

        {/* Global Desktop Top Bar */}
        <TopNavigation />

        {/* Routing Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route
              path="/heatmap"
              element={
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Campus Crowd Radar</h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Geographic layout of campus zones with live congestion indicators
                    </p>
                  </div>
                  <CampusHeatmap />
                </div>
              }
            />
            <Route
              path="/analytics"
              element={
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Queue Analytics & Historical Flow</h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Longitudinal wait-time data, peak load analysis, and service speed statistics
                    </p>
                  </div>
                  <AnalyticsDashboard />
                </div>
              }
            />
            <Route
              path="/best-time"
              element={
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Best Time to Visit Engine</h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Recommended visiting windows to avoid lines and maximize your time
                    </p>
                  </div>
                  <BestTimeToVisit />
                </div>
              }
            />
            <Route
              path="/intelligence"
              element={
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Queue Intelligence System</h1>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Signature predictive campus analytics, smart rankings, and cumulative student savings
                    </p>
                  </div>
                  <QueueIntelligence />
                </div>
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

