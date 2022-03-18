import Layout from "../components/Layout"
import PostList from '../components/post/PostList'
import ErrorMessage from '../components/error-message'
import { GetStaticProps } from "next";
import client from "../lib/apollo-client"; 
import { Post, FeedsQuery, useFeedsQuery, Response, FeedsDocument} from '../interfaces/graphql_generated'

export const allPostsQueryVars = {
  page: 1,
  take: 3
}

const Home = ({posts} : {posts: Response["posts"]}) => {
  return (
    <Layout>
      <PostList posts={posts}/>
    </Layout>  
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading, error} = await client.query({
    query: FeedsDocument,
    variables: allPostsQueryVars,
  });

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  return {
    props: { 
      posts: data.feeds.posts as Response["posts"]
    },
  }
}