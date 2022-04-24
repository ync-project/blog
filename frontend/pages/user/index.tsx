import App from '../../components/App'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import UserList from '../../components/UserList'
import { UsersDocument, UsersQuery } from '../../types/graphql_generated'
import ErrorMessage from '../../components/ErrorMessage'

import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../../types/app_types'  


const UserIndexPage = (props: any) => (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <UserList /> 
    </App>  
) 

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const {data, loading, error} = await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  if (error) return <ErrorMessage message="Error loading users." />
  if (loading) return <div>Loading</div>
  if (!data) return <div>No user</div>

  return addApolloState(apolloClient, {
    props: {users: data.users,}
  })
}

export default UserIndexPage;
