import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { useApollo } from 'hooks/useApollo'
import type { AppProps } from 'next/app'
import { Outfit } from 'next/font/google'
import { appWithTranslation } from 'next-i18next'
import { BaseAppProps, NextPageWithLayout } from 'types/next'
import { theme } from 'theme'
import { GlobalStyles } from 'theme/GlobalStyles'
import { ToastContainer } from 'components/ui/toast/ToastContainer'

/*
 Uncomment for SSG
const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
 */

type AppPropsWithLayout = AppProps<BaseAppProps> & {
  Component: NextPageWithLayout<BaseAppProps>
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />

      <ApolloProvider client={apolloClient}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </ChakraProvider>
  )
}

const AppWithI18n = appWithTranslation(App)

const outfit = Outfit({ subsets: ['latin'] })

const AppWithAuth = (props: AppPropsWithLayout) => (
  <main className={outfit.className}>
    <AppWithI18n {...props} />
  </main>
)

export default AppWithAuth
