import { useSession } from "next-auth/react"
import Layout from '../../components/sys/Layout'
import InfoBox from '../../components/etc/InfoBox'

export default function AdminDashboard() {
    const { data: session } = useSession()
    // session is always non-null inside this page, all the way down the React tree.
    return (
        <Layout>
            <InfoBox>
            ℹ️ Admin home
            </InfoBox>
                "Some super secret dashboard"
        </Layout>
    )            
  }
  
  AdminDashboard.auth = true