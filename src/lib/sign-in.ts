import { z } from 'zod'

/** Where a user lands after signing in when no `?redirect=` was given. */
export const DEFAULT_AFTER_SIGN_IN = '/teams'

/**
 * Search params of the landing (sign-in) page.
 * - `redirect`: where to return after sign-in. Only same-origin paths are
 *   accepted ("/teams", not "//evil.com" or "/\evil.com"); anything else is dropped.
 * - `error`: set by better-auth when the GitHub OAuth flow fails or is cancelled.
 */
export const signInSearchSchema = z.object({
  redirect: z
    .string()
    .regex(/^\/(?![/\\])/)
    .optional()
    .catch(undefined),
  error: z.string().optional().catch(undefined),
})
