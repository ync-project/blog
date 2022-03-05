import { Query, Post } from '../../interfaces/graphql'
import PostItem from './PostItem'

const Posts = ({posts}: {posts: Query["feed"]}) => {
  return posts && (
    <div className="page">
        <h1>Blog List</h1>
        <ul>          
          {posts?.map((post) => ( 
              <PostItem key={post.id} post={post as Post} />
          ))}
        </ul>
    </div>
  );
};

export default Posts;