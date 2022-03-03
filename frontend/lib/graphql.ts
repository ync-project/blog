import { gql } from "@apollo/client"

const FEED = gql` 
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
`

const draftsByUser = gql` 
    query {
        draftsByUser(
        userUniqueInput: {
            email: "mahmoud@prisma.io"
        }
        ) {
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
`

const togglePublishPost = gql` 
    mutation {
        togglePublishPost(id: 4) {
        id
        published
        }
    }
`

const incrementPostViewCount = gql` 
    mutation {
        incrementPostViewCount(id: 3) {
        id
        viewCount
        }
    }
`

const filter_feed = gql` 
    query {
        feed(
        searchString: "prisma"
        ) {
        id
        title
        content
        published
        }
    }
`

const Paginate_feed = gql` 
    query {
        feed(
        skip: 2
        take: 2
        orderBy: { updatedAt: desc }
        ) {
        id
        updatedAt
        title
        content
        published
        }
    }
`

const postById = gql` 
    query {
        postById(id: 2 ) {
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
`

const signupUser = gql` 
    mutation {
        signupUser(name: "Sarah", email: "sarah@prisma.io") {
        id
        }
    }
`

const createDraft = gql` 
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
`

const publish = gql` 
    mutation {
        publish(postId: "5") {
        id
        published
        }
    }
`



const deletePost = gql` 
    mutation {
        deletePost(postId: "6") {
        id
        }
    }
`

const addProfileForUser = gql` 
    mutation {
        addProfileForUser(
        email: "mahmoud@prisma.io"
        bio: "I like turtles"
        ) {
        id
        bio
        user {
            id
            name
        }
        }
    }
`    