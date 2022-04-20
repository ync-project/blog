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
export const useSearchPosts = (props: any) => {
    const { searchText, take, skip } = props;
    const [ hasSuggestions, setHasSuggestions ] = useState(false);
    const [fetchPosts, { loading, data }] = usePostsLazyQuery();

    console.log(
    ', searchText', searchText, 
    ', take', take, 
    ', skip', skip)

    useEffect(() => {
        fetchPosts({
            variables: {
                searchString: searchText,
                take,
                skip,
            }
        });
    }, [fetchPosts, searchText, take, skip]);

    useEffect(() => {
        data?.posts!.posts.length ?
            setHasSuggestions(true): setHasSuggestions(false);
    }, [data]);

    return {
        hasSuggestions,
        isLoading: loading,
        items: data?.posts!.posts || [],
        count: data?.posts?.totalCount || 0
    }
}

export default useSearchPosts;