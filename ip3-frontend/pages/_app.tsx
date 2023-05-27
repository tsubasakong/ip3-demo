import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
  chain,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { Session } from 'next-auth'
import { NextUIProvider } from '@nextui-org/react'

const Noop: FC = ({}) => <>{}</>

const { provider, webSocketProvider, chains } = configureChains(
  [chain.mainnet, chain.goerli],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'IP3',
  chains,
})

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: false,
  // added connectors from rainbowkit
  connectors,
})

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  const Layout = (Component as any).Layout ?? ((page) => page)

  // console.log(Layout)
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <RainbowKitProvider chains={chains}>
          <NextUIProvider>
            {(Component as any).Layout ? (
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </NextUIProvider>
        </RainbowKitProvider>
      </SessionProvider>
    </WagmiConfig>
  )
}

export default MyApp
