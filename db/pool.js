const { Pool } = require("pg");
require("dotenv").config();

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;

const pool = new Pool({
  host: PGHOST,
  user: PGUSER,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
