import { useEffect, useState } from 'react';
//import { useLazyQuery } from '@apollo/client';
import { useDraftsByUserLazyQuery, Post, SortOrder } from '../../types/graphql_generated'
//import { GET_QUICK_SEARCH_SUGGESTIONS } from '../../queries/product.gql';
import { Result } from '../../types/app_types'  
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


export const usePostsSuggestions = (email : string) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ hasSuggestions, setHasSuggestions ] = useState(false);
    const [fetchSuggestions, { loading, data, networkStatus, fetchMore }] = useDraftsByUserLazyQuery({
        variables: {
          email
          },
        notifyOnNetworkStatusChange: true,          
    });    

    useEffect(() => {
        fetchSuggestions({
            variables: {
              email,
              orderBy: {updatedAt: SortOrder.Desc}
            },            
        });
    }, [fetchSuggestions, email]);

    const loadingMore = networkStatus === NetworkStatus.fetchMore
    const drafts = data?.draftsByUser?.map((draft) => (draft as Post)) || [];
  
    useEffect(() => {
        drafts.length! > 0 ?
            setHasSuggestions(true): setHasSuggestions(false);
    }, [data]);


    const suggestion: Result<Post> =  {
        hasSuggestions,
        isLoading: loading,
        items: drafts,
    }
    return suggestion
}

export default usePostsSuggestions;