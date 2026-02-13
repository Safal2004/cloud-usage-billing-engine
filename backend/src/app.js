import express from "express";
import dotenv from "dotenv";
import usageRoutes from "./routes/usage.routes.js";
import billingRoutes from "./routes/billing.routes.js";

// const cors = require("cors");

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));


dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Service running" });
});

app.use("/usage", usageRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//day6
app.use("/billing", billingRoutes);
