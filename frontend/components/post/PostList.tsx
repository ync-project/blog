import { useState } from 'react'
import { Post, Response} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
export type TODOResult = any

export default function Posts({posts} : {posts: Response["posts"]} ) {
  return (
    <ul>
      {posts?.map((post) => (
        <PostItem key={post?.id} post={post as Post} />
      ))}
    </ul>
  );
}

