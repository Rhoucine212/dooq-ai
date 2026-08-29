import fs from 'node:fs/promises';
import pg from 'pg';
import { seedCasablancaRestaurants } from './data/casablanca-seed.mjs';

export async function ensureDatabaseSchema() {
  if (!process.env.DATABASE_URL) {
    console.warn('Dooq AI database initialization skipped: DATABASE_URL is not configured');
    return { configured: false, initialized: false, seed: null };
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
    const seed = await seedCasablancaRestaurants(client);
    console.log('Dooq AI database schema ready', seed);
    return { configured: true, initialized: true, seed };
  } finally {
    await client.end();
  }
}
