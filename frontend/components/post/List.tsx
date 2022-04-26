import { Post } from '../../types/graphql_generated'
import ListItem from './ListItem'

interface Props { 
  posts: Post[]
  loadMore: ()=>void;
  loadingMore: boolean;
  hasMore: boolean;
  totalCount: number;
}

const Posts = ({posts, loadMore, loadingMore, hasMore, totalCount}: Props) => { 
    return ( posts &&
    <section>
      <ListItem posts={posts} totalCount={totalCount} />
      {hasMore && (
        <button onClick={() => loadMore()} disabled={loadingMore}>
          {loadingMore ? 'Loading...' : 'Show More'} 
        </button>
      )}

      <style jsx>{`
        section {
          padding-bottom: 20px;
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