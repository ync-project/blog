import Layout from "../../components/Layout"
import Posts from '../../components/post'
import { GetStaticProps } from "next";
import Link from 'next/link'
import ErrorMessage from '../../components/error-message'
import client from "../../lib/apollo-client"; 
import { FeedsDocument, Response, FeedsQuery } from '../../interfaces/graphql_generated'
import { useState, useEffect } from 'react'
import * as graphql from '../../lib/graphql'

type Props = {
  response: Response
}

type Page = {
  selected: number
}

const PostsPage = ( {response} : {response: Response }) => {
    const {pageInfo, posts} = response
  return (posts && 
    <Layout>
      <div>
        <Posts posts={posts} />
        <Link href="/post/[page]" as={`/post/${pageInfo.currentPage-1}`}>
          <a>Prev {pageInfo.currentPage - 1}</a>
        </Link>
        page : {pageInfo.currentPage }
        <Link href="/post/[page]" as={`/post/${pageInfo.currentPage+1}`}>
          <a>Next {pageInfo.currentPage + 1}</a>
        </Link>
        <Link href="/post/[page]" as={`/post/1`}>
          <a>First page</a>
        </Link>
      </div>
    </Layout>  
  )
  
}

export const getStaticPaths = async () => {
  const { data } = await client.query<FeedsQuery>({
      query: graphql.FEED_LIST,
      variables: { page: 1}
    });
  const paths = data.feeds?.posts?.map((post) => ({
      params: { page: post!.id.toString() },
  }))
  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const page = params?.page
  console.log('getStaticProps page', page)
  const {data, error, loading} = await client.query({
    query: FeedsDocument,
    variables: {page, take: 3},
  })

  if (error) return <ErrorMessage message="Error loading posts." />
  if (!data) return <div>Loading</div>

  return {
    props: { 
      response: data.feeds as Response
    },
  }
}

export default PostsPage;
