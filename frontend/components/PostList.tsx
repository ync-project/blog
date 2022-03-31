import React, { useState } from "react";
import Search from './Search'
import SearchPosts from './SearchPosts'
import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  

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

    setSearchString(searchString);
    setTake(take)
    setIsValid(!!searchString && searchString.length > 2);  
    console.log('isValid', isValid, 'searchString', searchString, 'take', take)
  }

  //console.log('isValid', isValid)
  // const { loading, error, data, networkStatus } = useQuery(
  //   AllPostsDocument, {
  //     variables: { 
  //       searchString: searchText,
  //       take,
  //       skip,
  //      },
  //   }
  // )
  // if (loading) return null
  // if (error) return `Error!: ${error}`

  return (
    <>
      <h1>Post List</h1>
      <Search handeleSearch={handeleSearch} />
      {isValid && <SearchPosts searchString={searchString!} take={take} skip={skip}/>}
    </>
  )
}
