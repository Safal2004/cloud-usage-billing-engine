"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export default function ObjectList() {
  const [objects, setObjects] = useState([]);

  const loadObjects = async () => {
    const data = await apiRequest("/usage/storage/list", "GET");
    setObjects(data);
  };

  const getObject = async (key) => {
  await apiRequest("/usage/storage/get", "POST", {
    object_key: key
  });

  alert("GET event recorded");
};

  const deleteObject = async (key) => {
    await apiRequest("/usage/storage/delete", "POST", {
      object_key: key
    });

    alert("Object deleted");

    loadObjects(); // refresh list
  };

  useEffect(() => {
    loadObjects();
  }, []);

  return (
    <div>
      <h3>Stored Objects</h3>

      <button onClick={loadObjects}>Refresh</button>

      <ul>
        {objects.map((obj, i) => (

           <li key={i}>
  {obj.object_key} ({obj.object_size_mb} MB)

  <button onClick={() => getObject(obj.object_key)}>
    GET
  </button>
           
            <button onClick={() => deleteObject(obj.object_key)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}