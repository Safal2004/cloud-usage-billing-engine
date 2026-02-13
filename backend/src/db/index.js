import "dotenv/config";
import pg from "pg";
const { Pool } = pg;

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database:process.env.DB_NAME,
//   password:String(process.env.DB_PASSWORD),
//   port: process.env.DB_PORT,
// });


const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database:"usage_metering",
  password:"safal12345",
  port: 5432,
});

export default pool;
