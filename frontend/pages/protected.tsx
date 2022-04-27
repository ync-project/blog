import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
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
