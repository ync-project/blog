import Layout from "../components/Layout"
import PostList from '../components/post/PostList'
import { GetStaticProps } from "next";
import ErrorMessage from '../components/error-message'
import client from "../lib/apollo-client"; 
import { FeedsDocument, Response } from '../interfaces/graphql_generated'
import { useState, useEffect } from 'react'
import Router, { withRouter, NextRouter } from 'next/router'

export const allPostsQueryVars = {
  page: 1,
  take: 5
}
type Props = {
  response: Response
  router: NextRouter, //{pathname: string, query: {page: number}},
}

type Page = {
  selected: number
}

const Home = ( { response, router }: Props) => {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  /*
    Posts fetching happens after page navigation, 
    so we need to switch Loading state on Router events.
  */
  useEffect(() => { //After the component is mounted set router event handlers
    Router.events.on('routeChangeStart', startLoading); 
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
        Router.events.off('routeChangeStart', startLoading);
        Router.events.off('routeChangeComplete', stopLoading);
    }
  }, [])

  const pagginationHandler = (page: Page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = String(page.selected + 1);
  };

  return (
    <Layout>
      <PostList response={response} pagginationHandler={pagginationHandler}/>
    </Layout>  
  )
}

export default withRouter(Home);

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading, error} = await client.query({
    query: FeedsDocument,
    variables: allPostsQueryVars,
  });

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  return {
    props: { 
      response: data.feeds as Response
    },
  }
}
