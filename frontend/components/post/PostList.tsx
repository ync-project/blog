import { useState } from 'react'
import { Post } from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
import client from "../../lib/apollo-client"; 
import { FeedsQuery } from '../../interfaces/graphql_generated'

export type TODOResult = any

export default function Posts({ posts }: { posts: FeedsQuery["feeds"] }) {
  return (
    <ul>
      {posts?.posts?.map((post: any) => (
        <PostItem key={post?.id} post={post as Post} />
      ))}
    </ul>
  );
}


  
