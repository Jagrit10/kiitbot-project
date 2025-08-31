import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// if (!process.env.DATABASE_URL) {
//   throw new Error(
//     "DATABASE_URL must be set. Did you forget to provision a database?",
//   );
// }

const DATABASE_URL="postgresql://neondb_owner:npg_AtJ0m2ilKLMY@ep-ancient-resonance-a1uy1nn0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });

// Initialize database tables if they don't exist
export async function initializeDatabase() {
  try {
    console.log('Checking database connection...');
    
    // Test database connection
    await pool.query('SELECT 1');
    console.log('Database connection successful');
    
    // Note: Using memory store for sessions, so no sessions table needed
    
    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        profile_image_url VARCHAR,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}