import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { DEFAULT_AFTER_SIGN_IN, signInSearchSchema } from '#/lib/sign-in'
import { getViewer } from '#/server/users.functions'

export const Route = createFileRoute('/')({
  validateSearch: signInSearchSchema,
  beforeLoad: async ({ search }) => {
    if (await getViewer()) throw redirect({ href: search.redirect ?? DEFAULT_AFTER_SIGN_IN })
  },
  component: Landing,
})

function Landing() {
  const { redirect: returnTo, error: oauthError } = Route.useSearch()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(
    oauthError ? 'Đăng nhập với GitHub không thành công. Vui lòng thử lại.' : null,
  )

  async function signIn() {
    setPending(true)
    setError(null)
    const { error } = await authClient.signIn.social({
      provider: 'github',
      callbackURL: returnTo ?? DEFAULT_AFTER_SIGN_IN,
      // better-auth appends `?error=<code>`; keep `redirect` so a retry still returns there.
      errorCallbackURL: returnTo ? `/?redirect=${encodeURIComponent(returnTo)}` : '/',
    })
    // On success the browser is already navigating to GitHub.
    if (error) {
      setError('Không thể đăng nhập với GitHub. Vui lòng thử lại.')
      setPending(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">Teamslot</h1>
      <p className="text-lg text-gray-600">
        Đặt phòng họp cho nhóm nhỏ, không bao giờ trùng giờ.
      </p>
      <button
        type="button"
        onClick={signIn}
        disabled={pending}
        className="rounded-md bg-gray-900 px-5 py-3 font-medium text-white hover:bg-gray-700 disabled:opacity-60"
      >
        {pending ? 'Đang chuyển sang GitHub…' : 'Đăng nhập với GitHub'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </main>
  )
}
