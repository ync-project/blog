import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
import Submit from '../components/etc/Submit'
import UserList from '../components/user/UserList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { UsersDocument } from '../types/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { GetStaticPropsContext } from 'next'

const SSGPage = () => (
  <Layout>
    <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
    <Submit />
    <UserList />
  </Layout>
)

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo()

  // we’re not even using the return value that apolloClient.query() provides. 
  // This is because we don’t need it – we’re only calling apolloClient.query()
  // to populate Apollo Client’s cache with the data for the queries executed.
  await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default SSGPage
