import React from 'react';

import Posts from './Posts'
import { useQuery, NetworkStatus } from '@apollo/client'
import { PostsDocument } from '../types/graphql_generated'
    
export default function SearchPosts({searchString, take, skip}: 
    {searchString: string, take: number, skip: number}) {
    //console.log('searchString', searchString, 'take', take)    
    const { loading, error, data, networkStatus } = useQuery(
      PostsDocument, {
        variables: { 
          searchString,
          take,
          skip,
         },
      }
    )
  
    if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>
    if (loading) return null
    if (error) return `Error!: ${error}`
  
    return (
        <></>
    )
  }
  