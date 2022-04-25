import Layout from '../components/Layout'
import InfoBox from '../components/InfoBox'
import Submit from '../components/Submit'
import UserList from '../components/UserList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { UsersDocument } from '../types/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { GetStaticPropsContext } from 'next'
import { useSession } from "next-auth/react"


const Protected = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  })
  if (status === "loading") {
    return <>Loading or not authenticated...</>
  }
  return <>User is logged in</>
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
