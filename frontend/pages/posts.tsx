import { GetServerSideProps } from "next"; 
import Layout from "../components/Layout"
//import type { NextPage } from 'next';
import Link from "next/link"
//import gql from "graphql-tag"
import { gql } from "@apollo/client"
import * as AllTypes from '../interfaces/nexus'
import client from "../lib/apollo-client";

const PostItem = ( {post }: {post: AllTypes.NexusGenFieldTypes["Post"]} ) => {
  return (
  <Link href="/p/[id]" as={`/p/${post.id}`}>
    <a>
      <h2>{post.title}</h2>
      {post.author &&
      <small>By {post.author.name}</small>}
      <p>{post.content}</p>
      <style jsx>{`
        a {
          text-decoration: none;
          color: inherit;
          padding: 2rem;
          display: block;
        }
      `}</style>
    </a>
  </Link>
  )
}


const PostsPage = ({posts}: {posts: AllTypes.NexusGenFieldTypes["Query"]["feed"]}) => {
  return posts && (
    <Layout>
        <div className="page">
        <h1>Blog</h1>
        <main>
          {posts?.map((post) => ( 
              <div key={post.id} className="post">
                <PostItem post = {post as AllTypes.NexusGenFieldTypes["Post"]} />
              </div>
          ))}
        </main>
      </div>
    </Layout>  
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<AllTypes.NexusGenFieldTypes["Query"]>({
    query: gql`
      query FeedQuery {
        feed {
          id
          title
          content
          published
          author {
            id
            name
          }
        }
      }
    `,
  });

  return {
    props: { 
      posts: data.feed.slice(0, 6),
    },
 };
}



export default PostsPage;
