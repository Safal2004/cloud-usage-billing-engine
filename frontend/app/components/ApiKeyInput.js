"use client";
import { useState, useEffect } from "react";

export default function ApiKeyInput() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("apiKey");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveKey = () => {
    localStorage.setItem("apiKey", apiKey);
    alert("API key saved");
  };

  return (
    <div>
      <h3>API Key</h3>
      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter API key"
      />
      <button onClick={saveKey}>Save</button>
    </div>
  );
}
