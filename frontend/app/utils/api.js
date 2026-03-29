export async function apiRequest(path, method = "GET", body) {
  const apiKey = localStorage.getItem("apiKey");

  if (!apiKey) {
    throw new Error("API key not set");
  }

  const res = await fetch(`https://cloud-usage-billing-engine.onrender.com${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Request failed");
  }

  return res.json();
}
