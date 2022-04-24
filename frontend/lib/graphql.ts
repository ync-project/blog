import { gql } from "@apollo/client"

export const PostFields = gql`
    fragment PostFields on Post{
        id
        title
        content
        viewCount
        votes
        published
        createdAt
        updatedAt
    }
`  
export const UserIdentities = gql`
    fragment UserIdentities on User{
      id
      email
    }
`  
export const UserFields = gql`
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
  
export const ProfileFields = gql`
    fragment ProfileFields on Profile{
        id
        bio
    }
`  

// Search posts with paginated and ordered results
export const POSTS = gql`
    query posts(
        $searchString: String, 
        $take: Int, 
        $skip: Int
        $after: Int, 
        $orderBy: OrderByUpdatedAtInput
    ) {
        posts(  take: $take, skip: $skip, after: $after, 
                searchString: $searchString, orderBy: $orderBy){
            pageInfo{        
                endCursor
                hasMore
                totalCount
            }
            edges{
                cursor
                node{
                    ...PostFields
                    author{
                        ...UserIdentities
                    }
                }    
            }
        }
    }
    ${PostFields}
    ${UserIdentities}
`

// Retrieve a single post
export const POST_BY_ID = gql`
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
export const DRAFTS_BY_USER = gql`
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
export const CREATE_DRAFT = gql`
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
export const TOGGLE_PUBLISH_POST = gql`
    mutation togglePublishPost($id: Int!) {
        togglePublishPost(id: $id) {
            id
            published
        }
    }
`  

// vote to an existing post
export const VOTE_POST = gql`
    mutation votePost($id: Int!) {
        votePost(id: $id) {
            id
            votes
        }
    }
`  

// Increment the view count of a post
export const INCREMENT_POST_VIEW_COUNT = gql`
    mutation incrementPostViewCount($id: Int!) {
        incrementPostViewCount(id: $id) {
            id
            viewCount
        }
    }  
`

// Delete a post
export const DELETE_POST = gql`  
    mutation deletePost($id: Int!) {
        deletePost(id: $id) {
            id
        }
    }
`  

// list all users
export const USERS = gql`
    query users(
        $searchString: String, 
        $take: Int, 
        $skip: Int
        $after: Int, 
        $orderBy: OrderByUpdatedAtInput
    ) {
    users(  take: $take, skip: $skip, after: $after, 
            searchString: $searchString, orderBy: $orderBy){
        pageInfo{        
            endCursor
            hasMore
            totalCount
        }
        edges{
            cursor
            node{
                ...UserIdentities
            }    
        }
        }
    }
`  

// display a user
export const USER = gql`
    query user($id: Int!) {
        user(id: $id ) {
        ...UserFields
        }
    }
    ${UserFields}
`  

// Create a new user
export const SIGNUP_USER = gql`
    mutation signupUser($email: String!, $name: String = "", $password: String!) {
        signupUser(data: { name: $name, email: $email, password: $password }) {
            ...UserIdentities
        }
    }  
    ${UserIdentities}
` 
// Create a new user with profile
export const SIGNUP_USER_AND_PROFILE = gql`
    mutation signupUserAndProfile($email: String!, $name: String = "", $password: String!, $bio: String!) {
        signupUser(data: { name: $name, email: $email, password: $password}, bio: $bio ) {
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
export const ADD_PROFILE_FOR_USER = gql`
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
export const UPDATE_PROFILE_FOR_USER = gql`
    mutation updateProfileForUser($email: String!, $bio: String!) {
        updateProfileForUser(
            email: $email,
            bio: $bio
        ) {
            id
        }
    }
` 