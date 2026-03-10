import express from "express";
import { createUser } from "../services/user.service.js";

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const { name, email } = req.body;

    const user = await createUser(name, email);

    res.json({
      message: "User created",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

export default router;