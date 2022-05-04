import React, { useState } from 'react';
import { Result } from '../../types/app_types'  
import useDraftsSuggestions from './useDraftsSuggestions';
import Listdraft from './Listdraft'
import { Post } from '../../types/graphql_generated'
import {Suggestions} from '../../styles/styles'

const DraftsSearch = ({email}: {email: string}) => {
    console.log('email', email)
    const {
        hasSuggestions,
        isLoading,
        items,
    }: Result<Post> = useDraftsSuggestions(email);

    const suggestions = items.map((product: any) => {
        return <li key={product.id}>
            {product.title}
        </li>
    });

    const shouldDisplaySuggestions = suggestions ? 
    <Suggestions>
        <div>
            <Listdraft posts={items} totalCount={items.length} />
        </div>
    </Suggestions> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions ;
    } else if (isLoading) {
        return <Suggestions>
            <p>Loading...</p>
        </Suggestions>;
    } else if (!hasSuggestions) {
        return <Suggestions>
            <p>No products found</p>
        </Suggestions>
    } else {
        return null;
    }
};

export default DraftsSearch;