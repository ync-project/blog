# BLOG-TS

Alpha project in typescript, function:

Blog

# architec

## Lang

* TypeScript

## Frontend

* Next.js
* Next.js api 
* Apollo GraphQL client

## Backend

* Next.js api
* apollo-server-micro

# Install

## next

```
yarn create next-app --typescript
```

## graphql server + client

```
yarn add @types/graphql @types/micro-cors -D
yarn add @apollo/client apollo-server-micro graphql graphql-relay graphql-scalars micro micro-cors
```

## prisma

```
yarn add prisma ts-node typescript @types/node -D
yarn add @prisma/client
```

```
yarn add 
```



## nexus

```
yarn add nexus
```

## config

add following to `package.json`

```diff
  "scripts": {
    ....
    "lint": "next lint",
+   "generate": "npm -s run generate:prisma && npm -s run generate:nexus",
+   "generate:prisma": "prisma generate",
+   "generate:nexus": "ts-node --transpile-only -P nexus.tsconfig.json pages/api"
  },

```

# Database

## create prisma schema

```
touch prisma/schema.prisma
```

Add content:

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  email String  @unique
  id    Int     @default(autoincrement()) @id
  name  String?
  posts Post[]
  profile Profile?
}

model Post {
  authorId  Int?
  content   String?
  id        Int     @default(autoincrement()) @id
  published Boolean @default(false)
  title     String
  author    User?   @relation(fields: [authorId], references: [id])
}

model Profile {
  id   Int     @default(autoincrement()) @id
  bio  String?
  user User @relation(fields: [userId], references:[id])
  userId  Int @unique
}
```

## Create and seed the database

```
npx prisma migrate dev --name init
```

touch `prisma/seed.tsx`

```tsx
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
```

and ddd the following to `package.json`

```
"prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.tsx"
}

```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed --preview-feature
```

## prisma client

Add one line to `next-env.d.ts`

```diff
/// <reference types="next" />
+ /// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

```

create `lib/prisma.tsx`

```tsx
import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

// TypeScript is throwing a `ts7017` on the `global.prisma`:
//Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.
declare global {
    var prisma: PrismaClient; // This must be a `var` and not a `let / const`
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma
```

## nexus resolvers

define 3 type resolvers under `graphql/types`

```tsx
// User.tsx
import { objectType } from 'nexus'
import { Profile } from './Profile'
import { Post } from './Post'

export const User = objectType({
    name: 'User',
    definition(t) {
      t.int('id')
      t.string('name')
      t.string('email')
      t.list.field('posts', {
        type: Post,
        resolve: (parent, _, ctx) =>
          ctx.prisma.user
            .findUnique({
              where: { id: Number(parent.id) },
            })
            .posts(),
      }),
      t.field('profile', {
        type: Profile,
        resolve: (parent, _, context) => {
          return context.prisma.user.findUnique({
            where: { id: parent.id }
          }).profile()
        }
      })
     },
  })
  
```

```tsx
// Post.tsx
import { objectType } from 'nexus'
import { User } from './User'

export const Post = objectType({
    name: 'Post',
    definition(t) {
      t.int('id')
      t.string('title')
      t.nullable.string('content')
      t.boolean('published')
      t.nullable.field('author', {
        type: User,
        resolve(parent, _, ctx){
          return ctx.prisma.post
            .findUnique({
              where: { id: Number(parent.id) },
            })
            .author()
        }
      })
    },
  })
  
  
```

```tsx
// Profile.tsx
import { objectType } from 'nexus'
import { User } from './User'

export const Profile = objectType({
      name: 'Profile',
      definition(t) {
        t.nonNull.int('id')
        t.string('bio')
        t.field('user', {
          type: User,
          resolve: (parent, _, context) => {
            return context.prisma.profile
              .findUnique({
                where: { id: parent.id || undefined },
              })
              .user()
          },
        })
      },
})
```

```tsx
 // index.tsx
export * from './User'
export * from './Post'
export * from './Profile'
```

# Graphql

## server

touch `graphql/context.tsx`

```
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export type Context = {
  prisma: PrismaClient
}


export async function createContext(param: any): Promise<Context> {
  return {
    prisma,
  }
}
```



touch `page/api/index.tsx`

```
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import cors from 'micro-cors'
import { createContext } from '../../graphql/context';
import { RequestHandler } from 'micro'
import { schema } from '../../graphql/schema'


export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ 
  schema,
  context: createContext,
 })

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler(): Promise<RequestHandler>{
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: '/api',
    })
  }

  return apolloServerHandler as RequestHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler as RequestHandler )

```

## Testing Graphql server

You can also access the GraphQL API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is [`localhost:3000/api`](http://localhost:3000/api)).

Below are a number of operations that you can send to the API.

### Retrieve all published posts and their authors

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

### Create a new user

```graphql
mutation {
  signupUser(name: "Sarah", email: "sarah@prisma.io") {
    id
  }
}
```

### Create a new draft

```graphql
mutation {
  createDraft(
    title: "Join the Prisma Slack"
    content: "https://slack.prisma.io"
    authorEmail: "alice@prisma.io"
  ) {
    id
    published
  }
}
```

### Publish an existing draft

```graphql
mutation {
  publish(postId: "__POST_ID__") {
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

### Search for posts with a specific title or content

```graphql
{
  filterPosts(searchString: "graphql") {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

### Retrieve a single post

```graphql
{
  post(postId: "__POST_ID__") {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

### Delete a post

```graphql
mutation {
  deletePost(postId: "__POST_ID__") {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

# Frontend

update `pages/_app.tsx`

```diff
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import type { AppProps } from 'next/app'

+ const client = new ApolloClient({
+   cache: new InMemoryCache(),
+   uri: "/api",
+ });

function MyApp({ Component, pageProps }: AppProps) {
  return (
+    <ApolloProvider client={client}>
      <Component {...pageProps} />
+    </ApolloProvider>
  );
}

export default MyApp;

```

![](https://i.imgur.com/cfZV9bY.png)

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.


**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx)

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./pages/signup.tsx`](./pages/signup.tsx))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./pages/create.tsx`](./pages/create.tsx))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./pages/drafts.tsx`](./pages/drafts.tsx))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./pages/p/[id].tsx`](./pages/p/[id].tsx)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)



# Tips

1. `pages/api/index.ts`  gives the error

   > Type 'NexusGraphQLSchema' is missing the following properties from type 'GraphQLSchema': _queryType, _mutationType, _subscriptionType, _directives, and 3 more.
   >
   > 
   >
   > >    const apolloServer = new ApolloServer({ 
   > >
   > >    =>   schema,
   > >
   > >    ​     context: createContext,
   > >
   > >    })

Fix:

>```tsx
>export const schema = makeSchema({
>//...
>}) as unknown as GraphQLSchema
>```

2. package `graphql-scalars` cause startup problem,

   ```
   syntaxError: Named export 'Kind' not found. The requested module 'graphql' is a CommonJS module, which may not support all module.exports as named exports.
   ```

    markup first (need to be fix):

   ```
   //import { DateTimeResolver } from 'graphql-scalars'
   ...
   // export const GQLDate = asNexusMethod(DateTimeResolver, 'date')
   ```

##

