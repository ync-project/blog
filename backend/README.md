# 

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

## Getting started

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

# Graphql

## fragements

```
fragment PostFields on Post{
  id
  title
  content
  published
}

fragment UserIdentities on User{
    id
    email
}
fragment UserFields on User{
    id
    email
    name
}
```

## Query

### 1. feed_all

Retrieve all published posts and their authors

```graphql
query feed_all {
  feed {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
```

### 2. feed_search

Search for posts that contain a specific string in their title or content

```graphql
query feed_search {
  feed(
    searchString: "ask"
  ) {
    ...PostFields
    author {
      ...UserIdentities
    }

  }
}
```

### 3. feed_paginate

Paginate and order the returned posts

```graphql
query feed_paginate {
  feed(
    searchString: "ask"
    skip: 0
    take: 2
    orderBy: { updatedAt: desc }
  ) {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
```

### 4. postById

Retrieve a single post

```graphql
query postById {
  postById(id: 3 ) {
    ...PostFields
  }
}
```

### 5. draftsByUser

Retrieve the drafts of a user

```graphql
query draftsByUser {
  draftsByUser(
    userUniqueInput: {
      email: "mahmoud@prisma.io"
    }
  ) {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
```

### 6. allUsers

list all users

```
query allUsers{
  allUsers{
   ...UserIdentities
  }
}
```

### 7. user

display a user

```
query user {
  user(id: 1 ) {
    ...UserFields
  }
}
```



## Mutation

### 1. signupUser

Create a new user

```graphql
mutation signupUser {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io", password: "" }) {
    id
  }
}
```

### 2. createDraft

Create a new draft

```graphql
mutation createDraft {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
```

### 3. togglePublishPost

Publish/unpublish an existing post

```graphql
mutation togglePublishPost {
  togglePublishPost(id: 5) {
    id
    published
  }
}
```

### 4. incrementPostViewCount

Increment the view count of a post

```graphql
mutation incrementPostViewCount {
  incrementPostViewCount(id: 5) {
    id
    viewCount
  }
}
```

### 5. deletePost

Delete a post

```graphql
mutation deletePost {
  deletePost(id: 5) {
    id
  }
}
```

### 6. addProfileForUser

 Add the `Profile` to a user

```graphql
mutation addProfileForUser {
  addProfileForUser(
    userUniqueInput: {
      email: "mahmoud@prisma.io"
    }
    bio: "I like turtles"
  ) {
    id
    bio
    user {
      id
      email
    }
  }
}
```

## playground

```
PRETTIFY
HISTORY

http://localhost:4000
COPY CURL

25
    email
26
  }
27
}
28
query feed_search($searchString: String!) {
29
      feed(
30
          searchString: $searchString
31
      ) {
32
          ...PostFields
33
          author {
34
              ...UserIdentities
35
          }    
36
      }
37
  }
38
query feed_paginate(
39
    $searchString: String,
40
    $skip: Int,
41
    $take: Int,
42
    $orderBy: PostOrderByUpdatedAtInput
43
) {
44
    feed(
45
        searchString: $searchString
46
        skip: $skip
47
        take: $take
48
        orderBy: $orderBy
49
    ) {
50
        ...PostFields
51
        updatedAt
52
        author {
53
        ...UserIdentities
54
        }
55
    }
56
}
57
​
QUERY VARIABLESHTTP HEADERS (1)

prisma
1
{
2
  "searchString": "prisma"
3
}

{
  "data": {
    "feed": [
      {
        "id": 1,
        "title": "Join the Prisma Slack",
        "content": "https://slack.prisma.io",
        "published": true,
        "updatedAt": "2022-03-13T00:51:13.599Z",
        "author": {
          "id": 1,
          "email": "alice@prisma.io"
        }
      },
      {
        "id": 2,
        "title": "Follow Prisma on Twitter",
        "content": "https://www.twitter.com/prisma",
        "published": true,
        "updatedAt": "2022-03-13T00:51:13.604Z",
        "author": {
          "id": 2,
          "email": "nilu@prisma.io"
        }
      },
      {
        "id": 3,
        "title": "Ask a question about Prisma on GitHub",
        "content": "https://www.github.com/prisma/prisma/discussions",
        "published": true,
        "updatedAt": "2022-03-13T00:51:13.607Z",
        "author": {
          "id": 3,
          "email": "mahmoud@prisma.io"
        }
      }
    ]
  }
TRACING
This GraphQL server doesn’t support tracing. See the following page for instructions:
https://github.com/apollographql/apollo-tracing
DOCS
SCHEMA
SCHEMA
DOWNLOAD

PostOrderByUpdatedAtInput
directive @specifiedBy(url: String!) on SCALAR
type AuthPayload {
  token: String
  user: User
}
​
scalar DateTime
​
type Mutation {
  signupUser(data: UserCreateInput!, bio: String): User!
  createDraft(data: PostCreateInput!, authorEmail: String!): Post
  togglePublishPost(id: Int!): Post
  incrementPostViewCount(id: Int!): Post
  deletePost(id: Int!): Post
  addProfileForUser(userUniqueInput: UserUniqueInput!, bio: String): Profile
  updateProfileForUser(email: String!, bio: String): User
}
​
type Post {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: String
  published: Boolean!
  viewCount: Int!
  author: User
}
​
input PostCreateInput {
  title: String!
  content: String
}
​
input PostOrderByUpdatedAtInput {
  updatedAt: SortOrder!
}
​
type Profile {
  id: Int!
  bio: String
  user: User
}
​
type Query {
  allUsers: [User!]!
  postById(id: Int): Post
  feed(
    searchString: String
    skip: Int
    take: Int
    orderBy: PostOrderByUpdatedAtInput
  ): [Post!]!
  draftsByUser(userUniqueInput: UserUniqueInput!): [Post]
  user(id: Int): User
}
​
enum SortOrder {
  asc
  desc
}
​
type User {
  id: Int!
  name: String
  email: String!
  posts: [Post!]!
  profile: Profile
}
​
input UserCreateInput {
  email: String!
  name: String

```

