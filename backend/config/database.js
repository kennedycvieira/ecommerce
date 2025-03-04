const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  port: 5432,
  database: process.env.db_dbname,
});
/*
export default async function runCommand() {
  const client = await pool.connect();
  const data = await client.query("${COMMAND}");
  await client.release();
  return data;
}
*/
module.exports = {
    query: (text, params) => pool.query(text, params),
  };