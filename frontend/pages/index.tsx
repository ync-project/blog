import { GetStaticPropsContext } from "next";
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  
import { PostsDocument } from '../types/graphql_generated'
import InfoBox from '../components/etc/InfoBox'
import Layout from "../components/sys/Layout"
import PostsSearch from '../components/post/PostsSearch'
import { Main } from '../components/sys/Main'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../components/mui/Link';
import ProTip from '../components/mui/ProTip';
import Copyright from '../components/mui/Copyright';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export default function Home(){
  return (
    <Container maxWidth="lg">
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        MUI v5 + Next.js with TypeScript example
      </Typography>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
  )    
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
    variables: {
      take: DEFAULT_PAGE_TAKE,
      after: null,
    }
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  });
}

