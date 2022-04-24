import App from '../../components/App'
import Header from '../../components/Header'
import InfoBox from '../../components/InfoBox'
import PostList from '../../components/PostList'

const Home = () => (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <PostList />
    </App>  
) 

export default Home;
