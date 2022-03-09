<h1 align="center">
next-advanced-apollo-starter
</h1>

<h4 align="center">
  Advanced, but minimalistic Next.js and Apollo starter
</h4>

<p align="center">
  <a href="#whats-included">What's included</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#apollo-usage">Apollo usage</a> •
  <a href="#writing-tests">Writing tests</a> •
  <a href="#docker-usage">Docker usage</a>
</p>
# Blog - frontend

# Graphql

```
fragment PostFields on Post{
  id
  title
  content
  viewCount
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
  	posts{
      id
      title
    }
  	profile{
      bio
    }
}

query feed {
  feed {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}  

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

query postById {
  postById(id: 5 ) {
    ...PostFields
  }
}

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

query allUsers{
  allUsers{
   ...UserIdentities
  }
}

query user {
  user(id: 3 ) {
    ...UserFields
  }
}

mutation signupUser {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io", password:"" }) {
    id
  }
}

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

mutation togglePublishPost {
  togglePublishPost(id: 5) {
    id
    published
  }
}

mutation incrementPostViewCount {
  incrementPostViewCount(id: 5) {
    id
    viewCount
  }
}

mutation deletePost {
  deletePost(id: 5) {
    id
  }
}

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



# Getting started

### Start development server

In order to start development, you should run _one of these commands_:

```bash
npm install
```

After installation is complete, simply start development server:

```bash
npm run dev
```

# Apollo usage

### Client-side rendering (CSR)

```jsx
import { gql, useQuery } from '@apollo/client';

const GET_CATS = gql`
  query GetCats {
    cats {
      id
      breed
    }
  }
`;

const MyPage = () => {
  const { loading, data } = useQuery(GET_CATS);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default MyPage;
```

### Server-side rendering (SSR)

```jsx
import { gql } from '@apollo/client';
import { initializeApollo, addApolloState } from '../lib/apollo';

const GET_CATS = gql`
  query GetCats {
    cats {
      id
      breed
    }
  }
`;

const MyPage = (props) => {
  return <div>{JSON.stringify(props.data)}</div>;
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_CATS,
  });

  return addApolloState(apolloClient, {
    props: {
      data,
    },
  });
}

export default MyPage;
```

# Writing tests

[Jest](https://jestjs.io/) is a great tool for testing. To run tests located in `/tests` directory, use `test` script
from `package.json`:

```bash
npm test
```

---

Pretty much everything you need to know about project structure, SSR, etc., you can find in
the [official Next.js documentation](https://nextjs.org/docs).

# Docker usage

To build and run Dockerized **production-ready** container, run:

```bash
docker-compose up --build
```
