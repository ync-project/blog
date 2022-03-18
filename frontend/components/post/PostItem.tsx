import Link from "next/link"
import { Post } from '../../interfaces/graphql_generated'

const PostItem = ( { post }: {post: Post} ) => {
  return (
    <li>
      <Link href="/p/[id]" as={`/p/${post.id}`}>
        <a>
          {post.id}.
          <h2>{post.title}</h2>
          {post.author &&
          <small>By {post.author.name}</small>}
          <p>{post.content}</p>
          <style jsx>{`
            a {
              text-decoration: none;
              color: inherit;
              padding: 2rem;
              display: block;
            }
          `}</style>
        </a>
      </Link>
  </li>
  )
}

export default PostItem;