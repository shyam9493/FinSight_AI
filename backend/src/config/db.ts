import { Pool } from 'pg';
import { Environment } from '../env';

export const pool = new Pool({
  connectionString: Environment.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => { console.log('✅ Connected to PostgreSQL database'); });
