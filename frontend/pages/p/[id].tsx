
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "../../components/Layout"
import client from "../../lib/apollo-client";
//import { Query } from '../../interfaces/graphql_generated'
import * as graphql from '../../lib/graphql'
import { TODOPageErr } from '../../interfaces/app_types'
import { Post, FeedsQuery, PostByIdQuery} from '../../interfaces/graphql_generated'
import { ParsedUrlQuery } from 'querystring';

const PostPage: NextPage= ({post}: {post: PostByIdQuery["postById"]}) => {
  if (!post) {
    return <div>no post</div>
  }

  return post && (
    <Layout>
      <div>
          <h1>{post.id}. {post.title }</h1>
          <h4>{post.author!.email}</h4>
          <p>{post.content }</p>
      </div>
    </Layout>  
  );
}

type Props = {
    posts: Post[]
 }
 
interface Params extends ParsedUrlQuery {
    id: string,
 }

export const getStaticPaths: GetStaticPaths = async ( ) => {
    const { data } = await client.query<FeedsQuery>({
        query: graphql.FEED_LIST,
        variables: { page: 1}
      });
    
    const paths = data.feeds?.posts?.map((post) => ({
        params: { id: post!.id.toString() },
    }))
    return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params } ) => {
    const id = params?.id
    try {
        const { data: { postById } } = await client.query<PostByIdQuery>({
            query: graphql.POST_BY_ID,
            variables: { id: Number(id) },
        });
        return {
            props: {
                post: postById
            },
        }
    } catch (err: unknown ) {
        const errors = err as TODOPageErr
        return {
            props: {
                id: id,
                errors: errors.message,
            },
        }
    }
}
  
export default PostPage