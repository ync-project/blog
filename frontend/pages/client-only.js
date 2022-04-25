import Layout from '../components/Layout'
import InfoBox from '../components/InfoBox'
import Submit from '../components/Submit'
import UserList from '../components/UserList'

const ClientOnlyPage = (props) => (
  <Layout>
    <InfoBox>
      ℹ️ This page shows how to use Apollo only in the client. If you{' '}
      <a href="/client-only">reload</a> this page, you will see a loader since
      Apollo didn't fetch any data on the server. This is useful when the page
      doesn't have SEO requirements or blocking data fetching requirements.
    </InfoBox>
    <Submit />
    <UserList />
  </Layout>
)

export default ClientOnlyPage
