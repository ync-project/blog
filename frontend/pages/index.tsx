import Layout from "../components/Layout"
import { useQuery } from "@apollo/client"; 
import { GetStaticProps } from "next";
import client from "../lib/apollo-client"; 
import { AllFeedsDocument, TopInfo, AllFeedsQuery, useAllFeedsQuery } from '../interfaces/graphql_generated'
import PostList from '../components/post'
import ErrorMessage from '../components/error-message'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'

const Home = ({topInfo: {topPosts, pageCount}, page=1}: {
        topInfo: TopInfo, page: number}) => {
  return ( 
    <Layout>
      <PostList posts={topPosts} page={page} pageCount={pageCount}/>
    </Layout>  
  )  
}

export const getStaticProps: GetStaticProps = async () => {
  // const { data, error } = await client.query<AllFeedsQuery>({
  //     query: AllFeedsDocument,
  //     variables: {take: DEFAULT_PAGE_TAKE}  //@todo: take to real number 
  // })
  const { data, loading, error} = useQuery(AllFeedsDocument)

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>
    
  return {
    props: { 
      topInfo: data.allFeeds
    }
  }
}

export default Home;
