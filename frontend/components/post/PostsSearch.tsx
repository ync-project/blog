import React, { useState } from 'react';
import { SearchProps, Suggestion } from '../../types/app_types'  
import { ListGroup } from 'react-bootstrap';
import usePostsSuggestions from './usePostsSuggestions';
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'
import {Button, Suggestions} from '../../styles/styles'

const PostSearch = () => {
    return (
        <Search>
            <PostSearchSuggestions searchQuery={''}/>
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
    <Suggestions>
        <ListGroup>
            <ListItem posts={items} totalCount={totalCount} />
        </ListGroup>
        {hasMore && (
            <Button onClick={() => loadMore()} disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Show More'} 
            </Button>
          )}
    </Suggestions> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions ;
    } else if (isLoading) {
        return <Suggestions>
            <ListGroup.Item>Loading...</ListGroup.Item>
        </Suggestions>;
    } else if (!hasSuggestions) {
        return <Suggestions>
            <ListGroup>
                <ListGroup.Item>No products found</ListGroup.Item>
            </ListGroup>
        </Suggestions>
    } else {
        return null;
    }
};

export default PostSearch;