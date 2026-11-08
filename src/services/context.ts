import type { Database } from '#/db/client'
import { DomainError } from './errors'
import type { Clock } from './clock'

/** Everything a service function needs from the outside world. */
export interface ServiceContext {
  db: Database
  clock: Clock
}

/** userId of the caller, or null when nobody is signed in. */
export type Actor = string | null

/** The caller's userId, or NotAuthenticated if nobody is signed in. */
export function requireActor(actor: Actor): string {
  if (actor === null) throw new DomainError('NotAuthenticated')
  return actor
}
