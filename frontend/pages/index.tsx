import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument } from '../types/graphql_generated'
import InfoBox from '../components/etc/InfoBox'
import Layout from "../components/sys/Layout"
import PostsSearch from '../components/post/PostsSearch'

import { Box, Flex } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { SimpleGrid } from '@chakra-ui/react'

export default function Home(){
  return (
    <Layout >
      <Box border='1px' borderColor='gray.200'>
        Card
      </Box>


        <SimpleGrid
          bg='gray.50'
          columns={{ sm: 2, md: 4 }}
          spacing='8'
          p='10'
          textAlign='center'
          rounded='lg'
          color='gray.400'
        >
          // This button will have no right borderRadius
          <Button borderRightRadius="0">Button 1</Button>

          // This button will have no left borderRadius*/
          <Button borderLeftRadius="0">Button 2</Button>

          // top left and top right radius will be `theme.radii.md` => 4px
          <Button borderTopRadius="md">Button 2</Button>


          // shorthand
          <Box pos="absolute">Cover2</Box>
          <Box pos="absolute" top="10" left="0">
            Absolute with top and left
          </Box>
          <Box pos="fixed" w="100%" zIndex={2}>
            Fixed with zIndex
          </Box>

          <Box boxShadow='xs' p='6' rounded='md' bg='white'>
            xs
          </Box>
          <Box boxShadow='sm' p='6' rounded='md' bg='white'>
            sm
          </Box>
          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            Base
          </Box>
          <Box boxShadow='md' p='6' rounded='md' bg='white'>
            md
          </Box>
          <Box boxShadow='lg' p='6' rounded='md' bg='white'>
            lg
          </Box>
          <Box boxShadow='xl' p='6' rounded='md' bg='white'>
            xl
          </Box>
          <Box boxShadow='2xl' p='6' rounded='md' bg='white'>
            2xl
          </Box>
          <Box boxShadow='dark-lg' p='6' rounded='md' bg='white'>
            Dark lg
          </Box>
          <Box boxShadow='outline' p='6' rounded='md' bg='white'>
            Outline
          </Box>
          <Box boxShadow='inner' p='6' rounded='md' bg='white'>
            Inner
          </Box>
        </SimpleGrid>


        <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
        <PostsSearch />
    </Layout>
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

