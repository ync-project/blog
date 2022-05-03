import React, { useState } from 'react';
import { SearchProps, Suggestion } from '../../types/app_types'  
import { ListGroup } from 'react-bootstrap';
import usePostsSuggestions from './usePostsSuggestions';
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'
import {ChapterList, Suggestions} from '../../styles/styles'

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
        <Suggestions>
          <ChapterList
            onScroll={(e: any) => handleScroll(e, loadMore, hasMore)}
          >
            <ListGroup>
                <ListItem posts={items} totalCount={totalCount} />
            </ListGroup>
          </ChapterList>  
        </Suggestions> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions;
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