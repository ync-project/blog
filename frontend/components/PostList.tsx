import React, { useState } from "react";
import { useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './ErrorMessage'
import { AllPostsDocument, AllPostsQuery } from '../interfaces/graphql_generated'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import Search from './Search'
import SearchPosts from './SearchPosts'
import Posts from './Posts'


export default function PostList(){
  const [ isValid, setIsValid] = useState<boolean>(false);
  const [take, setTake] = useState<number>(DEFAULT_PAGE_TAKE)
  const [searchText, setSearchText] = useState<string>()

  const handeleSearch = (event: any) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const searchText = formData.get('searchText')!.toString()
    const take = Number(formData.get('take')!.toString()) || DEFAULT_PAGE_TAKE
    //form.reset()

    const isValid = !!searchText && searchText.length > 2;
  
    setTake(take)
    setSearchText(searchText);
    setIsValid(isValid);
  }
  return (
    <>
      <h1>Post List</h1>
      <Search handeleSearch={handeleSearch}/>
      {isValid && <SearchPosts isValid={isValid}  searchText={searchText} 
        take={take} skip={0} />}
    </>
  )
}

export function PostList2(){
  
  const { loading, error, data, fetchMore, networkStatus } = useQuery<AllPostsQuery>(
    AllPostsDocument,
    {
      variables: { take: DEFAULT_PAGE_TAKE },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        skip: allPosts?.length || undefined,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading && !loadingMorePosts) return <div>Loading</div>

  const { allPosts, _allPostsMeta } = data!


} 
