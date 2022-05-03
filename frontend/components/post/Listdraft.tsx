import PostUpvoter from './PostUpvoter'
import Link from 'next/link'
import { PostsQuery, PageInfo, PostEdge, Post } from '../../types/graphql_generated'

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
              <Link href="/drafts/[id]" as={`/drafts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </section>  
    )
  }
  
export default Posts