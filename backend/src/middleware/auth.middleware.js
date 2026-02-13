import pool from "../db/index.js";

export async function apiKeyAuth(req, res, next) {
   

  try {
    const apiKey = req.header("x-api-key");
 
    if (!apiKey) {
      return res.status(401).json({ error: "API key missing" });
    }

    const result = await pool.query(
      "SELECT id, email, plan_type FROM users WHERE api_key = $1",
      [apiKey]
    );
  
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    // attach user context
    req.user = result.rows[0];
     
    next();
  } catch (err) {
    return res.status(500).json({ error: "Authentication failed" });
  }
  
}
