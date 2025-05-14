import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'touchbistro',
  password: '',
  port: 5432,
});

export default pool;
