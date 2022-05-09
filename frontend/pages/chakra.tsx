import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument } from '../types/graphql_generated'
import InfoBox from '../components/etc/InfoBox'
import Layout from "../components/sys/Layout"
import PostsSearch from '../components/post/PostsSearch'

import Airbnb from '../components/chakra/layout/airbnb'
import SimpleGrid from '../components/chakra/layout/SimpleGrid'
import BoxAs from '../components/chakra/layout/as'
import Contain from '../components/chakra/layout/container'
import Grid from '../components/chakra/layout/grid'
import Stack from '../components/chakra/layout/stack'

export default function Home(){
  return (
    <>
        <Airbnb/>
        <BoxAs/>
      <Contain />
      <Grid/>
      <Stack />
    </>
  )    
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
    variables: {
      take: DEFAULT_PAGE_TAKE,
      after: null,
    }
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  });
}

