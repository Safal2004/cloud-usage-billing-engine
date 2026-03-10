import pool from "../db/index.js";
import crypto from "crypto";

export async function createUser(name, email) {

  const apiKey = crypto.randomBytes(32).toString("hex");

  const result = await pool.query(
    `
    INSERT INTO users (name, email, api_key)
    VALUES ($1,$2,$3)
    RETURNING id,name,email,api_key
    `,
    [name, email, apiKey]
  );

  return result.rows[0];
}