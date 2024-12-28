// Import necessary modules
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Database host from environment variables
    user: process.env.DB_USER, // Database user
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
    port: process.env.DB_PORT || 3306, // Database port, default to 3306 if not provided
    waitForConnections: true, // Enable waiting for free connections
    connectionLimit: 10, // Maximum number of connections in the pool
    queueLimit: 0, // Unlimited number of queued connection requests
});

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool
        console.log('Database is successfully connected!');
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('Error connecting to the database:', error.message); // Log connection error
    }
})();

// Export the pool for use in other files
export default pool;
