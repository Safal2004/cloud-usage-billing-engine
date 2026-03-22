"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const register = async () => {
        const res = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        alert("Registered! Now login.");
        router.push("/login");
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6">
            <div className="max-w-4xl w-full flex flex-col md:flex-row-reverse bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
                {/* Branding Side */}
                <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Join the Cloud</h1>
                        <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                            Create your account to start managing objects, inspecting billing metrics, and utilizing S3-compatible endpoints instantly.
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white relative">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-500 mb-8">Sign up for a free developer tier</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input 
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900 font-medium" 
                                placeholder="developer@example.com" 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input 
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900 font-medium" 
                                placeholder="••••••••" 
                                type="password" 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>

                        <button 
                            className="w-full py-4 px-6 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform active:scale-[0.98]" 
                            onClick={register}
                        >
                            Sign Up
                        </button>
                    </div>

                    <p className="text-center mt-10 text-gray-500 font-medium text-sm">
                        Already have an account? <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">Sign in here</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}