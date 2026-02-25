import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export async function query<T>(text: string, params?: unknown[]) {
  const result = await pool.query<T>(text, params);
  return result;
}

export async function checkDbConnection() {
  await pool.query("SELECT 1");
}
