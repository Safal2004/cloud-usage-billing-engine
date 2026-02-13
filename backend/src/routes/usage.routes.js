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
import { recordStorageEvent } from "../services/metering.service.js";

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

    res.json({ message: "Object deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
