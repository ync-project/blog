import Link from "next/link"
import { Post } from '../../types/graphql_generated'

const PostItem = ({post} : {post: Post}) => {
  return (
    <>
      <h2>{post.id}. {post.title}</h2>
      {post.author &&
          <small>by {post.author.email}</small>}
      <p>{post.content}</p>
    </>      
  )
}

export default PostItem;