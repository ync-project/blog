
import { GetServerSideProps } from "next";
import { client } from "../../lib/apolloClient";
import { Post,
    PostByIdDocument, PostByIdQuery} from '../../types/graphql_generated'
import InfoBox from '../../components/etc/InfoBox'
import Layout from '../../components/sys/Layout'
import PostItem from '../../components/post/PostItem'
import { getSession } from "next-auth/react"

const PostPage = ({post}: {post: Post}) => {
  if (!post) {
      return <div>no post</div>
  }

  return post && (
    <Layout>
      <InfoBox>Post detail</InfoBox>
      <PostItem post={post}/>
    </Layout>  
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context
    const {data}  = await client.query<PostByIdQuery>({ 
      query: PostByIdDocument,
      variables: {id: Number(params?.id)}
    })
    return {
      props: {
        session: await getSession(context),
        post: data?.postById
       },
    };
  }  
  
  export default PostPage