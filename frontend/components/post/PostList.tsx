import { Post, Response} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
export type TODOResult = any
import client from "../../lib/apollo-client"; 
import { FeedsDocument} from '../../interfaces/graphql_generated'
import ReactPaginate from 'react-paginate';

type Page = {
  selected: number
}


const loadingMorePosts = false
export default function Posts( { response, pagginationHandler }: 
        {response: Response, pagginationHandler:(page: Page)=>void}) {
  const { pageInfo, posts} = response


  //Conditional rendering of the posts list or loading indicator
  let content = null;
  if (posts) {
      //Generating posts list
      content = (
          <ul>
              {posts.map(post => {
                  return <li key={post?.id}>{post?.title}</li>;
              })}
          </ul>
      );
  }
  return (
    <div className="container">
        <h1>Posts List with Pagination in Next.js</h1>
        <div className="posts">
            {content}
        </div>

        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={'active'}
            containerClassName={'pagination'}
            //subContainerClassName={'pages pagination'}
            initialPage={Number(pageInfo?.currentPage) - 1}
            pageCount={Number(pageInfo?.pageCount)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={pagginationHandler}
        />
    </div>
  )
}

