import { useState } from 'react'
import { Post, FeedListQuery, useFeedListQuery} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
import ErrorMessage from '../error-message'

export type TODOResult = any

export const allPostsQueryOptions = (skip = 0) => ({
    variables: { skip, first: 10 },
    updateData: (prevResult: TODOResult, result: TODOResult ) => ({
      ...result,
      allPosts: prevResult
        ? [...prevResult.allPosts, ...result.allPosts]
        : result.allPosts,
    }),
})

function Posts({ posts }: { posts: FeedListQuery["feed"] }) {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post as Post} />
      ))}
    </ul>
  );
}

export default function WrappedPosts({posts}: {posts: Post[]}){
    const [skip, setSkip] = useState(0)
    const {loading, error, data } = useFeedListQuery();

    if (error) return <ErrorMessage message="Error loading posts." />
    if (!data) return <div>Loading</div>

    //const { allPosts, _allPostsMeta } = data
    //const areMorePosts = allPosts.length < _allPostsMeta.count

    return (
        <div>
            <h1>Posts</h1>
            <Posts posts={data.feed} />
        </div> 
    )
}

//export default WrappedPosts;