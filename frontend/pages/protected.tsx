import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'
import { useSession } from "next-auth/react"

const ProtectedPage = () => {  
  const { data: session, status } = useSession()
  return (
    <Layout>
      <InfoBox>
        ℹ️ The useSession() React Hook in the NextAuth.js client is the easiest way 
        to check if someone is signed in.
        Runs only on client side
      </InfoBox>
      <p>Hi {session?.user?.name} User is logged in</p>
    </Layout>
  )

}

ProtectedPage.auth = true

export default ProtectedPage
