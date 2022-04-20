import { useEffect, useState } from 'react';
//import { useLazyQuery } from '@apollo/client';
import { PostsQuery, usePostsLazyQuery } from '../types/graphql_generated'
//import { GET_QUICK_SEARCH_SUGGESTIONS } from '../../queries/product.gql';
import {PostsDocument} from '../types/graphql_generated'
import { client } from '../lib/apolloClient'

/**
 * The useQuickSearchSuggestions hook provides data and business logic for the QuickSearchSuggestions component
 *
 * @return {
 *  hasSuggestions {bool} - determines are products found based on provided search query
 *  isLoading {bool} - determines is data is currently loading
 *  isOpen {bool} - determines is component is opened
 *  items {array} - array with products returned from the API based on provided search query
 * }
 */
export const useQuickSearchSuggestions = (props: any) => {
    const { isValid, searchQuery } = props;
    const [ isOpen, setIsOpen ] = useState(false);
    const [ hasSuggestions, setHasSuggestions ] = useState(false);
    const [fetchSuggestions, { loading, data }] = usePostsLazyQuery({client});

    useEffect(() => {
        if (isValid) {
            fetchSuggestions({
                variables: {
                    searchString: searchQuery,
                }
            });
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [fetchSuggestions, isValid, searchQuery]);

    useEffect(() => {
        data && data.posts?.totalCount! > 0 ?
            setHasSuggestions(true): setHasSuggestions(false);
    }, [data]);

    return {
        hasSuggestions,
        isLoading: loading,
        isOpen,
        items: data && data?.posts!.posts ? data.posts.posts : []
    }
}

export default useQuickSearchSuggestions;