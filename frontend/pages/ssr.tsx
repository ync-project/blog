import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { UsersDocument } from '../types/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { useSession, getSession } from "next-auth/react"
import UserList from '../components/user/UserList'
import { GetServerSideProps } from 'next'
import AccessDenied from '../components/sys/access-denied'

export default function Page() {
  const { data: session, status } = useSession()

  if (typeof window === "undefined") return null

  if (session) {
    return (
      <Layout>
        <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
        <UserList />
      </Layout>
    )
  }
  return <Layout><AccessDenied /></Layout>
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const apolloClient = initializeApollo()

  // we’re not even using the return value that apolloClient.query() provides. 
  // This is because we don’t need it – we’re only calling apolloClient.query()
  // to populate Apollo Client’s cache with the data for the queries executed.
  await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {
      session: await getSession(context),
    },
  })
}
