import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'
import { Toaster } from 'sonner'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [client] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <main data-theme="massage">
          <Component {...pageProps} />
          <Toaster richColors={true} position="bottom-center" />
        </main>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
