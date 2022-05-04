import { GetServerSideProps } from "next";
import Layout from '../../components/sys/Layout'
import InfoBox from '../../components/etc/InfoBox'
import DraftsSearch from '../../components/post/DraftsSearch'
import { useSession, getSession } from "next-auth/react"
import type { Session } from "next-auth"

export default function App(){
  const { data: session } = useSession()
  //console.log('~~email', session?.user!.email!)

  return (
    <Layout>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <DraftsSearch email={session?.user!.email!} />
    </Layout>  
  )
} 

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
     },
  };
}  

