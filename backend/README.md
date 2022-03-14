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

### 1. feedList

Paginate and order the returned posts

```graphql
query feedList {
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

### 2. postById

Retrieve a single post

```graphql
query postById {
  postById(id: 3 ) {
    ...PostFields
  }
}
```

### 3. draftsByUser

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

### 4. allUsers

list all users

```
query allUsers{
  allUsers{
   ...UserIdentities
  }
}
```

### 5. user

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
  
// Retrieve all published posts and their authors  
query feed {
    feed {
        ...PostFields
        author {
            ...UserIdentities
        }
    }
}

// Search for posts that contain a specific string in their title or content
query feed_search($searchString: String!) {
    feed(
        searchString: $searchString
    ) {
        ...PostFields
        author {
            ...UserIdentities
        }    
    }
}

// Search posts with paginated and ordered results
query feed_paginate(
    $searchString: String,
    $skip: Int,
    $take: Int,
    $orderBy: PostOrderByUpdatedAtInput
) {
    feed(
        searchString: $searchString
        skip: $skip
        take: $take
        orderBy: $orderBy
    ) {
        ...PostFields
        updatedAt
        author {
            ...UserIdentities
        }
    }
}

// Retrieve a single post
query postById($id: Int!) {
    postById(id: $id ) {
    ...PostFields
    }
}  

// Retrieve the drafts of a user
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

// list all users
query allUsers{
    allUsers{
    ...UserIdentities
    }
}

// display a user
query user {
    user(id: 1 ) {
    ...UserFields
    }
}

// Create a new user
mutation signupUser {
    signupUser(data: { name: "Sarah", email: "sarah@prisma.io", password: "" }) {
        id
    }
}  

// Create a new draft
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

// Publish/unpublish an existing post
mutation togglePublishPost {
    togglePublishPost(id: 5) {
        id
        published
    }
}

// Increment the view count of a post
mutation incrementPostViewCount {
    incrementPostViewCount(id: 5) {
        id
        viewCount
    }
}  

// Delete a post
mutation deletePost($id: Int!) {
    deletePost(id: $id) {
        id
    }
}

// Add the `Profile` to a user
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

