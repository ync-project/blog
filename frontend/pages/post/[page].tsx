import Layout from "../../components/Layout"
import PostList from '../../components/post'
import { GetServerSideProps } from "next";
import { FeedsDocument, Response, FeedsQuery } from '../../interfaces/graphql_generated'
import client from "../../lib/apollo-client"; 
import ErrorMessage from '../../components/error-message'
import { DEFAULT_PAGE_TAKE } from '../../interfaces/app_types'

const PostsPage = ( { response: {pageInfo: {currentPage, pageCount}, posts} }: {
      response: Response }) => {
  return ( 
    <Layout>
      <PostList posts={posts} page={currentPage} pageCount={pageCount}/>
    </Layout>  
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const page = Number(params?.page) || 1
    const take = Number(params?.take) || DEFAULT_PAGE_TAKE
    const {data, error, loading} = await client.query<FeedsQuery>({
      query: FeedsDocument,
      variables: {page, take},
    })
    
    if (error) return <ErrorMessage message="Error loading posts." />
    if (!data) return <div>Loading</div>
  
    return {
      props: { 
        response: data.feeds
      },
    }
}
  
export default PostsPage;
