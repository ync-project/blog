import { useEffect, useState } from 'react';
//import { useLazyQuery } from '@apollo/client';
import { AllPostsQuery, useAllPostsLazyQuery } from '../interfaces/graphql_generated'
//import { GET_QUICK_SEARCH_SUGGESTIONS } from '../../queries/product.gql';
import {AllPostsDocument} from '../interfaces/graphql_generated'
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
export const useSearchPosts = (props: any) => {
    const { isValid, searchText, take, skip } = props;
    const [ isOpen, setIsOpen ] = useState(false);
    const [ hasSuggestions, setHasSuggestions ] = useState(false);
    const [fetchPosts, { loading, data }] = useAllPostsLazyQuery();

    // console.log('isValid', isValid, 
    // ', searchText', searchText, 
    // ', take', take, 
    // ', skip', skip)

    useEffect(() => {
        if (isValid) {
            fetchPosts({
                variables: {
                    searchString: searchText,
                    take,
                    skip,
                }
            });
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [fetchPosts, isValid, searchText, take, skip]);

    useEffect(() => {
        data?.allPosts.length ?
            setHasSuggestions(true): setHasSuggestions(false);
    }, [data]);

    return {
        hasSuggestions,
        isLoading: loading,
        isOpen,
        items: data?.allPosts || [],
        count: data?._allPostsMeta?.count || 0
    }
}

export default useSearchPosts;