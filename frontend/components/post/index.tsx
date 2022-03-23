import PostItem from '../../components/post/PostItem'
import { Post } from '../../interfaces/graphql_generated'
import Link from 'next/link'

const PostList = ( {posts, page=1, pageCount=10} : {
          posts: Post[], page: number, pageCount: number }) => {
    return (
        <div>
          <h1>Posts</h1>
          {posts.map((post) => (
            <li key={post.id}>
                <PostItem key={post.id} post={post} />
            </li>
          ))}
          <Link href="/post/[page]" as={`/post/${page - 1}`} >
            <button disabled={page <= 1}>
                prev
            </button>    
          </Link>  
          page {page}
          <Link href="/post/[page]" as={`/post/${page + 1}`}>
            <button disabled={page >= pageCount}>
                next
            </button>    
          </Link>  
        </div>
    )
  }

  export default PostList