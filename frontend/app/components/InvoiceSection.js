// "use client";
// import { apiRequest } from "../utils/api";

// export default function InvoiceSection() {
//   const generateInvoice = async () => {
//     const data = await apiRequest("/billing/generate", "POST", {
//       startDate: "2026-02-01",
//       endDate: "2026-02-28",
//     });

//     alert(`Total Bill: ₹${data.totalCost}`);
//   };

//   return (
//     <div>
//       <h3>Invoice</h3>
//       <button onClick={generateInvoice}>View Invoice</button>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { apiRequest } from "../utils/api";

export default function InvoiceSection() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoice, setInvoice] = useState(null);

  const generateInvoice = async () => {
    const data = await apiRequest("/billing/generate", "POST", {
      startDate,
      endDate
    });

    setInvoice(data);
  };

  return (
    <div>
      <h3>Invoice</h3>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button onClick={generateInvoice}>Generate Invoice</button>

      {invoice && (
        <div style={{ marginTop: "10px", border: "1px solid gray", padding: "10px" }}>
          <p><b>Storage Cost:</b> ₹{invoice.storageCost}</p>
          <p><b>API Cost:</b> ₹{invoice.apiCost}</p>
          <p><b>Total Cost:</b> ₹{invoice.totalCost}</p>
        </div>
      )}
    </div>
  );
}