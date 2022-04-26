
import { GetStaticProps } from "next";
import { client } from "../../lib/apolloClient";
import { TODOPageErr, Edge } from '../../types/app_types'
import { Post, PostsDocument, PostsQuery,
    PostByIdDocument, PostByIdQuery} from '../../types/graphql_generated'
import Header from '../../components/sys/Header'
import InfoBox from '../../components/etc/InfoBox'
import Layout from '../../components/sys/Layout'
import PostItem from '../../components/post/PostItem'

const PostPage = ({post}: {post: PostByIdQuery["postById"]}) => {
  if (!post) {
    return <div>no post</div>
  }

  return post && (
    <Layout>
      <InfoBox>Post detail</InfoBox>
      <PostItem post={post as Post}/>
    </Layout>  
  );
}

 export const getStaticPaths = async () => {
    const { data } = await client.query<PostsQuery>({
        query: PostsDocument
    });
    const paths = data?.posts?.edges.map((edge) => ({
        params: { id: edge.cursor.toString() },
    }))
    //console.log('paths', paths)
    return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    //console.log('params?.id', params?.id)
    try {
        const { data } = await client.query<PostByIdQuery>({
            query: PostByIdDocument,
            variables: {id: Number(params?.id)}
        });
        //console.log('data', data)
        return {
            props: {
                post: data?.postById
            },
        }
    } catch (err: unknown ) {
        const errors = err as TODOPageErr
        return {
            props: {
                id: params?.id,
                errors: errors.message,
            },
        }
    }
}
  
export default PostPage