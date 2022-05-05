import React, { useState } from 'react';
import { Result } from '../../types/app_types'  
import useDraftsSuggestions from './useDraftsSuggestions';
import Listdraft from './Listdraft'
import { Post } from '../../types/graphql_generated'

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
    <div>
        <div>
            <Listdraft posts={items} totalCount={items.length} />
        </div>
    </div> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions ;
    } else if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>;
    } else if (!hasSuggestions) {
        return <div>
            <p>No products found</p>
        </div>
    } else {
        return null;
    }
};

export default DraftsSearch;