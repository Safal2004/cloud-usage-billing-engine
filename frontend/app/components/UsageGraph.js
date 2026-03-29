"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function UsageGraph() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usageData = await apiRequest("/usage/api-usage", "GET");
        // Group by cleaner date string to avoid duplicate labels
        const aggregated = (usageData || []).reduce((acc, item) => {
            const d = new Date(item.date);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            if (!acc[dateStr]) {
                acc[dateStr] = { date: dateStr, PUT: 0, GET: 0, DELETE: 0 };
            }
            
            acc[dateStr].PUT += parseInt(item.put_count || 0, 10);
            acc[dateStr].GET += parseInt(item.get_count || 0, 10);
            acc[dateStr].DELETE += parseInt(item.delete_count || 0, 10);
            
            return acc;
        }, {});

        setData(Object.values(aggregated));
      } catch (e) {
        console.error("Failed to load graph data", e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 m-0 border-0 pb-0 flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
            API Usage Over Time
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-400">Loading metrics...</div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-400">No usage data found. Start making API requests!</div>
      ) : (
        <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                    <YAxis tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="PUT" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="GET" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="DELETE" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
