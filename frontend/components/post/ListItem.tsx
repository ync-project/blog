import PostUpvoter from './PostUpvoter'
import Link from 'next/link'
import { Post } from '../../types/graphql_generated'

interface Props { 
  posts: Post[]
  totalCount: number;
}

const Posts = ({posts, totalCount}: Props) => { 
    return ( posts &&
    <section>
      founds : {totalCount} records
      <ul>
        {posts.map((post, index) => ( post &&
          <li key={post.id}>
            <div>
              <span>{index+1}. </span>
              <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <PostUpvoter id={post.id} votes={post.votes || 0} />
            </div>
          </li>
        ))}
      </ul>
    </section>  
    )
  }
  
export default Posts