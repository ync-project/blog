import App from '../components/App'
import Header from '../components/Header'
import InfoBox from '../components/InfoBox'
import Search from '../components/Search'
import UserList, { ALL_USERS_QUERY, allUsersQueryVars } from '../components/UserList'
import { AllUsersDocument } from '../interfaces/graphql_generated'

import { GetStaticProps } from 'next'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const Home = () => (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <Search />
      <UserList />
    </App>  
) 

export async function getStaticProps<GetStaticProps>() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: AllUsersDocument,
    variables: allUsersQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home;
