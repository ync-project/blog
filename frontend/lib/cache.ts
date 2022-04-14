import { InMemoryCache, Reference, makeVar } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // isLoggedIn: {
        //   read() {
        //     return isLoggedInVar();
        //   }
        // },
        // cartItems: {
        //   read() {
        //     return cartItemsVar();
        //   }
        // },
        posts: {
          keyArgs: false,
          merge(existing, incoming) {
            let posts: Reference[] = [];
            if (existing && existing.posts) {
              posts = posts.concat(existing.posts);
            }
            if (incoming && incoming.posts) {
              posts = posts.concat(incoming.posts);
            }
            return {
              ...incoming,
              posts,
            };
          }
        }
      }
    }
  }
});

// export const isLoggedInVar =
//   makeVar<boolean>(!!localStorage.getItem('token'));
// export const cartItemsVar = makeVar<string[]>([]);
