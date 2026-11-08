import { afterAll, beforeAll, beforeEach } from 'vitest'
import { closeTestDatabase, openTestDatabase, truncateAll } from './db'

beforeAll(openTestDatabase)
beforeEach(truncateAll)
afterAll(closeTestDatabase)
