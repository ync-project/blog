import Layout from '../components/sys/Layout'
import InfoBox from '../components/etc/InfoBox'

export default function Page () {
  return (
    <Layout>
        <InfoBox>The examples below show responses from the example API endpoints.</InfoBox>
      <h1>API Example</h1>
      <p><em>You must be signed in to see responses.</em></p>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session"/>
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe src="/api/examples/jwt"/>
    </Layout>
  )
}