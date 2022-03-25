import App from '../../components/App'
import InfoBox from '../../components/InfoBox'
import Header from '../../components/Header'
import Submit from '../../components/Submit'
import PostList from '../../components/PostList'
import { DEFAULT_PAGE_TAKE } from '../../interfaces/app_types'  
import { AllPostsDocument } from '../../interfaces/graphql_generated'
import { initializeApollo, addApolloState } from '../../lib/apolloClient'

const PostIndexPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
    <Submit />
    <PostList />
  </App>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllPostsDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default PostIndexPage
