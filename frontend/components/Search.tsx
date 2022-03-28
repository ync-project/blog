import { gql, useQuery } from '@apollo/client'
import PostList from '../components/PostList'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import { client, initializeApollo, addApolloState } from '../lib/apolloClient'
import { AllPostsDocument, AllPostsQuery, useAllPostsLazyQuery } from '../interfaces/graphql_generated'


export default function Search({cb}: {cb: (title: string)=>any}) {
  const [ loadPosts ] = useAllPostsLazyQuery({client});

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    form.reset()
    cb(title!.toString())
  }  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Search</h1>
      <input placeholder="title" name="title" type="text" required />
      <button type="submit" disabled={false}>
        Search
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}
