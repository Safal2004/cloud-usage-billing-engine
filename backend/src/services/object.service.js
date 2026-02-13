import pool from "../db/index.js";

export async function createObject(userId, data) {
  const { bucket_id, object_key, object_size_mb } = data;

  const result = await pool.query(
    `
    INSERT INTO objects
      (user_id, bucket_id, object_key, object_size_mb, status)
    VALUES ($1, $2, $3, $4, 'ACTIVE')
    RETURNING *
    `,
    [userId, bucket_id, object_key, object_size_mb]
  );

  return result.rows[0];
}

export async function deleteObject(userId, objectKey) {
  const result = await pool.query(
    `
    UPDATE objects
    SET status = 'DELETED',
        deleted_at = NOW()
    WHERE user_id = $1
      AND object_key = $2
      AND status = 'ACTIVE'
    RETURNING *
    `,
    [userId, objectKey]
  );

  if (result.rows.length === 0) {
    throw new Error("Object not found or already deleted");
  }

  return result.rows[0];
}
