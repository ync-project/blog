import App from '../components/App'
import Header from '../components/Header'
import InfoBox from '../components/InfoBox'
import PostList from '../components/PostList'
import QuickSearch from '../components/QuickSearch'

import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import { AllPostsDocument } from '../interfaces/graphql_generated'

const Home = () => (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <PostList />
    </App>  
) 

export async function getStaticProps<GetStaticProps>() {
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

export default Home;
