import { createServerFn } from '@tanstack/react-start'
import { getCurrentUser } from '#/services/users'
import { runService } from './run-service'

/** The signed-in user's profile, or null for guests. */
export const getViewer = createServerFn({ method: 'GET' }).handler(() =>
  runService((ctx, actor) => (actor === null ? Promise.resolve(null) : getCurrentUser(ctx, actor))),
)
