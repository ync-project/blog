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
    fragment UserFields on User{
        id
        email
        name
        profile{
            id
            bio
        }
    }
`  
  
export const ProfileFields = `
    fragment ProfileFields on Profile{
        id
        bio
    }
`  

// Search posts with paginated and ordered results
export const POSTS = `
    query posts(
        $searchString: String,
        $skip: Int,
        $take: Int,
        $orderBy: PostOrderByUpdatedAtInput
    ) {
        posts(
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
    ${PostFields}
    ${UserIdentities}
`  

// Retrieve a single post
export const POST_BY_ID = `
    query postById($id: Int!) {
        postById(id: $id ) {
            ...PostFields
            author{
                ...UserIdentities
            }
        }  
    }
    ${PostFields}
    ${UserIdentities}
`  

// Retrieve the drafts of a user
export const DRAFTS_BY_USER = `
    query draftsByUser($email: String!) {
        draftsByUser(
            userUniqueInput: {
                email: $email
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

// Create a new draft
export const CREATE_DRAFT = `
    mutation createDraft($authorEmail: String!, $title: String!, $content: String!) {
        createDraft(
            data: { title: $title, content: $content }
            authorEmail: $authorEmail
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
export const TOGGLE_PUBLISH_POST = `
    mutation togglePublishPost($id: Int!) {
        togglePublishPost(id: $id) {
            id
            published
        }
    }
`  

// Increment the view count of a post
export const INCREMENT_POST_VIEW_COUNT = `
    mutation incrementPostViewCount($id: Int!) {
        incrementPostViewCount(id: $id) {
            id
            viewCount
        }
    }  
`

// Delete a post
export const DELETE_POST = `  
    mutation deletePost($id: Int!) {
        deletePost(id: $id) {
            id
        }
    }
`  

// list all users
export const ALL_USERS = `
    query allUsers{
        allUsers{
        ...UserIdentities
        }
    }
    ${UserIdentities}
`  

// display a user
export const USER = `
    query user($id: Int!) {
        user(id: $id ) {
        ...UserFields
        }
    }
    ${UserFields}
`  

// Create a new user
export const SIGNUP_USER = `
    mutation signupUser($email: String!, $name: String = "", $password: String!) {
        signupUser(data: { name: $name, email: $email, password: $password }) {
            ...UserIdentities
        }
    }  
    ${UserIdentities}
` 
// Create a new user with profile
export const SIGNUP_USER_AND_PROFILE = `
    mutation signupUserAndProfile($email: String!, $name: String = "", $password: String!, $bio: String!) {
        signupUser(data: { name: $name, email: $email, password: $password}, bio: $bio) {
            ...UserIdentities
            profile{
                ...ProfileFields
            }
        }
    }  
    ${UserIdentities}
    ${ProfileFields}
` 
// Add the `Profile` to a user
export const ADD_PROFILE_FOR_USER = `
    mutation addProfileForUser($email: String!, $bio: String!) {
        addProfileForUser(
            userUniqueInput: {
                email: $email
            }
            bio: $bio
        ) {
            ...ProfileFields 
            user {
                ...UserIdentities
            }
        }
    }
    ${UserIdentities}
    ${ProfileFields}
` 

// Update the `Profile` to a user
export const UPDATE_PROFILE_FOR_USER = `
    mutation updateProfileForUser($email: String!, $bio: String!) {
        updateProfileForUser(
            email: $email,
            bio: $bio
        ) {
            id
        }
    }
` 