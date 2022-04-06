import { DEFAULT_PAGE_TAKE } from '../interfaces/app_types'  

export default function Search({handeleSearch, variables:{searchString, take}, skip}: any) {
  const takes = [1,3,5,10,15,20,25,30,40,50,75,100]
  return (
    <div className="justify-content-center d-flex position-relative">
      <form onSubmit={handeleSearch}>
        <input type="text" name="searchString" defaultValue={searchString} placeholder="title or content" />
        <input type="hidden" name="skip" defaultValue={skip} />
        <select name="take" defaultValue={take}>
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
