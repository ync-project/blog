import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument } from '../types/graphql_generated'
import InfoBox from '../components/etc/InfoBox'
import Layout from "../components/sys/Layout"
import PostsSearch from '../components/post/PostsSearch'

export default function Home(){
  return (
    <Layout>
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

