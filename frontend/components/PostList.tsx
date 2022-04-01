import React, { useState } from "react";
import Search from './Search'
import SearchPosts from './SearchPosts'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import { useQuery, NetworkStatus } from '@apollo/client'
import { AllPostsDocument } from '../interfaces/graphql_generated'

export default function PostList(){
  const [ isValid, setIsValid] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>()
  const [take, setTake] = useState<number>(DEFAULT_PAGE_TAKE)
  const [skip, setSkip] = useState<number>(0)

  const handeleSearch = (event: any) => {
    //console.log('handleSearch')
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const searchString = formData.get('searchString')!.toString()
    const take = Number(formData.get('take')!.toString()) || DEFAULT_PAGE_TAKE
    //form.reset()

    refetch({
        searchString,
        take,
    })
    // setSearchString(searchString);
    // setTake(take)
    // setIsValid(!!searchString && searchString.length > 2);  
    //console.log('isValid', isValid, 'searchString', searchString, 'take', take)
  }

  //console.log('isValid', isValid)
  const { loading, error, data, refetch, networkStatus } = useQuery(
    AllPostsDocument, {
      variables: { 
        searchString,
        take,
        skip,
       },
       notifyOnNetworkStatusChange: true,
      }
  )
  if (networkStatus === NetworkStatus.refetch) return <p>Refetching!</p>;
  if (loading) return null
  if (error) return `Error!: ${error}`

  return (
    <>
      <h1>Post List</h1>
      <Search handeleSearch={handeleSearch} />
      {data && <SearchPosts searchString={searchString!} take={take} skip={skip}/>}
    </>
  )
}
