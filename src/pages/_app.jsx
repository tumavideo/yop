import Layout from '@/components/Layout'
import { StateContext } from '@/context/StateContext'
import '@/styles/tailwind.css'
import 'focus-visible'

import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </SessionProvider>
  )
}
