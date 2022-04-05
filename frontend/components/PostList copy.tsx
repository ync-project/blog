import React, { useState } from "react";
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import { useLazyQuery } from '@apollo/client'
import { AllPostsDocument, AllPostsQuery } from '../interfaces/graphql_generated'
import Posts from './Posts'
import Search from "./Search";

export default function PostList(){
  const handeleSearch = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const searchString1 = formData.get('searchString')!.toString()
    const take1 = Number(formData.get('take')!.toString()) || DEFAULT_PAGE_TAKE
    //form.reset()

    findPorts(searchString1, take1)
  }
  
  const [loadPosts, { loading, error, data }] = useLazyQuery<AllPostsQuery>(
    AllPostsDocument);
  
  const findPorts = (title: string, take: number) => {
    loadPosts({ variables: { searchString: title, take }})
  }

  const loadMorePosts = (skip: number) => {
    loadPosts({ variables: { searchString, take, skip}})
  }

  const renderResults = () => {
    if (loading) {
      return <span>Loading...</span>;
    }
    if (error) {
      return <span>Something went wrong: ${error}</span>;
    }
    return data?.allPosts && 
      <Posts posts={data.allPosts} count={data._allPostsMeta?.count!} 
      loadMorePosts={loadMorePosts} />
  }
  
  return ( 
    <>
      <h1>Post List</h1>
      <Search handeleSearch={handeleSearch}/>
      {renderResults()}
    </>
  )
}
