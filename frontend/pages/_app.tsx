import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient'
import { SessionProvider } from "next-auth/react"

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import "../styles/styles.css"
import '../styles/global.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
};

export default App;
