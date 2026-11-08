import { Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'
import { getViewer } from '#/server/users.functions'

/** Layout for every page that needs a signed-in user. */
export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const viewer = await getViewer()
    if (!viewer) throw redirect({ to: '/', search: { redirect: location.href } })
    return { viewer }
  },
  component: AuthedLayout,
})

function AuthedLayout() {
  const { viewer } = Route.useRouteContext()
  const navigate = useNavigate()

  async function signOut() {
    await authClient.signOut()
    await navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <span className="text-lg font-bold">Teamslot</span>
        <div className="flex items-center gap-3">
          {viewer.image && (
            <img src={viewer.image} alt="" className="h-8 w-8 rounded-full" />
          )}
          <span className="font-medium">{viewer.name}</span>
          <button
            type="button"
            onClick={signOut}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
