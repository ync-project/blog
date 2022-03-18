import { useState } from 'react'
import { Post, Response} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
export type TODOResult = any
import client from "../../lib/apollo-client"; 
import { FeedsDocument} from '../../interfaces/graphql_generated'
import { allPostsQueryVars } from '../../pages';

const fetchMore = async ( page: number) => {
  const { data, loading, error} = await client.query({
    query: FeedsDocument,
    variables: { 
        page: page + 1,
        take: 3
      }, 
  });
  if (data) return data.feeds
  return null
  
}

type Props = {
  response: Response
}

const loadingMorePosts = false
export default function Posts( { response }: Props) {
  //co{response: {pageInfo, posts} } : {response: Response}
  const [posts, setPosts] = useState(response.posts);
  const [currentPage, setCurrentPage] = useState(response.pageInfo?.currentPage);
  const {hasNextPage} = response.pageInfo!

  const loadMorePosts = async () => {
    const newFeeds = await fetchMore(currentPage!);
    if (newFeeds){
      //console.log(newPosts, newPosts)
      setPosts([...newFeeds.posts]);
      setCurrentPage(newFeeds.pageInfo.currentPage)

    }  
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

