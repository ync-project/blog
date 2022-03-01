
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout"
import { gql } from "@apollo/client"
import client from "../../lib/apollo-client";
import * as AllTypes from '../../interfaces/nexus'

const PostPage = (post: AllTypes.NexusGenFieldTypes["Post"]) => {
  if (!post) {
    return <div>no post</div>
  }

  return post && (
    <Layout>
      <div>
          <p>{post.title }</p>
          <p>{post.content }</p>
      </div>
    </Layout>  
  );
}


export const getStaticPaths: GetStaticPaths<any> = async () => {
    const { data } = await client.query<AllTypes.NexusGenFieldTypes["Query"]>({
        query: gql`
          query FeedQuery {
            feed {
              id
              title
              content
              published
              author {
                id
                name
              }
            }
          }
        `,
      });
    
  const paths = data.feed.map((post) => ({
         params: { id: post.id.toString() },
  }));
  return { paths: paths , fallback: false }
}

const POST_BY_ID_QUERY = gql`
    query($id: Int!) {
        postById(id: $id){
            id
            title
            content
            published
            author {
                id
                name
                email
            }
        }  
    }
`

export const getStaticProps: GetStaticProps<AllTypes.NexusGenFieldTypes["Query"], any> = async (params ) => {
    //const { id } = params
    try {
        const { data } = await client.query({
            query: POST_BY_ID_QUERY,
            variables: { id: Number(params.id) },
        });
        //console.log('data', data)
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