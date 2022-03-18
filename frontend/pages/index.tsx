import Layout from "../components/Layout"
import ErrorMessage from '../components/error-message'
import { GetStaticProps } from "next";
import { initializeApollo, addApolloState } from '../lib/apollo-client2'
import { FeedsDocument }  from '../interfaces/graphql_generated'
import PostList, {
  allPostsQueryVars,
} from '../components/post/PostList'

const Home = () => {
  return (
    <Layout>
      <PostList />
    </Layout>  
  )
}

export default Home;

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: FeedsDocument,
    variables: allPostsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}
