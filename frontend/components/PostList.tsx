import React, { useState } from "react";
import {useEffect} from 'react'
import { DEFAULT_PAGE_TAKE, Response } from '../types/app_types'  
import { useLazyQuery, NetworkStatus } from '@apollo/client'
import { PostsDocument, PostsQuery, Post } from '../types/graphql_generated'
import Search from "./Search";
import Posts from "./Posts";

/**
 * this component implements both lazyQuery and fetchMore
 * @returns 
 */
export default function PostList(){
  const [searchString, setSearchString] = useState<string>('')
  const [take, setTake] = useState<number>(DEFAULT_PAGE_TAKE)

  const handleSearchstring = (e: any) => {
    setSearchString(e.target.value)
  }
  const handleTake = (e: any) => {
    setTake(Number(e.target.value))
  }

  useEffect(() => {
    loadPosts({variables: { searchString, take}})
  }, [searchString, take])

  const [loadPosts, { data, loading, error, networkStatus, fetchMore }] = useLazyQuery<PostsQuery>(    
    PostsDocument, {
        variables: {searchString, take},
        notifyOnNetworkStatusChange: true,
    });

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

    const { posts : { posts: Response<number, PostsQuery>} }= data.posts!
    //const type PostResponse = Response<number, Post>

    const loadMorePosts = () => {
      fetchMore({
        variables: {
          searchString,
          skip: 1,
          after: cursor
        },
      })
    }
    return ( 
      <>
          <h1>Post List</h1>
          <Search handleSearchstring={handleSearchstring} 
              searchString={searchString} 
              take={take} handleTake={handleTake}/>
          {data.posts &&
          <Posts posts={posts as Post[]} totalCount={totalCount} hasMore={hasMore} 
                  loadMorePosts={loadMorePosts} loadingMorePosts={loadingMorePosts} />}
      </>
    )
}