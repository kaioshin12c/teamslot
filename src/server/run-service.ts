import { getRequestHeaders } from '@tanstack/react-start/server'
import { db } from '#/db'
import { auth } from '#/lib/auth'
import { systemClock } from '#/services/clock'
import type { Actor, ServiceContext } from '#/services/context'
import { DomainError } from '#/services/errors'
import { createUserFacingError, type UserFacingError } from '#/lib/user-facing-error'
import { domainErrorMessages } from './error-messages'

const appContext: ServiceContext = { db, clock: systemClock }

async function getActor(): Promise<Actor> {
  const session = await auth.api.getSession({ headers: getRequestHeaders() })
  return session?.user.id ?? null
}

/**
 * The only thing a server function handler should do besides validating input:
 * resolve the session to an actor, call the service, and turn domain errors
 * into a {@link UserFacingError} (Vietnamese message + code).
 */
export async function runService<T>(
  fn: (ctx: ServiceContext, actor: Actor) => Promise<T>,
): Promise<T> {
  const actor = await getActor()
  try {
    return await fn(appContext, actor)
  } catch (error) {
    if (error instanceof DomainError) {
      throw createUserFacingError(error.code, domainErrorMessages[error.code])
    }
    throw error
  }
}
