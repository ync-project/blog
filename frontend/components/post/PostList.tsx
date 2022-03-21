import { Post, Response} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
export type TODOResult = any
import client from "../../lib/apollo-client"; 
import { FeedsDocument} from '../../interfaces/graphql_generated'
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

// You can style your pagination component
// thanks to styled-components.
// Use inner class names to style the controls.
const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

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
    <>
    <div className="container">
        <h1>Posts List with Pagination in Next.js</h1>
        <div className="posts">
            {content}
        </div>
        <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageInfo.pageCount}
            pageRangeDisplayed={4}
            marginPagesDisplayed={2}
            onPageChange={pagginationHandler}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount ? `/page/${page}` : '#'
            }
            hrefAllControls
          />  
    </div>
    </>
  )
}

