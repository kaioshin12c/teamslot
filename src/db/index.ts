import { requireEnv } from '#/lib/env'
import { createDatabase } from './client'

export const { db } = createDatabase(requireEnv('DATABASE_URL'))
