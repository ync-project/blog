import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { useState } from 'react'
import { Post, Response} from '../../interfaces/graphql_generated'
import PostItem from './PostItem'
import ErrorMessage from '../../components/error-message'
import { FeedsDocument} from '../../interfaces/graphql_generated'

export type TODOResult = any
export const allPostsQueryVars = {
  page: 1,
  take: 3
}


export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    FeedsDocument,
    {
      variables: allPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        //skip: posts.length,
        page: currentPage + 1,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const {pageInfo: {hasNextPage, currentPage}, posts} = data.feeds

  return (
    <section>
      <ul>
        {posts.map(({post}: {post: Post}, index: number ) => (
          <li key={index}>
            <div>
                post.id. post.title
            </div>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}

