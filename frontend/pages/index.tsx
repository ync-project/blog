import Layout from "../components/Layout"
import PostList from '../components/post/PostList'
import { GetStaticProps } from "next";
import { FEED_LIST } from '../lib/graphql'
import { gql, useQuery } from '@apollo/client'
import client from "../lib/apollo-client";


const Home = () => {
  return (
    <Layout>
        <PostList />
    </Layout>  
  )
}

export const allPostsQueryVars = {
  page: 1,
  take: 3
}

export const getStaticProps: GetStaticProps = async ({ params } ) => {
  const { data, loading, error } = await client.query<Query>({
    FEED_LIST, 
    {
        variables: allPostsQueryVars,
    })

    const {hasNextPage, page}: { hasNextPage: boolean, page: number} = data?.feeds.pageInfo
      return {
          props: {
              posts: data?.feeds
          },
      }
}

export default Home