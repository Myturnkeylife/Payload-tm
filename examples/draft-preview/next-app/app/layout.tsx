import { AdminBar } from './_components/AdminBar'
import { Header } from './_components/Header'
import './app.scss'

export const metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
}

// eslint-disable-next-line @typescript-eslint/require-await
export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <AdminBar />
        {/* The error ignored here is related to `@types/react` and `typescript` not
        aligning with their implementations of Promise-based server components.
        This can be removed once these dependencies are resolved in their respective modules.
        - https://github.com/vercel/next.js/issues/42292
        - https://github.com/vercel/next.js/issues/43537
        Update: this is fixed in `@types/react` v18.2.14 but still requires `@ts-expect-error` to build :shrug:
        See my comment here: https://github.com/vercel/next.js/issues/42292#issuecomment-1622979777
        */}
        <Header />
        {children}
      </body>
    </html>
  )
}
