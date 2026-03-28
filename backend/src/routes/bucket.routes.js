import express from "express";
import { apiKeyAuth } from "../middleware/auth.middleware.js";
import pool from "../db/index.js";

const router = express.Router();
router.use(apiKeyAuth);

// Create a bucket
router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Bucket name is required" });
    }

    const result = await pool.query(
      `INSERT INTO buckets (user_id, bucket_name) VALUES ($1, $2) RETURNING id, user_id, bucket_name as name, created_at`,
      [req.user.id, name]
    );

    res.status(201).json({ message: "Bucket created", bucket: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') { // Unique violation
      return res.status(400).json({ error: "Bucket name already exists" });
    }
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List buckets
router.get("/list", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, user_id, bucket_name as name, created_at FROM buckets WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a bucket
router.delete("/delete", async (req, res) => {
  try {
    const { bucket_id } = req.body;
    if (!bucket_id) {
      return res.status(400).json({ error: "bucket_id is required" });
    }

    // Optionally check if bucket is empty before deleting
    const objectsResult = await pool.query(
      `SELECT id FROM objects WHERE bucket_id = $1 AND status = 'ACTIVE' LIMIT 1`,
      [bucket_id]
    );

    if (objectsResult.rows.length > 0) {
      return res.status(400).json({ error: "Cannot delete a non-empty bucket" });
    }

    const result = await pool.query(
      `DELETE FROM buckets WHERE id = $1 AND user_id = $2 RETURNING *`,
      [bucket_id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bucket not found" });
    }

    res.json({ message: "Bucket deleted", bucket: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
