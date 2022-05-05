import Link from 'next/link'
import { Post } from '../../types/graphql_generated'

interface Props { 
  posts: Post[]
  totalCount: number;
}

const Posts = ({posts, totalCount}: Props) => { 
    return ( posts &&
    <>
      founds : {totalCount} records
      <ul>
        {posts.map((post, index) => ( post &&
          <li key={post.id}>
            <div>
              <span>{index+1}. </span>
              <Link href="/drafts/[id]" as={`/drafts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>

    </>  
    )
  }
  
export default Posts