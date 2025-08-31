import { defineConfig } from "drizzle-kit";

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL, ensure the database is provisioned");
// }
const DATABASE_URL="postgresql://neondb_owner:npg_AtJ0m2ilKLMY@ep-ancient-resonance-a1uy1nn0-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
