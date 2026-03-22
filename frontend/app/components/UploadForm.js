// "use client";
// import { useState } from "react";
// import { apiRequest } from "../utils/api";

// export default function UploadForm() {
//   const [objectKey, setObjectKey] = useState("");
//   const [size, setSize] = useState("");

//   const upload = async () => {
//     await apiRequest("/usage/storage/upload", "POST", {
//       bucket_id: 1,
//       object_key: objectKey,
//       object_size_mb: Number(size),
//     });
//     alert("Object uploaded");
//   };

//   return (
//     <div>
//       <h3>Upload Object</h3>
//       <input
//         placeholder="File name (object key)"
//         value={objectKey}
//         onChange={(e) => setObjectKey(e.target.value)}
//       />
//       <input
//         placeholder="Size (MB)"
//         value={size}
//         onChange={(e) => setSize(e.target.value)}
//       />
//       <button onClick={upload}>Upload</button>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { apiRequest } from "../utils/api";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const objectKey = file.name;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

    await apiRequest("/usage/storage/upload", "POST", {
      bucket_id: 1,
      object_key: objectKey,
      object_size_mb: Number(sizeMB)
    });

    alert("Object uploaded successfully");
    setFile(null); // Reset after upload
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
        Upload Object
      </h3>

      <div className="mt-2 flex-grow flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-white hover:border-blue-400 transition-colors relative">
        {!file ? (
            <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 px-1">
                        <span>Upload a file</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <p className="pl-1 inline">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">Any file up to 5TB</p>
            </div>
        ) : (
            <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-semibold text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button onClick={() => setFile(null)} className="mt-2 text-xs text-red-500 hover:text-red-700 bg-transparent shadow-none p-0 inline">Remove</button>
            </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button 
            disabled={!file}
            className={`px-6 py-2.5 rounded-xl font-bold shadow-sm transition-all ${!file ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'}`}
            onClick={upload}
        >
            Start Upload
        </button>
      </div>
    </div>
  );
}
