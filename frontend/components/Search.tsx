import { gql, useMutation } from '@apollo/client'

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $content: String!, $authorEmail: String!) {
    createDraft(data:{
        title: $title, content: $content
    }, authorEmail: $authorEmail){
      id
      title
      viewCount
      content
      createdAt
    }

  }
`

export default function Search() {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    //const url = formData.get('url')
    const content = formData.get('content')
    const authorEmail = formData.get('authorEmail')
    form.reset()

    createPost({
      variables: { title, content, authorEmail },
      update: (cache, { data: { createPost } }) => {
        cache.modify({
          fields: {
            allPosts(existingPosts = []) {
              const newPostRef = cache.writeFragment({
                data: createPost,
                fragment: gql`
                  fragment NewPost on allPosts {
                    id
                    type
                  }
                `,
              })
              return [newPostRef, ...existingPosts]
            },
          },
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="title" name="title" type="text" required />
      <input placeholder="content" name="content" type="text" required/>
      <input placeholder="authorEmail" name="authorEmail" type="text" required/>
      <button type="submit" disabled={loading}>
        Submit
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
