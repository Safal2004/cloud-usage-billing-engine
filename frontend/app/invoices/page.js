"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InvoiceHistoryPage() {
    const router = useRouter();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimulatedHistory = async () => {
            try {
                // Simulate fetching past invoices
                // Since the backend currently generates invoice dynamically for a date range, 
                // we'll explicitly generate it for the last 3 months just as a display mockup,
                // or ideally fetch from an invoice table. Here we dynamically fetch 3 months just to show off.
                
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

    const handleLogout = () => {
        localStorage.removeItem("apiKey");
        router.push("/login");
    };

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen bg-slate-50">
            {/* Header / Navigation */}
            <nav className="mb-10 flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"></path></svg>
                    <h1 className="text-2xl font-bold text-gray-900">Billing History</h1>
                </div>
                <div className="flex space-x-4">
                    <Link href="/dashboard" className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors">
                        Back to Dashboard
                    </Link>
                    <button onClick={handleLogout} className="px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors shadow-none">
                        Logout
                    </button>
                </div>
            </nav>

            {/* List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Past Invoices</h2>
                        <p className="text-sm text-gray-500 mt-1">View and download your historically generated bills.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-500">Generating invoice history...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Billing Period</th>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Storage</th>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">API</th>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-8 py-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {invoices.map((inv, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-indigo-600">{inv.id}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-900">{inv.month}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">₹{parseFloat(inv.storageCost).toFixed(2)}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-600">₹{parseFloat(inv.apiCost).toFixed(2)}</td>
                                        <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-900">₹{parseFloat(inv.totalCost).toFixed(2)}</td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-lg ml-2 shadow-none" onClick={() => alert("Downloading PDF (Simulated)")}>
                                                Download PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}
