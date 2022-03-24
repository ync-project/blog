
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "../../components/Layout"
import {initializeApollo} from "../../lib/apolloClient";
//import { Query } from '../../interfaces/graphql_generated'
import { TODOPageErr } from '../../interfaces/app_types'
import { Post, FeedsDocument, FeedsQuery, PostByIdDocument, PostByIdQuery} from '../../interfaces/graphql_generated'
import { ParsedUrlQuery } from 'querystring';

const PostPage = ({post}: {post: PostByIdQuery["postById"]}) => {
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

export const getStaticPaths = async () => {
    const apolloClient = initializeApollo()
    const { data } = await apolloClient.query<FeedsQuery>({
        query: FeedsDocument,
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
            query: PostByIdDocument,
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