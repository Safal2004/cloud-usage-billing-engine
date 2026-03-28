"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/api";
import toast from "react-hot-toast";

export default function BucketsPage() {
    const [buckets, setBuckets] = useState([]);
    const [newBucketName, setNewBucketName] = useState("");

    const loadBuckets = async () => {
        const data = await apiRequest("/buckets/list", "GET");
        setBuckets(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        loadBuckets();
    }, []);

    const createBucket = async (e) => {
        e.preventDefault();
        if (!newBucketName.trim()) {
            toast.error("Please enter a bucket name");
            return;
        }
        
        try {
            await apiRequest("/buckets/create", "POST", { name: newBucketName });
            setNewBucketName("");
            toast.success("Bucket created successfully");
            loadBuckets();
        } catch (error) {
            toast.error(error.message || "Failed to create bucket");
        }
    };

    const deleteBucket = async (bucket_id) => {
        if (!confirm("Are you sure you want to delete this bucket?")) return;
        
        try {
            await apiRequest("/buckets/delete", "DELETE", { bucket_id });
            toast.success("Bucket deleted successfully");
            loadBuckets();
        } catch (error) {
            toast.error(error.message || "Failed to delete bucket");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Buckets</h1>
                <p className="text-slate-500 mt-2 text-lg font-medium">Create and manage your storage buckets.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="col-span-1 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                        Create Bucket
                    </h2>
                    <form onSubmit={createBucket} className="flex-1 flex flex-col justify-center">
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-4" 
                            placeholder="Enter bucket name" 
                            value={newBucketName}
                            onChange={(e) => setNewBucketName(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all">
                            Create Bucket
                        </button>
                    </form>
                </section>
                
                <section className="col-span-1 lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                        Your Buckets
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Bucket Name</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {buckets.map((bucket, i) => (
                                    <tr key={i} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-base font-medium text-gray-900">{bucket.name}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                                            <button 
                                                onClick={() => deleteBucket(bucket.id)}
                                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors shadow-none"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {buckets.length === 0 && (
                            <div className="px-6 py-12 text-center text-gray-500 text-base">
                                No buckets found. Create one to get started!
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
