import Layout from "../components/Layout"
//import type { NextPage } from 'next';
//import gql from "graphql-tag"
//import { NexusGenFieldTypes } from '../../backend/src/generated/nexus'
import type { NextPage } from 'next'
import { Post, Query } from '../lib/graphql_generated'
import Posts from '../components/post'
import { GetServerSideProps } from "next";
import client from "../lib/apollo-client"; 

import * as graphql from '../lib/graphql'

const Home = ({posts}: {posts: Query["feed"]}) => {
  return (
    <Layout>
        <Posts posts={posts as Post[]}/>
    </Layout>  
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<Query>({
    query: graphql.FEED_LIST
  });

  return {
    props: { 
      posts: data.feed.slice(0, 6),
    },
 };
}

export default Home;
