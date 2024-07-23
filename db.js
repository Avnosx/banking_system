// db.js
import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'banking_system',
  password: 'soumyasovan123',
  port: 5000,
});

export default pool;
