import Layout from '../../components/Layout'
import InfoBox from '../../components/InfoBox'
import PostListScroll from '../../components/PostListScroll'

const Home = () => (
    <Layout>
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <PostListScroll />
    </Layout>  
) 

export default Home;
