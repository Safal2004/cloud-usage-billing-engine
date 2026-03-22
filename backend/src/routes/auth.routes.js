import express from "express";
import pool from "../db/index.js";
import crypto from "crypto";

const router = express.Router();

// Generate API key
function generateApiKey() {
    return crypto.randomBytes(16).toString("hex");
}

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const apiKey = generateApiKey();

        const result = await pool.query(
            `INSERT INTO users (email, password, api_key)
       VALUES ($1, $2, $3)
       RETURNING id, email, api_key`,
            [email, password, apiKey]
        );

        res.json({
            message: "User registered",
            user: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            `SELECT id, email, api_key FROM users
       WHERE email = $1 AND password = $2`,
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;