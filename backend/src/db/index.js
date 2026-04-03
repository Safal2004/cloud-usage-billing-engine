import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

// Define connection string
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Check if variables exist to avoid Invalid URL errors
if (!process.env.DATABASE_URL && (!process.env.DB_HOST || !process.env.DB_USER)) {
  console.warn(" [DB] Warning: Connection parameters are missing. Database connection will fail.");
}

const pool = new Pool({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// Add connection log
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(' [DB] Connection error:', err.message);
  } else {
    console.log(' [DB] Connected successfully');
  }
});

export default pool;

