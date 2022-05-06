import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument } from '../types/graphql_generated'
import InfoBox from '../components/etc/InfoBox'
import Layout from "../components/sys/Layout"
import PostsSearch from '../components/post/PostsSearch'

import { SimpleGrid } from '@chakra-ui/react'
import Airbnb from '../components/chakra/layout/airbnb'
import BoxAs from '../components/chakra/layout/as'
import Contain from '../components/chakra/layout/container'
import Grid from '../components/chakra/layout/grid'
import Stack from '../components/chakra/layout/stack'

export default function Home(){
  return (
    <>
      <SimpleGrid
          bg='gray.50'
          columns={{ sm: 2, md: 4 }}
          spacing='8'
          p='10'
          textAlign='center'
          rounded='lg'
          color='gray.400'
        >
        <Airbnb/>
        <BoxAs/>
      </SimpleGrid>
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

