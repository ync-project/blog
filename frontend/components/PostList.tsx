import ErrorMessage from './ErrorMessage'
import PostUpvoter from './PostUpvoter'
import Link from 'next/link'
import { AllPostsQuery, useAllPostsLazyQuery } from '../interfaces/graphql_generated'
import { client } from '../lib/apolloClient'


export default function WrappedPosts() {
  const [ loadPosts, {loading, error, data}] = useAllPostsLazyQuery({client})

  const findPost = (title: string) => {
    loadPosts({variables: {searchString: title}})
  }

  const renderResults = () => {
    if (loading) {
      return <span>Loading...</span>
    }

    if (error) {
      return <span>Something went wrong: ${error}</span>
    }

    return data && <Posts posts={data.allPosts} count={Number(data._allPostsMeta?.count)} />
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    //form.reset()
    //cb(title!.toString())
    findPost(title!.toString())
  }  

  return (
    <div>
        <h1>Post List</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder="title" name="title" type="text" required />
          <button type="submit" disabled={false}>
            Search
          </button>
        </form>

        {renderResults()}
    </div> 
  );
}

function Posts({ posts, count }: { posts: AllPostsQuery["allPosts"], count: number}){
  const areMorePosts = posts.length < count
  return (
    <section>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <Link href="/post/[id]" as={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <PostUpvoter id={post.id} votes={post.votes} />
            </div>
          </li>
        ))}
      </ul>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>

    </section>
  )
}

  