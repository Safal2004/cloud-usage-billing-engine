import express from "express";
import dotenv from "dotenv";
import usageRoutes from "./routes/usage.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bucketRoutes from "./routes/bucket.routes.js";
// const cors = require("cors");



dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Service running" });
});

app.use("/usage", usageRoutes);
app.use("/buckets", bucketRoutes);

const PORT = process.env.PORT || 4000;
app.use("/billing", billingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//day6
