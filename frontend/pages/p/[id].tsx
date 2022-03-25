
import { GetStaticProps } from "next";
import { client } from "../../lib/apolloClient";
import { TODOPageErr } from '../../interfaces/app_types'
import { Post, AllPostsDocument, AllPostsQuery,
    PostByIdDocument, PostByIdQuery} from '../../interfaces/graphql_generated'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import App from '../../components/App'
import PostItem from '../../components/post/PostItem'

const PostPage = ({post}: {post: PostByIdQuery["postById"]}) => {
  if (!post) {
    return <div>no post</div>
  }

  return post && (
    <App>
      <Header />
      <InfoBox>Post detail</InfoBox>
      <PostItem post={post as Post}/>
    </App>  
  );
}

 export const getStaticPaths = async () => {
    const { data } = await client.query<AllPostsQuery>({
        query: AllPostsDocument
    });
    const paths = data?.allPosts.map((post) => ({
        params: { id: post!.id.toString() },
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