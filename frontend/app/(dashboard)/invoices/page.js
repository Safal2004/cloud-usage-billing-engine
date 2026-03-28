"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";

export default function InvoiceHistoryPage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimulatedHistory = async () => {
            try {
                const now = new Date();
                const pastMonths = [];
                for(let i=0; i<3; i++) {
                    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
                    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
                    
                    const data = await apiRequest("/billing/generate", "POST", {
                        startDate: start.toISOString().split('T')[0],
                        endDate: end.toISOString().split('T')[0]
                    });
                    
                    pastMonths.push({
                        month: start.toLocaleString('default', { month: 'long', year: 'numeric' }),
                        ...data,
                        id: `INV-${start.getFullYear()}${(start.getMonth()+1).toString().padStart(2, '0')}-001`,
                        status: i === 0 ? "Pending" : "Paid"
                    });
                }
                setInvoices(pastMonths);
            } catch (error) {
                console.error("Error loading invoice history", error);
            }
            setLoading(false);
        };
        fetchSimulatedHistory();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Billing History</h1>
                <p className="text-slate-500 mt-2 text-lg font-medium">View and download your historically generated bills.</p>
            </header>

            <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-indigo-100 transition-colors duration-300 overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                        Past Invoices
                    </h2>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-4">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="font-medium animate-pulse">Generating invoice history...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead className="bg-slate-50/80">
                                <tr>
                                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Billing Period</th>
                                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Storage</th>
                                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">API</th>
                                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Total</th>
                                    <th className="px-8 py-5 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-right text-sm font-bold text-slate-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-50">
                                {invoices.map((inv, idx) => (
                                    <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-8 py-6 whitespace-nowrap text-base font-bold text-indigo-600 group-hover:text-indigo-700">{inv.id}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-base font-semibold text-slate-900">{inv.month}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-base text-slate-600">₹{parseFloat(inv.storageCost).toFixed(2)}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-base text-slate-600">₹{parseFloat(inv.apiCost).toFixed(2)}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-base font-black text-slate-900">₹{parseFloat(inv.totalCost).toFixed(2)}</td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className={`px-4 py-1.5 inline-flex text-sm leading-5 font-bold rounded-full ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-right text-base font-medium">
                                            <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 px-5 py-2.5 rounded-xl transition-all font-bold shadow-sm" onClick={() => alert("Downloading PDF (Simulated)")}>
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
