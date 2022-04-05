import React, { useState } from "react";
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
    take: DEFAULT_PAGE_TAKE
  })
  const handleSearch = (event: any) => {
    event.preventDefault()
    const formData = new window.FormData(event.target)
    //form.reset()
    const newVariables = {
      searchString: formData.get('searchString')!.toString(),
      take: Number(formData.get('take')!.toString()) || DEFAULT_PAGE_TAKE          
    }
    setVariables(newVariables)
    loadPosts({variables: newVariables })
  }

  // default fetched data
  const { data: data1, loading, error, fetchMore, networkStatus } = useQuery<AllPostsQuery>(
    
    AllPostsDocument, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

  // search data
  const [loadPosts, { data: data2, loading: loading2, error: error2, 
              networkStatus: networkStatus2}] = useLazyQuery<AllPostsQuery>(
    AllPostsDocument, {
        variables,
        notifyOnNetworkStatusChange: true,
    });
  
  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  if (networkStatus === NetworkStatus.fetchMore
      || networkStatus2 === NetworkStatus.fetchMore) return <p>Refetching!</p>;

  if (loading || loading2) {
    return <span>Loading...</span>;
  }
  if (error || error2) {
    return <span>Something went wrong: ${error}</span>;
  }

  const data = data2 ? data2 : data1
  if (!data) {
    return <span>No product!</span>;
  }

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        ...variables,
        skip: data.allPosts.length || undefined,
      },
    })
  }
  return ( 
    <>
      <ClientOnly>
        <h1>Post List</h1>
        <Search handeleSearch={handleSearch} variables={variables}/>
        <Posts posts={data.allPosts} count={data._allPostsMeta?.count!}
                loadMorePosts={loadMorePosts} loadingMorePosts={loadingMorePosts} />
      </ClientOnly>
    </>
  )
}