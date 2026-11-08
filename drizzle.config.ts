import { defineConfig } from 'drizzle-kit'

try {
  process.loadEnvFile('.env.local')
} catch {
  // No .env.local (e.g. CI/production): rely on the real environment.
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  // Migrations prefer a direct (non-pooled) connection when one is provided,
  // e.g. Neon's DATABASE_URL_UNPOOLED; PgBouncer is not a good fit for DDL.
  dbCredentials: {
    url: (process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL)!,
  },
})
