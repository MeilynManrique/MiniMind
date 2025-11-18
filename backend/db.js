// db.js
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false, // Neon usa SSL obligatorio
  },
});

export default pool;
