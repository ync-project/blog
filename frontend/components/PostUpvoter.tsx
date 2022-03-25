import { gql, useMutation } from '@apollo/client'
import { Post } from '../interfaces/graphql_generated'

const UPDATE_POST_MUTATION = gql`
  mutation votePost($id: Int!) {
    votePost(id: $id) {
      id
      votes
      __typename
    }
  }
`

export default function PostUpvoter({ votes, id }: {id: Post["id"], votes: Post["votes"]}) {
  const [updatePost] = useMutation(UPDATE_POST_MUTATION)

  const upvotePost = () => {
    //console.log('upvotePost', id, typeof(id))
    updatePost({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        votePost: {
          __typename: 'Post',
          id,
          votes: votes,
        },
      },
    })
  }

  return (
    <button onClick={() => upvotePost()}>
      {votes}
      <style jsx>{`
        button {
          background-color: transparent;
          border: 1px solid #e4e4e4;
          color: #000;
        }
        button:active {
          background-color: transparent;
        }
        button:before {
          align-self: center;
          border-color: transparent transparent #000000 transparent;
          border-style: solid;
          border-width: 0 4px 6px 4px;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </button>
  )
}
