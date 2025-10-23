import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { Environment } from './env';

dotenv.config();

const app = express();
const port = Environment.PORT || 3000;

export const pool = new Pool({
  connectionString: Environment.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => { console.log('✅ Connected to PostgreSQL database'); });

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
