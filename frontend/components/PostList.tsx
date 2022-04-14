import React, { useState } from "react";
import {useEffect} from 'react'
import { DEFAULT_PAGE_TAKE, SearchVariables } from '../types/app_types'  
import { useQuery, useLazyQuery, NetworkStatus } from '@apollo/client'
import { PostsDocument, PostsQuery, Post } from '../types/graphql_generated'
import Search from "./Search";
import ClientOnly from '../components/ClientOnly'
import Posts from "./Posts";
import { client } from '../lib/apolloClient'

/**
 * this component implements both lazyQuery and fetchMore
 * @returns 
 */
export default function PostList(){
  const [searchString, setSearchString] = useState<string>('')
  const [take, setTake] = useState<number>(DEFAULT_PAGE_TAKE)
  const [skip, setSkip] = useState<number>(0)
  const [valid, setVaild] = useState<boolean>(true)

  const handleSearchstring = (value: any) => {
    setSearchString(value)
  }
  const handleTake = (e: any) => {
    //console.log('handleTake', e.target.value)
    setTake(Number(e.target.value))
  }
  const handleSkip = (e: any) => {
    setSkip(Number(e.target.value))
  }

  const handleSearch = (event: any) => {
    event.preventDefault()
    const formData = new window.FormData(event.target)
    const searchString = formData.get('searchString')!.toString()
    setSearchString(searchString)
    // //form.reset()
    // const newVariables = {
    //   searchString: formData.get('searchString')!.toString(),
    //   take: Number(formData.get('take')!.toString()) || DEFAULT_PAGE_TAKE,
    //   skip: Number(formData.get('skip')!.toString()) || 0,       
    // }
    //setVariables(newVariables)
    //loadPosts({variables:{ searchString, take, skip}  })
  }

  //

  // // default fetched data
  const { data, loading, error, networkStatus, fetchMore } = useQuery<PostsQuery>(    
    PostsDocument, {
        variables: {searchString, take, skip},
        notifyOnNetworkStatusChange: true,
        //fetchPolicy: "network-only",   // Used for first execution
        //nextFetchPolicy: "cache-first" // Used for subsequent executions
    });

    // useEffect(() => {
    //     loadPosts();
    // }, []);
      
    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    if ( networkStatus === NetworkStatus.fetchMore 
        ) return <p>Refetching!</p>;

    if ( loading ) {
      return <span>Loading...</span>;
    }
    if ( error ) {
      return <span>Something went wrong: ${error}</span>;
    }

    if (!data) {
      return <span>No product!</span>;
    }

    const { posts, totalCount, cursor, hasMore} = data.posts!

    const loadMorePosts = () => {
      console.log('cursor', cursor)
      fetchMore({
        variables: {
          skip: 1,
          after: cursor
        }
        // updateQuery: (previousResult, { fetchMoreResult }) => {
        //   if (!fetchMoreResult) return previousResult;
        //   return Object.assign({}, previousResult, {
        //     posts: {
        //       ...previousResult.posts?.posts,
        //     }
        //   });
        // }
      })
    }
    return ( 
      <>
        <ClientOnly>
          <h1>Post List</h1>
          <Search handeleSearch={handleSearch} 
              searchString={searchString} handleSearchstring={handleSearchstring}
              take={take} handleTake={handleTake}/>
          {valid && data &&
          <Posts posts={posts as Post[]} count={totalCount} hasMore={hasMore} totalCount={totalCount}
                  loadMorePosts={loadMorePosts} loadingMorePosts={loadingMorePosts} />}
        </ClientOnly>
      </>
    )
}