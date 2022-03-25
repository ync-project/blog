import Link from "next/link"
import { Post } from '../../interfaces/graphql_generated'

const PostItem = ({post} : {post: Post}) => {
  return (
      <Link href="/p/[id]" as={`/p/${post.id}`}>
        <a>
          <h2>{post.id}. {post.title}</h2>
          {post.author &&
              <small>by {post.author.name}</small>}
          <p>{post.content}</p>
          <style jsx>{`
            a {
              text-decoration: none;
              color: inherit;
              padding: 1rem;
              display: block;
            }
          `}</style>
        </a>
      </Link>
  )
}

export default PostItem;