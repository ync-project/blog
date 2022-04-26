import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
import Submit from '../components/etc/Submit'
import UserList from '../components/user/UserList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { UsersDocument } from '../types/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { GetStaticPropsContext } from 'next'
import { useSession } from "next-auth/react"


const Protected = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  })
  if (status === "loading") {
    return <>Loading or not authenticated...</>
  }
  return <>Hi {session?.user?.name} User is logged in</>
}
  
 const ProtectedPage = () => {  
  return (
    <Layout>
      <InfoBox>
        ℹ️ The useSession() React Hook in the NextAuth.js client is the easiest way 
        to check if someone is signed in.
        Runs only on client side
      </InfoBox>
      <Protected />
    </Layout>
  )

}

export default ProtectedPage
