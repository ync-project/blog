
export type SearchProps = { 
  handleSearchstring: (e: any)=>void 
  searchString: string
  take: number
  handleTake: (e: any)=>void
}

export default function Search( {handleSearchstring, searchString, take, handleTake} : SearchProps) {
  const takes = [1,3,5,10,15,20,25,30,40,50,75,100]

  //const handleString = useDebouncedCallback(handleSearchstring, 200)

  return (
    <div className="justify-content-center d-flex position-relative">
      <form>
        <label>Search:</label>
        <input type="text" name="searchString" 
            value={searchString} onChange={handleSearchstring}
          placeholder="title or content" />
        <select name="take" value={take} onChange={handleTake}>
          { [...takes].map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
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
