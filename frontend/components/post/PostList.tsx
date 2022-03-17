import { useState } from 'react'
import { Post, FeedsQuery, useFeedsQuery } from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
import ErrorMessage from '../error-message'
import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { FEED_LIST } from '../../lib/graphql'
import { GetStaticProps } from "next";
import client from "../../lib/apollo-client"; 

export type TODOResult = any

function Posts({ posts }: { posts: FeedsQuery["feeds"] }) {
  return (
    <ul>
      {posts?.posts?.map((post) => (
        <PostItem key={post?.id} post={post as Post} />
      ))}
    </ul>
  );
}

export const allPostsQueryVars = {
    page: 1,
    take: 3
}

  
export default function WrappedPosts(){
    const { data, loading, error, fetchMore, networkStatus } = useQuery(
        FEED_LIST, 
        {
            variables: allPostsQueryVars,
            notifyOnNetworkStatusChange: true
        })
    
    const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

    if (error) return <ErrorMessage message="Error loading posts." />
    if (loading && !loadingMorePosts) return <div>Loading</div>

    const {hasNextPage, page}: { hasNextPage: boolean, page: number} = data?.feeds.pageInfo
    const loadMorePosts = () => {
      fetchMore({
        variables: {
          page: page + 1, take: 3 
        },
      })
    }


    return (
      <section>
        <div className="container mx-auto max-w-5xl my-20 px-5">
            <h1>Posts</h1>

            <ul>
              {data?.feeds?.posts?.map((post: any) => (
                <PostItem key={post?.id} post={post as Post} />
              ))}
            </ul>

            {hasNextPage && (
              <button onClick={() => loadMorePosts(page)} disabled={loadingMorePosts}>
              {loadingMorePosts ? 'Loading...' : 'Show More'}
              </button>
            )}

        </div>
      </section>
    )
}

