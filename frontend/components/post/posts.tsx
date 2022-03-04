import * as AllTypes from '../../interfaces/nexus'
import PostItem from './PostItem'

const Posts = ({posts}: {posts: AllTypes.NexusGenFieldTypes["Query"]["feed"]}) => {
  return posts && (
    <div className="page">
        <h1>Blog List</h1>
        <ul>          
          {posts?.map((post) => ( 
              <PostItem key={post.id} post={post as AllTypes.NexusGenFieldTypes["Post"]} />
          ))}
        </ul>
    </div>
  );
};

export default Posts;
