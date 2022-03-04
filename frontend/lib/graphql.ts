import { gql } from "@apollo/client"

const PostFields = gql`
    fragment PostFields on Post{
      id
      title
      content
      published
    }
`;

const UserIdentities = gql`
    fragment UserIdentities on User{
        id
        name
        email
    }
`;

const ProfileFields = gql`
    fragment ProfileFields on Profile{
        id
        bio
    }
`;

const UserFields = gql`
    fragment UserFields on User{
        ...UserIdentities
        posts{
          ...PostFields
        }
        profile{
          ...ProfileFields
        }
    }
    ${UserIdentities}
    ${ProfileFields}
`;

export const ALL_FEEDS = gql`
query allFeeds {
    feed{
      ...PostFields
      author {
        ...UserIdentities
      }
    }
  }
  ${PostFields}
  ${UserIdentities}
`;

export const POST_BY_ID = gql`
  query postById ($id: Int!) {
    postById(id: $id ) {
      ...PostFields
      author {
        ...UserFields
      }
    }
  }
  ${PostFields}
  ${UserFields}
`

// export const paginated_feed = gql`
//   query paginated_feed {
//     feed(
//       skip: null
//       take: 2
//       orderBy: { updatedAt: desc }
//     ) {
//       id
//       updatedAt
//       title
//       content
//       published
//     }
//   }
// `

// export const filterFeeds = gql`
//   query filterFeeds ($searchString: String) {
//     feed(
//       searchString: $searchString
//     ) {
//       id
//       title
//       content
//       published
//     }
//   }
// `

// export const togglePublishPost = gql`
//   mutation togglePublishPost {
//     togglePublishPost(id: 4) {
//       id
//       published
//     }
//   }
// `

// export const incrementPostViewCount = gql`
//   mutation incrementPostViewCount {
//     incrementPostViewCount(id: 3) {
//       id
//       viewCount
//     }
//   }
// `

// export const signupUser = gql`
//   mutation signupUser($name: String $email: String!){
//     signupUser(
//       {
//         name: $name,
//         email: $email
//       }
      
//       ) {
//       id
//     }
//   }
// `

// export const createDraft = gql`
//   mutation {
//     createDraft(
//       title: "Join the Prisma Slack"
//       content: "https://slack.prisma.io"
//       authorEmail: "alice@prisma.io"
//     ) {
//       id
//       published
//     }
//   }
// `

// export const publish = gql`
//   mutation {
//     publish(postId: "5") {
//       id
//       published
//     }
//   }
// `

// export const deletePost = gql`
//   mutation deletePost($postId: Int!) {
//     deletePost(id: $postId) {
//       id
//     }
//   }
// `

// export const allUsers = gql`
//   query allUsers{
//     allUsers {
//       id
//       name
//       email
//     }
//   }
// `

// export const draftsByUser = gql`
//   query draftsByUser($id: Int, $email: String) {
//     draftsByUser(
//       userUniqueInput: {
//         id : $id
//         email: $email
//       }
//     ) {
//       id
//       title
//       content
//       published
//       author {
//         id
//         name
//         email
//       }
//     }
//   }
//  `

// export const addProfileForUser = gql`
//   mutation addProfileForUser(){
//     addProfileForUser(
//       email: "mahmoud@prisma.io"
//       bio: "I like turtles"
//     ) {
//       id
//       bio
//       user {
//         id
//         name
//       }
//     }
//   }
// `  