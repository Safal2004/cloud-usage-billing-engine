"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import UploadForm from "../components/UploadForm";
import InvoiceSection from "../components/InvoiceSection";
import ObjectList from "../components/ObjectList";
import UsageGraph from "../components/UsageGraph";
import UsageSummaryCards from "../components/UsageSummaryCards";

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("apiKey");
        router.push("/login");
    };

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-10 min-h-screen">
            <header className="mb-6 text-center md:text-left bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(37,99,235,0.2)]">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Cloud Console</h1>
                    <div className="flex space-x-4 mt-6 md:mt-0">
                        <Link href="/invoices" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300">
                            Billing History
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="px-6 py-3 bg-red-500/90 border border-red-400 text-white font-bold rounded-xl hover:bg-red-600 transition-all duration-300 shadow-none"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <p className="text-lg md:text-xl opacity-90 mt-4 md:max-w-2xl font-medium leading-relaxed">
                    Manage your storage, monitor usage, and generate invoices seamlessly from this unified interface.
                </p>
            </header>

            <UsageSummaryCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <UploadForm />
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <InvoiceSection />
                </section>

                <section className="col-span-1 lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <UsageGraph />
                </section>

                <section className="col-span-1 lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <ObjectList />
                </section>
            </div>
        </main>
    );
}
