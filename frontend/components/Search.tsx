import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  
import {useDebouncedCallback} from "use-debounce"

export default function Search({handeleSearch, 
    searchString, handleSearchstring, take, handleTake, skip}: any) {
  const takes = [1,3,5,10,15,20,25,30,40,50,75,100]

  const handleString = useDebouncedCallback(handleSearchstring, 500)

  return (
    <div className="justify-content-center d-flex position-relative">
      <form onSubmit={handeleSearch}>
        <input type="text" name="searchString"
          value={searchString} onChange={(e) => handleString(e.target.value)}
          placeholder="title or content" />
        <input type="hidden" name="skip" defaultValue={skip} />
        <select name="take" 
            value={take} onChange={handleTake}>
          { [...takes].map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
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
    </div>        
  )
}
