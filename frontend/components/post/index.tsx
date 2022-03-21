import Link from 'next/link'
import { Post, Response } from '../../interfaces/graphql_generated'
import PostItem from './PostItem'

function Posts({ posts }: {posts: Response["posts"]}) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post?.id}>
            <PostItem key={post?.id} post={post as Post} />
        </li>
      ))}
    </ul>
  )
}

export default Posts