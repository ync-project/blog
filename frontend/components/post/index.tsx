import {useDebouncedCallback} from "use-debounce"
import { Post, FeedListQuery, useFeedListLazyQuery} from '../../lib/graphql_generated'
import PostItem from './PostItem'

function Posts({ posts }: { posts: FeedListQuery["feed"] }) {
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post as Post} />
      ))}
    </ul>
  );
}

function WrappedPosts({posts}: {posts: Post[]}){
  const [ loadPosts , {loading, error, data }] = useFeedListLazyQuery();

  const _findPost = (title: string) => {
    loadPosts({ variables: { searchString: title }})
  }
  const findPost = useDebouncedCallback(_findPost, 500)

  const renderResults = () => {
    if (loading) {
      return <span>Loading...</span>;
    }

    if (error) {
      return <span>Something went wrong: ${error}</span>;
    }

    return (posts && <Posts posts={posts} />) 
            || (data && <Posts posts={data.feed} />)
  }

  return (
    <div>
        <h1>Posts</h1>
        <input
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tightfocus:outline-nonefocus:shadow-outlinemb-4"
          placeholder="Search..."
          type="text"
          onFocus={(e) => findPost(e.target.value)}
          onChange={(e) => findPost(e.target.value)}
        />
        {renderResults()}
    </div> 
  );
}

export default WrappedPosts;