import pool from "../db/index.js";

export async function recordStorageEvent(userId, data) {
  const {
    bucket_id,
    object_key,
    object_size_mb,
    operation_type,
  } = data;

  const query = `
    INSERT INTO object_usage_events
    (user_id, bucket_id, object_key, object_size_mb, operation_type, event_time)
    VALUES ($1, $2, $3, $4, $5, NOW())
  `;

  await pool.query(query, [
    userId,
    bucket_id,
    object_key,
    object_size_mb,
    operation_type,
  ]);
}

export async function recordApiUsage(userId, data) {
  const { operation_type } = data;

  const counters = {
    PUT: [1, 0, 0, 0],
    GET: [0, 1, 0, 0],
    DELETE: [0, 0, 1, 0],
    LIST: [0, 0, 0, 1],
  };

  const values = counters[operation_type];
  if (!values) throw new Error("Invalid operation type");

  const query = `
    INSERT INTO api_usage_daily
      (user_id, date, put_count, get_count, delete_count, list_count)
    VALUES ($1, CURRENT_DATE, $2, $3, $4, $5)
    ON CONFLICT (user_id, date)
    DO UPDATE SET
      put_count = api_usage_daily.put_count + EXCLUDED.put_count,
      get_count = api_usage_daily.get_count + EXCLUDED.get_count,
      delete_count = api_usage_daily.delete_count + EXCLUDED.delete_count,
      list_count = api_usage_daily.list_count + EXCLUDED.list_count
  `;

  await pool.query(query, [userId, ...values]);
}
