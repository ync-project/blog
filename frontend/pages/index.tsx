import Layout from "../components/Layout"
//import type { NextPage } from 'next';
//import gql from "graphql-tag"
//import { NexusGenFieldTypes } from '../../backend/src/generated/nexus'
import { GetServerSideProps } from "next"; 
import client from "../lib/apollo-client";
import { gql } from "@apollo/client"
import * as AllTypes from '../interfaces/nexus'
import Posts from '../components/post/posts'
import { ALL_FEEDS } from '../lib/graphql'

const IndexPage = ({posts}: {posts: AllTypes.NexusGenFieldTypes["Query"]["feed"]}) => {
  return (
    <Layout>
        <div className="page">
          <main>
            <Posts posts={posts}/>
          </main>
      </div>
    </Layout>  
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<AllTypes.NexusGenFieldTypes["Query"]>({
    query: ALL_FEEDS
  });

  return {
    props: { 
      posts: data.feed.slice(0, 6),
    },
 };
}

export default IndexPage;
