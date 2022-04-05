import React, { useState } from "react";
import { DEFAULT_PAGE_TAKE, SearchVariables } from '../interfaces/app_types'  
import { useQuery, useLazyQuery, NetworkStatus } from '@apollo/client'
import { AllPostsDocument, AllPostsQuery } from '../interfaces/graphql_generated'
import Search from "./Search";
import ClientOnly from '../components/ClientOnly'
import Posts from "./Posts";

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
    findPosts( newVariables )
  }
  const { data: data1, loading, error, networkStatus, fetchMore } = useQuery<AllPostsQuery>(
    AllPostsDocument, {
        variables,
        notifyOnNetworkStatusChange: true,
    });

  const [loadPosts, { data: data2}] = useLazyQuery<AllPostsQuery>(
    AllPostsDocument, {
        variables,
        notifyOnNetworkStatusChange: true,
    });
  
    const findPosts = (variables: SearchVariables) => {
    loadPosts({variables})
  }    

  if (networkStatus === NetworkStatus.fetchMore) return <p>Refetching!</p>;

  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Something went wrong: ${error}</span>;
  }

  const data = data2 ? data2 : data1
  if (!data) {
    return <span>No product!</span>;
  }

  const {allPosts, _allPostsMeta} = data
  return ( 
    <>
      <ClientOnly>
        <h1>Post List</h1>
        <Search handeleSearch={handleSearch} />
        <Posts posts={allPosts} count={_allPostsMeta?.count!} />
      </ClientOnly>
    </>
  )

}