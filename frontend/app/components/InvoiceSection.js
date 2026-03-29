// "use client";
// import { apiRequest } from "../utils/api";

// export default function InvoiceSection() {
//   const generateInvoice = async () => {
//     const data = await apiRequest("/billing/generate", "POST", {
//       startDate: "2026-02-01",
//       endDate: "2026-02-28",
//     });

//     alert(`Total Bill: ₹${data.totalCost}`);
//   };

//   return (
//     <div>
//       <h3>Invoice</h3>
//       <button onClick={generateInvoice}>View Invoice</button>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { apiRequest } from "../utils/api";

export default function InvoiceSection() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInvoice = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/billing/generate", "POST", { startDate, endDate });
      setInvoice(data);
    } catch (e) {
      alert(`Billing Error: ${e.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        Billing & Metrics
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Start Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-base bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">End Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-base bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button 
        onClick={generateInvoice} 
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-[0.98]"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Generate Invoice"}
      </button>

      {invoice && (
        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">Storage Cost</p>
            <p className="text-2xl font-black text-gray-900">₹{invoice.storageCost}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <p className="text-sm text-purple-600 font-bold uppercase tracking-wider mb-1">API Cost</p>
            <p className="text-2xl font-black text-gray-900">₹{invoice.apiCost}</p>
          </div>
          <div className="col-span-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-5 text-white shadow-lg shadow-indigo-500/30">
            <p className="text-base text-indigo-100 font-semibold uppercase tracking-widest mb-1">Total Bill</p>
            <p className="text-4xl font-extrabold">₹{invoice.totalCost}</p>
          </div>
        </div>
      )}
    </div>
  );
}