import React from 'react';

import { ListGroup } from 'react-bootstrap';
import usePostsSuggestions from './usePostsSuggestions';
import classes from './PostsSearchSuggestions.module.css'
import ListItem from './ListItem'
import { SearchProps, Suggestion } from '../../types/app_types'  
import { Post } from '../../types/graphql_generated'

const QuickSearchSuggestions = ({searchQuery, mode}: SearchProps) => {
    const {
        hasSuggestions,
        isLoading,
        hasMore,
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

    const shouldDisplaySuggestionsScroll = suggestions ? 
        <div className={classes.suggestions}>
          <div
            className="list-group chapter-list"
            onScroll={e => handleScroll(e, loadMore, hasMore)}
          >
            <ListGroup>
                <ListItem posts={items} totalCount={6} />
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

    const shouldDisplaySuggestionsMore = suggestions ? 
    <div className={classes.suggestions}>
        <ListGroup>
            <ListItem posts={items} totalCount={6} />
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
        return mode === 'more' ? 
                shouldDisplaySuggestionsMore : shouldDisplaySuggestionsScroll;
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


export default QuickSearchSuggestions;
