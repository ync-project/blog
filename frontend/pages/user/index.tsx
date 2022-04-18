import App from '../../components/App'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import UserList from '../../components/UserList'
import { UsersDocument } from '../../types/graphql_generated'

import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../../types/app_types'  

const UserIndexPage = () => (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <UserList /> 
    </App>  
) 

export async function getStaticProps<GetStaticProps>() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default UserIndexPage;
