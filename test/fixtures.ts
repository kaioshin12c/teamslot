import { randomUUID } from 'node:crypto'
import { user } from '../src/db/schema'
import type { Clock } from '../src/services/clock'
import type { ServiceContext } from '../src/services/context'
import { testDb } from './db'

/** A clock frozen at the given instant. */
export function fixedClock(at: Date | string): Clock {
  const instant = new Date(at)
  return { now: () => new Date(instant) }
}

/** Service context on the current test database with a fake clock. */
export function testContext(opts: { now?: Date | string } = {}): ServiceContext {
  return { db: testDb(), clock: fixedClock(opts.now ?? '2026-01-05T02:00:00Z') }
}

/**
 * Users are created by better-auth on GitHub sign-in, not by a service,
 * so tests seed them directly.
 */
export async function seedUser(
  overrides: Partial<typeof user.$inferInsert> = {},
): Promise<typeof user.$inferSelect> {
  const id = overrides.id ?? randomUUID()
  const [row] = await testDb()
    .insert(user)
    .values({
      id,
      name: 'Nguyễn Văn A',
      email: `${id}@example.com`,
      image: `https://avatars.githubusercontent.com/u/${id}`,
      ...overrides,
    })
    .returning()
  return row!
}
