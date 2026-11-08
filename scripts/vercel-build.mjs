// Vercel build command (see vercel.json). Applies Drizzle migrations to the
// production database, then builds the app. Preview deployments skip the
// migration so they never touch the production database.
import { spawnSync } from 'node:child_process'

function run(cmd, args) {
  const { status } = spawnSync(cmd, args, { stdio: 'inherit' })
  if (status !== 0) process.exit(status ?? 1)
}

if (process.env.VERCEL_ENV === 'production') {
  if (!process.env.DATABASE_URL_UNPOOLED && !process.env.DATABASE_URL) {
    console.error('Neither DATABASE_URL_UNPOOLED nor DATABASE_URL is set for Production.')
    process.exit(1)
  }
  run('pnpm', ['db:migrate'])
} else {
  console.log(`VERCEL_ENV=${process.env.VERCEL_ENV ?? '(unset)'}: skipping migrations`)
}
run('pnpm', ['build'])
