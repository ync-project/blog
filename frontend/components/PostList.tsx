import React, { useState } from "react";
import {useEffect} from 'react'
import { DEFAULT_PAGE_TAKE, SearchVariables } from '../interfaces/app_types'  
import { useQuery, useLazyQuery, NetworkStatus } from '@apollo/client'
import { AllPostsDocument, AllPostsQuery } from '../interfaces/graphql_generated'
import Search from "./Search";
import ClientOnly from '../components/ClientOnly'
import Posts from "./Posts";

/**
 * this component implements both lazyQuery and fetchMore
 * @returns 
 */
export default function PostList(){
  const [variables, setVariables] = useState<SearchVariables>({
    take: DEFAULT_PAGE_TAKE,
    skip: 0
  })
  const handleSearch = (event: any) => {
    event.preventDefault()
    const formData = new window.FormData(event.target)
    //form.reset()
    const newVariables = {
      searchString: formData.get('searchString')!.toString(),
      take: Number(formData.get('take')!.toString()) || DEFAULT_PAGE_TAKE,
      skip: Number(formData.get('skip')!.toString()) || 0,       
    }
    setVariables(newVariables)
    //loadPosts({variables: newVariables })
  }

  // // default fetched data
  const { data: data1, loading, error, networkStatus, fetchMore } = useQuery<AllPostsQuery>(    
    AllPostsDocument, {
        variables,
        notifyOnNetworkStatusChange: true,
        //fetchPolicy: "network-only",   // Used for first execution
        //nextFetchPolicy: "cache-first" // Used for subsequent executions
    });

    // search data
    // const [loadPosts, { data: data2, loading: loading2, error: error2, fetchMore,
    //             networkStatus: networkStatus2}] = useLazyQuery<AllPostsQuery>(
    //   AllPostsDocument, {
    //       variables,
    //       notifyOnNetworkStatusChange: true,
    //   });
    
    // useEffect(() => {
    //     loadPosts();
    // }, []);
      
    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    if ( networkStatus === NetworkStatus.fetchMore 
        //|| networkStatus2 === NetworkStatus.fetchMore
        ) return <p>Refetching!</p>;

    if ( loading 
      // || loading2
      ) {
      return <span>Loading...</span>;
    }
    if ( error
        // || error2
        ) {
      return <span>Something went wrong: ${error}</span>;
    }

    const data = data1 //? data2 : null //data1
    // if (!data) {
    //   return <span>No product!</span>;
    // }

    console.log('data1', data1)
    //console.log('data2', data2)

    const loadMorePosts = (skip : number) => {
      //console.log('variables', variables)
      console.log('skip', skip)
      fetchMore({
        variables: {
          //...variables,
          skip: skip || undefined,
        },
        // updateQuery: (previousResult, { fetchMoreResult }) => {
        //   if (!fetchMoreResult) return previousResult;
        //   return Object.assign({}, previousResult, {
        //     allPosts: {
        //       ...previousResult.allPosts,
        //       votes: [...previousResult.allPosts.votes, ...fetchMoreResult.allPosts.votes]
        //     }
        //   });
        // }
      })
    }
    return ( 
      <>
        {console.log('rendering...')}
        <ClientOnly>
          <h1>Post List</h1>
          <Search handeleSearch={handleSearch} variables={variables} skip={data?.allPosts?.length}/>
          {data &&
          <Posts posts={data.allPosts} count={data._allPostsMeta?.count!}
                  loadMorePosts={loadMorePosts} loadingMorePosts={loadingMorePosts} />}
        </ClientOnly>
      </>
    )
}