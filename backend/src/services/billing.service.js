import pool from "../db/index.js";

// const STORAGE_RATE = 0.02; // per GB per day
// const PUT_RATE = 0.01 / 100;
// const GET_RATE = 0.01 / 1000;

const STORAGE_RATE = 0.1;      // ₹0.1 per MB per day
const PUT_RATE = 1;          // ₹1 per PUT
const GET_RATE = 1;        // ₹1 per GET


export async function generateMonthlyInvoice(user_id, startDate, endDate) {

  // / API COST 

  const apiResult = await pool.query(
    `
    SELECT
      SUM(put_count) AS total_put,
      SUM(get_count) AS total_get
    FROM api_usage_daily
    WHERE user_id = $1
      AND date BETWEEN $2 AND $3
    `,
    [user_id, startDate, endDate]
  );

  const totalPut = Number(apiResult.rows[0].total_put || 0);
  const totalGet = Number(apiResult.rows[0].total_get || 0);

  const apiCost = totalPut * PUT_RATE + totalGet * GET_RATE;


  //  Storage cost 

  const storageResult = await pool.query(
    `
    SELECT
      object_size_mb,
      created_at,
      deleted_at
    FROM objects
    WHERE user_id = $1
      AND created_at <= $3
      AND (deleted_at IS NULL OR deleted_at >= $2)
    `,
    [user_id, startDate, endDate]
  );

  let storageCost = 0;

  const billingStart = new Date(startDate);
  const billingEnd = new Date(endDate);

  for (const obj of storageResult.rows) {

    const created = new Date(obj.created_at);
    const deleted = obj.deleted_at ? new Date(obj.deleted_at) : billingEnd;

    // overlap calculation
    const effectiveStart = created > billingStart ? created : billingStart;
    const effectiveEnd = deleted < billingEnd ? deleted : billingEnd;

    const durationMs = effectiveEnd - effectiveStart;

    if (durationMs > 0) {
      const durationHours = durationMs / (1000 * 60 * 60);
      const billableDays = Math.ceil(durationHours / 24);
      const sizeMB = parseFloat(obj.object_size_mb || 0);

      // Calculation: MB * days * rate
      storageCost += sizeMB * billableDays * STORAGE_RATE;
    }
  }

  const totalCost = Number(apiCost) + Number(storageCost);


  /* ---------------- INSERT INVOICE ---------------- */

  await pool.query(
    `
    INSERT INTO billing_invoices
    (user_id, billing_period_start, billing_period_end,
     storage_cost, api_cost, total_cost)
    VALUES ($1,$2,$3,$4,$5,$6)
    `,
    [user_id, startDate, endDate, storageCost, apiCost, totalCost]
  );


  return {
    storageCost,
    apiCost,
    totalCost
  };
}