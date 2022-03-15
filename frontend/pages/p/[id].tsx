
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout"
import client from "../../lib/apollo-client";
import { Query } from '../../lib/graphql_generated'
import * as graphql from '../../lib/graphql'

const PostPage = ({post}: {post: Query["postById"]}) => {
  if (!post) {
    return <div>no post</div>
  }

  return post && (
    <Layout>
      <div>
          <h1>{post.title }</h1>
          <h4>{post.author!.email}</h4>
          <p>{post.content }</p>
      </div>
    </Layout>  
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: { feed } } = await client.query<Query>({
        query: graphql.FEED_LIST,
      });
    
    const paths = feed.map((post) => ({
         params: { id: post.id.toString() },
    }));
    return { paths: paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async ({ params } ) => {
    const post = params as Query["postById"] //as Params
    //console.log('post', post)
    try {
        const { data: { postById } } = await client.query<Query>({
            query: graphql.POST_BY_ID,
            variables: { id: Number(post?.id) },
        });
        return {
            props: {
                post: postById
            },
        }
    } catch (err: any) {
        return {
            props: {
                id: post!.id,
                errors: err.message,
            },
        }
    }
}
  
export default PostPage