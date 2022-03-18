import { useState } from 'react'
import { Post, Response} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
export type TODOResult = any

const fetchMore = ({}) => {}


const loadingMorePosts = false
export default function Posts( props: Response ) {
  //co{response: {pageInfo, posts} } : {response: Response}
  const [posts, setPosts] = useState(props.response.posts);
  const {hasNextPage, currentPage} = props.response.pageInfo!

  const loadMorePosts = async () => {
    fetchMore({
      // variables: {
      //   skip: allPosts.length,
      // },
    })
    const newPosts = await getNewPostsFromApi();
    setPosts(...posts, ...newPosts);
  }
    return (
    <>
      <ul>
        {posts?.map((post) => (
          <PostItem key={post?.id} post={post as Post} />
        ))}
      </ul>
      {hasNextPage && (
          <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
            {loadingMorePosts ? 'Loading...' : 'Show More'}
          </button>
        )}
    </>
  );
}

