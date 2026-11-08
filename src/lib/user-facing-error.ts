import type { DomainErrorCode } from '#/services/errors'

/**
 * A domain error as it reaches the browser: `message` is already the
 * Vietnamese text to show, `code` lets the UI branch (e.g. reload on conflict).
 * Plain own properties, so they survive server-function serialization.
 */
export interface UserFacingError extends Error {
  userFacing: true
  code: DomainErrorCode
}

export function createUserFacingError(code: DomainErrorCode, message: string): UserFacingError {
  return Object.assign(new Error(message), { userFacing: true as const, code })
}

/** True only for errors made by {@link createUserFacingError} (not e.g. pg errors, which also have `code`). */
export function isUserFacingError(error: unknown): error is UserFacingError {
  return error instanceof Error && (error as Partial<UserFacingError>).userFacing === true
}
