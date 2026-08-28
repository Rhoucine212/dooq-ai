import fs from 'node:fs/promises';
import pg from 'pg';

export async function ensureDatabaseSchema() {
  if (!process.env.DATABASE_URL) {
    console.warn('Dooq AI database initialization skipped: DATABASE_URL is not configured');
    return { configured: false, initialized: false };
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
    console.log('Dooq AI database schema ready');
    return { configured: true, initialized: true };
  } finally {
    await client.end();
  }
}
