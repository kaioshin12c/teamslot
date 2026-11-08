import { randomUUID } from 'node:crypto'
import { sql } from 'drizzle-orm'
import pg from 'pg'
import { inject } from 'vitest'
import { createDatabase, type Database } from '../src/db/client'

export const TEMPLATE_DB = 'teamslot_template'

export function withDatabase(url: string, name: string) {
  const u = new URL(url)
  u.pathname = `/${name}`
  return u.toString()
}

async function admin<T>(fn: (client: pg.Client) => Promise<T>) {
  const client = new pg.Client({ connectionString: inject('postgresUrl') })
  await client.connect()
  try {
    return await fn(client)
  } finally {
    await client.end()
  }
}

let current: { name: string; db: Database; pool: pg.Pool } | undefined

/** The database of the current test file. Only valid inside tests/hooks. */
export function testDb(): Database {
  if (!current) throw new Error('Test database is not open (is test/setup.ts loaded?)')
  return current.db
}

export async function openTestDatabase() {
  const name = `test_${randomUUID().replaceAll('-', '')}`
  await admin((c) => c.query(`CREATE DATABASE ${name} TEMPLATE ${TEMPLATE_DB}`))
  current = { name, ...createDatabase(withDatabase(inject('postgresUrl'), name)) }
}

export async function closeTestDatabase() {
  if (!current) return
  const { name, pool } = current
  current = undefined
  await pool.end()
  await admin((c) => c.query(`DROP DATABASE ${name}`))
}

/** Empty every app table, keeping the schema and migration history. */
export async function truncateAll() {
  const db = testDb()
  const { rows } = await db.execute<{ tablename: string }>(
    sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`,
  )
  if (rows.length === 0) return
  const tables = rows.map((r) => `"public"."${r.tablename}"`).join(', ')
  await db.execute(sql.raw(`TRUNCATE ${tables} RESTART IDENTITY CASCADE`))
}
