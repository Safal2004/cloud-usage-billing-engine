import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database:process.env.DB_NAME,
  password:String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

export default pool;
