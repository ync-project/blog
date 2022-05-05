import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client'
import { useSession } from "next-auth/react"
import Router from 'next/router'

const CREATE_POST_MUTATION = gql`
   mutation createPost($title: String!, $content: String!,
    $authorEmail: String!, $authorName: String!) {
    createDraft(
      data:{
      	title: $title, content: $content,
      	authorName: $authorName, authorEmail: $authorEmail
      }
    ){
      id
      title
      viewCount
      content
      createdAt
      author{
        name
        email
      }
    }
  }   
`

export default function Submit() {
  const { data: session, status } = useSession()
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    //const url = formData.get('url')
    const content = formData.get('content')
    const authorEmail = session?.user!.email
    const authorName = session?.user!.name
    // console.log('title', title)
    // console.log('content', content)
    // console.log('authorEmail', authorEmail)
    // console.log('authorName', authorName)
    form.reset()

    createPost({
      variables: { title, content, authorEmail, authorName },
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
        Router.replace('/drafts')
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="title" name="title" type="text" required />
      <textarea
            name="content"
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  )
}
