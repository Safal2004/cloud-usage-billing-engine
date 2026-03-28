"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { 
    LayoutDashboard, 
    Database, 
    CreditCard, 
    Receipt, 
    Settings,
    LogOut,
    Menu,
    X,
    Cloud,
    HardDrive
} from "lucide-react";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Auth Check
    useEffect(() => {
        const apiKey = localStorage.getItem("apiKey");
        if (!apiKey) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("apiKey");
        router.push("/login");
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Buckets", href: "/buckets", icon: HardDrive },
        { name: "Objects", href: "/objects", icon: Database },
        { name: "Generate Bill", href: "/billing", icon: CreditCard },
        { name: "Invoices", href: "/invoices", icon: Receipt },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
            <Toaster position="top-right" />
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity" 
                    onClick={() => setSidebarOpen(false)} 
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-6 h-20 border-b border-slate-100">
                    <div className="flex items-center space-x-3 text-indigo-600">
                        <Cloud className="w-8 h-8 drop-shadow-sm" />
                        <span className="text-2xl font-black tracking-tight text-slate-900">CloudOS</span>
                    </div>
                    <button className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors" onClick={() => setSidebarOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
                    <p className="px-4 text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Main Menu</p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`group flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-base ${isActive ? 'bg-indigo-600 shadow-[0_4px_12px_rgba(79,70,229,0.3)] text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                            >
                                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600 group-hover:scale-110'}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 mt-auto">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl transition-all duration-300 text-slate-600 hover:bg-red-50 hover:text-red-600 font-semibold text-base group"
                    >
                        <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 h-16 shadow-sm z-30 relative">
                    <div className="flex items-center space-x-2 text-indigo-600">
                        <Cloud className="w-6 h-6" />
                        <span className="font-bold text-slate-900 tracking-tight">CloudOS</span>
                    </div>
                    <button className="text-slate-500 hover:text-slate-900 bg-slate-100 p-2 rounded-lg" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </button>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 relative">
                    <div className="absolute top-0 left-0 w-full h-64 bg-indigo-600/5 lg:bg-transparent pointer-events-none" />
                    <div className="max-w-7xl mx-auto w-full relative z-10 pb-20">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
