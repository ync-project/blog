import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { SearchMode, SearchProps, Suggestion } from '../../types/app_types'  
import { ListGroup } from 'react-bootstrap';
import usePostsSuggestions from './usePostsSuggestions';
import classes from './PostsSearch.module.css'
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'

const PostSearch = () => {
  return (
    <Search>
        <PostSearchSuggestionsScroll searchQuery={''}/>
    </Search>
)            
};

const PostSearchSuggestionsScroll = ({searchQuery}: SearchProps) => {
    const {
        hasSuggestions,
        isLoading,
        hasMore,
        totalCount,
        items,
        loadingMore,
        loadMore
    }: Suggestion<Post> = usePostsSuggestions(searchQuery);

    const suggestions = items.map((product: any) => {
        return <ListGroup.Item key={product.id}>
            {product.title}
        </ListGroup.Item>
    });

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

    const shouldDisplaySuggestions = suggestions ? 
        <div className={classes.suggestions}>
          <div
            className="list-group chapter-list"
            onScroll={e => handleScroll(e, loadMore, hasMore)}
          >
            <ListGroup>
                <ListItem posts={items} totalCount={totalCount} />
            </ListGroup>
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
          </div>  
        </div> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions;
    } else if (isLoading) {
        return <div className={classes.suggestions}>
            <ListGroup.Item>Loading...</ListGroup.Item>
        </div>;
    } else if (!hasSuggestions) {
        return <div className={classes.suggestions}>
            <ListGroup>
                <ListGroup.Item>No products found</ListGroup.Item>
            </ListGroup>
        </div>
    } else {
        return null;
    }
};

export default PostSearch;