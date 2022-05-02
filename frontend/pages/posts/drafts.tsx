import { GetServerSideProps } from "next";
import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import Layout from '../../components/sys/Layout'
import InfoBox from '../../components/etc/InfoBox'
import { DraftsByUserDocument } from '../../types/graphql_generated'
import PostsSearch from '../../components/post/PostsSearch'

export default function App(){
  return (
    <Layout>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <PostsSearch />
    </Layout>  
  )
} 

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const drafts = await apolloClient.query({
    query: DraftsByUserDocument,
    variables: {
      take: 30,
    }
  });

  return addApolloState(apolloClient, {
    props: { },
  });
}  

