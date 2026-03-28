"use client";

import UploadForm from "../../components/UploadForm";
import ObjectList from "../../components/ObjectList";

export default function ObjectsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Objects</h1>
                <p className="text-slate-500 mt-2 text-lg font-medium">Upload, view, and organize your storage items.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="col-span-1 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-indigo-100 transition-colors duration-300 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                        Upload File
                    </h2>
                    <div className="flex-1 flex flex-col justify-center">
                        <UploadForm />
                    </div>
                </section>
                
                <section className="col-span-1 lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-indigo-100 transition-colors duration-300">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                        Storage Items
                    </h2>
                    <ObjectList />
                </section>
            </div>
        </div>
    );
}
