import 'dotenv/config';
import fs from 'node:fs/promises';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not configured');
}

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

await client.connect();
try {
  const sql = await fs.readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
  await client.query(sql);
  console.log('Dooq AI database schema initialized');
} finally {
  await client.end();
}
