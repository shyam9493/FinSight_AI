import {pool} from './config/db';

const createTables = async () => {
  try {
    const query = `
      
    `;

    await pool.query(query);
    console.log("✅ Tables created successfully");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  } finally {
    await pool.end();
  }
};

createTables();
