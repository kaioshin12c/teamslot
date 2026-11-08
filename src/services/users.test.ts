import { describe, expect, it } from 'vitest'
import { seedUser, testContext } from '../../test/fixtures'
import { getCurrentUser } from './users'

describe('getCurrentUser', () => {
  it("returns the actor's GitHub name and avatar", async () => {
    const ctx = testContext()
    const me = await seedUser({
      name: 'Trần Thị B',
      image: 'https://avatars.githubusercontent.com/u/42',
    })

    await expect(getCurrentUser(ctx, me.id)).resolves.toEqual({
      id: me.id,
      name: 'Trần Thị B',
      image: 'https://avatars.githubusercontent.com/u/42',
    })
  })

  it('rejects a caller who is not signed in with NotAuthenticated', async () => {
    const ctx = testContext()

    await expect(getCurrentUser(ctx, null)).rejects.toMatchObject({
      name: 'DomainError',
      code: 'NotAuthenticated',
    })
  })

  it('rejects an actor whose user no longer exists with NotFound', async () => {
    const ctx = testContext()

    await expect(getCurrentUser(ctx, 'deleted-user')).rejects.toMatchObject({
      name: 'DomainError',
      code: 'NotFound',
    })
  })
})
