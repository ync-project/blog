import App from '../../components/App'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import PostListScroll from '../../components/PostListScroll'

const Home = () => (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <PostListScroll />
    </App>  
) 

export default Home;
