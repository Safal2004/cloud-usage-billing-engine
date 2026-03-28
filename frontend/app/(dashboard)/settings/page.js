"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
    const [apiKey, setApiKey] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const key = localStorage.getItem("apiKey");
        if (key) setApiKey(key);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
                <p className="text-slate-500 mt-2 text-lg font-medium">Manage your API keys and account preferences.</p>
            </header>

            <section className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-indigo-100 transition-colors duration-300 max-w-3xl">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                    API Key Management
                </h2>
                
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-4 font-medium">Your current API Key for accessing the cloud storage API:</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 font-mono text-sm w-full shadow-sm truncate overflow-hidden">
                            {apiKey || "Loading..."}
                        </div>
                        <button 
                            onClick={handleCopy}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-indigo-200 whitespace-nowrap w-full sm:w-auto"
                        >
                            {copied ? "Copied!" : "Copy Key"}
                        </button>
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-4">
                        Keep this key secret. Do not expose it in public repositories or client-side code.
                    </p>
                </div>
            </section>
        </div>
    );
}
