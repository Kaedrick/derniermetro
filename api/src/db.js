const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "app",
  password: process.env.PGPASSWORD || "app",
  database: process.env.PGDATABASE || "dernier_metro",
  port: Number(process.env.PGPORT || 5432),
  max: 5,
  idleTimeoutMillis: 10000
});

module.exports = pool;
