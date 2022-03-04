
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout"
import { gql } from "@apollo/client"
import client from "../../lib/apollo-client";
import * as AllTypes from '../../interfaces/nexus'
import { ALL_FEEDS, POST_BY_ID } from '../../lib/graphql'

const PostPage = ({post}: {post: AllTypes.NexusGenFieldTypes["Post"]}) => {
  if (!post) {
    return <div>no post</div>
  }

  return post && (
    <Layout>
      <div>
          <h1>{post.title }</h1>
          <h4>{post.author!.email }</h4>
          <p>{post.content }</p>
      </div>
    </Layout>  
  );
}

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const { data } = await client.query<AllTypes.NexusGenFieldTypes["Query"]>({
        query: ALL_FEEDS,
      });
    
  const paths = data.feed.map((post) => ({
         params: { id: post.id.toString() },
  }));
  return { paths: paths , fallback: false }
}


export const getStaticProps: GetStaticProps = async ({ params } ) => {
    const { id } = params as AllTypes.NexusGenArgTypes["Query"]["postById"] //as Params
    try {
        const { data } = await client.query({
            query: POST_BY_ID,
            variables: { id: Number(id) },
        });
        //console.log('data.postById', data.postById)
        return {
            props: {
                post: data.postById,
            },
        }
    } catch (err: any) {
        //console.log('err', err)
        return {
            props: {
                id: id,
                errors: err.message,
            },
        }
    }
}
  
export default PostPage