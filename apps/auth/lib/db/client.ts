import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

function resolveDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not configured. Update apps/auth/.env with a valid Postgres connection string."
    );
  }

  try {
    // Validate early to surface friendly errors instead of pg-connection-string crashes.
    new URL(connectionString);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`DATABASE_URL is invalid. Received "${connectionString}". Details: ${reason}`);
  }

  return connectionString;
}

const pool = new Pool({
  connectionString: resolveDatabaseUrl(),
});

export const db = drizzle(pool, { schema });
