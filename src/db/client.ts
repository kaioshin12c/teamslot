import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './schema'

export type Database = ReturnType<typeof createDatabase>['db']

export function createDatabase(connectionString: string) {
  const pool = new pg.Pool({ connectionString })
  const db = drizzle(pool, { schema })
  return { db, pool }
}
