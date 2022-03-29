import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client'
import PostList from '../components/PostList'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import { client, initializeApollo, addApolloState } from '../lib/apolloClient'
import SearchPosts from './SearchPosts';



export default function Search() {
  //const [ loadPosts ] = useAllPostsLazyQuery({client});
  const [ isValid, setIsValid] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState('');


  const handleSubmit = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const value = formData.get('title')!.toString()
    //form.reset()

    const valueEntered = !!value
    const isValid = valueEntered && value.length > 2;
  
    setIsValid(isValid);
    setSearchQuery(value);
  }  

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="title or content" name="title" type="text" required />
      <button type="submit" disabled={false}>
        Search
      </button>
      <SearchPosts isValid={isValid} searchQuery={searchQuery}/>
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
