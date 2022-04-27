import { useEffect, useState } from 'react';
//import { useLazyQuery } from '@apollo/client';
import { usePostsLazyQuery, Post } from '../../types/graphql_generated'
//import { GET_QUICK_SEARCH_SUGGESTIONS } from '../../queries/product.gql';
import { DEFAULT_PAGE_TAKE, Suggestion } from '../../types/app_types'  
import { NetworkStatus } from "@apollo/client"; 

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


export const usePostsSuggestions = (searchString : string) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ hasSuggestions, setHasSuggestions ] = useState(false);
    const [fetchSuggestions, { loading, data, networkStatus, fetchMore }] = usePostsLazyQuery({
        variables: {
            take: DEFAULT_PAGE_TAKE,
            after: null,
          },
        notifyOnNetworkStatusChange: true,          
    });    

    useEffect(() => {
        fetchSuggestions({
            variables: {
                searchString,
                take: DEFAULT_PAGE_TAKE,
            },            
        });
    }, [fetchSuggestions, searchString]);

    const loadingMore = networkStatus === NetworkStatus.fetchMore
    const posts = data?.posts!.edges.map((edge) => (edge.node as Post)) || [];
  
    useEffect(() => {
        data?.posts!.edges.length! > 0 ?
            setHasSuggestions(true): setHasSuggestions(false);
    }, [data]);

    const loadMore = () => {
        fetchMore({
          variables: {
            after: data?.posts!.pageInfo.endCursor
          },
        })
      }

    const suggestion: Suggestion<Post> =  {
        hasSuggestions,
        isLoading: loading,
        hasMore: data?.posts!.pageInfo!.hasMore!!,
        totalCount: data?.posts!.pageInfo!.totalCount! | 0,
        items: posts,
        loadingMore,
        loadMore
    }
    return suggestion
}

export default usePostsSuggestions;