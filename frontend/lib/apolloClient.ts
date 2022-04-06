import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { concatPagination,  } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { Reference } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: any

// normal apollo client (no features like loadMore)
export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:4000', // Server URL (must be absolute)
      //credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache(
      {
        typePolicies: {
          Query: {
            fields: {
              //allUsers: concatPagination(), // {keyFields: []} , //concatPagination(),
              //allPosts: concatPagination()   // {keyFields: []}   //concatPagination(),
              //allPosts: concatPagination()   // {keyFields: []}   //concatPagination(),
              //allPosts: relayStylePagination(),
              allPosts: {
                merge(existing: any[], incoming: any[], { args, readField }) {
                  const merged = existing ? existing.slice(0) : [];
                  // Obtain a Set of all existing task IDs.
                  const existingIdSet = new Set(
                    merged.map(task => readField("id", task)));
                  // Remove incoming tasks already present in the existing data.
                  incoming = incoming.filter(
                    task => !existingIdSet.has(readField("id", task)));
                  // Find the index of the task just before the incoming page of tasks.
                  const afterIndex = merged.findIndex(
                    task => args.afterId === readField("id", task));
                  if (afterIndex >= 0) {
                    // If we found afterIndex, insert incoming after that index.
                    merged.splice(afterIndex + 1, 0, ...incoming);
                  } else {
                    // Otherwise insert incoming at the end of the existing data.
                    merged.push(...incoming);
                  }
                  return merged;
                },
                  // merge(existing = [], incoming: any[]) {
                  //   return [...existing, ...incoming]
                  // }
              }
              // allPosts: {
              //   keyArgs: false,
              //   merge(existing, incoming) {
              //     console.log('existing', existing)
              //     console.log('incoming', incoming)
              //     let allPosts: Reference[] = [];
              //     if (existing) {
              //       allPosts = allPosts.concat(existing);
              //     }
              //     if (incoming) {
              //       allPosts = allPosts.concat(incoming);
              //     }
              //     // return {
              //     //   ...incoming,
              //     //   allPosts,
              //     // };
              //     return {
              //       ...incoming,
              //       allPosts
              //     };
              //   }
            },
          },
        },
      }
    ),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
