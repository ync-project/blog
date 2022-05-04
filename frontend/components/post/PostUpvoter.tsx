import { gql, useMutation } from '@apollo/client'
import {VoteButton} from '../../styles/styles'

const UPDATE_POST_MUTATION = gql`
  mutation votePost($id: Int!) {
    votePost(id: $id) {
      id
      votes
      __typename
    }
  }
`

export default function PostUpvoter({ votes, id }: {id: number, votes: number}) {
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
          votes: votes + 1,
        },
      },
    })
  }

  return (
    <VoteButton onClick={() => upvotePost()}>
      {votes}
    </VoteButton>
  )
}
