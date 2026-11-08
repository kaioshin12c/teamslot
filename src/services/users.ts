import { eq } from 'drizzle-orm'
import { user } from '#/db/schema'
import { requireActor, type Actor, type ServiceContext } from './context'
import { DomainError } from './errors'

export interface UserProfile {
  id: string
  name: string
  image: string | null
}

/** Profile of the signed-in user (name/avatar are synced from GitHub on sign-in). */
export async function getCurrentUser(ctx: ServiceContext, actor: Actor): Promise<UserProfile> {
  const userId = requireActor(actor)
  const [row] = await ctx.db
    .select({ id: user.id, name: user.name, image: user.image })
    .from(user)
    .where(eq(user.id, userId))
  if (!row) throw new DomainError('NotFound')
  return row
}
