import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { isUserFacingError } from '#/lib/user-facing-error'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Teamslot' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">Không tìm thấy trang</h1>
      <a href="/" className="mt-4 inline-block underline">
        Về trang chủ
      </a>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="p-8 text-center">
      <h1 className="text-2xl font-bold">Đã có lỗi xảy ra</h1>
      <p className="mt-4 text-gray-600">
        {isUserFacingError(error) ? error.message : 'Vui lòng thử lại sau.'}
      </p>
    </main>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}
