import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
import Submit from '../components/form/Submit'
import UserList from '../components/user/UserList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { UsersDocument } from '../types/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { useSession } from "next-auth/react"
import AccessDenied from '../components/sys/access-denied'

const Protected = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <>Loading or not authenticated...</>
  }
  if (status === "unauthenticated") {
    return <AccessDenied/>
  }

  return (
    <>
      <Submit />
      <UserList /> 
    </>
  )  
}

const SSRPage = () => (
  <Layout>
    <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
    <Protected />
  </Layout>
)

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: UsersDocument,
    variables: { take: DEFAULT_PAGE_TAKE },
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default SSRPage
