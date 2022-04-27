import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
import Submit from '../components/form/Submit'
import UserList from '../components/user/UserList'
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

const ClientOnlyPage = (props) => (
  <Layout>
    <InfoBox>
      ℹ️ This page shows how to use Apollo only in the client. If you{' '}
      <a href="/client-only">reload</a> this page, you will see a loader since
      Apollo didn't fetch any data on the server. This is useful when the page
      doesn't have SEO requirements or blocking data fetching requirements.
    </InfoBox>
    <Protected />
  </Layout>
)

export default ClientOnlyPage
