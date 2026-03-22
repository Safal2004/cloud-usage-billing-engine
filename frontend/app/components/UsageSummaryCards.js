"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export default function UsageSummaryCards() {
  const [metrics, setMetrics] = useState({ totalObjects: 0, totalStorageMB: 0, totalApiRequests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await apiRequest("/usage/summary", "GET");
        setMetrics(data);
      } catch (e) {
        console.error("Failed to load summary", e);
      }
      setLoading(false);
    }
    fetchSummary();
  }, []);

  if (loading) return <div className="animate-pulse flex space-x-4 mb-8">
      {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl w-1/3"></div>)}
  </div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Objects Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-6 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition-transform duration-500">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
        </div>
        <div className="relative z-10">
            <h4 className="text-white/80 font-semibold uppercase tracking-wider text-sm mb-1">Total Objects</h4>
            <div className="text-4xl font-extrabold">{metrics.totalObjects.toLocaleString()}</div>
            <p className="text-white/70 text-sm mt-2">Active files in your buckets</p>
        </div>
      </div>

      {/* Storage Used Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-lg shadow-teal-500/20 text-white relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition-transform duration-500">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
        </div>
        <div className="relative z-10">
            <h4 className="text-white/80 font-semibold uppercase tracking-wider text-sm mb-1">Storage Used</h4>
            <div className="text-4xl font-extrabold">{metrics.totalStorageMB} <span className="text-2xl font-bold">MB</span></div>
            <p className="text-white/70 text-sm mt-2">Billed standard storage</p>
        </div>
      </div>

      {/* API Requests Card */}
      <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl p-6 shadow-lg shadow-purple-500/20 text-white relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition-transform duration-500">
           <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
        </div>
        <div className="relative z-10">
            <h4 className="text-white/80 font-semibold uppercase tracking-wider text-sm mb-1">API Requests</h4>
            <div className="text-4xl font-extrabold">{metrics.totalApiRequests.toLocaleString()}</div>
            <p className="text-white/70 text-sm mt-2">PUT, GET, DELETE calls</p>
        </div>
      </div>
    </div>
  );
}
