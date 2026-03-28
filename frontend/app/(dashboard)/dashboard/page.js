"use client";

import UsageSummaryCards from "../../components/UsageSummaryCards";
import UsageGraph from "../../components/UsageGraph";

export default function DashboardOverview() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h1>
                <p className="text-slate-500 mt-2 text-lg font-medium">Monitor your cloud storage and usage statistics.</p>
            </header>

            <UsageSummaryCards />
            
            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-indigo-100 transition-colors duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                    Usage Analytics
                </h2>
                <UsageGraph />
            </section>
        </div>
    );
}
