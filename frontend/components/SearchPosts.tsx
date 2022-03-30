import React from 'react';

import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useSearchPosts from '../hooks/useSearchPosts';
import Posts from './Posts'
import Link from 'next/link'
import PostUpvoter from './PostUpvoter'

const SearchPosts = ({ isValid, searchText, take, skip }: any) => {
    const {
        hasSuggestions,
        isLoading,
        isOpen,
        items,
        count
    } = useSearchPosts({ isValid, searchText, take, skip });

    const suggestions = 
        items.map((post, index) => (
        <li key={post.id}>
          <div>
            <span>{index + 1}. </span>
            <Link href="/post/[id]" as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
            <PostUpvoter id={post.id} votes={post.votes || 0} />
          </div>
        </li>
      ))

    const shouldDisplaySuggestions = suggestions ? <div>
         <section>
               <ul>
                {suggestions}
            </ul>
         </section>   
    </div> : null;

    if (isOpen && hasSuggestions) {
        return shouldDisplaySuggestions;
    } else if (isLoading) {
        return <div>
            <ListGroup.Item>Loading...</ListGroup.Item>
        </div>;
    } else if (isOpen && !hasSuggestions) {
        return <div>
            <ListGroup>
                <ListGroup.Item>No products found</ListGroup.Item>
            </ListGroup>
        </div>
    } else {
        return null;
    }
};

export default SearchPosts;
