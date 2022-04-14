import PostUpvoter from './PostUpvoter'
import Link from 'next/link'
import { PostsQuery, Post } from '../types/graphql_generated'

const Posts = ({posts, loadMorePosts, loadingMorePosts, hasMore, totalCount}: 
  {posts: Post[], count: number, loadMorePosts: any, loadingMorePosts: any
   , hasMore: boolean, totalCount: number}) => { 
    return ( posts &&
    <section>
      <ul>
        {posts.map((post) => ( post &&
          <li key={post.id}>
            <div>
              <span>{post.id}. </span>
              <Link href="/post/[id]" as={`/post/${post.id}`}>
                <a>{post.id}. {post.title}</a>
              </Link>
              <PostUpvoter id={post.id} votes={post.votes || 0} />
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'} (total: {totalCount})
        </button>
      )}

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
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>  
    )
  }
  
export default Posts