export const PostFields = `
    fragment PostFields on Post{
        id
        title
        content
        published
    }
`  
export const UserIdentities = `
    fragment UserIdentities on User{
      id
      email
    }
`  
export const UserFields = `
    fragment UserIdentities on User{
        id
        email
        mame
    }
`  
  
// Retrieve all published posts and their authors  
export const feed_all = `
    query feed {
        feed {
            ...PostFields
            author {
                ...UserIdentities
            }
        }
    }
    ${PostFields}
    ${UserIdentities}
`  

//Search for posts that contain a specific string in their title or content
export const feed_search = `
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
    ${PostFields}
    ${UserIdentities}
`  

// Paginate and order the returned posts
export const feed_paginate = `
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
    ${PostFields}
    ${UserIdentities}
`  

// Retrieve a single post
export const postById = `
    query postById($id: Int!) {
        postById(id: $id ) {
        ...PostFields
        }
    }  
    ${PostFields}
`  

// Retrieve the drafts of a user
export const draftsByUser = `
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
    ${PostFields}
    ${UserIdentities}
`

// list all users
export const allUsers = `
    query allUsers{
        allUsers{
        ...UserIdentities
        }
    }
    ${UserIdentities}
`  

// display a user
export const user = `
    query user {
        user(id: 1 ) {
        ...UserFields
        }
    }
    ${UserFields}
`  

// Create a new user
export const signupUser = `
    mutation signupUser {
        signupUser(data: { name: "Sarah", email: "sarah@prisma.io", password: "" }) {
            id
        }
    }  
` 

// Create a new draft
export const createDraft = `
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
    ${PostFields}
    ${UserIdentities}
`  

// Publish/unpublish an existing post
export const togglePublishPost = `
    mutation togglePublishPost {
        togglePublishPost(id: 5) {
            id
            published
        }
    }
`  

// Increment the view count of a post
export const incrementPostViewCount = `
    mutation incrementPostViewCount {
        incrementPostViewCount(id: 5) {
            id
            viewCount
        }
    }  
`

// Delete a post
export const deletePost = `  
    mutation deletePost($id: Int!) {
        deletePost(id: $id) {
            id
        }
    }
`  

// Add the `Profile` to a user
export const addProfileForUser = `
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
` 