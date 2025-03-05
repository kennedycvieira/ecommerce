const { Pool } = require('pg');
require('dotenv').config();
// Database connection configuration
const connectionConfig = {
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  port: 5432,
  database: process.env.db_dbname,
  
  // Pool-specific configuration
  max: 20,                    // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,   // How long a client is allowed to remain idle
  connectionTimeoutMillis: 2000, // How long to wait when connecting to a client
};

// Create a new connection pool
const pool = new Pool(connectionConfig);


async function query(query, args){
  try {
    // Attempt to get a client from the pool
    const client = await pool.connect();

    try {
      // Run a simple query to verify the connection
      const result = await client.query(query,args);
    
      return result;
    } catch (queryError) {
      console.error('❌ Database query failed:', queryError.message);
      return false;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (connectionError) {
    // Handle connection errors
    console.error('❌ Database connection failed:', connectionError.message);
    return false;
  }
}

// Function to test database connection
async function testDatabaseConnection() {
  try {
    // Attempt to get a client from the pool
    const client = await pool.connect();

    try {
      // Run a simple query to verify the connection
      const result = await client.query('SELECT NOW()');
      console.log('✅ Database connection successful!');
      console.log('Current database time:', result.rows[0].now);
      return true;
    } catch (queryError) {
      console.error('❌ Database query failed:', queryError.message);
      return false;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  } catch (connectionError) {
    // Handle connection errors
    console.error('❌ Database connection failed:', connectionError.message);
    return false;
  }
}

// Function to gracefully shut down the pool
async function closePool() {
  try {
    await pool.end();
    console.log('Database connection pool closed');
  } catch (error) {
    console.error('Error closing connection pool:', error);
  }
}

// Export the configuration, pool, and functions
module.exports = {
  connectionConfig,
  pool,
  testDatabaseConnection,
  closePool,
  query
};