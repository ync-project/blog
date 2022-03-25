import App from '../../components/App'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import Search from '../../components/Search'
import UserList from '../../components/UserList'
import { AllUsersDocument } from '../../interfaces/graphql_generated'

import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../../interfaces/app_types'  

const UserIndexPage = () => (
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
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default UserIndexPage;
