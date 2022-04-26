import Layout from '../../components/sys/Layout'
import InfoBox from '../../components/etc/InfoBox'
import UserList from '../../components/user/UserList'
import { UsersDocument } from '../../types/graphql_generated'

import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../../types/app_types'  


const UserIndexPage = (props: any) => (
    <Layout>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <UserList /> 
    </Layout>  
) 

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {}
  })
}

export default UserIndexPage;
