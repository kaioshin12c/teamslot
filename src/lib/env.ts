/** Read a required server env var, failing fast with a pointer to the docs. */
export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is not set (see .env.example)`)
  return value
}
