import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../../types/app_types'  
import Layout from '../../components/sys/Layout'
import InfoBox from '../../components/etc/InfoBox'
import { PostsDocument } from '../../types/graphql_generated'
import QuickSearch from '../../components/form/QuickSearch'

export default function App(){
  return (
    <Layout>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <QuickSearch mode='scroll'/>
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
