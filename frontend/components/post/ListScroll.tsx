import PostUpvoter from './PostUpvoter'
import Link from 'next/link'
import { Post } from '../../types/graphql_generated'
import ListItem from './ListItem'

const handleScroll = ({ currentTarget }: any, onLoadMore: ()=> void, hasMore: boolean) => {
  if (
    hasMore && 
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight 
  ) {
    onLoadMore();
    //console.log('scrolling')
  }
};

interface Props { 
  posts: Post[]
  loadMore: ()=>void;
  hasMore: boolean;
  totalCount: number;
}

const Posts = ({posts, loadMore, hasMore, totalCount}: Props) => { 
  return ( posts &&
    <section>
      <div
        className="list-group chapter-list"
        onScroll={e => handleScroll(e, loadMore, hasMore)}
      >
      <ListItem posts={posts} totalCount={totalCount} />
      </div>
      <style jsx>{`
        .chapter-list {
          margin-top: 15px;
          max-height: 200px;
          overflow: scroll;
        }
        section {
          padding-bottom: 20px;
        }
      `}</style>
    </section>  
    )
  }
  
export default Posts