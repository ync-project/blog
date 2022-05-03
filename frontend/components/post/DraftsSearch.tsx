import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { SearchMode, SearchProps, Result } from '../../types/app_types'  
import { ListGroup } from 'react-bootstrap';
import useDraftsSuggestions from './useDraftsSuggestions';
import classes from './PostsSearch.module.css'
import Listdraft from './Listdraft'
import { Post } from '../../types/graphql_generated'
import Search from './Search'

const DraftsSearch = ({email}: {email: string}) => {
    console.log('email', email)
    const {
        hasSuggestions,
        isLoading,
        items,
    }: Result<Post> = useDraftsSuggestions(email);

    const suggestions = items.map((product: any) => {
        return <ListGroup.Item key={product.id}>
            {product.title}
        </ListGroup.Item>
    });

    const shouldDisplaySuggestions = suggestions ? 
    <div className={classes.suggestions}>
        <ListGroup>
            <Listdraft posts={items} totalCount={items.length} />
        </ListGroup>
          <style jsx>{`
            section {
              padding-bottom: 20px;
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

export default DraftsSearch;