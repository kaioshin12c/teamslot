import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/teams')({ component: Teams })

function Teams() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Team của bạn</h1>
      <p className="mt-4 text-gray-600">Bạn chưa tham gia Team nào.</p>
    </main>
  )
}
