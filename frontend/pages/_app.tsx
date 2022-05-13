import Head from 'next/head';
import type { NextPage, NextComponentType, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient'
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import AccessDenied from '../components/sys/access-denied'
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../components/mui/createEmotionCache';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/mui/theme'
import CssBaseline from '@mui/material/CssBaseline';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type AppAuthProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {auth: boolean};
  emotionCache?: EmotionCache;
};

const App: NextPage<AppAuthProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
          <SessionProvider session={session} refetchInterval={0}>
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
          </SessionProvider>
        </ApolloProvider>
      </ThemeProvider>  
    </CacheProvider>  
  );
};

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
export default App;
