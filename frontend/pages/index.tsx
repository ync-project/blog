import InfoBox from '../components/InfoBox'
import PostList from '../components/PostList'
import { initializeApollo, addApolloState, client } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument, PostsQuery } from '../types/graphql_generated'
import { GetStaticProps } from "next";
import ErrorMessage from '../components/error-message'
import { useQuery } from "@apollo/client"; 
import Layout from "../components/layout"

type Props = {
  posts: PostsQuery["posts"]
}

const Home = ({posts}: Props) => (
  <Layout>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <PostList />
  </Layout>    
) 

export const getStaticProps: GetStaticProps = async () => {
  // const { data, error } = await client.query<AllPostsQuery>({
  //   query: AllPostsDocument,
  //   variables: {take: DEFAULT_PAGE_TAKE}  //@todo: take to real number 
  // })

  // if (error) return <ErrorMessage message="Error loading posts." />
  // if (!data) return <div>Loading</div>
    
  return {
    props: { 
      //posts: data
    }
  }
}

export default Home;
