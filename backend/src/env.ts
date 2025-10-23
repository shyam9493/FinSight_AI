import dotenv from 'dotenv';
dotenv.config();

export const Environment ={
    DATABASE_URL: process.env.DATABASE_URL || '',
    PORT: process.env.PORT || 5000,
}