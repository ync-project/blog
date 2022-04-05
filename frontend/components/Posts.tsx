import PostUpvoter from './PostUpvoter'
import Link from 'next/link'
import { AllPostsQuery } from '../interfaces/graphql_generated'

const Posts = ({posts, count}: 
      {posts: AllPostsQuery["allPosts"], count: number}) => { 
    const areMore = Number(posts.length) < count
    return ( posts &&
    <section>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <span>{post.id}. </span>
              <Link href="/post/[id]" as={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <PostUpvoter id={post.id} votes={post.votes || 0} />
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