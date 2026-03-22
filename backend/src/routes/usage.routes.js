// import express from "express";
// import { recordStorageEvent,recordApiUsage, } from "../services/metering.service.js";
// import { apiKeyAuth } from "../middleware/auth.middleware.js";

// const router = express.Router();
// router.use(apiKeyAuth); //everythings below this rquries api key


// router.post("/storage", async (req, res) => {
//   try {
//     await recordStorageEvent(req.user.id, req.body); //user id ko req.user.id se liya
//     res.status(201).json({ message: "Storage event recorded" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post("/api", async (req, res) => {
//   try {
//     await recordApiUsage(req.user.id, req.body);
//     res.status(201).json({ message: "API usage recorded" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
  

// export default router;

import express from "express";
import { apiKeyAuth } from "../middleware/auth.middleware.js";
import { createObject, deleteObject } from "../services/object.service.js";
import pool from "../db/index.js";
import { recordStorageEvent, recordApiUsage } from "../services/metering.service.js";

const router = express.Router();
router.use(apiKeyAuth);

// Upload object (PUT)
router.post("/storage/upload", async (req, res) => {
  try {
    const object = await createObject(req.user.id, req.body);

    await recordStorageEvent(req.user.id, {
      bucket_id: object.bucket_id,
      object_key: object.object_key,
      object_size_mb: object.object_size_mb,
      operation_type: "PUT",
    });

    await recordApiUsage(req.user.id, { operation_type: "PUT" });


    res.status(201).json({ message: "Object uploaded", object });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete object (DELETE)
router.post("/storage/delete", async (req, res) => {
  try {
    const { object_key } = req.body;

    const object = await deleteObject(req.user.id, object_key);

    await recordStorageEvent(req.user.id, {
      bucket_id: object.bucket_id,
      object_key: object.object_key,
      object_size_mb: object.object_size_mb,
      operation_type: "DELETE",
    });
    await recordApiUsage(req.user.id, { operation_type: "DELETE" });

    res.json({ message: "Object deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post("/api", async (req, res) => {
  try {
    await recordApiUsage(req.user.id, req.body);
    res.json({ message: "API usage recorded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/storage/list", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT object_key, object_size_mb, status
       FROM objects
       WHERE user_id = $1 AND status = 'ACTIVE'`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.post("/storage/get", async (req, res) => {
  try {
    const { object_key } = req.body;

    // check object exists
    const result = await pool.query(
      `SELECT * FROM objects 
       WHERE user_id = $1 AND object_key = $2 AND status='ACTIVE'`,
      [req.user.id, object_key]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Object not found" });
    }

    const object = result.rows[0];

    // record storage event for GET
    await recordStorageEvent(req.user.id, {
      bucket_id: object.bucket_id,
      object_key: object.object_key,
      object_size_mb: object.object_size_mb,
      operation_type: "GET",
    });

    // record API usage
    await recordApiUsage(req.user.id, { operation_type: "GET" });

    res.json({ message: "Object retrieved (simulated)" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/api-usage", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT date, put_count, get_count, delete_count 
       FROM api_usage_daily 
       WHERE user_id = $1 
       ORDER BY date ASC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/summary", async (req, res) => {
  try {
    const objQuery = await pool.query(
      `SELECT COUNT(*) as exact_count, COALESCE(SUM(object_size_mb), 0) as total_size 
       FROM objects WHERE user_id = $1 AND status = 'ACTIVE'`, 
      [req.user.id]
    );
    const totalObjects = objQuery.rows[0].exact_count;
    const totalStorageMB = objQuery.rows[0].total_size;

    const apiQuery = await pool.query(
      `SELECT COALESCE(SUM(put_count + get_count + delete_count + list_count), 0) as total_api FROM api_usage_daily WHERE user_id = $1`,
      [req.user.id]
    );
    const totalApiRequests = apiQuery.rows[0].total_api;

    res.json({
        totalObjects: parseInt(totalObjects, 10),
        totalStorageMB: parseFloat(totalStorageMB).toFixed(2),
        totalApiRequests: parseInt(totalApiRequests, 10)
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
