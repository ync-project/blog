import Layout from "../components/Layout"
import Posts from '../components/post'
import { GetStaticProps } from "next";
import Link from 'next/link'
import ErrorMessage from '../components/error-message'
import client from "../lib/apollo-client"; 
import { FeedsDocument, Response } from '../interfaces/graphql_generated'
import { useState, useEffect } from 'react'
import Router from 'next/router'

//if (ENV === 'development' || process.env === 'local') {
  // Router.events.on('routeChangeComplete', (url) => {
  //   const fileName = url.split('/')[1];
  //   const linkTag = document.createElement('link');
  //   linkTag.setAttribute('rel', 'stylesheet');
  //   linkTag.setAttribute('href', `/_next/static/css/static/development/pages/${fileName}.js.css?ts=${new Date().valueOf()}`);
  //   document.head.appendChild(linkTag);
  // });
//}

type Props = {
  response: Response
}

type Page = {
  selected: number
}

const Home = ( {response} : {response: Response }) => {
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);

  useEffect( () => {
    console.log('useEffect')
    if (response && response.posts){
      setPosts([...response!.posts!])
      setPage(response.pageInfo.currentPage)
    }
  }, []);

  return (posts && 
    <Layout>
      <div>
        <Posts posts={posts} />
        <button onClick={ async () => {
            const resp = await getPostsFromBackend({page: page - 1, take: 3})
            if (resp){
              setPosts([...resp.posts])
              setPage(resp.pageInfo.currentPage)
          }
      }}
        disabled={page <= 1}>
          PREV {page - 1}
        </button>
        page : {page }
        <button onClick={ async () => {
                setPage(3)
        }}
        disabled={page >= 100}>
          NEXT {page + 1}
        </button>
        <Link href="/">
          <a>First page</a>
        </Link>
      </div>
    </Layout>  
  )
  
}

const getPostsFromBackend = async ({page, take}: {page: number, take: number}) => {
  const {data, error, loading} = await client.query({
    query: FeedsDocument,
    variables: {page, take},
  });
  return data.feeds as Response
}


export const getStaticProps: GetStaticProps = async () => {
  const {data, error, loading} = await client.query({
    query: FeedsDocument,
    variables: {page: 1, take: 3},
  })

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  return {
    props: { 
      response: data.feeds as Response
    },
  }
}

export default Home;
