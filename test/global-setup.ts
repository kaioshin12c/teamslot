import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import pg from 'pg'
import type { TestProject } from 'vitest/node'
import { createDatabase } from '../src/db/client'
import { TEMPLATE_DB, withDatabase } from './db'

declare module 'vitest' {
  interface ProvidedContext {
    postgresUrl: string
  }
}

// One Postgres container per test run. Migrations are applied once to a
// template database; each test file then clones it (see ./db.ts).
export default async function setup(project: TestProject) {
  const container = await new PostgreSqlContainer('postgres:17-alpine').start()
  const url = container.getConnectionUri()

  const admin = new pg.Client({ connectionString: url })
  await admin.connect()
  await admin.query(`CREATE DATABASE ${TEMPLATE_DB}`)
  await admin.end()

  const template = createDatabase(withDatabase(url, TEMPLATE_DB))
  await migrate(template.db, { migrationsFolder: 'drizzle' })
  await template.pool.end()

  project.provide('postgresUrl', url)

  return async () => {
    await container.stop()
  }
}
