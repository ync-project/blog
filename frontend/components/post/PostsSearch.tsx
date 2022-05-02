import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { SearchMode, SearchProps, Suggestion } from '../../types/app_types'  
import { ListGroup } from 'react-bootstrap';
import usePostsSuggestions from './usePostsSuggestions';
import classes from './PostsSearch.module.css'
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'

const QuickSearch = () => {
    return (
        <Search>
            <PostSearchSuggestions searchQuery=''/>
        </Search>
    )            
};

const PostSearchSuggestions = ({searchQuery}: SearchProps) => {
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

    const shouldDisplaySuggestions = suggestions ? 
    <div className={classes.suggestions}>
        <ListGroup>
            <ListItem posts={items} totalCount={totalCount} />
        </ListGroup>
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
    </div> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions ;
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

export default QuickSearch;