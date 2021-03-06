import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page:ReactElement)=> ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  if(Component.getLayout){
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <SessionProvider session={pageProps.session}>
    <Head>
        <title>NextJS Tutorial</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}

export default MyApp
