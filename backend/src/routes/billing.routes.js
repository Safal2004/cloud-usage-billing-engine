import express from "express";
import { generateMonthlyInvoice } from "../services/billing.service.js";
import { apiKeyAuth } from "../middleware/auth.middleware.js";
const router = express.Router();
router.use(apiKeyAuth);
router.post("/generate", async (req, res) => {
  console.log("Invoice request received", req.user);
  // const { user_id, startDate, endDate } = req.body;
  const { startDate, endDate } = req.body;
const user_id = req.user.id;
  try {
    const invoice = await generateMonthlyInvoice(
      user_id,
      startDate,
      endDate
    );
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;