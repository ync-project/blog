import React, { useState } from 'react';
import { Result } from '../../types/app_types'  
import { ListGroup } from 'react-bootstrap';
import useDraftsSuggestions from './useDraftsSuggestions';
import Listdraft from './Listdraft'
import { Post } from '../../types/graphql_generated'
import {Button, Section, Suggestions} from '../../styles/styles'

const DraftsSearch = ({email}: {email: string}) => {
    //console.log('email', email)
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
    <Suggestions>
        <ListGroup>
            <Listdraft posts={items} totalCount={items.length} />
        </ListGroup>
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

export default DraftsSearch;