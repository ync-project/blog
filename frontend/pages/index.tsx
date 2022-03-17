import Layout from "../components/Layout"
//import type { NextPage } from 'next';
//import gql from "graphql-tag"
//import { NexusGenFieldTypes } from '../../backend/src/generated/nexus'
import type { NextPage } from 'next'
import { Post, Query } from '../interfaces/graphql_generated'
import PostList from '../components/post/PostList'
import { GetStaticProps } from "next";
import client from "../lib/apollo-client"; 

import * as graphql from '../lib/graphql'

const Home = () => {
  return (
    <Layout>
        <PostList />
    </Layout>  
  )
}

export default Home;
