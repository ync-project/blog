import Layout from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import { NexusGenFieldTypes } from '../generated/nexus-typegen'

const FeedQuery = gql`
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
`

//const {Post} = NexusGenFieldTypes
const PostItem = <T extends NexusGenFieldTypes["Post"]>( {post} : { post: T} ) => {
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
}

const Blog = () => {
  const { loading, error, data } = useQuery<NexusGenFieldTypes["Query"], any>(FeedQuery, {
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return data && data.feed && (
    <Layout>
      <div className="page">
        <h1>Blog</h1>
        <main>
          {data.feed?.map(post => (
            post &&
              <div key={post.id} className="post">
                <PostItem post = {post} />
              </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
