"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import toast from "react-hot-toast";

export default function ObjectList() {
  const [objects, setObjects] = useState([]);

  const loadObjects = async () => {
    const data = await apiRequest("/usage/storage/list", "GET");
    setObjects(Array.isArray(data) ? data : []);
  };

  const getObject = async (bucket_id, key) => {
    try {
      await apiRequest("/usage/storage/get", "POST", { bucket_id, object_key: key });
      toast.success(`GET request recorded for ${key}`);
    } catch (e) {
      toast.error(e.message || "Failed to retrieve object");
    }
  };

  const deleteObject = async (bucket_id, key) => {
    try {
      await apiRequest("/usage/storage/delete", "POST", { bucket_id, object_key: key });
      toast.success(`Object ${key} deleted successfully`);
      loadObjects(); // refresh list
    } catch (e) {
      toast.error(e.message || "Failed to delete object");
    }
  };

  useEffect(() => {
    loadObjects();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 m-0 border-0 pb-0 flex items-center">
          <svg className="w-6 h-6 mr-2 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
          Stored Objects
        </h3>
        <button
          onClick={loadObjects}
          className="flex items-center text-base px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors font-medium shadow-none"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Object Key</th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Bucket Name</th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Size (MB)</th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {objects.map((obj, i) => (
              <tr key={i} className="hover:bg-sky-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                    <span className="text-base font-medium text-gray-900">{obj.object_key}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                  {obj.bucket_name || obj.bucket_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600">
                  {obj.object_size_mb} MB
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                  <button
                    onClick={() => getObject(obj.bucket_id, obj.object_key)}
                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md ml-2 transition-colors shadow-none"
                  >
                    GET
                  </button>
                  <button
                    onClick={() => deleteObject(obj.bucket_id, obj.object_key)}
                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md ml-2 transition-colors shadow-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {objects.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500 text-base flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            No objects found. Upload something to get started!
          </div>
        )}
      </div>
    </div>
  );
}